import Usuario from "../models/usuario.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const crearUsuario = async (req, res) => {
  try {
    const { nombre, email, password, telefono } = req.body;

    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({ mensaje: "El correo ya está registrado" });
    }

    usuario = new Usuario(req.body);

    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();
    const token = jwt.sign(
      { uid: usuario._id, nombre: usuario.nombre, rol: usuario.rol },
       process.env.JWT_SECRET, 
      { expiresIn: "2h" }
    );
    res.status(201).json({
      mensaje: "Usuario creado exitosamente",
      nombre: usuario.nombre,
      uid: usuario._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear usuario" });
  }
};

export const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res
        .status(400)
        .json({ mensaje: "Email o contraseña incorrectos" });
    }

    const passwordValido = bcrypt.compareSync(password, usuario.password);
    if (!passwordValido) {
      return res
        .status(400)
        .json({ mensaje: "Email o contraseña incorrectos" });
    }

    const token = jwt.sign(
      { uid: usuario._id, nombre: usuario.nombre, rol: usuario.rol },
       process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      uid: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error en el login" });
  }
};

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al listar usuarios" });
  }
};

export const borrarUsuario = async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al borrar usuario" });
  }
};

export const editarUsuario = async (req, res) => {
  try {
    const { password, ...datosParaActualizar } = req.body;

    if (password) {
      const salt = bcrypt.genSaltSync(10);
      datosParaActualizar.password = bcrypt.hashSync(password, salt);
    }

    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      datosParaActualizar,
      { new: true }
    );

    res.json({
      mensaje: "Usuario actualizado correctamente",
      usuario: usuarioActualizado,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al editar usuario" });
  }
};
