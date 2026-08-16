export declare class DeveloperService {
    list(limit: number, offset: number): Promise<{
        items: any[];
        total: number;
        limit: number;
        offset: number;
    }>;
    get(id: string): Promise<any>;
    network(id: string, depth: number, limit: number): Promise<any[]>;
}
export declare const developerService: DeveloperService;
//# sourceMappingURL=developer.service.d.ts.map