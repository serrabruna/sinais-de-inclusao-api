import { createClient } from '@supabase/supabase-js';
import 'dotenv/config'; 

export const getSupabase = () => {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
        throw new Error("Variáveis SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY não configuradas.");
    }

    return createClient(supabaseUrl, supabaseKey);
};