import React from "react";
import { CRS, type LatLngTuple } from "leaflet";
import { ImageOverlay, MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Map() {
  const bounds = [[0, 0] as LatLngTuple, [125, 100] as LatLngTuple];
  const maxBounds = [[-20, -25] as LatLngTuple, [170, 150] as LatLngTuple];

  return (
    <>
      <MapContainer
        crs={CRS.Simple}
        minZoom={4}
        maxZoom={5}
        zoom={4}
        className="h-screen w-full"
        center={[90, 50]}
        maxBounds={maxBounds}
      >
        <ImageOverlay
          url="https://cdn.discordapp.com/attachments/720275065740066867/1209498445077807154/lotrModMap.png?ex=65e72434&is=65d4af34&hm=e2eedd58b24ce210fadf2cbbec2514d77fed2fe9287bcaa780d50e5419d010ff&"
          bounds={bounds}
        />
      </MapContainer>
    </>
  );
}
