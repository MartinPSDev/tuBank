# tuBank - Aplicación Bancaria Móvil

Aplicación bancaria móvil desarrollada con React Native y Expo que incluye funcionalidades completas de banca digital.

## Características

- 🏦 **Pantalla Principal**: Vista completa del balance, tarjetas y servicios
- 💳 **Gestión de CBU/Alias**: Modal con código QR, selector de moneda y opciones de copia
- 📈 **Sistema de Inversiones**: Pantalla de inversiones con opciones para invertir más, retirar e historial
- 💰 **Teclado Numérico**: Interfaces para montos de inversión y retiro con validación
- 📊 **Historial de Inversiones**: Seguimiento de movimientos con porcentajes ganados
- 🔐 **Autenticación**: Sistema de login seguro
- 📱 **Navegación por Tabs**: Estructura organizada con múltiples secciones

## Tecnologías Utilizadas

- React Native
- Expo Router
- TypeScript
- React Navigation
- Expo Vector Icons
- React Native Reanimated
- Expo Linear Gradient

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/MartinPSDev/tuBank.git
   cd tuBank
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia la aplicación:
   ```bash
   npx expo start
   ```

## Estructura del Proyecto

```
tuBank/
├── app/                    # Rutas de la aplicación
│   ├── (tabs)/            # Navegación por tabs
│   ├── auth.tsx           # Pantalla de autenticación
│   ├── investment.tsx     # Pantalla principal de inversiones
│   ├── invest-amount.tsx  # Pantalla para invertir dinero
│   ├── withdraw-amount.tsx # Pantalla para retirar dinero
│   └── investment-history.tsx # Historial de inversiones
├── src/
│   ├── screens/           # Componentes de pantallas
│   ├── constants/         # Constantes (colores, layout)
│   ├── hooks/            # Hooks personalizados
│   └── types/            # Definiciones de TypeScript
└── assets/               # Recursos (fuentes, imágenes)
```

## Funcionalidades Principales

### 🏠 Pantalla Principal
- Balance total y disponible
- Tarjetas de débito y crédito
- Sección de inversiones con rendimiento
- Accesos rápidos a servicios

### 💳 Modal CBU/Alias
- Código QR para transferencias
- Selector de moneda (Pesos/Dólares)
- Información de CBU, alias y número de cuenta
- Opciones para copiar y editar datos

### 📈 Sistema de Inversiones
- **Pantalla Principal**: Resumen de inversiones y acciones disponibles
- **Invertir Más**: Teclado numérico para ingresar montos
- **Retirar**: Validación de saldo disponible y montos rápidos
- **Historial**: Lista de movimientos con porcentajes ganados
- **Modal TNA**: Información detallada de tasas

### 🔧 Características Técnicas
- Navegación fluida con Expo Router
- Validación de formularios
- Manejo de estado local
- Diseño responsive
- Animaciones suaves

## Desarrollo

Para contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT.