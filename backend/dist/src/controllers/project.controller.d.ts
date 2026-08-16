import type { Request, Response } from "express";
export declare const projectController: {
    list: (req: Request, res: Response) => Promise<void>;
    get: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    contributors: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
//# sourceMappingURL=project.controller.d.ts.map