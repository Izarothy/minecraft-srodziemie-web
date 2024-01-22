import Head from "next/head";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import ImageShowcase from "~/components/Index/ImageShowcase";
import PageList from "~/components/Layout/PageList";
import SectionList from "~/components/Layout/SectionList";
import getSectionList from "~/utils/getSectionList";
import { getPostBySlug } from "~/utils/markdownUtils";
import slugify from "~/utils/slugify";
import Header from "~/components/Index/Header";

type Props = {
  content: string;
  sectionList: string[];
};

export default function Home({ content, sectionList }: Props) {
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
      <>
        <Header />
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
