import { graphService } from "../services/graph.service.js";
export const graphController = {
    path: async (req, res) => {
        const q = req.query;
        res.json({
            data: await graphService.path(q.fromId, q.toId, Number(q.maxDepth ?? 6)),
        });
    },
    recommendations: async (req, res) => {
        const q = req.query;
        res.json({
            data: {
                recommendations: await graphService.recommendations(String(req.params.id), Number(q.limit ?? 10)),
            },
        });
    },
};
//# sourceMappingURL=graph.controller.js.map