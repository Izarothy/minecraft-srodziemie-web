import privateRegions from "data/privateRegions.json";
import worldGuardRegions from "data/regions.json";
import { CRS, type LatLngTuple } from "leaflet";
import React from "react";
import {
	ImageOverlay,
	MapContainer,
	Marker,
	Popup,
	Rectangle,
	Tooltip,
} from "react-leaflet";
import convertCoordinatesToLatLng from "~/lib/convertCoordinatesToLatLng";

// leaflet
import "leaflet/dist/leaflet.css";
import L from "leaflet";
L.Icon.Default.imagePath = "images/";

export default function WorldMap() {
	const bounds = [[0, 0] as LatLngTuple, [125, 100] as LatLngTuple];
	const maxBounds = [[-20, -25] as LatLngTuple, [170, 150] as LatLngTuple];

	return (
		<>
			<MapContainer
				crs={CRS.Simple}
				minZoom={4}
				zoom={5}
				id="mapContainer"
				className="h-screen w-full rounded-sm"
				center={[90, 50]}
				maxBounds={maxBounds}
			>
				<ImageOverlay
					url="images/lotrModMap.png"
					bounds={bounds}
					className=" border-2 border-yellow-400 brightness-75 "
				/>
				{Object.entries(worldGuardRegions.regions).map(([key, val]) => {
					console.log(
						`Checking region: ${key}, isPrivate: ${String(privateRegions.includes(key))}`,
					);
					if (privateRegions.includes(key)) return null;

					if ("min" in val && "max" in val) {
						const [minLatLong, maxLatLong] = convertCoordinatesToLatLng(
							[val.min.x, val.min.z],
							[val.max.x, val.max.z],
						);

						let regionName = key.charAt(0).toUpperCase() + key.slice(1);
						if (regionName === "Carastamo1") regionName = "Ras Morthil";

						return (
							<>
								<Rectangle
									key={key}
									bounds={[minLatLong, maxLatLong]}
									color="#4CAF50"
								>
									<Tooltip direction="right" permanent opacity={0.9}>
										{regionName}
									</Tooltip>
								</Rectangle>
							</>
						);
					}

					return null; // Return null for regions without min/max properties
				})}
			</MapContainer>
		</>
	);
}
