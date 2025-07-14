# Documentación Técnica del Proyecto Wordle Clone

## Introducción

Este documento proporciona una descripción técnica detallada del proyecto Wordle Clone, una aplicación móvil desarrollada con React Native y Expo. La aplicación replica la funcionalidad del popular juego de adivinanzas de palabras "Wordle".

## Estructura del Proyecto

El proyecto sigue una estructura de directorios estándar para aplicaciones Expo, con una organización clara de componentes, pantallas, lógica de negocio y activos.

```
.wordle-clone/
├── app/                # Pantallas y navegación de la aplicación
│   ├── (auth)/         # Flujo de autenticación (login, registro)
│   ├── (tabs)/         # Pantallas principales con barra de pestañas
│   └── ...
├── assets/             # Imágenes, fuentes y otros activos estáticos
├── components/         # Componentes de UI reutilizables
├── constants/          # Constantes de la aplicación (colores, etc.)
├── context/            # Contextos de React para gestión de estado global
├── data/               # Datos estáticos (lista de palabras)
├── hooks/              # Hooks de React personalizados
└── utils/              # Funciones de utilidad
```

## Componentes Principales

A continuación se describen los componentes y archivos más importantes del sistema.

### Navegación y Ruteo (`app/`)

La navegación se gestiona con `expo-router`, que utiliza una convención de enrutamiento basada en archivos.

- **`app/_layout.tsx`**: Es el layout raíz de la aplicación. Envuelve toda la aplicación con los proveedores de contexto `AuthProvider` y `ScoreProvider` y gestiona la lógica de redirección inicial basada en el estado de autenticación del usuario.
- **`app/(auth)/_layout.tsx`**: Define el layout para el grupo de rutas de autenticación, incluyendo las pantallas de login y registro.
- **`app/(tabs)/_layout.tsx`**: Configura la barra de navegación inferior con pestañas para las pantallas principales: el juego, la tabla de clasificación y la pantalla de ayuda.

### Pantallas (`app/(tabs)/` y `app/(auth)/`)

- **`app/(tabs)/index.tsx`**: La pantalla principal del juego. Contiene la lógica para el tablero, el teclado, la validación de palabras y el seguimiento del estado del juego.
- **`app/(tabs)/leaderboard.tsx`**: Muestra la tabla de clasificación de los 10 mejores jugadores, ordenada por puntuación.
- **`app/(tabs)/help.tsx`**: Una pantalla estática que explica las reglas del juego.
- **`app/(auth)/login.tsx`**: Pantalla de inicio de sesión de usuario.
- **`app/(auth)/register.tsx`**: Pantalla de registro de nuevos usuarios.

### Gestión de Estado (`context/`)

- **`context/AuthContext.tsx`**: Gestiona el estado de autenticación del usuario (login, logout, registro) y persiste el usuario actual en `AsyncStorage`.
- **`context/ScoreContext.tsx`**: Administra las puntuaciones de los jugadores, permitiendo agregar nuevas puntuaciones y cargarlas desde `AsyncStorage`.

### Componentes de UI (`components/`)

- **`components/Grid.js`**: Renderiza la cuadrícula del juego, mostrando las letras adivinadas y sus colores correspondientes.
- **`components/Keyboard.js`**: Muestra un teclado en pantalla para que el usuario ingrese sus intentos.
- **`components/GenericModal.tsx`**: Un componente de modal reutilizable para mostrar mensajes de victoria, derrota o error.
- **`components/ThemedText.tsx` y `components/ThemedView.tsx`**: Componentes que soportan temas claro y oscuro.

### Lógica del Juego

- **`data/words.js`**: Contiene la lista de palabras válidas (`WORD_LIST`) y un diccionario (`DICTIONARY`) para validar los intentos del usuario.
- **`utils/validateWord.js`**: Una función de utilidad simple para verificar si una palabra está en el diccionario.

La lógica principal del juego se encuentra en `app/(tabs)/index.tsx`. El estado del juego (cuadrícula, colores, fila/columna actual, etc.) se gestiona con el hook `useState` de React. La función `handleKeyPress` procesa las entradas del teclado, actualiza el estado y verifica si se ha ganado o perdido el juego.

## Flujo de Datos

1.  **Autenticación**: El usuario se registra o inicia sesión. `AuthContext` se encarga de validar las credenciales y almacenar los datos del usuario.
2.  **Juego**: El usuario juega en la pantalla principal. El estado del juego se mantiene localmente en el componente `App`.
3.  **Puntuación**: Al ganar una partida, la puntuación se calcula y se guarda a través de `ScoreContext`, que la persiste en `AsyncStorage`.
4.  **Tabla de Clasificación**: La pantalla de `leaderboard` carga las puntuaciones desde `ScoreContext` y las muestra.

## Posibles Mejoras

-   **Validación de Palabras en Tiempo Real**: Validar si la palabra ingresada existe en el diccionario antes de permitir que el usuario la envíe.
-   **Animaciones**: Agregar animaciones más fluidas para las transiciones de color en la cuadrícula y para las alertas.
-   **Backend Remoto**: Reemplazar `AsyncStorage` con un backend real para tener una tabla de clasificación global y persistencia de usuarios entre dispositivos.
-   **Pruebas Unitarias**: Añadir pruebas unitarias para la lógica del juego y los componentes.
