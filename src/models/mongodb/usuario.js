import mongoose from "mongoose";
import ClienteModel from "./cliente.js";
import uniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcrypt";
const saltRound = 10;

const { Schema, model } = mongoose;

const UsuarioModel = new Schema({
  nombres: { type: String, required: true },
  apellidos: { type: String, required: true },
  celular: { type: String },
  usuario: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: {
    type: String,
    enum: ["cliente", "personal"],
    required: true,
    default: "cliente",
  },
  activo: { type: Boolean, default: true },
  verificado: { type: Boolean, default: false },
});

UsuarioModel.plugin(uniqueValidator, {
  message: "Error, esperaba {PATH} único.",
});

UsuarioModel.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, saltRound);
  }
  next();
});

UsuarioModel.methods.validaPassword = async function (password) {
  try {
    const isPasswordValid = await bcrypt.compare(password, this.password);
    return isPasswordValid;
  } catch (error) {
    console.log({ error: error.message });
    throw error;
  }
};

UsuarioModel.statics.add = async function (usuario) {
  try {
    const newUsuario = await this.create(usuario);
    return newUsuario;
  } catch (error) {
    console.log({ error: error.message });
    throw error;
  }
};

UsuarioModel.statics.createClienteAndUsuario = async function (
  usuario,
  cliente
) {
  let session = null;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const newUsuario = await this.add(usuario, { session });

    cliente.id_usuario = usuario._id;

    const newCliente = await ClienteModel.add(cliente, { session });

    await session.commitTransaction();

    session.endSession();

    return { newUsuario, newCliente };
  } catch (error) {
    // Si hay un error, abortar la transacción
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }
    console.log({ error: error.message });
    throw error;
  }
};

UsuarioModel.statics.getAll = async function () {};

export default model("UsuarioModel", UsuarioModel);
