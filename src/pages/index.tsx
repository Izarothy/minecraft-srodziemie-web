import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import markdownToHtml from "~/utils/markdownToHtml";
import { getPostBySlug } from "~/utils/markdownUtils";

const imageNames: string[] = ["dale-gosciniec", "dale-sala", "linhir-karczma"];

type Props = {
  content: string;
};
export default function Home({ content }: Props) {
  const [screenWidth, setScreenWidth] = useState(0);
  const [hoverText, setTooltipText] = useState("Kliknij, by skopiować");
  const [currentImage, setCurrentImage] = useState<string>();
  const [isTooltipShown, setTooltipShown] = useState(false);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      const currentSeconds = new Date().getSeconds();
      if (currentSeconds > 40) setCurrentImage(imageNames[2]);
      else if (currentSeconds > 20) setCurrentImage(imageNames[1]);
      else setCurrentImage(imageNames[0]);
    }, 500);
    setScreenWidth(window.innerWidth);

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(imageInterval);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Minecraft Śródziemie</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Społeczność graczy zaprasza na serwer Minecraft RP osadzony w Śródziemiu J. R. R. Tolkiena! Całość rozgrywki odbywa się w Śródziemiu, ale nie trzeba znać historii świata Tolkiena by dołączyć – na razie budujemy miasta i wioski, zaludniamy wsie i drążymy podziemne osady"
        />
        <meta property="og:title" content="Minecraft Śródziemie" />
        <meta
          property="og:description"
          content="Społeczność graczy zaprasza na serwer Minecraft RP osadzony w Śródziemiu J. R. R. Tolkiena! Całość rozgrywki odbywa się w Śródziemiu, ale nie trzeba znać historii świata Tolkiena by dołączyć – na razie budujemy miasta i wioski, zaludniamy wsie i drążymy podziemne osady"
        />
        <meta
          property="og:url"
          content="https://minecraft-srodziemie.vercel.app/"
        />
      </Head>
      {currentImage ? (
        <>
          <header className=" relative flex h-screen w-full flex-col items-center ">
            <Image
              src={`/images/${currentImage}.png`}
              fill
              priority
              alt="Tło"
              className="object-cover opacity-70"
            />
            <span className="relative top-1/3 flex flex-col items-center gap-4">
              <h1 className="mb-8 text-3xl drop-shadow-lg sm:text-5xl lg:text-7xl">
                Minecraft Śródziemie
              </h1>
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
                    className="border-0 bg-dark/60"
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
                <a
                  href="#install"
                  className="btn  bg-cta  transition  hover:font-bold"
                >
                  Instalacja
                </a>
                <button className="border-discord bg-discord ">
                  <a
                    href="https://discord.gg/6uddsDd"
                    className=" text-white hover:font-bold"
                  >
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
      ) : (
        <div className="flex h-screen items-center justify-center text-3xl font-bold">
          Ładowanie...
        </div>
      )}
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

/*
merge to mdx

left - page list
right - section list - comes from 


*/
