console.log("hi there!");

import express from "express";
import path, { join } from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import apiRouter from "./routes/api.js";

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(bodyParser.json);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "frontend")));

app.use(apiRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
