import Link from "next/link";
import React from "react";
import { api } from "~/utils/api";

const PageList = () => {
  const allPages = api.page.getAllPages.useQuery().data;

  return (
    <aside className="sticky top-10 hidden flex-1 flex-col gap-4 md:flex">
      <Link href={"/"} className="order-first ">
        <span className=" font-bold text-white">Strona Główna</span>
      </Link>
      <span className="flex flex-col font-semibold text-white">
        Artykuły
        {allPages?.map(({ title, slug }) => {
          const isHomepage = slug === "index";
          const path = isHomepage ? "/" : `/artykuly/${slug}`;

          if (!isHomepage)
            return (
              <Link href={path} key={title}>
                <span className="text-sm font-light text-gray-400 hover:text-gray-200">
                  {title}
                </span>
              </Link>
            );
        })}
      </span>
    </aside>
  );
};

export default PageList;
