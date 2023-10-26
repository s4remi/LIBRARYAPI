import express, { query } from "express";
import { myDB } from "../db/MyDB.js";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
export const router = express.Router();

router.post("/searchByIsbn", bodyParser.json(), async (req, res) => {
  const isbn = req.body.isbn;
  const query = { ISBN: parseInt(isbn, 10) };
  console.log(query);

  const bookInfo = await myDB.getBookByIsbn({ query });
  console.log(" this is the book info we are looking for\n", bookInfo);
  if (bookInfo) {
    return res
      .status(200)
      .json({ data: bookInfo, message: "successfully found the book" });
  } else {
    return res.status(401).json({ message: "Din't find anything" });
  }
});

export default router;
