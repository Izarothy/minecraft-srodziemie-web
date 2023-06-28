import Link from "next/link";
import React from "react";
import { api } from "~/utils/api";

const PageList = () => {
  const allPages = api.page.getAllPages.useQuery().data;

  return (
    <aside className="sticky top-10 hidden flex-1 flex-col gap-1 text-[0.95rem] font-semibold md:flex">
      {allPages?.map((page) => {
        return (
          <Link
            href={`/artykuly/${page.slug}`}
            key={page.title}
            className={`${page.slug === "index" ? `order-first` : ``}`}
          >
            <span className=" text-white">
              {page.slug === "index" ? "Strona główna" : page.title}
            </span>
          </Link>
        );
      })}
    </aside>
  );
};

export default PageList;
