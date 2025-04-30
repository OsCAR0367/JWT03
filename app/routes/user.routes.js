// Importa Express para crear rutas
import express from "express";
// Importa los controladores que manejan las respuestas segun el rol del usuario
import {
  allAccess,
  userBoard,
  adminBoard,
  moderatorBoard,
} from "../controllers/user.controller.js";

// Importa middlewares de autenticacion y autorizacion
import {
  verifyToken,
  isAdmin,
  isModerator,
  isModeratorOrAdmin, // Verifica que tenga uno de los dos roles
} from "../middlewares/authJwt.js";

// Crea una instancia de router para definir las rutas protegidas por roles
const router = express.Router();

// Ruta publica: no requiere autenticación
router.get("/all", allAccess);

// Ruta solo para usuarios autenticados (requiere token JWT valido)
router.get("/user", [verifyToken], userBoard);

// Ruta solo para moderadores (requiere token + rol moderador)
router.get("/mod", [verifyToken, isModerator], moderatorBoard);

// Ruta solo para administradores (requiere token + rol admin)
router.get("/admin", [verifyToken, isAdmin], adminBoard);

// Exporta el router para que pueda ser usado en app.js o server.js
export default router;

// Respuesta para ruta pública
// Respuesta para usuarios autenticados
// Respuesta para administradores
// Respuesta para moderadores

// Verifica que el usuario esté autenticado (token

// Verifica que el usuario tenga rol de admin
// Verifica que el usuario tenga rol de moderador