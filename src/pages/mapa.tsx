import Head from "next/head";
import React from "react";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/Mapa/Map"), {
  ssr: false,
});

const Mapa = () => {
  return (
    <>
      <Head>
        <title>Mapa - Minecraft Śródziemie</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Społeczność graczy zaprasza na serwer Minecraft RP osadzony w Śródziemiu J. R. R. Tolkiena! Całość rozgrywki odbywa się w Śródziemiu, ale nie trzeba znać historii świata Tolkiena by dołączyć – na razie budujemy miasta i wioski, zaludniamy wsie i drążymy podziemne osady"
        />
        <meta
          property="og:description"
          content="Społeczność graczy zaprasza na serwer Minecraft RP osadzony w Śródziemiu J. R. R. Tolkiena! Całość rozgrywki odbywa się w Śródziemiu, ale nie trzeba znać historii świata Tolkiena by dołączyć – na razie budujemy miasta i wioski, zaludniamy wsie i drążymy podziemne osady"
        />
        <meta property="og:title" content="Mapa - Minecraft Śródziemie" />
        <meta
          property="og:url"
          content="https://minecraft-srodziemie.vercel.app/mapa"
        />
      </Head>
      <main className="min-h-screen w-screen">
        <Map />
      </main>
    </>
  );
};

export default Mapa;
