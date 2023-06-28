import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import PageList from "~/components/PageList";
import SectionList from "~/components/SectionList";
import getSectionList from "~/utils/getSectionList";
import { getAllPosts, getPostBySlug } from "~/utils/markdownUtils";
import slugify from "~/utils/slugify";
type Props = {
  content: string;
  title: string;
  sectionList: string[];
};

const Post = ({ content, title, sectionList }: Props) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        {process.env.VERCEL_URL && (
          <meta
            property="og:url"
            content={`${process.env.VERCEL_URL}/${router.asPath}`}
          />
        )}
        <meta
          property="og:description"
          content="Społeczność graczy zaprasza na serwer Minecraft RP osadzony w Śródziemiu J. R. R. Tolkiena! Całość rozgrywki odbywa się w Śródziemiu, ale nie trzeba znać historii świata Tolkiena by dołączyć – na razie budujemy miasta i wioski, zaludniamy wsie i drążymy podziemne osady"
        />
      </Head>
      <>
        <main className="mt-8 flex gap-4 px-8 sm:px-16 xl:mt-48 xl:w-[70%]">
          <PageList />
          <article className="flex-[3]">
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
      </>
    </>
  );
};

export default Post;

type Params = {
  params: {
    slug: string;
  };
};

export const getStaticProps = ({ params }: Params) => {
  const { content, title } = getPostBySlug(params.slug);
  const sectionList = getSectionList(content);
  return {
    props: {
      title,
      content,
      sectionList,
    },
  };
};

export const getStaticPaths = () => {
  const allPosts = getAllPosts();

  return {
    paths: allPosts?.map((post) => {
      return {
        params: {
          slug: post?.slug,
        },
      };
    }),
    fallback: false,
  };
};
