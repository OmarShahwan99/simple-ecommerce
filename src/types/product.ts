export interface CategoryModel {
  id: number;
  name: string;
  image: string;
}

export interface ProductModel {
  id: number;
  title: string;
  price: number;
  description: string;
  category: CategoryModel;
  images: string[];
}
