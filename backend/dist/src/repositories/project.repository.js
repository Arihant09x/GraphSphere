import { getSession, recordToObject, toNumber } from "../db/driver.js";
import { projectQueries } from "../queries/projects.cypher.js";
export class ProjectRepository {
    async list(limit, offset) { return this.run(projectQueries.list, { limit, offset }, "project"); }
    async count() { const value = (await this.run(projectQueries.count, {}, "total"))[0]; return toNumber(value ?? 0); }
    async byId(id) { return (await this.run(projectQueries.byId, { id }, "project"))[0] ?? null; }
    async contributors(id) { return this.run(projectQueries.contributors, { id }, "developer"); }
    async run(query, params, field) { const s = getSession(); try {
        return (await s.run(query, params)).records.map(r => recordToObject(r)[field]);
    }
    finally {
        await s.close();
    } }
}
export const projectRepository = new ProjectRepository();
//# sourceMappingURL=project.repository.js.map