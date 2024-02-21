import Link from "next/link";
import React from "react";
import { api } from "~/utils/api";

const PageList = () => {
  const allPages = api.page.getAllPages.useQuery().data;
  return (
    <aside className="sticky top-10 hidden flex-1 flex-col gap-4 md:flex">
      <Link href={"/"} className="order-first ">
        <span className="font-bold text-white">Strona Główna</span>
      </Link>
      <Link href={"/mapa"} className="order-first ">
        <span className="font-bold text-white">Mapa</span>
      </Link>
      <span className="flex flex-col gap-2  text-sm text-white">
        <span className="font-bold text-slate-200">Artykuły</span>
        <div className="flex flex-col gap-2 border-l border-slate-700 pl-4">
          {allPages?.map(({ title, slug }) => {
            const isHomepage = slug === "index";
            const path = isHomepage ? "/" : `/artykuly/${slug}`;
            if (!isHomepage)
              return (
                <Link href={path} key={title}>
                  <span className="font-medium text-gray-400 hover:text-gray-200">
                    {title}
                  </span>
                </Link>
              );
          })}
        </div>
      </span>
    </aside>
  );
};

export default PageList;
