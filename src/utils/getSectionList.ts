const getSectionList = (content: string): string[] => {
  const sectionList: string[] = [];
  content.split("\n").forEach((line) => {
    if (line.startsWith("## ")) sectionList.push(line.replace("## ", ""));
  });

  return sectionList;
};

export default getSectionList;
