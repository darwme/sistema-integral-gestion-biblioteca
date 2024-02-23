import UsuarioModel from "../../../models/mongodb/usuario.js";

const getUsuarios = async function (req, res) {
  try {
    const usuarios = await UsuarioModel.find();
    console.log("Usuarios Listados: ", usuarios);
    res.status(200).json(usuarios);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

const getUsuariosClientes = async function (req, res) {};

const createUsuarioCliente = async function (req, res) {
  try {
    const {
      nombres,
      apellidos,
      celular,
      usuario,
      password,
      email_institucional,
      codigo_institucional,
    } = req.body;

    const usuarioData = {
      nombres,
      apellidos,
      celular,
      usuario,
      password,
    };

    const clienteData = {
      email_institucional,
      codigo_institucional,
    };

    const newUsuario = await UsuarioModel.createClienteAndUsuario(
      clienteData,
      usuarioData
    );

    if (!newUsuario) {
      return res.status(404).json({ message: "Usuario no creado" });
    }

    console.log("Usuario Creado: ", newUsuario);
    res.status(201).json({ usuario: newUsuario });
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export default {
  getUsuarios,
  createUsuarioCliente,
  getUsuariosClientes,
};
