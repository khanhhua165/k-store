import App from "./app";

const app = new App([], +process.env.PORT! || 5000);

app.listen();
