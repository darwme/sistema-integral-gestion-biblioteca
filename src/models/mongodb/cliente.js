import mongoose from "mongoose";
import UsuarioModel from "./usuario.js";
const { Schema, model } = mongoose;

const ClienteModel = new mongoose.Schema({
  email_institucional: { type: String, required: true, unique: true },
  codigo_institucional: { type: Number, required: true, unique: true },
  fecha_registro: { type: Date, required: true, default: Date.now },
  id_usuario: {
    type: Schema.Types.ObjectId,
    ref: "UsuarioModel",
    required: true,
  },
});

ClienteModel.pre("save", async function (next) {
  try {
    if (this.isModified("email_institucional") || this.isNew) {
      const existingUser = await this.constructor.findOne({
        email: this.email,
      });
      if (existingUser) {
        const err = new Error("El correo electrónico ya está en uso");
        return next(err);
      }
    }

    if (this.isModified("codigo_institucional") || this.isNew) {
      const existingCodigo = await this.constructor.findOne({
        codigo_institucional: this.codigo_institucional,
      });
      if (existingCodigo) {
        const err = new Error("El código institucional ya está en uso");
        return next(err);
      }
    }
    next();
  } catch (err) {
    next(err);
  }
});

ClienteModel.statics.add = async function (cliente) {
  try {
    const newCliente = await this.create(cliente);
    return newCliente;
  } catch (error) {
    console.log({ error: error.message });
    throw error;
  }
};

export default model("ClienteModel", ClienteModel);
