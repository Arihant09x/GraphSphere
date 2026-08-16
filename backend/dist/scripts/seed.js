import "dotenv/config";
import { readFile } from "node:fs/promises";
import bcrypt from "bcryptjs";
import { env } from "../src/config/env.js";
import { getSession, closeDriver } from "../src/db/driver.js";
const data = JSON.parse(await readFile(new URL("../data/seed-data.json", import.meta.url), "utf8"));
const id = (prefix, index) => `${{ d: "000000d1", p: "000000b1", t: "000000e1", c: "000000c1", s: "00000051", r: "000000f1", o: "00000001" }[prefix]}-0000-4000-8000-${String(index + 1).padStart(12, "0")}`;
const rows = (names, prefix, extra = () => ({})) => names.map((name, i) => ({ id: id(prefix, i), name, ...extra(name, i) }));
const session = getSession();
try {
    const devs = rows(data.developers, "d", (name, i) => ({ email: `${name.toLowerCase().replace(/[^a-z]/g, ".").replace(/\.+$/, "")}@graphsphere.dev`, headline: ["Backend engineer", "Graph data specialist", "Full-stack developer", "Platform engineer"][i % 4], location: ["Bengaluru", "Mumbai", "London", "Singapore", "Berlin"][i % 5], experienceYears: 2 + i % 11 }));
    const projects = rows(data.projects, "p", (name, i) => ({ slug: name.toLowerCase().replace(/\s+/g, "-"), description: `${name} is a production GraphSphere portfolio project.`, status: "active" }));
    const techs = rows(data.technologies, "t", (name, i) => ({ category: ["Language", "Database", "Framework", "Platform", "Tool"][i % 5] }));
    const companies = rows(data.companies, "c", name => ({ industry: "Technology" }));
    const skills = rows(data.skills, "s");
    const repos = rows(data.repositories, "r", name => ({ url: `https://github.com/graphsphere/${name}` }));
    const topics = rows(data.topics, "o");
    for (const [label, records] of [["Developer", devs], ["Project", projects], ["Technology", techs], ["Company", companies], ["Skill", skills], ["Repository", repos], ["Topic", topics]])
        await session.run(`UNWIND $records AS record MERGE (n:${label} {id: record.id}) SET n += record`, { records });
    const passwordHash = await bcrypt.hash(env.DEMO_USER_PASSWORD, 12);
    const demoId = "u-0000-4000-8000-000000000001";
    await session.run("MERGE (u:User {email:$email}) SET u.id=$id,u.name='GraphSphere Demo',u.passwordHash=$passwordHash,u.isActive=true,u.createdAt=datetime() WITH u MATCH (d:Developer {id:$developerId}) MERGE (u)-[:OWNS_PROFILE]->(d)", { email: env.DEMO_USER_EMAIL, id: demoId, passwordHash, developerId: devs[0].id });
    await session.run("UNWIND range(0, $size - 1) AS i MATCH (d:Developer {id:$devs[i]}),(p:Project {id:$projects[i % size($projects)]}),(s:Skill {id:$skills[i % size($skills)]}),(c:Company {id:$companies[i % size($companies)]}),(r:Repository {id:$repos[i % size($repos)]}),(o:Topic {id:$topics[i % size($topics)]}) MERGE (d)-[:WORKED_ON]->(p) MERGE (d)-[:HAS_SKILL]->(s) MERGE (d)-[:WORKED_AT]->(c) MERGE (d)-[:CONTRIBUTED_TO]->(r) MERGE (p)-[:HAS_TOPIC]->(o)", { size: devs.length, devs: devs.map(x => x.id), projects: projects.map(x => x.id), skills: skills.map(x => x.id), companies: companies.map(x => x.id), repos: repos.map(x => x.id), topics: topics.map(x => x.id) });
    await session.run("UNWIND range(0,$size-1) AS i MATCH (p:Project {id:$projects[i % size($projects)]}),(t:Technology {id:$techs[i % size($techs)]}),(s:Skill {id:$skills[i % size($skills)]}),(d:Developer {id:$devs[i]}),(peer:Developer {id:$devs[(i+1) % size($devs)]}) MERGE (p)-[:USES]->(t) MERGE (s)-[:BELONGS_TO]->(t) MERGE (d)-[:KNOWS]->(peer)", { size: devs.length, projects: projects.map(x => x.id), techs: techs.map(x => x.id), skills: skills.map(x => x.id), devs: devs.map(x => x.id) });
    console.log("Seed completed idempotently.");
}
finally {
    await session.close();
    await closeDriver();
}
//# sourceMappingURL=seed.js.map