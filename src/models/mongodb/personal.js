import mongoose from "mongoose";
import UsuarioModel from "./usuario.js";
const { Schema, model } = mongoose;

const PersonalModel = new mongoose.Schema({
  fecha_contrato: { type: Date, required: true },
  horas_trabajo: { type: Number, required: true },
  cargo: {
    type: String,
    enum: ["apoyo", "administrador"],
    required: true,
  },
  id_usuario: {
    type: Schema.Types.ObjectId,
    ref: "UsuarioModel",
    required: true,
  },
});

export default model("PersonalModel", PersonalModel);
