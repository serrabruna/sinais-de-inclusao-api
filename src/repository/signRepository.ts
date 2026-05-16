import { supabase } from '../config/supabase.js';
import type { Sign } from '../model/sign.js';

export class SignRepository {
    async findByCategory(categoryId: number): Promise<Sign[]> {
        const { data, error } = await supabase
        .from('signs')
        .select('*')
        .eq('category_id', categoryId)
        .order('id', { ascending: true }); 

        if (error) {
        throw new Error(`Erro ao buscar sinais: ${error.message}`);
        }
        return data as Sign[];
    }

  
  async findById(id: number): Promise<Sign | null> {
    const { data, error } = await supabase
      .from('signs')
      .select('*')
      .eq('id', id)
      .single(); 

    if (error) return null;
      return data as Sign;
  }

  
  async getAllCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('order', { ascending: true }); 

    if (error) {
      throw new Error(`Erro ao buscar categorias: ${error.message}`);
    }

    return data;
  }
}