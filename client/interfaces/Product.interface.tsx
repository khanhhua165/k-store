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
