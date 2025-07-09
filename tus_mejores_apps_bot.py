import os
import logging
import asyncio
import psycopg2
from urllib.parse import urlparse
from flask import Flask, request

from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, ContextTypes

# --- CONFIGURACIÓN ---
BOT_TOKEN = os.getenv('TELEGRAM_BOT_TOKEN')
WEB_APP_URL = os.getenv('TELEGRAM_WEB_APP_URL')
DATABASE_URL = os.getenv('DATABASE_URL') 
RENDER_WEB_URL = os.getenv('RENDER_WEB_URL')

if not all([BOT_TOKEN, WEB_APP_URL, DATABASE_URL, RENDER_WEB_URL]):
    raise ValueError("Faltan una o más variables de entorno: TELEGRAM_BOT_TOKEN, TELEGRAM_WEB_APP_URL, DATABASE_URL, RENDER_WEB_URL")

logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# --- LÓGICA DE BASE DE DATOS (PostgreSQL) ---

def get_db_connection():
    """Establece una conexión con la base de datos PostgreSQL."""
    try:
        conn = psycopg2.connect(DATABASE_URL)
        return conn
    except Exception as e:
        logger.error(f"Error al conectar con la base de datos: {e}")
        return None

def init_db():
    """Inicializa la DB y crea las tablas si no existen."""
    conn = get_db_connection()
    if not conn:
        return
    
    try:
        with conn.cursor() as cursor:
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS interactions (
                    interaction_id SERIAL PRIMARY KEY,
                    user_id BIGINT NOT NULL,
                    first_name TEXT,
                    last_name TEXT,
                    username TEXT,
                    language_code TEXT,
                    is_bot BOOLEAN,
                    interaction_type TEXT NOT NULL,
                    timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS bot_stats (
                    id INTEGER PRIMARY KEY,
                    unique_users_count INTEGER DEFAULT 0
                )
            ''')
            cursor.execute('''
                INSERT INTO bot_stats (id, unique_users_count) VALUES (1, 0)
                ON CONFLICT (id) DO NOTHING
            ''')
        conn.commit()
        logger.info("Base de datos PostgreSQL inicializada correctamente.")
    except Exception as e:
        logger.error(f"Error al inicializar las tablas de la base de datos: {e}")
    finally:
        conn.close()

def save_user_interaction(user_id: int, first_name: str, last_name: str, username: str, language_code: str, is_bot: bool, interaction_type: str):
    """Guarda una nueva interacción en la base de datos."""
    conn = get_db_connection()
    if not conn:
        return

    try:
        with conn.cursor() as cursor:
            sql = '''
                INSERT INTO interactions (user_id, first_name, last_name, username, language_code, is_bot, interaction_type)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
            '''
            cursor.execute(sql, (user_id, first_name, last_name, username, language_code, is_bot, interaction_type))
        conn.commit()
        logger.info(f"Guardada interacción '{interaction_type}' del usuario {user_id} ({first_name}).")
    except Exception as e:
        logger.error(f"Error al guardar la interacción para el usuario {user_id}: {e}")
    finally:
        conn.close()

def get_unique_users_count() -> int:
    """Obtiene el número de usuarios únicos del bot."""
    conn = get_db_connection()
    if not conn:
        return 0

    count = 0
    try:
        with conn.cursor() as cursor:
            cursor.execute('SELECT unique_users_count FROM bot_stats WHERE id = 1')
            result = cursor.fetchone()
            if result:
                count = result[0]
    except Exception as e:
        logger.error(f"Error al obtener el contador de usuarios únicos: {e}")
    finally:
        conn.close()
    return count

def increment_unique_users_count():
    """Incrementa el contador de usuarios únicos."""
    conn = get_db_connection()
    if not conn:
        return

    try:
        with conn.cursor() as cursor:
            cursor.execute('UPDATE bot_stats SET unique_users_count = unique_users_count + 1 WHERE id = 1')
        conn.commit()
        logger.info("Contador de usuarios únicos incrementado.")
    except Exception as e:
        logger.error(f"Error al incrementar el contador de usuarios únicos: {e}")
    finally:
        conn.close()


# --- MANEJADORES DE COMANDOS DEL BOT ---

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user = update.message.from_user
    logger.info(f"Usuario {user.id} ({user.first_name}) ha iniciado el bot.")
    save_user_interaction(
        user_id=user.id,
        first_name=user.first_name,
        last_name=user.last_name or '',
        username=user.username or '',
        language_code=user.language_code or '',
        is_bot=user.is_bot,
        interaction_type='start'
    )
    increment_unique_users_count()
    keyboard = [[InlineKeyboardButton("🚀 Abrir la App 🚀", web_app={'url': WEB_APP_URL})]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text(
        f"¡Hola, {user.first_name}! 👋\n\n"
        "Gracias por iniciar este bot. Para acceder a la aplicación, "
        "haz clic en el botón de abajo.",
        reply_markup=reply_markup
    )

async def stats(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    unique_users = get_unique_users_count()
    await update.message.reply_text(f"Actualmente hay {unique_users} usuarios únicos que han interactuado con el bot.")


# --- CONFIGURACIÓN DE FLASK Y TELEGRAM ---

init_db()

context_types = ContextTypes(context=dict)
application = Application.builder().token(BOT_TOKEN).context_types(context_types).build()

application.add_handler(CommandHandler("start", start))
application.add_handler(CommandHandler("stats", stats))

app = Flask(__name__)

@app.route(f'/{BOT_TOKEN}', methods=['POST'])
async def webhook():
    update_data = request.get_json(force=True)
    update = Update.de_json(update_data, application.bot)
    await application.process_update(update)
    return 'ok', 200

@app.route('/set_webhook')
def set_webhook_route():
    webhook_url = f'{RENDER_WEB_URL}/{BOT_TOKEN}'
    is_set = asyncio.run(application.bot.set_webhook(webhook_url))
    if is_set:
        return f"Webhook configurado en: {webhook_url}"
    else:
        return "Error al configurar el webhook", 400

@app.route('/')
def index():
    return "¡El bot está vivo!"
