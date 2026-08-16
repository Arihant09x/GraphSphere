export declare class GraphService {
    path(fromId: string, toId: string, maxDepth: number): Promise<Record<string, unknown>>;
    recommendations(id: string, limit: number): Promise<Record<string, unknown>[]>;
}
export declare const graphService: GraphService;
//# sourceMappingURL=graph.service.d.ts.map