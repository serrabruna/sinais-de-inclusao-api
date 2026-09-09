import { getSupabase } from '../config/supabase.js';
const supabase = getSupabase();
export class CategoryRepository {
    async create(name, description) {
        const { count, error: countError } = await supabase
            .from('categories')
            .select('*', { count: 'exact', head: true });
        if (countError)
            throw new Error(`Erro ao calcular ordem: ${countError.message}`);
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
        return data;
    }
    async findAll() {
        const { data, error } = await supabase
            .from("categories")
            .select("*")
            .order("order", { ascending: true });
        if (error) {
            throw new Error(`Erro ao buscar categorias: ${error.message}`);
        }
        return data;
    }
    async findById(id) {
        const { data, error } = await supabase
            .from("categories")
            .select("*")
            .eq("id", id)
            .single();
        if (error)
            return null;
        return data;
    }
    async findByName(name) {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .eq('name', name)
            .maybeSingle();
        if (error)
            return null;
        return data;
    }
    async update(id, category) {
        const { data, error } = await supabase
            .from('categories')
            .update(category)
            .eq('id', id)
            .select()
            .single();
        if (error)
            throw new Error(`Erro ao atualizar categoria: ${error.message}`);
        return data;
    }
    async delete(id) {
        const { error } = await supabase
            .from('categories')
            .delete()
            .eq('id', id);
        if (error)
            throw new Error(`Erro ao deletar categoria: ${error.message}`);
    }
}
//# sourceMappingURL=categoryRepository.js.map