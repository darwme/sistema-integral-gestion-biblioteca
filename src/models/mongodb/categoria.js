import mongoose from "mongoose";
const { Schema, model } = mongoose;

const CategoriaModel = new Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
});

export default model("CategoriaModel", CategoriaModel);
