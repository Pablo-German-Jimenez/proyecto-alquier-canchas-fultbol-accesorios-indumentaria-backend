import Usuario from '../models/usuario.model.js';
import bcrypt from 'bcryptjs';

export const crearAdminPorDefecto = async () => {
  try {
    const emailAdmin = "admin@cancheros.com";
    const adminExistente = await Usuario.findOne({ email: emailAdmin });

    if (adminExistente) {
      console.log("✅ El Administrador ya está listo.");
      return;
    }

    const nuevoAdmin = new Usuario({
      nombre: "Super Administrador",
      email: emailAdmin,
      password: "Admin123!", 
      rol: "admin"
    });

    const salt = bcrypt.genSaltSync(10);
    nuevoAdmin.password = bcrypt.hashSync(nuevoAdmin.password, salt);

    await nuevoAdmin.save();
    console.log(" Administrador creado automáticamente: admin@cancheros.com / Admin123!");

  } catch (error) {
    console.error("Error al inicializar datos:", error);
  }
};