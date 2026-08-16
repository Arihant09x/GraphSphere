import { developerRepository } from "../repositories/developer.repository.js";
import { AppError } from "../utils/AppError.js";
export class DeveloperService {
  async list(limit:number,offset:number) { const [items,total]=await Promise.all([developerRepository.list(limit,offset),developerRepository.count()]); return {items,total,limit,offset}; }
  async get(id:string) { const developer=await developerRepository.byId(id); if(!developer) throw AppError.notFound("Developer not found"); return developer; }
  async network(id:string,depth:number,limit:number) { await this.get(id); return developerRepository.network(id,depth,limit); }
}
export const developerService=new DeveloperService();
