import { getSupabase } from '../config/supabase.js';
const supabase = getSupabase();
export class SignRepository {
    async findByCategory(categoryId) {
        const { data, error } = await supabase
            .from('signs')
            .select('*')
            .eq('category_id', categoryId)
            .order('id', { ascending: true });
        if (error) {
            throw new Error(`Erro ao buscar sinais: ${error.message}`);
        }
        return data;
    }
    async create(sign) {
        const { data, error } = await supabase
            .from('signs')
            .insert([sign])
            .select()
            .single();
        if (error)
            throw new Error(`Erro ao criar sinal: ${error.message}`);
        return data;
    }
    async findById(id) {
        const { data, error } = await supabase
            .from('signs')
            .select('*')
            .eq('id', id)
            .single();
        if (error)
            return null;
        return data;
    }
    async findAll() {
        const { data, error } = await supabase
            .from('signs')
            .select('*')
            .order('name', { ascending: true });
        if (error) {
            throw new Error(`Erro ao buscar todos os sinais: ${error.message}`);
        }
        return data;
    }
    async findByNameAndCategory(name, categoryId) {
        const { data, error } = await supabase
            .from('signs')
            .select('*')
            .eq('name', name)
            .eq('category_id', categoryId)
            .maybeSingle();
        if (error)
            return null;
        return data;
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
    async update(id, sign) {
        const { data, error } = await supabase
            .from('signs')
            .update(sign)
            .eq('id', id)
            .select()
            .single();
        if (error)
            throw new Error(`Erro ao atualizar sinal: ${error.message}`);
        return data;
    }
    async delete(id) {
        const { error } = await supabase
            .from('signs')
            .delete()
            .eq('id', id);
        if (error)
            throw new Error(`Erro ao deletar sinal: ${error.message}`);
    }
}
//# sourceMappingURL=signRepository.js.map