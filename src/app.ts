import express, { Request, Response } from "express";
import cors from "cors";
const app = express();
app.use(cors());
import "express-async-errors";
import dotenv from "dotenv";
import { ConnectDB } from "./db/connect";
import { notFound } from "./middlewares/notFoundMiddleWare";
import { errorHandlerMiddleware } from "./middlewares/errorHandler";

// Routers
import { authRouter } from "./routes";

dotenv.config();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Routes
app.use("/api/v1/auth", authRouter);

const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("PROJECT NAME");
});

// Error handling middlewares
app.use(notFound);
app.use(errorHandlerMiddleware);
const start = async () => {
  const url: any = process.env.MONGO_URI;
  await ConnectDB(url);
  app.listen(port, () => console.log(`App listening on port ${port}!`));
};

start();
