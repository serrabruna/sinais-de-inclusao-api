import { supabase } from "../config/supabase.js";
import type { Category } from "../model/category.js";

export class CategoryRepository {
  async findAll(): Promise<Category[]> {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("order", { ascending: true });

    if (error) {
      throw new Error(`Erro ao buscar categorias: ${error.message}`);
    }

    return data as Category[];
  }

  async findById(id: number): Promise<Category | null> {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return null;
    return data as Category;
  }
}
