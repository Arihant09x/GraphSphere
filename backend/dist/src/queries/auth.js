export const authQueries = {
    createUser: `
    CREATE (u:User {
      id: $id,
      name: $name,
      email: $email,
      passwordHash: $passwordHash,
      isActive: true,
      createdAt: datetime()
    })
    RETURN u
  `,
    findUserByEmail: `
    MATCH (u:User {email: $email})
    RETURN u
  `,
    findUserById: `
    MATCH (u:User {id: $id})
    RETURN u
  `,
    createDeveloperProfile: `
    MATCH (u:User {id: $userId})
    CREATE (d:Developer {
      id: $id,
      name: $name,
      email: $email,
      location: $location,
      experienceYears: $experienceYears,
      headline: $headline
    })
    CREATE (u)-[:OWNS_PROFILE]->(d)
    RETURN d
  `,
    findDeveloperByUserId: `
    MATCH (u:User {id: $userId})-[:OWNS_PROFILE]->(d:Developer)
    RETURN d
  `,
};
//# sourceMappingURL=auth.js.map