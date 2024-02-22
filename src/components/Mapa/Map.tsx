import React from "react";
import { CRS, type LatLngTuple } from "leaflet";
import {
  ImageOverlay,
  MapContainer,
  Marker,
  Popup,
  Rectangle,
  Tooltip,
} from "react-leaflet";
import convertCoordinatesToLatLng from "~/lib/convertCoordinatesToLatLng";
import worldGuardRegions from "data/regions.json";
import privateRegions from "data/privateRegions.json";

// leaflet
import "leaflet/dist/leaflet.css";
import L from "leaflet";
L.Icon.Default.imagePath = "images/";

export default function Map() {
  const bounds = [[0, 0] as LatLngTuple, [125, 100] as LatLngTuple];
  const maxBounds = [[-20, -25] as LatLngTuple, [170, 150] as LatLngTuple];

  return (
    <>
      <MapContainer
        crs={CRS.Simple}
        minZoom={4}
        zoom={4}
        id="mapContainer"
        className="h-screen w-full rounded-sm"
        center={[90, 50]}
        maxBounds={maxBounds}
      >
        <ImageOverlay
          url="images/lotrModMap.png"
          bounds={bounds}
          className="border-2 border-yellow-400 brightness-75 contrast-125"
        />
        {Object.entries(worldGuardRegions.regions).map(([key, val]) => {
          if (privateRegions.includes(key)) return;

          const [minLatLong, maxLatLong] = convertCoordinatesToLatLng(
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
            [val.min.x, val.min.z],
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
            [val.max.x, val.max.z]
          );

          return (
            <>
              <Rectangle
                key={key}
                bounds={[minLatLong, maxLatLong]}
                color="#4CAF50"
              >
                <Tooltip direction="right" permanent opacity={0.9}>
                  {`${key.charAt(0).toUpperCase()}${key.slice(1)}`}
                </Tooltip>
              </Rectangle>
            </>
          );
        })}
      </MapContainer>
    </>
  );
}
