export declare class ProjectRepository {
    list(limit: number, offset: number): Promise<any[]>;
    count(): Promise<number>;
    byId(id: string): Promise<any>;
    contributors(id: string): Promise<any[]>;
    private run;
}
export declare const projectRepository: ProjectRepository;
//# sourceMappingURL=project.repository.d.ts.map