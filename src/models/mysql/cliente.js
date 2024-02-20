// models/cliente.js
import mysql from "mysql2/promise";
import { config } from "../../config/mysql.js";
import { PersonaModel } from "./persona.js";

const connection = await mysql.createConnection(config);

export class ClienteModel extends PersonaModel {}
