export const projectQueries = {
  list: `MATCH (p:Project) RETURN p { .* } AS project ORDER BY p.name SKIP $offset LIMIT $limit`,
  count: `MATCH (p:Project) RETURN count(p) AS total`,
  byId: `MATCH (p:Project {id: $id}) RETURN p { .*, developers: [(p)<-[:WORKED_ON]-(d:Developer) | d { .id, .name, .headline }], technologies: [(p)-[:USES]->(t:Technology) | t { .id, .name, .category }] } AS project`,
  contributors: `MATCH (p:Project {id: $id})<-[:WORKED_ON]-(d:Developer) RETURN d { .* } AS developer ORDER BY developer.name`,
};
