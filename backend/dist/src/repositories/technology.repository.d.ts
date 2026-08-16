export declare class TechnologyRepository {
    list(limit: number, offset: number): Promise<any[]>;
    count(): Promise<number>;
    byId(id: string): Promise<any>;
    developers(id: string): Promise<any[]>;
    private run;
}
export declare const technologyRepository: TechnologyRepository;
//# sourceMappingURL=technology.repository.d.ts.map