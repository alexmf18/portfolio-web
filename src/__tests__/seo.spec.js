import fs from "node:fs";
import path from "node:path";

// Vitest runs from the project root
const root = process.cwd();
const SITE_URL = "https://portfolio-web-alex-morcillo.vercel.app/";

const head = new DOMParser().parseFromString(
  fs.readFileSync(path.join(root, "index.html"), "utf8"),
  "text/html",
).head;

const meta = (attr, name) =>
  head.querySelector(`meta[${attr}="${name}"]`)?.getAttribute("content");

describe("SEO and sharing", () => {
  it("has a description and canonical URL", () => {
    expect(meta("name", "description")?.length).toBeGreaterThan(50);
    expect(
      head.querySelector('link[rel="canonical"]').getAttribute("href"),
    ).toBe(SITE_URL);
  });

  it("has Open Graph tags with an absolute image that exists", () => {
    for (const tag of ["og:title", "og:description", "og:url", "og:image"]) {
      expect(meta("property", tag)).toBeTruthy();
    }
    const image = meta("property", "og:image");
    expect(image.startsWith(SITE_URL)).toBe(true);
    expect(
      fs.existsSync(path.join(root, "public", image.slice(SITE_URL.length))),
    ).toBe(true);
  });

  it("has valid Person structured data", () => {
    const data = JSON.parse(
      head.querySelector('script[type="application/ld+json"]').textContent,
    );
    expect(data["@type"]).toBe("Person");
    expect(data.url).toBe(SITE_URL);
  });

  it("ships the favicon, touch icon, robots.txt and sitemap", () => {
    for (const file of [
      "favicon.ico",
      "apple-touch-icon.png",
      "robots.txt",
      "sitemap.xml",
    ]) {
      expect(fs.existsSync(path.join(root, "public", file))).toBe(true);
    }
    expect(
      fs.readFileSync(path.join(root, "public/robots.txt"), "utf8"),
    ).toContain(`${SITE_URL}sitemap.xml`);
  });
});
