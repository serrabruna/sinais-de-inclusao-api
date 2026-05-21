import { supabase } from '../config/supabase.js';
import type { Favorite, FavoriteWithSign} from '../model/favorite.js';

export class FavoriteRepository {

    async add(userId: string, signId: number): Promise<Favorite> {
        const { data, error } = await supabase
        .from('favorites')
        .insert([{ user_id: userId, sign_id: signId }])
        .select()
        .single();

        if (error) throw new Error(`Erro ao favoritar: ${error.message}`);
        return data as Favorite;
    }

    async remove(userId: string, signId: number): Promise<void> {
        const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', userId)
        .eq('sign_id', signId);

        if (error) throw new Error(`Erro ao remover favorito: ${error.message}`);
    }

    async findSpecific(userId: string, signId: number): Promise<Favorite | null> {
        const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', userId)
        .eq('sign_id', signId)
        .maybeSingle();

        if (error) return null;
        return data as Favorite;
    }


    async findByUserId(userId: string): Promise<FavoriteWithSign[]> {
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

        if (error) throw new Error(`Erro ao listar favoritos: ${error.message}`);
        return data as unknown as FavoriteWithSign[];
    }
}