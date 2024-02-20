import mongoose from "mongoose";
import MorosidadModel from "./morosidad.js";
const { Schema, model } = mongoose;

const PenalizacionModel = new mongoose.Schema({
  id_morosidad: {
    type: Schema.Types.ObjectId,
    ref: "MorosidadModel",
    required: true,
  },
  fecha_pago: { type: Date, required: true },
  monto_pago: { type: Number, required: true },
});

export default model("PenalizacionModel", PenalizacionModel);
