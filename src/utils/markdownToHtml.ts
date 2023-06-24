import { remark } from "remark";
import html from "remark-html";
import remarkBreaks from "remark-breaks";

export default async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).use(remarkBreaks).process(markdown);
  return result.toString();
}
