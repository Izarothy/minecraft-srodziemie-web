import SftpClient from "ssh2-sftp-client";
import { config } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, "../.env") });

const { SFTP_HOST, SFTP_USER, SFTP_PASSWORD, SFTP_PORT } = process.env;

if (!SFTP_HOST || !SFTP_USER || !SFTP_PASSWORD) {
  console.error("Missing SFTP credentials in .env (SFTP_HOST, SFTP_USER, SFTP_PASSWORD)");
  process.exit(1);
}

const REMOTE_PATH = "world/datapacks/lotr/data/lotr/map/middle_earth.png";
const LOCAL_PATH = resolve(__dirname, "../public/images/middle_earth.png");

const client = new SftpClient();

try {
  await client.connect({
    host: SFTP_HOST,
    port: parseInt(SFTP_PORT || "22", 10),
    username: SFTP_USER,
    password: SFTP_PASSWORD,
    readyTimeout: 8000,
  });

  console.log(`Downloading ${REMOTE_PATH} ...`);
  await client.fastGet(REMOTE_PATH, LOCAL_PATH);
  console.log(`Saved to ${LOCAL_PATH}`);
} catch (/** @type {any} */ err) {
  console.error("Failed to sync map image:", err.message);
  process.exit(1);
} finally {
  await client.end();
}
