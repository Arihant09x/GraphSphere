export const technologyQueries = {
    list: `MATCH (t:Technology) RETURN t { .* } AS technology ORDER BY t.name SKIP $offset LIMIT $limit`,
    count: `MATCH (t:Technology) RETURN count(t) AS total`,
    byId: `MATCH (t:Technology {id: $id}) RETURN t { .*, projects: [(p:Project)-[:USES]->(t) | p { .id, .name }], developers: [(d:Developer)-[:HAS_SKILL]->(:Skill)-[:BELONGS_TO]->(t) | d { .id, .name }] } AS technology`,
    developers: `MATCH (d:Developer)-[:HAS_SKILL]->(:Skill)-[:BELONGS_TO]->(t:Technology {id: $id}) RETURN DISTINCT d { .* } AS developer ORDER BY developer.name`,
};
//# sourceMappingURL=technologies.cypher.js.map