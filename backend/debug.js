import "dotenv/config";
import neo4j from "neo4j-driver";

const driver = neo4j.driver(
  process.env.COGNODB_URI,
  neo4j.auth.basic(process.env.COGNODB_USERNAME, process.env.COGNODB_PASSWORD),
  { disableLosslessIntegers: true },
);

const session = driver.session({ database: process.env.COGNODB_DATABASE });

const ids = [
  "d-0000-4000-8000-000000000007",
  "d-0000-4000-8000-000000000015",
  "t-0000-4000-8000-000000000012",
  "p-0000-4000-8000-000000000001",
];

// Get node properties
for (const id of ids) {
  const q =
    "MATCH (n {id: $id}) RETURN labels(n) AS labels, n {.*} AS props LIMIT 5";
  const res = await session.run(q, { id });
  console.log("\n=== NODE ===");
  console.log(id);
  console.log(
    JSON.stringify(
      res.records.map((r) => r.toObject()),
      null,
      2,
    ),
  );
}

// Get relationships for two developers
const devIds = [
  "d-0000-4000-8000-000000000007",
  "d-0000-4000-8000-000000000015",
];
for (const id of devIds) {
  const q = `MATCH (n {id: $id})-[r]-(connected)
             RETURN labels(n) AS sourceLabels,
                    type(r) AS relationshipType,
                    labels(connected) AS targetLabels,
                    connected.id AS targetId,
                    connected.name AS targetName
             LIMIT 100`;
  const res = await session.run(q, { id });
  console.log("\n=== RELS ===");
  console.log(id);
  console.log(
    JSON.stringify(
      res.records.map((r) => r.toObject()),
      null,
      2,
    ),
  );
}

await session.close();
await driver.close();
