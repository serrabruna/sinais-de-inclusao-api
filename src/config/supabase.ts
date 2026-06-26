import { createClient } from '@supabase/supabase-js';
import 'dotenv/config'; 

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
    throw new Error("ERRO: Variável de ambiente SUPABASE_URL não está definida!");
}
if (!supabaseKey) {
    throw new Error("ERRO: Variável de ambiente SUPABASE_SERVICE_ROLE_KEY não está definida!");
}

export const supabase = createClient(supabaseUrl, supabaseKey);