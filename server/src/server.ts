import App from "./app";
import AdminController from "./routes/admin/admin.controller";
import OrderController from "./routes/orders/order.controller";
import ProductsController from "./routes/products/products.controller";
import UsersController from "./routes/users/users.controller";

const app = new App(
  [
    new ProductsController(),
    new UsersController(),
    new OrderController(),
    new AdminController(),
  ],
  +process.env.PORT! || 5000
);

app.listen();
