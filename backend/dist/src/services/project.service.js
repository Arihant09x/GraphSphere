import { projectRepository } from "../repositories/project.repository.js";
import { AppError } from "../utils/AppError.js";
export class ProjectService {
    async list(limit, offset) { const [items, total] = await Promise.all([projectRepository.list(limit, offset), projectRepository.count()]); return { items, total, limit, offset }; }
    async get(id) { const project = await projectRepository.byId(id); if (!project)
        throw AppError.notFound("Project not found"); return project; }
    async contributors(id) { await this.get(id); return projectRepository.contributors(id); }
}
export const projectService = new ProjectService();
//# sourceMappingURL=project.service.js.map