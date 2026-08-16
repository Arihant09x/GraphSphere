import { developerService } from "../services/developer.service.js";
export const developerController = {
    list: async (req, res) => { const { limit = 20, offset = 0 } = req.query; res.json({ data: await developerService.list(Number(limit), Number(offset)) }); },
    get: async (req, res) => res.json({ data: await developerService.get(String(req.params.id)) }),
    network: async (req, res) => { const { depth = 2, limit = 20 } = req.query; res.json({ data: await developerService.network(String(req.params.id), Number(depth), Number(limit)) }); },
};
//# sourceMappingURL=developer.controller.js.map