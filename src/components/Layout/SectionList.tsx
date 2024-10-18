import React from "react";
import slugify from "~/utils/slugify";

type Props = {
  sectionList: string[];
};
const SectionList = ({ sectionList }: Props) => {
  return (
    <aside className="sticky top-10 hidden flex-1 flex-col gap-1 lg:flex">
      <h3
        className={`mb-1 mt-0 font-semibold text-white ${
          sectionList.length ? `` : `hidden`
        }`}
      >
        Na tej stronie
      </h3>
      {sectionList &&
        sectionList.map((section) => {
          return (
            <a
              key={section}
              href={`#${slugify(section)}`}
              className=" mb-1 text-sm font-medium text-gray-400 hover:text-gray-200"
            >
              {section}
            </a>
          );
        })}
    </aside>
  );
};

export default SectionList;
