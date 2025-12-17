# ⚽ Cancheros Backend

Este es el backend de la aplicación **Cancheros**, una plataforma diseñada para la gestión de alquiler de canchas de fútbol, venta de accesorios e indumentaria deportiva.

La API está construida con **Node.js** y **Express**, siguiendo una arquitectura de capas (MVC) para garantizar escalabilidad y mantenimiento.

---

## 🛠️ Tecnologías Utilizadas

* **Runtime:** [Node.js](https://nodejs.org/)
* **Framework:** [Express.js](https://expressjs.com/)
* **Base de Datos:** MongoDB (vía Mongoose)
* **Validaciones:** Express-validator
* **Seguridad:** JSON Web Tokens (JWT) y Bcryptjs para encriptación de claves.
* **Variables de Entorno:** Dotenv

---

## 📁 Estructura del Proyecto


* `src/controllers`: Lógica de negocio para productos, reservas y usuarios.
* `src/models`: Definición de los esquemas de datos (Mongoose).
* `src/routes`: Definición de los endpoints de la API.
* `src/helpers`: Funciones de utilidad y validaciones personalizadas.
* `src/server`: Configuración del servidor y conexión a la base de datos.
* `public`: Archivos estáticos y subida de imágenes.

---

## 🚀 Instalación y Configuración

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/pablo-german-jimenez/proyecto-alquier-canchas-futbol-accesorios-indumentaria-backend.git](https://github.com/pablo-german-jimenez/proyecto-alquier-canchas-futbol-accesorios-indumentaria-backend.git)
   cd cancherosback