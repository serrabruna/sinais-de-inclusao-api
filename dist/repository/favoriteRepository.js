import { getSupabase } from '../config/supabase.js';
const supabase = getSupabase();
export class FavoriteRepository {
    async add(userId, signId) {
        const { data, error } = await supabase
            .from('favorites')
            .insert([{ user_id: userId, sign_id: signId }])
            .select()
            .single();
        if (error)
            throw new Error(`Erro ao favoritar: ${error.message}`);
        return data;
    }
    async remove(userId, signId) {
        const { error } = await supabase
            .from('favorites')
            .delete()
            .eq('user_id', userId)
            .eq('sign_id', signId);
        if (error)
            throw new Error(`Erro ao remover favorito: ${error.message}`);
    }
    async findSpecific(userId, signId) {
        const { data, error } = await supabase
            .from('favorites')
            .select('*')
            .eq('user_id', userId)
            .eq('sign_id', signId)
            .maybeSingle();
        if (error)
            return null;
        return data;
    }
    async findByUserId(userId) {
        const { data, error } = await supabase
            .from('favorites')
            .select(`
            id,
            user_id,
            sign_id,
            created_at,
            signs (
            name,
            statement,
            image_path
            )
        `)
            .eq('user_id', userId);
        if (error)
            throw new Error(`Erro ao listar favoritos: ${error.message}`);
        return data;
    }
}
//# sourceMappingURL=favoriteRepository.js.map