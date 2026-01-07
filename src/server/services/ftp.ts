import * as ftp from "basic-ftp";
import { env } from "~/env.mjs";

const REGION_PATH = "world/dimensions/lotr/middle_earth/region";
const REGION_FILE_REGEX = /^r\.(-?\d+)\.(-?\d+)\.mca$/;

export async function withFTPClient<T>(
  operation: (client: ftp.Client) => Promise<T>
): Promise<T> {
  if (!env.FTP_HOST || !env.FTP_USER || !env.FTP_PASSWORD) {
    throw new Error("FTP credentials not configured");
  }

  const client = new ftp.Client();
  client.ftp.verbose = false;

  try {
    await client.access({
      host: env.FTP_HOST,
      port: 21,
      user: env.FTP_USER,
      password: env.FTP_PASSWORD,
    });
    return await operation(client);
  } finally {
    client.close();
  }
}

export interface Region {
  x: number;
  z: number;
}

export async function listRegionFiles(): Promise<Region[]> {
  return withFTPClient(async (client) => {
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

  return withFTPClient(async (client) => {
    await client.remove(filepath);
  });
}
