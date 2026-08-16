import { authService } from "../services/auth.service.js";
import { AppError } from "../utils/AppError.js";
export const authController = {
    async register(req, res) {
        const { name, email, password } = req.body;
        const result = await authService.register(name, email, password);
        res.status(201).json({
            data: result,
        });
    },
    async login(req, res) {
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        res.json({
            data: result,
        });
    },
    async me(req, res) {
        const authReq = req;
        const userId = authReq.user.id;
        const result = await authService.getMe(userId);
        res.json({
            data: result,
        });
    },
};
//# sourceMappingURL=auth.controller.js.map