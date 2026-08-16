import { Driver, Session, Record as Neo4jRecord } from "neo4j-driver";
export declare function getDriver(): Driver;
export declare function getSession(database?: string): Session;
export declare function verifyConnection(): Promise<boolean>;
export declare function closeDriver(): Promise<void>;
export declare function toNumber(value: unknown): number;
export declare function recordToObject(record: Neo4jRecord): Record<string, unknown>;
//# sourceMappingURL=driver.d.ts.map