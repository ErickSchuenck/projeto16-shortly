import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chalk from 'chalk';

dotenv.config();

import userRouter from "./routers/userRouter.js";
import URLsRouter from "./routers/URLsRouter.js";
import sessionsRouter from "./routers/sessionsRouter.js";


const app = express();
app.use(cors());
app.use(express.json());

let port = process.env.PORT || 4000;

app.use(userRouter);
app.use(URLsRouter);
app.use(sessionsRouter);

app.listen(port, () => {
  console.log(chalk.blue(`
  ________________________________

  Servidor ligado na porta ${port}
  ________________________________
  `))
});
