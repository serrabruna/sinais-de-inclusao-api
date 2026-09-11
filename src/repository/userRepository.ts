import { getSupabase } from '../config/supabase.js';
import type { User } from '../model/user.js';

const supabase = getSupabase();

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

  async findProfileWithEmail(id: string): Promise<User | null> {
    const user = await this.findById(id);
    if (!user) return null;

    const { data: authData } = await supabase.auth.admin.getUserById(id);
    if (authData?.user?.email) {
      user.email = authData.user.email;
    }

    return user;
  }

  async createProfile(id: string, name: string, role: string = 'student'): Promise<User | null> {
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

  async updateStreak(id: string, streakCount: number, streakDate: string): Promise<void> {
    const { error } = await supabase
      .from('profiles')
      .update({
        streak_count: streakCount,
        last_streak_date: streakDate
      })
      .eq('id', id);

    if (error) throw new Error(`Erro ao atualizar sequência: ${error.message}`);
  }
}