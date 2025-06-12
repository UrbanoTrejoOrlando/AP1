// Extension del mongooe 
const mongoose = require("mongoose");
// Defincion de la coleecion de la base de datos
const UserSchema = new mongoose.Schema(
    {
        nombre:{
            type: String,
            required:["El nombre es obligatorio"],
            trim : true,
            minlength: [2, "El nombre debe tener al menos dos caracteres"],
            maxlength: [50,"El nombre no debe de rebasar los 50 caracteres"],

        },
        apellido1:{
            type: String,
            required:[true, "El apellido paterno es obligatorio"],
            trim : true,
            minlength: [2, "El apellido paterno debe tener al menos dos caracteres"],
            maxlength: [50,"El apellido paterno no debe de rebasar los 50 caracteres"],

        },
        apellido2:{
            type: String,
            required:["El apellido materno es obligatorio"],
            trim : true,
            minlength: [2, "El apellido materno debe tener al menos dos caracteres"],
            maxlength: [50,"El apellido materno no debe de rebasar los 50 caracteres"],
        },
        correo: {
            type: String,
            required: [true, "El correo debe de ser obligatorio"],
            trim: true,
            unique: true, // Evita duplicar correos
            lowercase: true, // Convierte todos los caracteres a minusculas
        },
        contrasenia:{
            type: String,
            trim: true,
            required: [true, "La contraseña es obligatoria"],
            minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
        },

        rol: {
            type: String,
            required: [true, "El rol es obligatorio"],
            enum: {
              values: ["Administrador", "Cliente"],
              // Mensaje si el rol no es correcto
              message: "{VALUE} no es un rol válido",
            },
            default: "Cliente",
        },
        telefono: {
            type: String,
            required: [true, "Es telefono es obligatorio"],
            trim: true,
        },
        status: {
            type: String,
            required: [true, "El estatus es obligatorio"],
            enum: {
              values: ["Activo", "Inactivo"],
              // Mensaje si el estatus no es correcto
              message: "{VALUE} no es un estatus válido",
            },
            default: "Activo",

        },
        // Creacion del usuario
        createdAt: {
            type: Date,
            default: Date.now,
        },
        // Actualizacion del usuario
        updatedAt: {
            type: Date,
            default: Date.now,
          }, 
    }
)
module.exports = mongoose.model("Usuario", UserSchema);