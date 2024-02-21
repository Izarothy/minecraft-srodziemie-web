import Head from "next/head";
import React from "react";
import PageList from "~/components/Layout/PageList";
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
      <main className="min-h-screen w-[90%] py-16 lg:w-[80%]">
        <section className="relative flex justify-between gap-16 pt-12 ">
          <PageList />
          <Map />
        </section>
      </main>
    </>
  );
};

export default Mapa;
