import Head from "next/head";
import React from "react";
import dynamic from "next/dynamic";

const RegionViewer = dynamic(() => import("../components/Mapa/RegionViewer"), {
	ssr: false,
	loading: () => (
		<div className="flex h-screen w-screen items-center justify-center bg-slate-950">
			<div className="flex flex-col items-center gap-4">
				<div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-500/30 border-t-emerald-500" />
				<p className="text-sm font-medium text-slate-400">Ładowanie mapy...</p>
			</div>
		</div>
	),
});

const Regiony = () => {
	return (
		<>
			<Head>
				<title>Przeglądarka Regionów - Minecraft Śródziemie</title>
				<link rel="icon" href="/favicon.ico" />
				<meta
					name="description"
					content="Interaktywna mapa zbadanych regionów na serwerze Minecraft Śródziemie. Przeglądaj odkryte obszary Śródziemia, oznaczaj regiony i eksportuj mapę jako PNG."
				/>
				<meta
					property="og:description"
					content="Interaktywna mapa zbadanych regionów na serwerze Minecraft Śródziemie. Przeglądaj odkryte obszary Śródziemia, oznaczaj regiony i eksportuj mapę jako PNG."
				/>
				<meta property="og:title" content="Przeglądarka Regionów - Minecraft Śródziemie" />
				<meta property="og:type" content="website" />
				<meta
					property="og:url"
					content="https://minecraft-srodziemie.vercel.app/regiony"
				/>
				<meta name="theme-color" content="#0f172a" />
			</Head>
			<main className="min-h-screen w-screen bg-slate-950">
				<RegionViewer />
			</main>
		</>
	);
};

export default Regiony;
