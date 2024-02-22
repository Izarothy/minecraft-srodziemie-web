import Head from "next/head";
import React from "react";
import EffectPicker from "~/components/Tools/EffectPicker";
import ToolSection from "~/components/Tools/ToolSection";

const Narzedzia = () => {
  return (
    <>
      <Head>
        <title>Narzędzia - Minecraft Śródziemie</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Społeczność graczy zaprasza na serwer Minecraft RP osadzony w Śródziemiu J. R. R. Tolkiena! Całość rozgrywki odbywa się w Śródziemiu, ale nie trzeba znać historii świata Tolkiena by dołączyć – na razie budujemy miasta i wioski, zaludniamy wsie i drążymy podziemne osady"
        />
        <meta
          property="og:description"
          content="Społeczność graczy zaprasza na serwer Minecraft RP osadzony w Śródziemiu J. R. R. Tolkiena! Całość rozgrywki odbywa się w Śródziemiu, ale nie trzeba znać historii świata Tolkiena by dołączyć – na razie budujemy miasta i wioski, zaludniamy wsie i drążymy podziemne osady"
        />
        <meta property="og:title" content="Narzędzia - Minecraft Śródziemie" />
        <meta
          property="og:url"
          content="https://minecraft-srodziemie.vercel.app/narzedzia"
        />
      </Head>
      <main className="flex min-h-screen w-full flex-col justify-start gap-8 px-32 py-16">
        <ToolSection>
          <EffectPicker />
        </ToolSection>
      </main>
    </>
  );
};

export default Narzedzia;
