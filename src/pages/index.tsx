import Head from "next/head";
import { useState } from "react";
import { api } from "~/utils/api";
import markdownToHtml from "~/utils/markdownToHtml";

export default function Home() {
  const pages = api.page.getAllPages.useQuery().data;
  const [pageContent, setPageContent] = useState("");

  if (pages) {
    markdownToHtml(pages[0]?.content || "")
      .then((html) => {
        setPageContent(html);
      })
      .catch(console.log);
  }
  return (
    <>
      <Head>
        <title>Minecraft Śródziemie</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <h1 className="text-3xl font-semibold">Minecraft Śródziemie</h1>
        {pages?.length && (
          <article
            className="w-1/3 text-justify"
            dangerouslySetInnerHTML={{ __html: pageContent }}
          ></article>
        )}
      </>
    </>
  );
}
