# TuBank - Tu Banca Móvil

*Tu banco en la palma de tu mano*

## 📱 Acerca de TuBank

TuBank es una aplicación móvil de banca en línea que te permite gestionar tus finanzas de manera rápida, segura y sencilla. Con TuBank, tienes el control total de tu dinero desde cualquier lugar y en cualquier momento.

## 🏗️ Estructura del Proyecto (Monorepo)

```
tubank/
├── mobile-app/          # Aplicación móvil (React Native/Expo)
├── backend-api/         # API REST (NestJS)
├── shared/              # Código compartido
├── infrastructure/      # Infraestructura como código
├── docs/               # Documentación
└── scripts/            # Scripts de automatización
```

### 📱 Mobile App (`/mobile-app`)
Aplicación móvil desarrollada con React Native y Expo.

### 🖥️ Backend API (`/backend-api`)
API REST desarrollada con NestJS que sirve como backend para la aplicación móvil.

### 🤝 Shared (`/shared`)
Código compartido entre frontend y backend (tipos, constantes, utilidades).

### ☁️ Infrastructure (`/infrastructure`)
Configuración de infraestructura como código (Terraform, Kubernetes).

## 🚀 Comenzando

### Requisitos Previos
- Node.js 16+
- npm 8+
- Docker (para desarrollo local)
- Expo CLI (para desarrollo móvil)

### Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/tubank.git
   cd tubank
   ```

2. Instala dependencias del frontend:
   ```bash
   cd mobile-app
   npm install
   ```

3. Instala dependencias del backend:
   ```bash
   cd ../backend-api
   npm install
   ```

4. Configura las variables de entorno (ver `.env.example` en cada directorio)

## 🛠️ Desarrollo

### Ejecutar la aplicación móvil (desarrollo)
```bash
cd mobile-app
npm start
```

### Ejecutar el backend (desarrollo)
```bash
cd backend-api
npm run start:dev
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

by @M4rt1n_0x1337s
