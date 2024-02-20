import mongoose from "mongoose";
import UsuarioModel from "./usuario.js";
const { Schema, model } = mongoose;

const ClienteModel = new mongoose.Schema({
  email_institucional: { type: String, required: true, unique: true },
  codigo_institucional: { type: Number, required: true, unique: true },
  fecha_registro: { type: Date, required: true },
  id_usuario: {
    type: Schema.Types.ObjectId,
    ref: "UsuarioModel",
    required: true,
  },
});

export default model("ClienteModel", ClienteModel);
