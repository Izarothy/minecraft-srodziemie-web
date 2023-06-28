import React from "react";
import slugify from "~/utils/slugify";

type Props = {
  sectionList: string[];
};
const SectionList = ({ sectionList }: Props) => {
  return (
    <aside className="sticky top-10 hidden flex-1 flex-col text-[0.95rem] lg:flex">
      <h3 className=" mb-1 font-semibold text-white">Na tej stronie</h3>
      {sectionList &&
        sectionList.map((section) => {
          return (
            <a
              key={section}
              href={`#${slugify(section)}`}
              className=" mb-3 text-sm text-[#A1A1A1]"
            >
              {section}
            </a>
          );
        })}
    </aside>
  );
};

export default SectionList;
