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

  async updateName(id: string, name: string): Promise<void> {
    const { error } = await supabase
        .from('profiles')
        .update({ name })
        .eq('id', id);

    if (error) throw new Error(`Erro ao atualizar nome: ${error.message}`);
  }

  async deleteAccount(id: string): Promise<void> {
      await supabase.from('user_favorites').delete().eq('user_id', id);
      const { error: profileError } = await supabase
          .from('profiles')
          .delete()
          .eq('id', id);

      if (profileError) {
          throw new Error(`Erro ao deletar perfil: ${profileError.message}`);
      }

      const { error: authError } = await supabase.auth.admin.deleteUser(id);

      if (authError) {
          throw new Error(`Erro ao deletar conta de autenticação: ${authError.message}`);
      }
  }

  async logDailyActivity(userId: string, dateStr: string): Promise<void> {
    await supabase
        .from('user_daily_activity')
        .upsert({ user_id: userId, activity_date: dateStr }, { onConflict: 'user_id, activity_date' });
}

  async getRecentActivityDates(userId: string, startDateStr: string): Promise<string[]> {
      const { data, error } = await supabase
          .from('user_daily_activity')
          .select('activity_date')
          .eq('user_id', userId)
          .gte('activity_date', startDateStr);

      if (error || !data) return [];
      return data.map((row: any) => row.activity_date);
  }
}