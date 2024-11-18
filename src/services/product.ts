import fetchApi from "@/api/fetchApi";
import { CategoryModel, ProductModel } from "@/types/product";

export async function getProducts(page: number, categoryId: string) {
  let url = `/products?offset=${page}&limit=${15}`;
  if (categoryId && categoryId !== "all") url += `&categoryId=${categoryId}`;
  const response = await fetchApi<ProductModel[]>(url);
  return response;
}

export async function getProduct(id: string) {
  const response = await fetchApi<ProductModel>(`/products/${id}`);
  return response;
}

export async function getCategories() {
  const response = await fetchApi<CategoryModel[]>("/categories");
  return response;
}
