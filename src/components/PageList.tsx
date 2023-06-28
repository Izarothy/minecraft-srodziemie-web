import Link from "next/link";
import React from "react";

const PageList = () => {
  return (
    <aside className="sticky top-10 hidden flex-1 flex-col gap-1 text-[0.95rem] font-semibold md:flex">
      <Link href="/">
        <span className=" text-white">Strona główna</span>
      </Link>
    </aside>
  );
};

export default PageList;
