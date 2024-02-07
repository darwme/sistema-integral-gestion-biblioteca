DROP DATABASE IF EXISTS biblioteca_fisi;

create DATABASE biblioteca_fisi;

use biblioteca_fisi;

CREATE TABLE Libro (
    cod_libro BINARY(16) PRIMARY KEY DEFAULT(UUID_TO_BIN(UUID())), titulo VARCHAR(255) NOT NULL, autor VARCHAR(255) NOT NULL, pais VARCHAR(255), anhio INT NOT NULL, lenguaje VARCHAR(255) NOT NULL, paginas INT NOT NULL, disponibilidad BOOLEAN NOT NULL, cantidad INT NOT NULL COMMENT 'Cantidad de libros disponibles', imageLink TEXT NOT NULL COMMENT 'Link de la imagen del libro', link TEXT COMMENT 'Link del libro en wikipedia'
) COMMENT 'Tabla de libros';

SELECT * FROM Libro;

SELECT BIN_TO_UUID(cod_libro) FROM Libro WHERE titulo = 'The Idiot';