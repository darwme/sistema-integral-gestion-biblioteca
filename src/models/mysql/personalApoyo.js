import mysql from "mysql2/promise";
import { config } from "../../config/mysql.js";
import { PersonaModel } from "./persona.js";

const connection = await mysql.createConnection(config);

export class PersonalApoyoModel extends PersonaModel {
  static async getAll() {
    try {
      const [result] = await connection.query("SELECT * FROM PersonalApoyo;");
      return result;
    } catch (error) {
      console.error({ error: JSON.parse(error) });
      throw new Error();
    }
  }
}
