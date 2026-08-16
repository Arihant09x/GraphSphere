import neo4j, { Driver, Session, Record as Neo4jRecord } from "neo4j-driver";
import { env } from "../config/env.js";
import pino from "pino";
const logger = pino({ name: "neo4j-driver" });
let driver = null;
export function getDriver() {
    if (!driver) {
        driver = neo4j.driver(env.COGNODB_URI, neo4j.auth.basic(env.COGNODB_USERNAME, env.COGNODB_PASSWORD), {
            maxConnectionPoolSize: 50,
            connectionAcquisitionTimeout: 60000,
            maxTransactionRetryTime: 30000,
            disableLosslessIntegers: true,
        });
    }
    return driver;
}
export function getSession(database) {
    const drv = getDriver();
    return drv.session({ database: database ?? env.COGNODB_DATABASE });
}
export async function verifyConnection() {
    const session = getSession();
    try {
        await session.run("RETURN 1 AS test");
        logger.info("Neo4j connection verified");
        return true;
    }
    catch (error) {
        logger.error({ err: error }, "Neo4j connection failed");
        return false;
    }
    finally {
        await session.close();
    }
}
export async function closeDriver() {
    if (driver) {
        await driver.close();
        driver = null;
        logger.info("Neo4j driver closed");
    }
}
export function toNumber(value) {
    if (typeof value === "number")
        return value;
    if (typeof value === "bigint")
        return Number(value);
    if (value && typeof value === "object" && "toNumber" in value) {
        return value.toNumber();
    }
    return Number(value);
}
export function recordToObject(record) {
    const obj = {};
    record.keys.forEach((key) => {
        const value = record.get(key);
        obj[String(key)] = convertValue(value);
    });
    return obj;
}
function convertValue(value) {
    if (value === null || value === undefined)
        return value;
    if (typeof value === "number" ||
        typeof value === "string" ||
        typeof value === "boolean")
        return value;
    if (typeof value === "bigint")
        return Number(value);
    if (Array.isArray(value))
        return value.map(convertValue);
    if (value && typeof value === "object") {
        if ("toNumber" in value)
            return value.toNumber();
        if ("low" in value && "high" in value)
            return Number(value.low);
        const obj = {};
        for (const [k, v] of Object.entries(value)) {
            obj[k] = convertValue(v);
        }
        return obj;
    }
    return value;
}
//# sourceMappingURL=driver.js.map