// Importación de dotenv al inicio
require("dotenv").config();

// Importación del paquete de express
const express = require("express");
// Importación del paquete de cors
const cors = require("cors");
// Conexión de la base de datos
const { ConnectDB } = require("./data/config");
// Importación de las rutas
const userRouter = require("./routes/userRoutes");

// Definición del puerto
const PORT = process.env.PORT || 3006;

// Creación de la instancia del servidor
const app = express();

// Middlewares
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? false : '*',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Middleware para logging en desarrollo
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
    next();
  });
}

// Ruta de health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'API Users'
  });
});

// Rutas de la API
app.use('/api-1-user', userRouter);

// Ruta por defecto
app.get('/', (req, res) => {
  res.json({ 
    message: 'API Users funcionando correctamente',
    version: '1.0.0'
  });
});

// Middleware para rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Ruta no encontrada',
    path: req.originalUrl
  });
});

// Middleware global de manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'production' ? 'Algo salió mal' : err.message
  });
});

// Función para iniciar el servidor
const startServer = async () => {
  try {
    // Conectar a la base de datos
    await ConnectDB();
    
    // Iniciar el servidor
    const server = app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
      console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
      console.log(`📡 Health check: http://localhost:${PORT}/health`);
    });

    // Manejo de señales de terminación
    const gracefulShutdown = (signal) => {
      console.log(`\n${signal} recibido, cerrando servidor...`);
      server.close(() => {
        console.log('Servidor cerrado correctamente');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

// Iniciar la aplicación
startServer();