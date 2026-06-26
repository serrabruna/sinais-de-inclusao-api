import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
    console.error("ERRO: SUPABASE_URL não está definida!");
}
if (!supabaseKey) {
    console.error("ERRO: SUPABASE_SERVICE_ROLE_KEY não está definida!");
}

export const supabase = createClient(supabaseUrl!, supabaseKey!);