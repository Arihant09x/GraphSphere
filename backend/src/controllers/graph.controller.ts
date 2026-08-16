import type { Request, Response } from "express";
import { graphService } from "../services/graph.service.js";
export const graphController = {
  path: async (req: Request, res: Response) => {
    const q = req.query as { fromId: string; toId: string; maxDepth?: string };
    res.json({
      data: await graphService.path(q.fromId, q.toId, Number(q.maxDepth ?? 6)),
    });
  },
  recommendations: async (req: Request, res: Response) => {
    const q = req.query as { limit?: string };
    res.json({
      data: {
        recommendations: await graphService.recommendations(
          String(req.params.id),
          Number(q.limit ?? 10),
        ),
      },
    });
  },
};
