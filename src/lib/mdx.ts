import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Fungi } from "@/types";

const contentDirectory = path.join(process.cwd(), "src/content/fungi");

export async function getAllFungi(): Promise<Fungi[]> {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(contentDirectory);
  const allFungi = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug: fileName.replace(/\.mdx$/, ""),
        title: data.title,
        latinName: data.latinName,
        season: data.season,
        habitat: data.habitat,
        edibility: data.edibility,
        summary: data.summary,
        content,
        image: data.image,
      };
    });

  return allFungi.sort((a, b) => a.title.localeCompare(b.title));
}

export async function getFungiBySlug(slug: string): Promise<Fungi | null> {
  const fullPath = path.join(contentDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title,
    latinName: data.latinName,
    season: data.season,
    habitat: data.habitat,
    edibility: data.edibility,
    summary: data.summary,
    content,
    image: data.image,
  };
}
