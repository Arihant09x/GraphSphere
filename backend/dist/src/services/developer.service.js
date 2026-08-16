import { developerRepository } from "../repositories/developer.repository.js";
import { AppError } from "../utils/AppError.js";
export class DeveloperService {
    async list(limit, offset) { const [items, total] = await Promise.all([developerRepository.list(limit, offset), developerRepository.count()]); return { items, total, limit, offset }; }
    async get(id) { const developer = await developerRepository.byId(id); if (!developer)
        throw AppError.notFound("Developer not found"); return developer; }
    async network(id, depth, limit) { await this.get(id); return developerRepository.network(id, depth, limit); }
}
export const developerService = new DeveloperService();
//# sourceMappingURL=developer.service.js.map