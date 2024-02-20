import mongoose from "mongoose";
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

export default model("UsuarioModel", UsuarioModel);
