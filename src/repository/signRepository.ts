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

    async create(sign: Omit<Sign, 'id'>): Promise<Sign> {
      const { data, error } = await supabase
        .from('signs')
        .insert([sign])
        .select()
        .single();

      if (error) throw new Error(`Erro ao criar sinal: ${error.message}`);
      return data as Sign;
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

    async findAll(): Promise<Sign[]> {
      const { data, error } = await supabase
        .from('signs')
        .select('*')
        .order('name', { ascending: true });
      if (error) {
        throw new Error(`Erro ao buscar todos os sinais: ${error.message}`);
      }

      return data as Sign[];
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

    async update(id: number, sign: Partial<Sign>): Promise<Sign> {
      const { data, error } = await supabase
        .from('signs')
        .update(sign)
        .eq('id', id)
        .select()
        .single();

      if (error) throw new Error(`Erro ao atualizar sinal: ${error.message}`);
      return data as Sign;
  }

  async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from('signs')
      .delete()
      .eq('id', id);

    if (error) throw new Error(`Erro ao deletar sinal: ${error.message}`);
  }
}