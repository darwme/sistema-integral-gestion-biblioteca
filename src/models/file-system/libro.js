import { createRequire } from "module";

const require = createRequire(import.meta.url);
const libros = require("../../routes/api/books.json");

import { randomUUID } from "node:crypto";

export class LibroModel {
  static async getAll({ autor }) {
    if (autor) {
      const filteredLibros = libros.filter(
        (libro) => libro.autor.toLowerCase() === autor.toLowerCase()
      );
      return filteredLibros;
    }
    return libros;
  }

  static async getById({ id }) {
    const libro = libros.find((libro) => libro.id === id);
    return libro;
  }

  static async create({ input }) {
    const newLibro = {
      id: randomUUID(),
      ...input,
    };
    libros.push(newLibro);
    return newLibro;
  }

  static async delete({ id }) {
    const libroIndex = libros.findIndex((libro) => libro.id === id);
    if (libroIndex === -1) {
      return null;
    }
    libros.splice(libroIndex, 1);
    return true;
  }

  static async update({ id, input }) {
    const libroIndex = libros.findIndex((libro) => libro.id === id);
    if (libroIndex === -1) {
      return null;
    }
    const updatedLibro = {
      ...libros[libroIndex],
      ...input,
    };
    libros[libroIndex] = updatedLibro;
    return updatedLibro;
  }
}
