import express from "express";
import { LibroModel } from "../models/mysql/libro.js";
//import { LibroModel } from "../models/file-system/libro.js";
import { validateLibro, validatePartialLibro } from "../schemas/libro.js";

export class LibroController {
  static async getAll(req, res) {
    const { autor } = req.query;
    const librosListados = await LibroModel.getAll({ autor });
    res.json(librosListados);
  }

  static async create(req, res) {
    const result = validateLibro(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newLibro = await LibroModel.create({ input: result.data });
    res.status(201).json(newLibro);
  }

  static async getById(req, res) {
    const { id_libro } = req.params;
    const libro = await LibroModel.getById({ id_libro });

    if (libro) {
      res.json(libro);
    } else {
      res.status(404).json({ message: "Libro no encontrado" });
    }
  }

  static async delete(req, res) {
    const { id_libro } = req.params;
    const result = await LibroModel.delete({ id_libro });

    if (result === false) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }
    return res.json({ message: "Libro eliminado" });
  }

  static async update(req, res) {
    const result = validatePartialLibro(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const { id_libro } = req.params;
    const libroModel = await LibroModel.update({
      id_libro,
      input: result.data,
    });

    return res.json(libroModel);
  }
}
