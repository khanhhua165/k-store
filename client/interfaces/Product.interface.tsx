export interface Product {
  _id: string;
  name: string;
  description: string;
  productType: string;
  subType: string;
  image: string;
  price: number;
  stock: string;
  sold: string;
}

export interface ProductCartItem {
  product: Product;
  quantity: number;
  totalPrice: number;
}

export interface CartResponse {
  userId: string;
  items: ProductCartItem[];
  totalPrice: number;
  totalItem: number;
}
