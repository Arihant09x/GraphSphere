export const developerQueries = {
  list: `MATCH (d:Developer) RETURN d { .* } AS developer ORDER BY d.name SKIP $offset LIMIT $limit`,
  count: `MATCH (d:Developer) RETURN count(d) AS total`,
  byId: `MATCH (d:Developer {id: $id}) RETURN d { .*, skills: [(d)-[:HAS_SKILL]->(s:Skill) | s { .* }], projects: [(d)-[:WORKED_ON]->(p:Project) | p { .id, .name, .slug }] } AS developer`,
  network: `
    MATCH (d:Developer {id: $id})
    OPTIONAL MATCH (d)-[r]-(connected)
    WITH d, connected, r
    RETURN {
      nodes: collect(DISTINCT CASE WHEN connected IS NOT NULL THEN {id: connected.id, name: coalesce(connected.name, connected.id), type: head(labels(connected)), properties: properties(connected)} ELSE NULL END),
      edges: collect(DISTINCT CASE WHEN r IS NOT NULL THEN {id: d.id + '-' + connected.id + '-' + type(r), source: d.id, target: connected.id, type: type(r), properties: properties(r)} ELSE NULL END)
    } AS graph
  `,
};
