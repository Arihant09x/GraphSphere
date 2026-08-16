export const developerQueries = {
    list: `MATCH (d:Developer) RETURN d { .* } AS developer ORDER BY d.name SKIP $offset LIMIT $limit`,
    count: `MATCH (d:Developer) RETURN count(d) AS total`,
    byId: `MATCH (d:Developer {id: $id}) RETURN d { .*, skills: [(d)-[:HAS_SKILL]->(s:Skill) | s { .* }], projects: [(d)-[:WORKED_ON]->(p:Project) | p { .id, .name, .slug }] } AS developer`,
    network: `MATCH (d:Developer {id: $id}) MATCH path=(d)-[:KNOWS*1..$depth]-(peer:Developer) WHERE peer <> d RETURN DISTINCT peer { .* } AS developer, length(path) AS distance ORDER BY distance, developer.name LIMIT $limit`,
};
//# sourceMappingURL=developers.cypher.js.map