// Importacion de express
const express = require("express");
// Creacion del enrutador modular
const router = express.Router();
const userController = require("../controller/userController");

// Definicion de rutas
// Ruta para crear un usuario
router.post("/users", userController.createUser);
// Ruta para obtener los usuarios
 router.get("/users", userController.getAllUser);
//Ruta para obtener un contacto
 router.get("/users/:userid", userController.getUserById);
// Ruta para obtener el contacot por id
 router.put("/users/:userid", userController.updateUser);
// Exportacion de las rutas
router.delete("/users/:userid", userController.deleteUser);

// Exportacion de las rutas
module.exports = router;
