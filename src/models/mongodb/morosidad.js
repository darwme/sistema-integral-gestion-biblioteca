import mongoose from "mongoose";
import ClienteModel from "./cliente.js";
const { Schema, model } = mongoose;

const MorosidadModel = new mongoose.Schema({
  id_cliente: {
    type: Schema.Types.ObjectId,
    ref: "ClienteModel",
    required: true,
  },
  monto_deuda: { type: Number, required: true, default: 0 },
  detalle: { type: String },
});

export default model("MorosidadModel", MorosidadModel);
