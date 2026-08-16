export declare class DeveloperRepository {
    list(limit: number, offset: number): Promise<any[]>;
    count(): Promise<number>;
    byId(id: string): Promise<any>;
    network(id: string, depth: number, limit: number): Promise<any[]>;
    private runMany;
}
export declare const developerRepository: DeveloperRepository;
//# sourceMappingURL=developer.repository.d.ts.map