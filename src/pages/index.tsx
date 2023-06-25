import Head from "next/head";
import markdownToHtml from "~/utils/markdownToHtml";
import { getPostBySlug } from "~/utils/markdownUtils";

type Props = {
  content: string;
};
export default function Home({ content }: Props) {
  return (
    <>
      <Head>
        <title>Minecraft Śródziemie</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <h1 className="text-3xl font-semibold lg:mb-16 lg:text-5xl">
          Minecraft Śródziemie
        </h1>
        {content && (
          <article
            className="text-justify xl:w-1/2"
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
    const htmlContent = await markdownToHtml(page?.content);
    return {
      props: {
        content: htmlContent,
      },
    };
  }
};
