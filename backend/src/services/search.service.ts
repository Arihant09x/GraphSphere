import { graphRepository } from "../repositories/graph.repository.js";
export class SearchService { async search(query:string,limit:number){return graphRepository.search(query.trim(),limit);} }
export const searchService=new SearchService();
