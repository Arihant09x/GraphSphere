export const searchQueries = {
  search: `
    CALL {
      MATCH (d:Developer)
      WHERE toLower(d.name) CONTAINS toLower($query)
        OR toLower(coalesce(d.headline, '')) CONTAINS toLower($query)
      RETURN {
        id: d.id,
        name: d.name,
        type: 'developer',
        label: d.name,
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
      RETURN {
        id: p.id,
        name: p.name,
        type: 'project',
        label: p.name,
        description: p.description,
        slug: p.slug,
        status: p.status,
        properties: properties(p)
      } AS item

      UNION

      MATCH (t:Technology)
      WHERE toLower(t.name) CONTAINS toLower($query)
        OR toLower(coalesce(t.category, '')) CONTAINS toLower($query)
        OR any(tag IN coalesce(t.tags, []) WHERE toLower(tag) CONTAINS toLower($query))
      RETURN {
        id: t.id,
        name: t.name,
        type: 'technology',
        label: t.name,
        category: t.category,
        tags: coalesce(t.tags, []),
        properties: properties(t)
      } AS item

      UNION

      MATCH (c:Company)
      WHERE toLower(c.name) CONTAINS toLower($query)
      RETURN {
        id: c.id,
        name: c.name,
        type: 'company',
        label: c.name,
        properties: properties(c)
      } AS item

      UNION

      MATCH (s:Skill)
      WHERE toLower(s.name) CONTAINS toLower($query)
      RETURN {
        id: s.id,
        name: s.name,
        type: 'skill',
        label: s.name,
        properties: properties(s)
      } AS item

      UNION

      MATCH (r:Repository)
      WHERE toLower(r.name) CONTAINS toLower($query)
      RETURN {
        id: r.id,
        name: r.name,
        type: 'repository',
        label: r.name,
        properties: properties(r)
      } AS item

      UNION

      MATCH (topic:Topic)
      WHERE toLower(topic.name) CONTAINS toLower($query)
      RETURN {
        id: topic.id,
        name: topic.name,
        type: 'topic',
        label: topic.name,
        properties: properties(topic)
      } AS item
    }
    RETURN item
    ORDER BY item.name
    LIMIT $limit
  `,
};
