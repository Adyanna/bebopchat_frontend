# Bebop Frontend

Frontend de **Bebop Communication Network (BebopChat)**, una aplicación de mensajería que permite a los usuarios comunicarse mediante conversaciones individuales y grupales, compartir contenido multimedia, gestionar sus contactos y perfiles, publicar estados y utilizar funcionalidades de comunicación en tiempo real.

## Tecnologías

- **React:** desarrollo de interfaces de usuario mediante componentes.
- **TypeScript:** tipado estático para mejorar la seguridad y el mantenimiento del código.
- **Vite:** herramientas de desarrollo y compilación del frontend.
- **Tailwind CSS 4:** diseño y estilizado de la interfaz.
- **React Router:** navegación entre páginas y módulos de la aplicación.
- **Socket.IO Client:** comunicación en tiempo real con el backend.
- **Simple Peer y WebRTC:** tecnologías utilizadas para la integración de llamadas de audio entre usuarios.
- **Docker:** entorno de desarrollo y ejecución, según la configuración del proyecto.

## Arquitectura

El frontend está desarrollado con React y una estructura basada en componentes, páginas y lógica reutilizable, separando la presentación de las operaciones necesarias para comunicarse con el backend.

- **Páginas y vistas:** representan las pantallas principales de la aplicación.
- **Componentes:** elementos reutilizables para construir la interfaz, como listas de conversaciones, ventanas de chat, burbujas de mensajes y campos de entrada.
- **Hooks:** encapsulan y reutilizan la lógica relacionada con funcionalidades como los chats y los mensajes.
- **Servicios y comunicación con la API:** permiten realizar solicitudes HTTP al backend para consultar y modificar información.
- **Comunicación en tiempo real:** utiliza Socket.IO Client para recibir eventos y mantener actualizada la información de las conversaciones.

### Flujo de comunicación

1. El usuario interactúa con un componente o una página.
2. El frontend ejecuta la lógica correspondiente y, cuando es necesario, realiza una petición HTTP al backend.
3. El backend procesa la operación y devuelve una respuesta.
4. Para los eventos en tiempo real, Socket.IO permite notificar a los participantes de las conversaciones.
5. La interfaz actualiza la información para reflejar los cambios recibidos.

Esta organización facilita la reutilización de componentes, el mantenimiento del código y la incorporación de nuevas funcionalidades.

## Funcionalidades

- **Página principal:** presenta BebopChat y proporciona navegación hacia las opciones disponibles de la aplicación.
- **Registro e inicio de sesión:** permite crear una cuenta e iniciar sesión para acceder a las funcionalidades privadas.
- **Perfil de usuario:** permite consultar y gestionar la información del perfil según las opciones disponibles en la aplicación.
- **Contactos:** permite consultar y gestionar los contactos del usuario.
- **Chats individuales y grupales:** permite acceder a conversaciones y visualizar su información.
- **Mensajería:** permite consultar, enviar, editar y eliminar mensajes mediante la integración con el backend.
- **Mensajes en tiempo real:** utiliza Socket.IO Client para recibir nuevos mensajes sin necesidad de recargar la página.
- **Estados de los mensajes:** contempla los estados enviado, recibido y visto, de acuerdo con los eventos y la información proporcionados por el backend.
- **Contenido multimedia:** contempla la visualización y el envío de contenido multimedia según el tipo de mensaje y las funcionalidades integradas.
- **Gestión de grupos:** permite trabajar con conversaciones grupales y sus opciones de administración según los permisos correspondientes.
- **Estados de usuario:** permite consultar las publicaciones propias y las de otros integrantes de la tripulación.
- **Visualizaciones de estados:** permite consultar cuántas personas han visto los estados propios y eliminarlos manualmente.
- **Llamadas de audio:** integración con el backend y las tecnologías WebRTC para la comunicación de audio entre usuarios.

## Comunicación en tiempo real

La aplicación utiliza **Socket.IO Client** para establecer una conexión con el servidor y gestionar eventos relacionados con las conversaciones.

En el módulo de mensajería, el envío del mensaje se realiza mediante la API del backend, mientras que Socket.IO permite notificar a los participantes cuando se produce un nuevo mensaje.

La interfaz también contempla los estados de los mensajes:

- **SEND:** mensaje enviado.
- **RECIBE:** mensaje recibido por el destinatario.
- **VIEW:** mensaje visualizado.

Estos estados permiten representar el avance de la entrega y lectura de los mensajes, según la información gestionada por el backend.

## Navegación

La navegación entre las páginas de la aplicación se gestiona mediante **React Router**.

Esta herramienta permite organizar las distintas vistas y acceder a los módulos correspondientes sin tener que recargar completamente la aplicación.

## Integración con el backend

El frontend se comunica con el backend de BebopChat mediante peticiones HTTP para las operaciones habituales y mediante Socket.IO para los eventos en tiempo real.

La integración permite utilizar las funcionalidades de autenticación, perfiles, contactos, conversaciones, mensajes, grupos y estados.

Las operaciones que requieren persistencia se procesan en el backend, que utiliza Prisma y PostgreSQL para gestionar los datos.

## Instalación y ejecución

### Requisitos

- Node.js compatible con la versión requerida por el proyecto.
- npm.
- Backend de BebopChat configurado y disponible.
- Variables de entorno configuradas para la conexión con el backend.

### Instalación

Clona el repositorio del frontend y accede a su directorio:

```bash
git clone https://github.com/Adyanna/bebopchat_frontend.git
cd bebopchat_frontend
```

Instala las dependencias:

```bash
npm install
```

### Variables de entorno

El proyecto utiliza variables de entorno con el prefijo `VITE_` para configurar la conexión con el backend.

Ejemplo:

```env
VITE_API_HOST=localhost
VITE_API_PORT=3001
```

Los valores deben ajustarse a la configuración del entorno donde se ejecute el backend.

### Ejecutar en desarrollo

```bash
npm run dev
```

Vite iniciará el servidor de desarrollo según la configuración del proyecto.

### Compilar para producción

```bash
npm run build
```

Este comando genera la versión compilada de la aplicación, de acuerdo con la configuración de Vite.

## Desarrollo y mantenimiento

Para incorporar una nueva funcionalidad en el frontend se recomienda:

1. Identificar la página o el módulo donde se incorporará.
2. Crear o reutilizar los componentes necesarios.
3. Implementar la lógica de interacción y los hooks correspondientes.
4. Integrar las peticiones HTTP o los eventos de Socket.IO necesarios.
5. Gestionar los estados de carga, los resultados y los errores.
6. Verificar el funcionamiento de la interfaz y su integración con el backend.

## Estado del proyecto

BebopChat cuenta con una interfaz desarrollada en React y TypeScript, integrada con un backend basado en Node.js, Express, Prisma y PostgreSQL.

El frontend incluye módulos de autenticación, perfiles, contactos, conversaciones, mensajería y estados, además de la integración de comunicación en tiempo real.

Algunas funcionalidades continúan en desarrollo. Entre ellas, está pendiente el listado de registro de llamadas, implementar videollamadas. Asimismo, la incorporación de juegos entre usuarios mediante WebRTC DataChannel se plantea como una posible mejora futura y no forma parte de las funcionalidades implementadas actualmente.
