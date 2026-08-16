import { getSession, recordToObject, toNumber } from "../db/driver.js";
import { projectQueries } from "../queries/projects.cypher.js";
export class ProjectRepository {
  async list(limit:number, offset:number) { return this.run(projectQueries.list,{limit,offset},"project"); }
  async count() { const value=(await this.run(projectQueries.count,{},"total"))[0]; return toNumber(value ?? 0); }
  async byId(id:string) { return (await this.run(projectQueries.byId,{id},"project"))[0] ?? null; }
  async contributors(id:string) { return this.run(projectQueries.contributors,{id},"developer"); }
  private async run(query:string, params:Record<string,unknown>, field:string):Promise<any[]> { const s=getSession(); try { return (await s.run(query,params)).records.map(r=>recordToObject(r)[field]); } finally { await s.close(); } }
}
export const projectRepository=new ProjectRepository();
