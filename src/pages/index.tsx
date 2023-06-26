import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import markdownToHtml from "~/utils/markdownToHtml";
import { getPostBySlug } from "~/utils/markdownUtils";

type Props = {
  content: string;
};
export default function Home({ content }: Props) {
  const [screenWidth, setScreenWidth] = useState(0);
  const [hoverText, setTooltipText] = useState("Kliknij, by skopiować");

  const [isTooltipShown, setTooltipShown] = useState(false);

  useEffect(() => {
    setScreenWidth(window.innerWidth);

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Minecraft Śródziemie</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Minecraft Śródziemie" />
        <meta
          property="og:description"
          content="Społeczność graczy zaprasza na serwer Minecraft RP osadzony w Śródziemiu J. R. R. Tolkiena! Całość rozgrywki odbywa się w Śródziemiu, ale nie trzeba znać historii świata Tolkiena by dołączyć – na razie budujemy miasta i wioski, zaludniamy wsie i drążymy podziemne osady"
        />
        <meta
          property="og:url"
          content="https://minecraft-srodziemie.vercel.app/"
        />
        <meta />
        <meta />
      </Head>
      <>
        <header className="relative flex h-screen w-full flex-col items-center">
          <Image
            src={"/images/hero.png"}
            fill
            alt="Tło"
            className="object-cover opacity-80"
          />
          <span className="relative top-1/3 flex flex-col items-center gap-4">
            <h1 className="mb-8 text-3xl sm:text-5xl">Minecraft Śródziemie</h1>
            <span className="font-semibold">
              <span className="relative flex flex-col">
                <div
                  className={`${
                    isTooltipShown ? ` ` : `invisible`
                  } mx-auto mb-2 flex-1 rounded-md bg-dark/80 px-6 py-1 text-center text-sm`}
                >
                  {hoverText}
                </div>
                <button
                  className="border-0 bg-dark/40"
                  onMouseEnter={() => {
                    if (screenWidth < 1024) return;
                    setTooltipText("Kliknij, by skopiować");
                    setTooltipShown(true);
                  }}
                  onMouseLeave={() => setTooltipShown(false)}
                  onClick={() => {
                    setTooltipText("Skopiowano ✔");
                    navigator.clipboard
                      .writeText("minecraft-srodziemie.tasrv.com")
                      .catch(console.log);

                    setTooltipShown(true);
                    setTimeout(() => {
                      setTooltipShown(false);
                    }, 1500);
                  }}
                >
                  minecraft-srodziemie.tasrv.com
                </button>
              </span>
            </span>
            <span className="flex gap-2">
              <a href="#install" className="btn text-white">
                Instalacja
              </a>
              <button className="border-discord bg-discord">
                <a href="https://discord.gg/6uddsDd" className="text-white">
                  Discord
                </a>
              </button>
            </span>
          </span>
        </header>
        {content && (
          <article
            className="px-8 text-justify text-gray-300 md:w-1/2 md:p-0"
            dangerouslySetInnerHTML={{ __html: content }}
          ></article>
        )}
      </>
    </>
  );
}

export const getStaticProps = async () => {
  const page = getPostBySlug("index");

  if (typeof page?.content === "string") {
    let htmlContent = await markdownToHtml(page?.content);
    // temp solution before switching to mdx

    htmlContent = htmlContent.replace(
      "<h2>Instalacja</h2>",
      '<h2 id="install">Instalacja</h2>'
    );
    return {
      props: {
        content: htmlContent,
      },
    };
  }
};
