import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const booksOpt = JSON.parse(fs.readFileSync("books.json", "utf-8"));
let i = 0;
booksOpt.forEach((book) => {
  book.id = uuidv4();
  i++;
  console.log(`book ${i} id: `, book.id);
});
