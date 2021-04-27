import App from "./app";
import ProductsController from "./routes/products/products.controller";

const app = new App([new ProductsController()], +process.env.PORT! || 5000);

app.listen();
