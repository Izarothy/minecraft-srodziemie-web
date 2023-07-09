const baseDescription =
  "Społeczność graczy zaprasza na serwer Minecraft RP osadzony w Śródziemiu J. R. R. Tolkiena! Całość rozgrywki odbywa się w Śródziemiu, ale nie trzeba znać historii świata Tolkiena by dołączyć – na razie budujemy miasta i wioski, zaludniamy wsie i drążymy podziemne osady";

const getDescription = (content: string) => {
  let description = baseDescription;
  content.split("\n").forEach((line) => {
    if (
      description === baseDescription &&
      line.length > 0 &&
      !line.startsWith("#")
    ) {
      description = line;
    }
  });

  if (description.length > 240)
    description = `${description.substring(0, 240)}...`;

  return description;
};

export default getDescription;
