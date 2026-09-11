import { getSupabase } from '../config/supabase.js';
const supabase = getSupabase();
export class UserRepository {
    async findById(id) {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', id)
            .single();
        if (error || !data)
            return null;
        return data;
    }
    async findProfileWithEmail(id) {
        const user = await this.findById(id);
        if (!user)
            return null;
        const { data: authData } = await supabase.auth.admin.getUserById(id);
        if (authData?.user?.email) {
            user.email = authData.user.email;
        }
        return user;
    }
    async createProfile(id, name, role = 'student') {
        const { data, error } = await supabase
            .from('profiles')
            .insert([{
                id,
                name,
                current_xp: 0,
                unlocked_level: 1,
                role,
                streak_count: 0,
                avatar_icon: 'default_avatar'
            }])
            .select()
            .single();
        if (error)
            throw new Error(`Erro ao criar perfil: ${error.message}`);
        return data;
    }
    async updateProgress(id, newXp, newLevel) {
        const { error } = await supabase
            .from('profiles')
            .update({ current_xp: newXp, unlocked_level: newLevel })
            .eq('id', id);
        if (error)
            throw new Error(`Erro ao atualizar progresso: ${error.message}`);
    }
    async updateStreak(id, streakCount, streakDate) {
        const { error } = await supabase
            .from('profiles')
            .update({
            streak_count: streakCount,
            last_streak_date: streakDate
        })
            .eq('id', id);
        if (error)
            throw new Error(`Erro ao atualizar sequência: ${error.message}`);
    }
}
//# sourceMappingURL=userRepository.js.map