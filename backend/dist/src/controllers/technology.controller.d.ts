import type { Request, Response } from "express";
export declare const technologyController: {
    list: (req: Request, res: Response) => Promise<void>;
    get: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    developers: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
//# sourceMappingURL=technology.controller.d.ts.map