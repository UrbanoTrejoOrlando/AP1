// Variable para definir el modelo de base de datos
const Usuarios = require("../model/userModel")

//Funcion para crear un contacto
const CreateUser = async (data)=>{
    try{
        // Creacion de un usuario
        const newUser = new Usuarios(data);
        // Guardar el regsitro en la base de datos
        await newUser.save()
        // Retornar el nuevo usuario
        return newUser;

    }catch(error){  
        // Mensaje de errro si algo falla
        throw new Error("Error al crear el usuario" + error.message);

    }
};

// Funcion para obtener un contacto
const GetAllUser = async() =>{
    try{
        // Obtener el usuario
        const users = await Usuarios.find();
        // Retornar usuarios
        return users;
    }catch(error){
        // Mensaje de error si algo falla
        throw new Error("Error al obtener los usuarios" + error.message);
    }    
};

// Funcion para obtener un usuario por su Id
const GetUserById = async(userid)=>{
    try {
        // Obtencion del usuario
        const user = await Usuarios.findById(userid);
        // Validar si el usuario existe 
        if(!user) throw new Error("El usuario no existe "+ error.message);
        // retorna el usuarios
        return user;

    } catch (error) {
        // Mensaje de errro si algo falla
        throw new Error("Error al obtener el usuario" + error.message);
    }
};


// Funcion para actualizar un contacto
const UpdateUserById = async (userid, data)=>{
    try {
        // Alctualizacion del contacto por su id
        const updateUser = await Usuarios.findByIdAndUpdate(
            userid,
            data,
            {new: true} // Retorna el documento actualizado
 
        );
        // Validar si el usuario existe
        if(!updateUser) throw new Error("El usuario no existe");
        // retorna el usuario
        return updateUser;
        
    } catch (error) {
        // Mensaje de error si algo falla
        throw new Error("Error al actualizar el usuario " + error.message);
    }
};

// Funcion para eliminar un usuario
const DeleteUser = async(userid)=>{
    try {
        // Eliminacion del usuario por el id
        const deleteuser = await Usuarios.findByIdAndDelete(userid);
        // Validar si el usuario existe
        if(!deleteuser) throw new Error("El usuario no existe");
        // Retorna el contacto
        return deleteuser;
      
    } catch (error) {
        // Mensaje de errro si algo falla
        throw new Error("Error al actualizar al usuario" + error.message);
    }
};

//Exportacion de funciones
module.exports = {CreateUser, GetAllUser, GetUserById, UpdateUserById, DeleteUser};