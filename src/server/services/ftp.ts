import SftpClient from "ssh2-sftp-client";
import { env } from "~/env.mjs";

const REGION_PATH = "world/dimensions/lotr/middle_earth/region";
const REGION_FILE_REGEX = /^r\.(-?\d+)\.(-?\d+)\.mca$/;

export async function withSFTPClient<T>(
  operation: (client: SftpClient) => Promise<T>
): Promise<T> {
  if (!env.SFTP_HOST || !env.SFTP_USER || !env.SFTP_PASSWORD) {
    throw new Error(
      `SFTP credentials not configured. HOST=${env.SFTP_HOST ? "set" : "missing"}, USER=${env.SFTP_USER ? "set" : "missing"}, PASS=${env.SFTP_PASSWORD ? "set" : "missing"}`
    );
  }

  const client = new SftpClient();

  try {
    await client.connect({
      host: env.SFTP_HOST,
      port: parseInt(env.SFTP_PORT || "22", 10),
      username: env.SFTP_USER,
      password: env.SFTP_PASSWORD,
      readyTimeout: 8000,
    });
    return await operation(client);
  } finally {
    await client.end();
  }
}

export interface Region {
  x: number;
  z: number;
}

export async function listRegionFiles(): Promise<Region[]> {
  return withSFTPClient(async (client) => {
    const files = await client.list(REGION_PATH);
    const regions: Region[] = [];

    for (const file of files) {
      const match = file.name.match(REGION_FILE_REGEX);
      if (match && match[1] && match[2]) {
        regions.push({
          x: parseInt(match[1], 10),
          z: parseInt(match[2], 10),
        });
      }
    }

    return regions;
  });
}

export async function deleteRegionFile(x: number, z: number): Promise<void> {
  const filename = `r.${x}.${z}.mca`;
  const filepath = `${REGION_PATH}/${filename}`;

  return withSFTPClient(async (client) => {
    await client.delete(filepath);
  });
}
