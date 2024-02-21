import Head from "next/head";
import React from "react";
import PageList from "~/components/Layout/PageList";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/Projekty/Map"), {
  ssr: false,
});

const Narzedzia = () => {
  return (
    <>
      <Head>
        <title>Projekty</title>
      </Head>
      <main className="min-h-screen w-[90%] py-16 lg:w-[80%]">
        <header className="mx-auto max-w-md text-center">
          <h1>Postępy</h1>
          <p>
            Sprawdź, jak idzie nam budowa Śródziemia. <br /> Każdy projekt
            znajdziesz w tabelce poniżej
          </p>
        </header>
        <section className="relative flex justify-between gap-16 pt-12 ">
          <PageList />
          <Map />
        </section>
      </main>
    </>
  );
};

export default Narzedzia;
