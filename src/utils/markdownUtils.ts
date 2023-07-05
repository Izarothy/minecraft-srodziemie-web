import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import slugify from "./slugify";

const postsDirectory = join(process.cwd(), "/data");

const emptyPost = {
  slug: "",
  title: "",
  content: "",
  category: "",
};

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = slugify(slug);
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);
  if (typeof data.title === "string" && typeof data.category === "string") {
    const pageContents = {
      slug: realSlug,
      title: data.title,
      category: data.category,
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
