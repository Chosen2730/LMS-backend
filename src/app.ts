import express, { Request, Response } from "express";
import cors from "cors";
import "express-async-errors";
import dotenv from "dotenv";
import { ConnectDB } from "./db/connect";
import { notFound } from "./middlewares/notFoundMiddleWare";
import { errorHandlerMiddleware } from "./middlewares/errorHandler";

// Routers
import {
  adminRouter,
  authRouter,
  lecturerRouter,
  studentRouter,
  tutorReqRouter,
} from "./routes";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: "Content-Type,Authorization",
  })
);
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/student", studentRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/lecturer", lecturerRouter);
app.use("/api/v1/tutor", tutorReqRouter);

const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("LMS BACKEND");
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
