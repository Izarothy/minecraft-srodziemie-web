import L, { CRS, type LatLngTuple, Canvas } from "leaflet";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  ImageOverlay,
  MapContainer,
  Rectangle,
  Tooltip,
  useMap,
} from "react-leaflet";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import "leaflet/dist/leaflet.css";

/*
 * Coordinate mapping for LOTR Middle Earth dimension
 * Source: minecraft-lotr-map-overlay/lotr_mod/data/lotr/map/map.json
 * Map Image: 2000 x 1800 pixels
 * Origin: x=810, z=730 (Pixel coordinates where world 0,0 is located)
 * Scale Power: 7 => 2^7 = 128 blocks per pixel
 *
 * Region covers 512x512 blocks.
 * Region Size in Pixels = 512 / 128 = 4 pixels.
 */

const MAP_WIDTH = 2000;
const MAP_HEIGHT = 1800;
const ORIGIN_X = 810;
const ORIGIN_Z = 730;
const BLOCKS_PER_PIXEL = 128; // 2^7
const REGION_BLOCKS = 512;
const PIXELS_PER_REGION = 4; // 512 / 128

// Canvas renderer for better performance with many regions
const canvasRenderer = new Canvas({ padding: 0.5 });

const MAP_BOUNDS: [LatLngTuple, LatLngTuple] = [
  [-MAP_HEIGHT, 0],
  [0, MAP_WIDTH],
];

function regionToBounds(
  regionX: number,
  regionZ: number
): [LatLngTuple, LatLngTuple] {
  const pixelX = ORIGIN_X + (regionX * REGION_BLOCKS) / BLOCKS_PER_PIXEL;
  const pixelZ = ORIGIN_Z + (regionZ * REGION_BLOCKS) / BLOCKS_PER_PIXEL;

  const lfX1 = pixelX;
  const lfY1 = -pixelZ;

  const lfX2 = pixelX + PIXELS_PER_REGION;
  const lfY2 = -(pixelZ + PIXELS_PER_REGION);

  return [
    [lfY2, lfX1],
    [lfY1, lfX2],
  ];
}

const MapController = () => {
  const map = useMap();
  useEffect(() => {
    map.setView([-ORIGIN_Z, ORIGIN_X], 0);
  }, [map]);
  return null;
};

export default function RegionViewer() {
  const router = useRouter();

  // Parse auth token from URL
  const authToken =
    typeof router.query.auth === "string" ? router.query.auth : null;
  const isAuthenticated = !!authToken;

  // Fetch regions from FTP
  const {
    data,
    isLoading,
    error,
    refetch,
  } = api.region.list.useQuery(undefined, {
    refetchOnWindowFocus: false,
    staleTime: 60000,
    retry: 2,
  });

  // Delete mutation
  const deleteMutation = api.region.delete.useMutation({
    onSuccess: () => {
      setDeleteTarget(null);
      void refetch();
    },
  });

  // Delete confirmation state
  const [deleteTarget, setDeleteTarget] = useState<{
    x: number;
    z: number;
  } | null>(null);

  // Local "removed" state for visual toggling (non-delete mode)
  const [removed, setRemoved] = useState<Set<string>>(new Set());
  const [exporting, setExporting] = useState(false);

  const regions = useMemo(() => data?.regions ?? [], [data]);

  const visible = regions.length - removed.size;
  const progress = Math.round((visible / regions.length) * 100) || 0;

  // Handle left click - toggle visibility
  const handleRegionClick = useCallback((x: number, z: number) => {
    const key = `${x},${z}`;
    setRemoved((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }, []);

  // Handle right click - delete (when authenticated)
  const handleRegionRightClick = useCallback(
    (x: number, z: number, e: L.LeafletMouseEvent) => {
      e.originalEvent.preventDefault();
      if (isAuthenticated) {
        setDeleteTarget({ x, z });
      }
    },
    [isAuthenticated]
  );

  const handleConfirmDelete = useCallback(() => {
    if (deleteTarget && authToken) {
      deleteMutation.mutate({
        x: deleteTarget.x,
        z: deleteTarget.z,
        authToken,
      });
    }
  }, [deleteTarget, authToken, deleteMutation]);

  const handleExport = async () => {
    setExporting(true);
    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = "/images/middle_earth.png";
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
      });

      const canvas = document.createElement("canvas");
      canvas.width = MAP_WIDTH;
      canvas.height = MAP_HEIGHT;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("No context");

      ctx.drawImage(img, 0, 0);
      ctx.fillStyle = "rgba(16, 185, 129, 0.5)";

      regions.forEach(({ x, z }) => {
        if (removed.has(`${x},${z}`)) return;
        const px = ORIGIN_X + (x * REGION_BLOCKS) / BLOCKS_PER_PIXEL;
        const pz = ORIGIN_Z + (z * REGION_BLOCKS) / BLOCKS_PER_PIXEL;
        ctx.fillRect(px, pz, PIXELS_PER_REGION, PIXELS_PER_REGION);
      });

      const link = document.createElement("a");
      link.download = `mapa-srodziemia-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (e) {
      console.error(e);
      alert("Wystapil blad podczas eksportowania mapy.");
    }
    setExporting(false);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#050505]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-500/30 border-t-emerald-500" />
          <p className="text-sm font-medium text-zinc-400">
            Ladowanie regionow z FTP...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#050505]">
        <div className="text-center">
          <p className="text-red-400 mb-2">Blad ladowania regionow</p>
          <p className="text-sm text-zinc-500 mb-4">{error.message}</p>
          <button
            onClick={() => void refetch()}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white transition"
          >
            Sprobuj ponownie
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex h-screen w-screen bg-[#050505] text-zinc-300 font-sans overflow-hidden selection:bg-emerald-500/30">
        {/* Sidebar */}
        <aside className="w-80 flex-shrink-0 border-r border-zinc-800/50 bg-[#0a0a0a] flex flex-col z-20 shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-zinc-900">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              <h1 className="text-lg font-medium text-zinc-100 tracking-tight">
                Eksplorator
              </h1>
            </div>
            <p className="text-xs text-zinc-500 font-mono pl-5">
              LOTR MOD - MINECRAFT
            </p>
          </div>

          {/* Admin indicator */}
          {isAuthenticated && (
            <div className="p-4 mx-4 mt-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm font-medium flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Tryb administratora
              </p>
              <p className="text-xs text-zinc-500 mt-1">
                PPM na region, aby go usunac
              </p>
            </div>
          )}

          {/* Stats */}
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Postep odkrywania</span>
                <span className="text-emerald-400 font-mono">{progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-4 flex flex-col items-center justify-center gap-1 group hover:border-zinc-700 transition">
                <span className="text-2xl font-semibold text-zinc-100">
                  {visible}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-zinc-600 group-hover:text-zinc-500">
                  Widoczne
                </span>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-4 flex flex-col items-center justify-center gap-1 group hover:border-zinc-700 transition">
                <span className="text-2xl font-semibold text-zinc-100">
                  {removed.size}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-zinc-600 group-hover:text-zinc-500">
                  Ukryte
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-auto p-6 space-y-3 bg-zinc-900/20">
            <button
              onClick={() => setRemoved(new Set())}
              className="w-full py-3 px-4 rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition flex items-center justify-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Resetuj widok
            </button>
            <button
              onClick={() => void handleExport()}
              disabled={exporting}
              className="w-full py-3 px-4 rounded-lg text-sm font-medium bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white transition shadow-lg shadow-emerald-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {exporting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Przetwarzanie...</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  <span>Eksportuj PNG</span>
                </>
              )}
            </button>
            <p className="text-[10px] text-center text-zinc-600 mt-2">
              {isAuthenticated
                ? "LPM: ukryj/pokaz | PPM: usun region"
                : "Kliknij region na mapie, aby go przelaczac."}
            </p>
          </div>
        </aside>

        {/* Map Area */}
        <div className="flex-1 relative bg-black">
          <MapContainer
            center={[-ORIGIN_Z, ORIGIN_X]}
            zoom={0}
            minZoom={-2}
            maxZoom={4}
            crs={CRS.Simple}
            className="h-full w-full bg-[#050505] outline-none"
            attributionControl={false}
            zoomControl={false}
            zoomSnap={0.25}
            zoomDelta={0.5}
            wheelPxPerZoomLevel={120}
            inertia={true}
            inertiaDeceleration={2000}
            easeLinearity={0.15}
            preferCanvas={true}
            renderer={canvasRenderer}
          >
            <ImageOverlay url="/images/middle_earth.png" bounds={MAP_BOUNDS} />
            {regions.map(({ x, z }) => {
              const key = `${x},${z}`;
              const isRemoved = removed.has(key);
              const bounds = regionToBounds(x, z);

              return (
                <Rectangle
                  key={key}
                  bounds={bounds}
                  pathOptions={{
                    color: isRemoved ? "#3f3f46" : "#10b981",
                    weight: isRemoved ? 0.5 : 0.8,
                    fillColor: isRemoved ? "#18181b" : "#10b981",
                    fillOpacity: isRemoved ? 0 : 0.4,
                  }}
                  eventHandlers={{
                    click: () => handleRegionClick(x, z),
                    contextmenu: (e) => handleRegionRightClick(x, z, e),
                  }}
                >
                  <Tooltip
                    sticky
                    className="!bg-zinc-900 !border-zinc-700 !text-zinc-200 !text-xs !px-3 !py-1.5 !rounded-lg !shadow-xl !font-mono"
                    direction="top"
                    offset={[0, -5]}
                  >
                    r.{x}.{z}
                  </Tooltip>
                </Rectangle>
              );
            })}
            <MapController />
          </MapContainer>

          {/* Floating Map Controls */}
          <div className="absolute top-6 right-6 z-[400] flex flex-col gap-2">
            <div className="bg-zinc-900/90 backdrop-blur border border-zinc-800 rounded-lg p-2 text-zinc-400 text-xs font-mono shadow-xl">
              MAP: {MAP_WIDTH}x{MAP_HEIGHT}
            </div>
          </div>
        </div>
      </div>

      {/* Delete confirmation modal */}
      <DeleteConfirmModal
        regionX={deleteTarget?.x ?? 0}
        regionZ={deleteTarget?.z ?? 0}
        isOpen={deleteTarget !== null}
        isDeleting={deleteMutation.isLoading}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}
