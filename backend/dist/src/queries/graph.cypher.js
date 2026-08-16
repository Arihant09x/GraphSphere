export const graphQueries = {
    shortestPath: `MATCH (from:Developer {id: $fromId}), (to:Developer {id: $toId}) MATCH path = shortestPath((from)-[:KNOWS|WORKED_ON|HAS_SKILL|USES*1..10]-(to)) WHERE length(path) <= $maxDepth RETURN [node IN nodes(path) | node { .id, .name, type: head(labels(node)), labels: labels(node) }] AS nodes, [rel IN relationships(path) | { type: type(rel), properties: properties(rel) }] AS relationships, length(path) AS distance`,
    recommendations: `
    MATCH (node {id: $id})
    WITH node, head(labels(node)) AS nodeType
    OPTIONAL MATCH (node)-[r]-(connected)
    WHERE connected <> node
    WITH node, nodeType, collect(DISTINCT connected) AS directConnections
    UNWIND (CASE WHEN directConnections IS NULL OR size(directConnections) = 0 THEN [] ELSE directConnections END) AS direct
    WITH node, nodeType, direct, head(labels(direct)) AS dirType
    RETURN {
      id: direct.id,
      name: coalesce(direct.name, direct.id),
      type: toLower(dirType),
      reason: 'Connected in your graph',
      score: 5
    } AS recommendation
    ORDER BY recommendation.score DESC, recommendation.name
    LIMIT $limit
    UNION ALL
    MATCH (node {id: $id})
    WITH node
    MATCH (fallback)
    WHERE fallback <> node AND NOT (node)--(fallback)
    WITH node, fallback, head(labels(fallback)) AS fallbackType
    RETURN {
      id: fallback.id,
      name: coalesce(fallback.name, fallback.id),
      type: toLower(fallbackType),
      reason: 'Explore similar nodes',
      score: 1
    } AS recommendation
    ORDER BY recommendation.score DESC, recommendation.name
    LIMIT (CASE WHEN $limit > 5 THEN $limit - 5 ELSE 0 END)
  `,
};
//# sourceMappingURL=graph.cypher.js.map