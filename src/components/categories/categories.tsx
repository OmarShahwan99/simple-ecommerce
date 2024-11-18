import { getCategories } from "@/services/product";
import CategoriesSlider from "./categories-slider";

export default async function Categories() {
  const categories = await getCategories();
  return <CategoriesSlider categories={categories} />;
}
