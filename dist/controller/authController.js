import { AuthService } from '../service/authService.js';
const authService = new AuthService();
export const register = async (req, res) => {
    try {
        const { email, password, name, role } = req.body;
        const user = await authService.signUp(email, password, name, role);
        return res.status(201).json(user);
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const data = await authService.signIn(email, password);
        return res.status(200).json(data);
    }
    catch (error) {
        return res.status(401).json({ error: error.message });
    }
};
//# sourceMappingURL=authController.js.map