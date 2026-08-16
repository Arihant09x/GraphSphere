import { graphRepository } from "../repositories/graph.repository.js";
import { AppError } from "../utils/AppError.js";
export class GraphService {
 async path(fromId:string,toId:string,maxDepth:number){const path=await graphRepository.shortestPath(fromId,toId,maxDepth);if(!path)throw AppError.notFound("No graph path found");return path;}
 async recommendations(id:string,limit:number){return graphRepository.recommendations(id,limit);}
}
export const graphService=new GraphService();
