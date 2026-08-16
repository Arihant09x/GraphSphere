import { searchService } from "../services/search.service.js";
export const searchController = { search: async (req, res) => { const q = req.query; res.json({ data: await searchService.search(q.q, Number(q.limit ?? 10)) }); } };
//# sourceMappingURL=search.controller.js.map