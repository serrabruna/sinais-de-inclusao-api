import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import 'dotenv/config';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error("Erro: SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY não foram definidos no .env");
}

export const supabase = createClient(supabaseUrl, supabaseKey);