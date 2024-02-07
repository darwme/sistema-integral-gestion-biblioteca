import mysql from "mysql";

const connection = mysql.createConnection(process.env.DATABASE_URL);

export class PersonalApoyo extends Persona {
  cod_PersonalApoyo;
  horas_trabajo;

  cargo;

  constructor(
    cod_PersonalApoyo,
    cargo,
    cod_Persona,
    nombre,
    apellido,
    dni,
    email,
    telefono
  ) {
    super(cod_Persona, nombre, apellido, dni, email, telefono);
    this.cod_PersonalApoyo = cod_PersonalApoyo;
    this.cargo = cargo;
  }
}
