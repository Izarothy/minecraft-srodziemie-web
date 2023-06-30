import Head from "next/head";
import React from "react";
import EffectPicker from "~/components/Tools/EffectPicker";
import ToolSection from "~/components/Tools/ToolSection";

const Narzedzia = () => {
  return (
    <>
      <Head>
        <title>Narzędzia</title>
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
