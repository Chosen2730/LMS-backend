import express, { Request, Response } from "express";
import cors from "cors";
import "express-async-errors";
import dotenv from "dotenv";
import { ConnectDB } from "./db/connect";
import { notFound } from "./middlewares/notFoundMiddleWare";
import { errorHandlerMiddleware } from "./middlewares/errorHandler";
import cloudinary from "cloudinary";
import fileUpload from "express-fileupload";
dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  maxFileSize: 100 * 1024 * 1024,
});

// Routers
import {
  adminRouter,
  authRouter,
  courseModuleRouter,
  courseRouter,
  lecturerRouter,
  studentRouter,
  tutorReqRouter,
} from "./routes";

// Middlewares
const app = express();
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(
  express.json({
    limit: "100mb",
  })
);
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
    limits: { fileSize: 20 * 1024 * 1024 },
  })
);

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/student", studentRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/lecturer", lecturerRouter);
app.use("/api/v1/tutor", tutorReqRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/course-module", courseModuleRouter);

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
