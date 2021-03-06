import express from "express";
import path from "path";
import cors from "cors";
import mongoose from "mongoose";
import Controller from "./interfaces/controller.interface";
import errorMiddleware from "./middlewares/error.middleware";
import morgan from "morgan";

class App {
  public app: express.Application;
  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.app = express();
    this.port = port;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(
      "/uploads/images",
      express.static(path.join("uploads", "images"))
    );
    this.app.use(morgan("dev"));
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use(controller.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private connectToDatabase() {
    const mongodbUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.73vlw.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

    mongoose
      .connect(mongodbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      })
      .catch((e) => console.log(e.reason));
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`listening on port ${this.port}`);
    });
  }
}

export default App;
