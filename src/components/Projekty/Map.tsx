import React from "react";
import { CRS, type LatLngTuple } from "leaflet";
import {
  ImageOverlay,
  MapContainer,
  Marker,
  Popup,
  Rectangle,
} from "react-leaflet";
import convertCoordinatesToLatLng from "~/lib/convertCoordinatesToLatLng";
import worldGuardRegions from "data/regions.json";

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
        className="h-screen w-full rounded-sm border-4 border-yellow-600 "
        center={[90, 50]}
        maxBounds={maxBounds}
      >
        <ImageOverlay url="images/lotrModMap.png" bounds={bounds} />
        {Object.entries(worldGuardRegions.regions).map(([key, val]) => {
          const [minLatLong, maxLatLong] = convertCoordinatesToLatLng(
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
            [val.min.x, val.min.z],
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
            [val.max.x, val.max.z]
          );

          const centerLatLong = [
            (minLatLong[0] + maxLatLong[0]) / 2,
            (minLatLong[1] + maxLatLong[1]) / 2,
          ] as LatLngTuple;
          return (
            <>
              <Marker position={centerLatLong}>
                <Popup>{`${key.charAt(0).toUpperCase()}${key.slice(1)}`}</Popup>
              </Marker>
              <Rectangle
                key={key}
                bounds={[minLatLong, maxLatLong]}
                color="yellow"
              />
            </>
          );
        })}
      </MapContainer>
    </>
  );
}
