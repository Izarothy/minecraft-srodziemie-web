import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import ArrowDown from "~/components/Icons/ArrowDown";
import ImageShowcase from "~/components/Index/ImageShowcase";
import PageList from "~/components/Layout/PageList";
import SectionList from "~/components/Layout/SectionList";
import { imageNames, chooseImage } from "~/utils/chooseImage";
import copyToClipboard from "~/utils/copyToClipboard";
import getSectionList from "~/utils/getSectionList";
import handleIPTooltip from "~/utils/handleIPCopy";
import { getPostBySlug } from "~/utils/markdownUtils";
import slugify from "~/utils/slugify";

type Props = {
  content: string;
  sectionList: string[];
};

export default function Home({ content, sectionList }: Props) {
  const [screenWidth, setScreenWidth] = useState(0);
  const [hoverText, setTooltipText] = useState("Kliknij, by skopiować");
  const [currentImage, setCurrentImage] = useState<string>(imageNames[0]);
  const [isTooltipShown, setTooltipShown] = useState(false);

  useEffect(() => {
    const imageInterval = chooseImage(setCurrentImage);
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
          <header className=" relative flex h-screen w-full flex-col sm:h-[75vh]">
            <Image
              src={`/images/${currentImage}.png`}
              fill
              priority
              alt="Tło"
              className="object-cover opacity-50"
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
                    className=" border-0 bg-dark/60 py-2"
                    onMouseEnter={() => {
                      if (screenWidth < 1024) return;
                      setTooltipText("Kliknij, by skopiować");
                      setTooltipShown(true);
                    }}
                    onMouseLeave={() => setTooltipShown(false)}
                    onClick={() => {
                      copyToClipboard("minecraft-srodziemie.tasrv.com");
                      handleIPTooltip(setTooltipText, setTooltipShown);
                    }}
                  >
                    minecraft-srodziemie.tasrv.com
                  </button>
                </span>
              </span>
              <span className="flex gap-2">
                <a
                  href="#instalacja"
                  className="btn inline-flex items-center gap-2 bg-cta px-4"
                >
                  Instalacja <ArrowDown />
                </a>
                <button className="border-discord bg-discord ">
                  <a href="https://discord.gg/6uddsDd" className=" text-white">
                    Discord
                  </a>
                </button>
              </span>
            </span>
          </header>
          {content && (
            <main className="relative flex w-[90%] justify-between gap-16 pt-12 lg:w-[80%]">
              <PageList />
              <article className="flex-[3] px-8 text-gray-300 md:p-0">
                <ReactMarkdown
                  components={{
                    h2: ({ children }) => {
                      return <h2 id={slugify(String(children))}>{children}</h2>;
                    },
                    a: ({ children, href }) => {
                      return (
                        <a target="_blank" href={href}>
                          {children}
                        </a>
                      );
                    },
                  }}
                >
                  {content}
                </ReactMarkdown>
              </article>
              <SectionList sectionList={sectionList} />
            </main>
          )}
          <ImageShowcase />
        </>
      ) : (
        <div className="flex h-screen items-center justify-center text-3xl font-bold">
          Ładowanie...
        </div>
      )}
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps = async () => {
  const { content } = getPostBySlug("index");

  const sectionList = getSectionList(content);
  if (typeof content === "string") {
    return {
      props: {
        content,
        sectionList,
      },
    };
  }
};
