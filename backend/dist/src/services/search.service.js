import { graphRepository } from "../repositories/graph.repository.js";
export class SearchService {
    async search(query, limit) { return graphRepository.search(query.trim(), limit); }
}
export const searchService = new SearchService();
//# sourceMappingURL=search.service.js.map