export const graphQueries = {
    shortestPath: `MATCH (from:Developer {id: $fromId}), (to:Developer {id: $toId}) MATCH path = shortestPath((from)-[:KNOWS|WORKED_ON*1..10]-(to)) WHERE length(path) <= $maxDepth RETURN [node IN nodes(path) | node { .id, .name, labels: labels(node) }] AS nodes, [rel IN relationships(path) | { type: type(rel), properties: properties(rel) }] AS relationships, length(path) AS distance`,
    recommendations: `
    MATCH (d:Developer {id: $id})
    CALL {
      WITH d
      MATCH (d)-[:WORKED_ON]->(p:Project)-[:USES]->(t:Technology)
      MATCH (peer:Developer)-[:HAS_SKILL]->(:Skill)-[:BELONGS_TO]->(t)
      WHERE peer <> d
      RETURN peer.id AS id, peer.name AS name, 'developer' AS type,
        'Shares ' + t.name + ' through ' + p.name AS reason, count(DISTINCT t) * 3 AS score
      UNION ALL
      WITH d
      MATCH (d)-[:HAS_SKILL]->(:Skill)-[:BELONGS_TO]->(t:Technology)<-[:USES]-(p:Project)
      WHERE NOT (d)-[:WORKED_ON]->(p)
      RETURN p.id AS id, p.name AS name, 'project' AS type,
        'Uses your skill ' + t.name AS reason, count(DISTINCT t) * 2 AS score
      UNION ALL
      WITH d
      MATCH (d)-[:WORKED_ON]->(:Project)-[:USES]->(known:Technology)
      MATCH (related:Technology)<-[:USES]-(:Project)-[:USES]->(known)
      WHERE related <> known
      RETURN related.id AS id, related.name AS name, 'technology' AS type,
        'Often used alongside ' + known.name AS reason, count(DISTINCT known) AS score
    }
    WITH id, name, type, collect(reason)[0] AS reason, sum(score) AS score
    RETURN { id: id, name: name, type: type, reason: reason, score: score } AS recommendation
    ORDER BY score DESC, name
    LIMIT $limit`,
};
//# sourceMappingURL=graph.cypher.js.map