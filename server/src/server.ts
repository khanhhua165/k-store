import App from "./app";
import CartController from "./routes/cart/cart.controller";
import ProductsController from "./routes/products/products.controller";
import UsersController from "./routes/users/users.controller";

const app = new App(
  [new ProductsController(), new CartController(), new UsersController()],
  +process.env.PORT! || 5000
);

app.listen();
