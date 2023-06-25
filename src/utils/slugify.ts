const slugify = (name: string): string => {
  const slugifiedName = name
    .toLowerCase()
    .trim()
    .replace(".md", "")
    .replace(" ", "-");
  return slugifiedName;
};

export default slugify;
