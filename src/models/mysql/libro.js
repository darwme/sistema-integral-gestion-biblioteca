import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const dbUrl = new URL(process.env.DATABASE_URL);
const sslOptions = {
  rejectUnauthorized: true,
};

const config = {
  host: dbUrl.hostname,
  port: dbUrl.port,
  user: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.slice(1),
  ssl: sslOptions,
};

const connection = await mysql.createConnection(config);

export class LibroModel {
  static async getAll({ autor }) {
    const unknownAutor = "Unknown";
    try {
      const [result] = await connection.query(
        "SELECT BIN_TO_UUID(id_libro) as id_libro, id_categoria, titulo, autor, isbn, disponibilidad, cantidad, imageLink FROM Libro WHERE autor != ?;",
        [unknownAutor]
      );
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Error retrieving books");
    }
  }

  static async getById({ id_libro }) {
    try {
      const [result] = await connection.query(
        "SELECT BIN_TO_UUID(id_libro) id_libro, id_categoria, titulo, autor, isbn, disponibilidad, cantidad, imageLink FROM Libro WHERE id_libro = UUID_TO_BIN(?);",
        [id_libro]
      );
      if (result.length === 0) {
        return null;
      }
      return result[0];
    } catch (error) {
      console.error(error);
      throw new Error("Error retrieving book by ID");
    }
  }

  static async create({ input }) {
    const {
      titulo,
      id_categoria,
      autor,
      isbn,
      disponibilidad,
      cantidad,
      imageLink,
    } = input;

    const [uuidResult] = await connection.query("SELECT UUID() uuid;");
    const [{ uuid }] = uuidResult;

    try {
      await connection.query(
        "INSERT INTO Libro (id_libro, id_categoria, titulo, autor, isbn, disponibilidad, cantidad, imageLink) VALUES (UUID_TO_BIN(?),?, ?, ?, ?, ?, ?, ?);",
        [
          uuid,
          id_categoria,
          titulo,
          autor,
          isbn,
          disponibilidad,
          cantidad,
          imageLink,
        ]
      );
    } catch (error) {
      console.error(error);
      throw new Error("Error creating book");
    }

    try {
      const [newLibro] = await connection.query(
        "SELECT BIN_TO_UUID(id_libro) id_libro, id_categoria, titulo, autor, isbn, disponibilidad, cantidad, imageLink FROM Libro WHERE id_libro = UUID_TO_BIN(?);",
        [uuid]
      );
      return newLibro[0];
    } catch (error) {
      console.error(error);
      throw new Error("Error retrieving newly created book");
    }
  }

  static async delete({ id_libro }) {
    try {
      const [result] = await connection.query(
        "DELETE FROM Libro WHERE id_libro = UUID_TO_BIN(?);",
        [id_libro]
      );
      if (result.affectedRows === 0) {
        return false;
      }
      return true;
    } catch (error) {
      console.error(error);
      throw new Error("Error deleting book");
    }
  }

  static async update({ id_libro, input }) {
    const inputTemp = input;

    const {
      titulo,
      id_categoria,
      autor,
      isbn,
      disponibilidad,
      cantidad,
      imageLink,
    } = inputTemp;

    for (const prop in inputTemp) {
      if (input[prop] === undefined) {
        delete input[prop];
      }
    }

    let updateQuery = "UPDATE Libro SET";
    const updateFields = [];
    for (const prop in inputTemp) {
      updateFields.push(`${prop} = '${inputTemp[prop]}'`);
    }
    updateQuery += " " + updateFields.join(", ");
    updateQuery += " WHERE id_libro = UUID_TO_BIN(?);";

    const [result] = await connection.query(updateQuery, [id_libro]);

    if (result.affectedRows === 0) {
      return null;
    }

    const [updatedLibro] = await connection.query(
      "SELECT BIN_TO_UUID(id_libro) id_libro, id_categoria, titulo, autor, isbn, disponibilidad, cantidad, imageLink FROM Libro WHERE id_libro = UUID_TO_BIN(?);",
      [id_libro]
    );

    return updatedLibro[0];
  }
}
