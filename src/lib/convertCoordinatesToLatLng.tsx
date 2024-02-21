import { type LatLngTuple } from "leaflet";

const COORDINATE_RATIO = 4095;
const MIN_X = 103682;
const MIN_Z = 418500;

const convertCoordinatesToLatLng = (
  topLeft: [number, number],
  bottomRight: [number, number]
): [LatLngTuple, LatLngTuple] => {
  const minLatLon = [
    (MIN_Z - topLeft[1]) / COORDINATE_RATIO,
    (MIN_X + topLeft[0]) / COORDINATE_RATIO,
  ] as LatLngTuple;
  const maxLatLon = [
    (MIN_Z - bottomRight[1]) / COORDINATE_RATIO,
    (MIN_X + bottomRight[0]) / COORDINATE_RATIO,
  ] as LatLngTuple;

  return [minLatLon, maxLatLon];
};

export default convertCoordinatesToLatLng;

// 102.1973, Longitude: 25.3193 = 0, 0
// -103682 -93400
