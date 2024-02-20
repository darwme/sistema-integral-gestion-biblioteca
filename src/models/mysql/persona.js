import mysql from "mysql2/promise";
import { config } from "../../config/mysql.js";

const connection = await mysql.createConnection(config);

export class PersonaModel {
  static async getAll() {
    try {
      const [result] = await connection.query(
        "SELECT BIN_TO_UUID(id_persona) as id_persona, nombre, apellido, email, telefono, direccion FROM Persona;"
      );
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("Error retrieving persons: " + error.message);
    }
  }

  static async getById({ id_persona }) {
    try {
      const [result] = await connection.query(
        "SELECT BIN_TO_UUID(id_persona) as id_persona, nombre, apellido, email, telefono, direccion FROM Persona WHERE id_persona = UUID_TO_BIN(?);",
        [id_persona]
      );

      if (result.length === 0) {
        return null;
      }
      return result[0];
    } catch (error) {
      console.log(error);
      throw new Error("Error retrieving person by ID: " + error.message);
    }
  }

  static async create({ input }) {
    const { nombre, apellido, email, telefono, direccion } = input;

    const [uuidResult] = await connection.query("SELECT UUID() uuid;");
    const [{ uuid }] = uuidResult;

    try {
      await connection.query(
        "INSERT INTO Persona (id_persona, nombre, apellido, email, telefono, direccion) VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?);",
        [uuid, nombre, apellido, email, telefono, direccion]
      );
    } catch (error) {
      console.log(error);
      throw new Error("Error creating person: " + error.message);
    }

    try {
      const [newPersona] = await connection.query(
        "SELECT BIN_TO_UUID(id_persona) as id_persona, nombre, apellido, email, telefono, direccion FROM Persona WHERE id_persona = UUID_TO_BIN(?);",
        [uuid]
      );
      return newPersona[0];
    } catch (error) {
      console.log(error);
      throw new Error("Error creating person: " + error.message);
    }
  }

  static async update({ id_persona, input }) {
    try {
      const inputTemp = input;
      const { nombre, apellido, email, telefono, direccion } = inputTemp;

      for (let [key, value] of Object.entries(inputTemp)) {
        if (value === undefined) {
          delete inputTemp[key];
        }
      }

      let updateQuery = "UPDATE Persona SET ";
      let set = [];
      for (let [key, value] of Object.entries(inputTemp)) {
        set.push(`${key} = '${value}'`);
      }
      updateQuery += set.join(", ");
      updateQuery += "WHERE id_persona = UUID_TO_BIN(?);";

      const [result] = await connection.query(updateQuery, [id_persona]);
      if (result.affectedRows === 0) {
        return null;
      }

      const [updatedPersona] = await connection.query(
        "SELECT BIN_TO_UUID(id_persona) as id_persona, nombre, apellido, email, telefono, direccion FROM Persona WHERE id_persona = UUID_TO_BIN(?);",
        [id_persona]
      );

      return updatedPersona[0];
    } catch (error) {
      console.log(error);
      throw new Error("Error updating person: " + error.message);
    }
  }

  static async delete({ id_persona }) {
    try {
      const [result] = await connection.query(
        "DELETE FROM Persona WHERE id_persona = UUID_TO_BIN(?);",
        [id_persona]
      );
      if (result.affectedRows === 0) {
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
      throw new Error("Error deleting person: " + error.message);
    }
  }
}
