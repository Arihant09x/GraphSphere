import { getSession, recordToObject } from "../db/driver.js";
import { graphQueries } from "../queries/graph.cypher.js";
import { searchQueries } from "../queries/search.cypher.js";
export class GraphRepository {
    async shortestPath(fromId, toId, maxDepth) { return this.one(graphQueries.shortestPath, { fromId, toId, maxDepth }); }
    async recommendations(id, limit) { return this.many(graphQueries.recommendations, { id, limit }); }
    async search(query, limit) { return this.many(searchQueries.search, { query, limit }); }
    async one(q, p) { return (await this.many(q, p))[0] ?? null; }
    async many(q, p) { const s = getSession(); try {
        return (await s.run(q, p)).records.map(recordToObject);
    }
    finally {
        await s.close();
    } }
}
export const graphRepository = new GraphRepository();
//# sourceMappingURL=graph.repository.js.map