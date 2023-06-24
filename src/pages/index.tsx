import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Minecraft Śródziemie</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#0e0e12] text-white">
        <h1 className="text-3xl">Minecraft Śródziemie</h1>
      </main>
    </>
  );
}
