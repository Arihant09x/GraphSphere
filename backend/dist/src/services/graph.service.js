import { graphRepository } from "../repositories/graph.repository.js";
import { AppError } from "../utils/AppError.js";
export class GraphService {
    async path(fromId, toId, maxDepth) { const path = await graphRepository.shortestPath(fromId, toId, maxDepth); if (!path)
        throw AppError.notFound("No graph path found"); return path; }
    async recommendations(id, limit) { return graphRepository.recommendations(id, limit); }
}
export const graphService = new GraphService();
//# sourceMappingURL=graph.service.js.map