import { getSession, recordToObject } from "../db/driver.js";
import { graphQueries } from "../queries/graph.cypher.js";
import { searchQueries } from "../queries/search.cypher.js";
export class GraphRepository {
  async shortestPath(fromId:string,toId:string,maxDepth:number) { return this.one(graphQueries.shortestPath,{fromId,toId,maxDepth}); }
  async recommendations(id:string,limit:number) { return this.many(graphQueries.recommendations,{id,limit}); }
  async search(query:string,limit:number) { return this.many(searchQueries.search,{query,limit}); }
  private async one(q:string,p:Record<string,unknown>) { return (await this.many(q,p))[0] ?? null; }
  private async many(q:string,p:Record<string,unknown>) { const s=getSession(); try{return (await s.run(q,p)).records.map(recordToObject);} finally {await s.close();} }
}
export const graphRepository=new GraphRepository();
