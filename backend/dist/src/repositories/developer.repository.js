import { getSession, recordToObject, toNumber } from "../db/driver.js";
import { developerQueries } from "../queries/developers.cypher.js";
export class DeveloperRepository {
    async list(limit, offset) {
        return this.runMany(developerQueries.list, { limit, offset }, "developer");
    }
    async count() {
        const rows = await this.runMany(developerQueries.count, {}, "total");
        return toNumber(rows[0] ?? 0);
    }
    async byId(id) {
        return ((await this.runMany(developerQueries.byId, { id }, "developer"))[0] ??
            null);
    }
    async network(id, depth, limit) {
        const rows = await this.runMany(developerQueries.network, { id, depth, limit }, "graph");
        return rows[0] ?? { nodes: [], edges: [] };
    }
    async runMany(query, parameters, field) {
        const session = getSession();
        try {
            const result = await session.run(query, parameters);
            return result.records.map((r) => field ? recordToObject(r)[field] : recordToObject(r));
        }
        finally {
            await session.close();
        }
    }
}
export const developerRepository = new DeveloperRepository();
//# sourceMappingURL=developer.repository.js.map