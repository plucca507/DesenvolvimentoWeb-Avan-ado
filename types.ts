export interface Product {
  _id: string;
  code: string;
  name: string;
  cover: string;
  description: string;
  price: number;
  category: Category;
  categoryId: string;
  animal: string;
  stock: number;
  rate?: number;
  reviews: Review[];
}

export interface CartProductItem {
  productId: string,
  timestamp: string,
  qnt: number
}

export interface ProductItem {
  productItem: Product;
  productId: string;
  timestamp: string;
  qnt: number;
}

export interface Client {
  _id: string;
  code: string;
  image: string;
  name: string;
  address: string;
  phone: number;
  cpf: number;
  creditcard?: number;
  cvc?: number;
  email: string;
  password?: string;
  token?: string;
}

export interface Category {
  code: string;
  name: string;
  description: string;
  products?: Product[];
}

export interface Review {
  id: string;
  author: string;
  rate: number;
  content: string;
}

export enum SortType {
  "P_ASC",
  "P_DSC",
  "NAME",
}
