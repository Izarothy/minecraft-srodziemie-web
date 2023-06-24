import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "src/data");

const emptyPost = {
  slug: "",
  title: "",
  content: "",
};

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);
  if (typeof data.title === "string") {
    const pageContents = {
      slug: realSlug,
      title: data.title,
      content,
    };
    return pageContents;
  }

  return emptyPost;
}

export function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = slugs.map((slug) => getPostBySlug(slug));

  if (!posts?.length) return [emptyPost];
  return posts;
}
