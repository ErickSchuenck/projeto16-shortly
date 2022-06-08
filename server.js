import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chalk from 'chalk';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

let port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(chalk.blue(`
  ________________________________
  
  Servidor ligado na porta ${port}
  ________________________________
  `))
});
