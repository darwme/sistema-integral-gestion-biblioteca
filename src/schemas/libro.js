import z from "zod";

const libroSchema = z.object({
  id_categoria: z.number().int().positive({
    invalid_type_error: "Id_categoria tiene que ser un número positivo",
    required_error: "Id_categoria es requerido",
  }),
  titulo: z.string({
    invalid_type_error: "Libro tiene que ser un string",
    required_error: "Libro es requerido",
  }),
  autor: z.string({
    invalid_type_error: "Autor tiene que ser un string",
    required_error: "Autor es requerido",
  }),

  isbn: z.string({
    invalid_type_error: "ISBN tiene que ser un string",
    required_error: "ISBN es requerido",
  }),
  disponibilidad: z
    .boolean({
      invalid_type_error: "Disponibilidad tiene que ser un boolean",
      required_error: "Disponibilidad es requerido",
    })
    .default(true),
  cantidad: z.number().int().positive({
    invalid_type_error: "Cantidad tiene que ser un número positivo",
    required_error: "Cantidad es requerido",
  }),
  imageLink: z.string({
    invalid_type_error: "ImageLink tiene que ser una URL",
    required_error: "ImageLink es requerido",
  }),
});

export const validateLibro = (input) => {
  return libroSchema.safeParse(input);
};

export const validatePartialLibro = (input) => {
  return libroSchema.partial().safeParse(input);
};
