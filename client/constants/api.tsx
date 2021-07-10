export const API_URL: string =
  process.env.MODE === "development"
    ? "http://localhost:5000"
    : process.env.API_URL!;

export const USER_ROUTE = "/user";
export const ORDER_ROUTE = "/order";
export const PRODUCT_ROUTE = "/products";
export const STRIPE_ROUTE = "/order/stripe";
