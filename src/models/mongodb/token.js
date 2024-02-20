import mongoose from "mongoose";
import UsuarioModel from "./usuario.js";
const { Schema, model } = mongoose;

const TokenModel = new Schema({
  _userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "UsuarioModel",
  },
  token: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now, expires: 43200 },
});

export default model("TokenModel", TokenModel);
