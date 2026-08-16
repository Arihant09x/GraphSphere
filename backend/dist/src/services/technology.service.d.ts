export declare class TechnologyService {
    list(limit: number, offset: number): Promise<{
        items: any[];
        total: number;
        limit: number;
        offset: number;
    }>;
    get(id: string): Promise<any>;
    developers(id: string): Promise<any[]>;
}
export declare const technologyService: TechnologyService;
//# sourceMappingURL=technology.service.d.ts.map