import { AppError } from "../utils/AppError.js";
export function validate(schema) {
    return async (req, _res, next) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
        }
        catch (error) {
            if (error instanceof Error && "issues" in error) {
                const zodError = error;
                const messages = zodError.issues
                    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
                    .join("; ");
                next(AppError.badRequest(messages));
            }
            else {
                next(AppError.badRequest("Invalid request data"));
            }
        }
    };
}
//# sourceMappingURL=validate.js.map