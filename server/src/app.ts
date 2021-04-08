import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import HttpError from "./models/httpError";
import productTypeRoutes from "./routes/productTypeRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use(productTypeRoutes);

app.use(
  (
    error: HttpError | Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (res.headersSent) {
      return next(error);
    }
    res
      .status((error as HttpError).code || 500)
      .json({ message: error.message || "There was an unexpected error" });
  }
);

export default app;
