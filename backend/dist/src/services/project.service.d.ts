export declare class ProjectService {
    list(limit: number, offset: number): Promise<{
        items: any[];
        total: number;
        limit: number;
        offset: number;
    }>;
    get(id: string): Promise<any>;
    contributors(id: string): Promise<any[]>;
}
export declare const projectService: ProjectService;
//# sourceMappingURL=project.service.d.ts.map