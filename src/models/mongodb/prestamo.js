import mongoose from "mongoose";
import ClienteModel from "./cliente.js";
import LibroModel from "./libro.js";
const { Schema, model } = mongoose;

const PrestamoModela = new mongoose.Schema({
  id_cliente: {
    type: Schema.Types.ObjectId,
    ref: "ClienteModel",
    required: true,
  },
  id_libro: {
    type: Schema.Types.ObjectId,
    ref: "LibroModel",
    required: true,
  },
  fecha_prestamo: { type: Date, required: true },
  fecha_devolucion: { type: Date },
  estado: {
    type: String,
    enum: ["emitido", "devuelto", "vencido"],
    default: "emitido",
  },
});

export default model("PrestamoModel", PrestamoModel);
