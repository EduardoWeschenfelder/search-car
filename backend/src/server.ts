import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.listen(3001, () => console.log("server is running..."));
