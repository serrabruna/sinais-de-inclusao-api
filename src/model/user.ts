export interface User {
  id: string;
  name: string;
  email?: string;
  current_xp: number;
  unlocked_level: number;
  role: 'student' | 'admin';
  streak_count: number;
  last_streak_date?: string | null;
  avatar_icon?: string;
}