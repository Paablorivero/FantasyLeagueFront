# ⚽ Fantasy League

![Angular](https://img.shields.io/badge/Angular-v20-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

Proyecto Intermodular de una Liga Fantasy completa, desde el modelado de la Base de Datos hasta el Frontend.

## 📋 Índice
- [Descripción](#-descripción)
- [Tecnologías](#-tecnologías)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación y Configuración](#-instalación-y-configuración)

---

## 📖 Descripción

Desarrollo de una **aplicación para un proyecto académico** simulando un **entorno profesional**.

El proyecto consiste en una **Liga Fantasy de fútbol**, cuyo objetivo es crear una interfaz moderna y responsive, válida tanto para **PC como dispositivos móviles**.

La aplicación consumirá una **API de fútbol** de **La Liga Española**, ademas de una **API de noticias**, y contará con un **backend propio** encargado de gestionar la base de datos y actuar como intermediario entre el frontend y la API externa, con una persistencia de datos desde una **base de datos** propia.

---

## 🛠️ Tecnologías

### Frontend
- **Framework:** Angular v20
- **Lenguaje:** TypeScript
- **Estilos:** TailwindCSS utilizando la libreria Daisy UI, HTML5 / CSS3 

### Backend
- **Entorno:** Node.js

### Base de Datos
- **Motor:** PostgreSQL

### Herramientas
- npm / pnpm / yarn

---

## 📂 Estructura del Proyecto

El repositorio está organizado de la siguiente manera:

```text
📦 FantasyLeagueFront
 ┣ 📂 APIKey/               # Información, pruebas o configuración de las claves para la API de fútbol.
 ┣ 📂 FLFront/              # Código fuente de la aplicación Frontend en Angular.
 ┣ 📂 Proyecto/DiagramasBD/ # Esquemas y diagramas del modelado de la Base de Datos (E-R, Relacional, etc).
 ┣ 📂 ScriptSQL/            # Scripts (.sql) para la creación, inserción y mantenimiento de la BD PostgreSQL.
 ┣ 📜 .gitignore            # Archivos y directorios ignorados por Git.
 ┗ 📜 README.md             # Documentación principal del proyecto.
