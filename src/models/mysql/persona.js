import { mysql } from "mysql2";

class Persona {
  cod_Persona;
  nombre;
  apellido;
  dni;
  email;
  telefono;

  constructor(cod_Persona, nombre, apellido, dni, email, telefono) {
    this.cod_Persona = cod_Persona;
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.email = email;
    this.telefono = telefono;
  }

  registrarPersona() {
    const connection = mysql.createConnection(process.env.DATABASE_URL);
    connection.query(
      `INSERT INTO persona (nombre, apellido, dni, email, telefono) VALUES ('${this.nombre}', '${this.apellido}', '${this.dni}', '${this.email}', '${this.telefono}')`,
      (err, results, fields) => {
        if (err) {
          console.log(err);
        }
        console.log(results);
      }
    );
    connection.end();
  }
}

export default Persona;
