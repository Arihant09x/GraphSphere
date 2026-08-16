import { getSession, recordToObject, toNumber } from "../db/driver.js";
import { technologyQueries } from "../queries/technologies.cypher.js";
export class TechnologyRepository {
    async list(limit, offset) { return this.run(technologyQueries.list, { limit, offset }, "technology"); }
    async count() { return toNumber((await this.run(technologyQueries.count, {}, "total"))[0] ?? 0); }
    async byId(id) { return (await this.run(technologyQueries.byId, { id }, "technology"))[0] ?? null; }
    async developers(id) { return this.run(technologyQueries.developers, { id }, "developer"); }
    async run(query, params, field) { const s = getSession(); try {
        return (await s.run(query, params)).records.map(r => recordToObject(r)[field]);
    }
    finally {
        await s.close();
    } }
}
export const technologyRepository = new TechnologyRepository();
//# sourceMappingURL=technology.repository.js.map