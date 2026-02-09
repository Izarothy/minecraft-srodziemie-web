import SftpClient from "ssh2-sftp-client";
import { env } from "~/env.mjs";

const REGION_PATH = "world/dimensions/lotr/middle_earth/region";
const REGION_FILE_REGEX = /^r\.(-?\d+)\.(-?\d+)\.mca$/;
const MAP_DATA_PATH = "world/datapacks/lotr/data/lotr/map";

export interface MapConfig {
  originX: number;
  originZ: number;
  scalePower: number;
  blocksPerPixel: number;
  imageWidth: number;
  imageHeight: number;
}

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

export async function fetchMapConfig(): Promise<MapConfig> {
  return withSFTPClient(async (client) => {
    // Read and parse map.json
    const jsonBuffer = await client.get(`${MAP_DATA_PATH}/map.json`);
    const mapJson = JSON.parse(
      Buffer.isBuffer(jsonBuffer) ? jsonBuffer.toString("utf-8") : String(jsonBuffer)
    ) as { origin_x: number; origin_z: number; scale_power: number };

    const { origin_x, origin_z, scale_power } = mapJson;

    // Read PNG file to extract image dimensions from header (width at bytes 16-19, height at bytes 20-23)
    const pngPath = `${MAP_DATA_PATH}/middle_earth.png`;
    const pngData = await client.get(pngPath);
    const buf = Buffer.isBuffer(pngData)
      ? pngData
      : Buffer.from(pngData as string, "binary");
    const imageWidth = buf.readUInt32BE(16);
    const imageHeight = buf.readUInt32BE(20);

    return {
      originX: origin_x,
      originZ: origin_z,
      scalePower: scale_power,
      blocksPerPixel: 2 ** scale_power,
      imageWidth,
      imageHeight,
    };
  });
}

export async function deleteRegionFile(x: number, z: number): Promise<void> {
  const filename = `r.${x}.${z}.mca`;
  const filepath = `${REGION_PATH}/${filename}`;

  return withSFTPClient(async (client) => {
    await client.delete(filepath);
  });
}
