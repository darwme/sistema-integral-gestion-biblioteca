import Libro from "../../../models/mongodb/libro.js";

const getLibros = async function (req, res) {
  try {
    const libros = await Libro.AllLibros();
    console.log("Libros Listados: ", libros);
    res.status(200).json(libros);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

const getLibrobyId = async function (req, res) {
  try {
    const { _id } = req.params;
    const libro = await Libro.findById(_id);
    if (!libro) {
      return res.status(404).json({ message: "Libro no encontrado" });
    } else {
      res.status(200).json({ libro });
    }
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

const createLibro = async function (req, res) {
  try {
    const result = req.body;
    const newLibro = await Libro.add(result);
    if (!newLibro) {
      return res.status(404).json({ message: "Libro no creado" });
    }
    console.log("Libro Creado: ", newLibro);

    res.status(201).json({ libro: newLibro });
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

const deleteLibro = async function (req, res) {
  try {
    const { _id } = req.params;
    await Libro.removeById(_id);
    res.status(200).json({ message: "Libro Eliminado" });
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

const updateLibro = async function (req, res) {
  try {
    const { _id } = req.params;
    const newData = req.body;
    const updatedLibro = await Libro.updateById(_id, newData);

    if (!updatedLibro) {
      return res.status(404).json({ message: "Libro no encontrado" });
    } else {
      res.status(200).json({ libro: updatedLibro });
      console.log("Libro Actualizado: ", updatedLibro);
    }
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export default {
  getLibros,
  getLibrobyId,
  createLibro,
  deleteLibro,
  updateLibro,
};
