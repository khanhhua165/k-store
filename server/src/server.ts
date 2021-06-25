import App from "./app";
import CartController from "./routes/cart/cart.controller";
import OrderController from "./routes/orders/order.controller";
import ProductsController from "./routes/products/products.controller";
import UsersController from "./routes/users/users.controller";

const app = new App(
  [
    new ProductsController(),
    new CartController(),
    new UsersController(),
    new OrderController(),
  ],
  +process.env.PORT! || 5000
);

app.listen();
