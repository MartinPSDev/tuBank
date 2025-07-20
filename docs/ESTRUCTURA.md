# Estructura del Proyecto TuBank

## 📁 Estructura de Directorios

```
tubank/
├── mobile-app/          # Aplicación móvil (React Native/Expo)
│   ├── src/
│   │   ├── screens/    # Pantallas de la aplicación
│   │   ├── hooks/      # Custom hooks
│   │   ├── constants/  # Constantes y configuraciones
│   │   └── assets/     # Recursos estáticos (imágenes, fuentes)
│   └── ...
│
├── backend-api/         # API REST (NestJS)
│   ├── src/
│   │   ├── core/       # Configuración central
│   │   ├── modules/    # Módulos de la aplicación
│   │   └── database/   # Migraciones y seeds
│   └── ...
│
├── shared/             # Código compartido
├── infrastructure/     # Infraestructura como código
├── docs/              # Documentación
└── scripts/           # Scripts de automatización
```

## ✅ Checklist de Configuración Inicial

### Configuración General del Monorepo
- [x] Estructura de directorios principal
- [x] README principal actualizado
- [ ] Configurar workspaces de npm/yarn (opcional)
- [ ] Configurar husky para git hooks
- [ ] Configurar lint-staged

### Mobile App
- [x] Mover pantallas existentes a `/mobile-app/src/screens`
- [x] Mover hooks existentes a `/mobile-app/src/hooks`
- [x] Mover constantes a `/mobile-app/src/constants`
- [ ] Configurar navegación entre pantallas
- [ ] Configurar gestión de estado (Redux/Context)
- [ ] Configurar temas y estilos globales

### Backend API
- [x] Estructura básica de NestJS
- [ ] Configurar módulos principales
- [ ] Configurar autenticación JWT
- [ ] Configurar base de datos
- [ ] Configurar validación de datos

### Infraestructura
- [ ] Configuración de Docker para desarrollo
- [ ] Configuración de Kubernetes (opcional)
- [ ] Scripts de despliegue

## 🚀 Siguientes Pasos

1. Configurar las variables de entorno necesarias
2. Implementar la autenticación en el backend
3. Desarrollar las pantallas principales de la aplicación móvil
4. Implementar las APIs necesarias
5. Configurar los pipelines de CI/CD

## 📚 Documentación Adicional

- [Guía de Estilo](./STYLE_GUIDE.md)
- [API Reference](./API_REFERENCE.md)
- [Guía de Despliegue](./DEPLOYMENT.md)
