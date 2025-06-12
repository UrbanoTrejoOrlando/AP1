// Dependencia de mongoose
const mongoose = require("mongoose");
// Dependencia para el archivo .env
require("dotenv").config();

// Extraer la URL de conexión del .env
const URL = process.env.URL;

// Configuración de opciones para Mongoose
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // 30 segundos
  connectTimeoutMS: 30000, // 30 segundos
  socketTimeoutMS: 45000, // 45 segundos
  maxPoolSize: 10, // Número máximo de conexiones
  minPoolSize: 2,  // Número mínimo de conexiones
  maxIdleTimeMS: 30000, // Cerrar conexiones después de 30 segundos de inactividad
  bufferMaxEntries: 0,
  retryWrites: true,
  w: 'majority'
};

// Conexión a la base de datos
const ConnectDB = async () => {
  try {
    console.log('🔄 Conectando a MongoDB...');
    console.log('📡 URL de conexión:', URL.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'));
    
    await mongoose.connect(URL, mongoOptions);
    
    console.log('✅ Base de datos conectada correctamente');
    
    // Event listeners para la conexión
    mongoose.connection.on('connected', () => {
      console.log('📡 Mongoose conectado a MongoDB');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ Error en la conexión de Mongoose:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('📡 Mongoose desconectado de MongoDB');
    });

    // Cerrar la conexión si la aplicación se termina
    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        console.log('📡 Conexión de MongoDB cerrada');
        process.exit(0);
      } catch (error) {
        console.error('Error al cerrar la conexión:', error);
        process.exit(1);
      }
    });

  } catch (error) {
    console.error('❌ No se pudo conectar a la base de datos:', error.message);
    
    // Log adicional para debugging
    if (error.name === 'MongoServerSelectionError') {
      console.error('💡 Verifica que MongoDB esté corriendo y la URL sea correcta');
    }
    
    // En producción, intentar reconectar después de un delay
    if (process.env.NODE_ENV === 'production') {
      console.log('🔄 Intentando reconectar en 5 segundos...');
      setTimeout(() => {
        ConnectDB();
      }, 5000);
    } else {
      process.exit(1);
    }
  }
};

// Exportación del módulo
module.exports = { ConnectDB };