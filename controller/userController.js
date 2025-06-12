// Obtener en una variable los servicios de la api
const userServices = require("../services/userServices");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

// Peticion para crear un usuario
const createUser = async (req, res) => {
    try {
        const userData = req.body;

        // Validar que venga la contraseña
        if (!userData.contrasenia) {
            return res.status(400).json({ error: "La contraseña es obligatoria" });
        }

        // Hashear la contraseña
        const salt = await bcrypt.genSalt(10);
        userData.contrasenia = await bcrypt.hash(userData.contrasenia, salt);

        // Crear el usuario
        const newUser = await userServices.CreateUser(userData);

        const SECRET_KEY = process.env.JWT_SECRET ;

        // Crear el token JWT
        const token = jwt.sign(
            { id: newUser._id, email: newUser.email },
            SECRET_KEY,
            { expiresIn: "24h" }
        );

        // Respuesta
        res.status(201).json({
            message: "Usuario creado correctamente",
            user: newUser,
            token,
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Peticion para obtener todos los usuarios
const getAllUser = async (req,res)=>{
    try {
        // Obtener todos los usuarios
        const users = await userServices.GetAllUser();
        // Configuracion del json
        res.status(200).json(users);

    } catch (error) {
        // Mensaje de error por si algo falla
        res.status(400).json({
            error: ("Error fallo la conexion " + error.message),
        });   
    }    
};

// Peticion para obtener un usuario por el id
const getUserById = async(req,res)=>{
    const {userid} = req.params;
    try {
        // Obtener un usuario por el id
        const user = await userServices.GetUserById(userid);
        // Configuracion del json
        res.status(200).json(user);
    } catch (error) {
        // Mensaje de error por si algo falla
        res.status(400).json({
            error:error.message
            //error: ("Error al obtener al usuario" + error.message),
        });   
    }
};


// Peticion para actualizar un usuario
const updateUser = async (req, res) => {
    const { userid } = req.params;
    const userData = req.body;

    try {
        if (userData.contrasenia) {
            const salt = await bcrypt.genSalt(10);
            userData.contrasenia = await bcrypt.hash(userData.contrasenia, salt);
        }

        // Actualizamos al usuario
        const updateuser = await userServices.UpdateUserById(userid, userData);

        res.status(201).json({
            message: "Contacto actualizado correctamente",
            user: updateuser,
        });

    } catch (error) {
        res.status(400).json({
            error: "Error al actualizar el usuario: " + error.message,
        });
    }
};

// Peticion para eliminar un usuario
const deleteUser = async (req,res) =>{
    const {userid} = req.params;
    try {
        const deleteduser = await userServices.DeleteUser(userid);
        res.status(201).json({
            message: "Contacto eliminado",          
        })
    } catch (error) {
        res.status(400).json({
            error: ("Error al obtener al eliminar el usuario" + error.message),
        }); 
    }
};

// Exportacion de las peticiones para que se utilizen en otras partes del proyecto
module.exports={createUser, getAllUser, getUserById, updateUser, deleteUser};