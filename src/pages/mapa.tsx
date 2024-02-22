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
        <title>Mapa</title>
      </Head>
      <main className="min-h-screen w-screen">
        <Map />
      </main>
    </>
  );
};

export default Mapa;
