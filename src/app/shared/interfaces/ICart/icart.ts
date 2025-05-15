import { IProducts } from '../IProducts/iproducts';

export interface ICart {
  _id: string;
  cartOwner: string;
  products: Product[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

interface res {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  dat: ICart;
}

interface Product {
  count: number;
  _id: string;
  product: ProductInfo;
  price: number;
}

interface ProductInfo {
  subcategory: Subcategory[];
  _id: string;
  title: string;
  quantity: number;
  imageCover: string;
  category: Category;
  brand: null;
  ratingsAverage: number;
  id: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}
