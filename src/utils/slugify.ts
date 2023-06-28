const slugify = (name: string): string => {
  const slugifiedName = name
    .toLowerCase()
    .trim()
    .replace(".md", "")
    .replace(" ", "-")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  return slugifiedName;
};

export default slugify;
