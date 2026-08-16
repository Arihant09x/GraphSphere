import { getSession, recordToObject, toNumber } from "../db/driver.js";
import { technologyQueries } from "../queries/technologies.cypher.js";
export class TechnologyRepository {
  async list(limit:number,offset:number) { return this.run(technologyQueries.list,{limit,offset},"technology"); }
  async count() { return toNumber((await this.run(technologyQueries.count,{},"total"))[0] ?? 0); }
  async byId(id:string) { return (await this.run(technologyQueries.byId,{id},"technology"))[0] ?? null; }
  async developers(id:string) { return this.run(technologyQueries.developers,{id},"developer"); }
  private async run(query:string,params:Record<string,unknown>,field:string):Promise<any[]> { const s=getSession(); try { return (await s.run(query,params)).records.map(r=>recordToObject(r)[field]); } finally { await s.close(); } }
}
export const technologyRepository=new TechnologyRepository();
