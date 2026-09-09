import { UserRepository } from '../repository/userRepository.js';
export const adminMiddleware = (req, res, next) => {
    const role = req.userRole || req.user?.role;
    if (!role) {
        return res.status(401).json({ error: "Nível de acesso não identificado. Faça login novamente." });
    }
    if (role !== 'admin') {
        return res.status(403).json({ error: "Acesso negado. Rota exclusiva para administradores." });
    }
    return next();
};
//# sourceMappingURL=role.middleware.js.map