import { technologyRepository } from "../repositories/technology.repository.js";
import { AppError } from "../utils/AppError.js";
export class TechnologyService {
 async list(limit:number,offset:number){const [items,total]=await Promise.all([technologyRepository.list(limit,offset),technologyRepository.count()]);return {items,total,limit,offset};}
 async get(id:string){const technology=await technologyRepository.byId(id);if(!technology)throw AppError.notFound("Technology not found");return technology;}
 async developers(id:string){await this.get(id);return technologyRepository.developers(id);}
}
export const technologyService=new TechnologyService();
