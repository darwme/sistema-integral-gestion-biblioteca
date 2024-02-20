import mongoose from "mongoose";
import CategoriaModel from "./categoria.js";

const { Schema, model } = mongoose;

const LibroModel = new Schema({
  id_categoria: [
    {
      type: Schema.Types.ObjectId,
      ref: "CategoriaModel",
      required: true,
    },
  ],
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  isbn: { type: String, unique: true },
  disponibilidad: { type: Boolean, default: true },
  cantidad: { type: Number, default: 0 },
  imageLink: { type: String, required: true },
});

LibroModel.statics.createInstance = function (
  id_categoria,
  titulo,
  autor,
  isbn,
  cantidad,
  imageLink
) {
  return new this({
    titulo,
    autor,
    isbn,
    cantidad,
    imageLink,
    id_categoria,
  });
};

LibroModel.statics.add = async function (aLibro) {
  return await this.create(aLibro);
};

LibroModel.statics.AllLibros = async function () {
  return await this.find({}).exec();
};

LibroModel.statics.findById = async function (aId) {
  return await this.findOne({ _id: aId });
};

LibroModel.statics.removeById = async function ({ aId }) {
  return await this.deleteOne({ id: aId });
};

LibroModel.statics.updateById = async function (aId, newData) {
  return await this.updateOne({ id: aId }, newData, { new: true });
};

export default model("Libro", LibroModel);
