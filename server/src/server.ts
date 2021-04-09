import App from "./app";
import CategoriesController from "./categories/categories.controller";

const app = new App([new CategoriesController()], +process.env.PORT! || 5000);

app.listen();
