export const searchQueries = {
    search: `
    CALL {
      MATCH (d:Developer)
      WHERE toLower(d.name) CONTAINS toLower($query)
        OR toLower(coalesce(d.headline, '')) CONTAINS toLower($query)
      WITH d, 'developer' AS type
      RETURN {
        id: d.id,
        name: d.name,
        type: type,
        headline: d.headline,
        email: d.email,
        location: d.location,
        experienceYears: d.experienceYears,
        properties: properties(d)
      } AS item

      UNION

      MATCH (p:Project)
      WHERE toLower(p.name) CONTAINS toLower($query)
        OR toLower(coalesce(p.description, '')) CONTAINS toLower($query)
      WITH p, 'project' AS type
      RETURN {
        id: p.id,
        name: p.name,
        type: type,
        description: p.description,
        slug: p.slug,
        status: p.status,
        properties: properties(p)
      } AS item

      UNION

      MATCH (t:Technology)
      WHERE toLower(t.name) CONTAINS toLower($query)
      WITH t, 'technology' AS type
      RETURN {
        id: t.id,
        name: t.name,
        type: type,
        category: t.category,
        properties: properties(t)
      } AS item
    }
    RETURN item
    LIMIT $limit
  `,
};
//# sourceMappingURL=search.cypher.js.map