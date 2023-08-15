import express from "express";
import { db } from "./database/database.js";
import cors from "cors";
import router from "./routes/index.routes.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use(router);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`O servidor está rodando na porta ${port}`));