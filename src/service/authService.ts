import { supabase } from '../config/supabase.js';
import { UserRepository } from '../repository/userRepository.js';
import jwt from 'jsonwebtoken';

export class AuthService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async signUp(email: string, password: string, name: string) {
        const { data, error } = await supabase.auth.signUp({
            email: email.trim().toLowerCase(),
            password,
        });

        if (error) throw new Error(error.message);
        if (!data.user) throw new Error('Erro ao criar usuário.');

        await this.userRepository.createProfile(data.user.id, name);

        return { id: data.user.id, email: data.user.email };
    }

    async signIn(email: string, password: string) {
        try{
            const { data, error } = await supabase.auth.signInWithPassword({
            email: email.trim().toLowerCase(),
            password,
            });

            if (error) throw new Error('E-mail ou senha inválidos.');
            if (!data.user) throw new Error('Usuário não encontrado.');

            const token = jwt.sign(
                { sub: data.user.id }, 
                process.env.JWT_SECRET as string, 
                { expiresIn: '1d' }
            );

            return {
                user: {
                    id: data.user.id,
                    email: data.user.email,
                },
                token
            };
        } catch (err: any) {
            console.error('Erro no signIn:', err);
            throw new Error('Erro ao autenticar usuário.');
        }
    }
}