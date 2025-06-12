// importacion del paquete de express
const express = require("express");
// importacion del paquete de cors
const cors = require("cors");
// conexion de la base de datos
const {ConnectDB} = require("./data/config");
// importacion de las rutas
const userRouter = require("./routes/userRoutes");
// Importacion dotenv
require("dotenv").config();
// Definicion del puerto 
// En tu index.js
const PORT = process.env.PORT || 3006; // Fallback a 3006 si no hay PORT definido

// Creacion de la instancia del servidor
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api-1-user',userRouter);
//Agregar la conexion a la base de datos
ConnectDB();

// En tu index.js
const server = app.listen(PORT, "0.0.0.0", () => {
    console.log("Server running on port " + PORT);
});

// Manejo de señales de terminación
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
        process.exit(0);
    });
});