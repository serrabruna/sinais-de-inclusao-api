import { supabase } from "../config/supabase.js";
import type { Category } from "../model/category.js";

export class CategoryRepository {
  async create(name: string, description: string): Promise<Category> {
        const { count, error: countError } = await supabase
            .from('categories')
            .select('*', { count: 'exact', head: true });

        if (countError) throw new Error(`Erro ao calcular ordem: ${countError.message}`);

        const nextOrder = (count || 0) + 1; 

        const { data, error } = await supabase
            .from('categories')
            .insert([
                { 
                    name, 
                    description, 
                    order: nextOrder 
                }
            ])
            .select()
            .single();

        if (error) {
            throw new Error(`Erro ao criar categoria: ${error.message}`);
        }

        return data as Category;
    }

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

  async findByName(name: string): Promise<Category | null> {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('name', name)
        .maybeSingle();

    if (error) return null;
    return data as Category;
  }

  async update(id: number, category: Partial<Category>): Promise<Category> {
    const { data, error } = await supabase
      .from('categories')
      .update(category)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erro ao atualizar categoria: ${error.message}`);
    return data as Category;
  }

  async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);

    if (error) throw new Error(`Erro ao deletar categoria: ${error.message}`);
  }
}
