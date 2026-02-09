export type MapCalibration = {
  width: number;
  height: number;
  originX: number;
  originZ: number;
  blocksPerPixel: number;
};

export type MapConfig = {
  id: string;
  name: string;
  image: string;
  dataSource: "static" | "ftp";
  staticDataPath?: string;
  calibration: MapCalibration;
};

export const maps: Record<string, MapConfig> = {
  archive: {
    id: "archive",
    name: "Archiwum (stary serwer)",
    image: "/images/middle_earth.png",
    dataSource: "static",
    staticDataPath: "/data/archivedRegions.json",
    calibration: {
      width: 2000,
      height: 1800,
      originX: 810,
      originZ: 730,
      blocksPerPixel: 128, // scale_power = 7
    },
  },
  current: {
    id: "current",
    name: "Nowy serwer",
    image: "/images/lotrModMap.png",
    dataSource: "ftp",
    calibration: {
      width: 3200,
      height: 4000,
      originX: 810,
      originZ: 730,
      blocksPerPixel: 256, // scale_power = 8
    },
  },
};

export const defaultMapId = "current";
