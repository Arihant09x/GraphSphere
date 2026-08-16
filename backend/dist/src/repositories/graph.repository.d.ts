export declare class GraphRepository {
    shortestPath(fromId: string, toId: string, maxDepth: number): Promise<Record<string, unknown> | null>;
    recommendations(id: string, limit: number): Promise<Record<string, unknown>[]>;
    search(query: string, limit: number): Promise<Record<string, unknown>[]>;
    private one;
    private many;
}
export declare const graphRepository: GraphRepository;
//# sourceMappingURL=graph.repository.d.ts.map