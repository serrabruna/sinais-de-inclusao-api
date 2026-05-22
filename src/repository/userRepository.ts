import { supabase } from '../config/supabase.js';
import type { User } from '../model/user.js';

export class UserRepository {

    async findById(id: string): Promise<User | null> {
        const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single(); 

        if (error || !data) return null;
        return data as User;
    }


    async createProfile(id: string, name: string): Promise<User | null> {
        const { data, error } = await supabase
        .from('profiles')
        .insert([{ id, name, current_xp: 0, unlocked_level: 1, role: 'student' }])        .select()
        .single();

        if (error) throw new Error(`Erro ao criar perfil: ${error.message}`);
        return data as User;
    }

    async updateProgress(id: string, newXp: number, newLevel: number): Promise<void> {
        const { error } = await supabase
        .from('profiles')
        .update({ current_xp: newXp, unlocked_level: newLevel })
        .eq('id', id);

        if (error) throw new Error(`Erro ao atualizar progresso: ${error.message}`);
    }
}