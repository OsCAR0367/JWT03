// Importa Express para crear la aplicacion web
import express from "express";

// Importa CORS para permitir solicitudes desde otros dominios (por ejemplo, desde el frontend)
import cors from "cors";

// Importa los modelos y configuracion de Sequelize (ORM para la base de datos)
import db from "./app/models/index.js";

// Importa las rutas de autenticación (signup, signin)
import authRoutes from "./app/routes/auth.routes.js";

// Importa las rutas protegidas por roles de usuario
import userRoutes from "./app/routes/user.routes.js";

// Crea una instancia de la aplicacion Express
const app = express(); // Fixed: changed - to =

// Configura las opciones de CORS para permitir acceso desde el frontend en el puerto 8080
const corsOptions = {
  origin: "http://localhost:8080"
}; // Fixed: added closing bracket

// Aplica el middleware de CORS a la aplicacion
app.use(cors(corsOptions)); // Fixed: corrected variable name

// Middleware para analizar solicitudes con cuerpo en formato JSON
app.use(express.json());

// Middleware para analizar solicitudes con cuerpo en formato URL-encoded (formularios)
app.use(express.urlencoded({ extended: true }));

// Ruta simple para probar que el servidor está funcionando
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Node.js JWT Authentication API." }); // Fixed: added closing quote and bracket
});

// Define la ruta base para autenticación: /api/auth/signup y /api/auth/signin
app.use("/api/auth", authRoutes);

// Define la ruta base para pruebas de acceso según el rol del usuario: 
// /api/test/*
app.use("/api/test", userRoutes);

// Define el puerto en el que se ejecutara el servidor. Usa 3000 por
// defecto si no hay una variable de entorno
const PORT = process.env.PORT || 3000;

// Sincroniza los modelos con la base de datos (sin borrar datos si force
// es false)
// Luego inicia el servidor y escucha en el puerto definido
db.sequelize.sync({ force: false }).then(() => {
  console.log("Database synchronized");

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`); // Fixed: corrected template string syntax
  });
}); // Fixed: added closing brackets and semicolon
