import { mount } from "@vue/test-utils";
import BaseIcon from "../components/BaseIcon.vue";
import ProjectCard from "../components/ProjectCard.vue";
import { faGithub } from "../icons.js";
import { projects } from "../data/projects.js";

describe("BaseIcon", () => {
  it("renders the icon path at the icon's own aspect ratio, hidden from screen readers", () => {
    const [width, height, , , path] = faGithub.icon;
    const svg = mount(BaseIcon, { props: { icon: faGithub } }).find("svg");

    expect(svg.attributes("viewBox")).toBe(`0 0 ${width} ${height}`);
    expect(svg.attributes("aria-hidden")).toBe("true");
    expect(svg.find("path").attributes("d")).toBe(path);
  });
});

describe("ProjectCard", () => {
  const project = projects[0];

  it("shows the project's stack, title, description and image", () => {
    const card = mount(ProjectCard, { props: { project } });

    expect(card.find(".meta").text()).toBe(project.stack.join(" · "));
    expect(card.find("h3").text()).toContain(project.title);
    expect(card.text()).toContain(project.description.es);
    expect(card.find("img").attributes()).toMatchObject({
      src: project.img,
      height: String(project.imgHeight),
      loading: "lazy",
    });
  });

  it("links the title to the live project in a new tab", () => {
    const link = mount(ProjectCard, { props: { project } }).find("h3 a");

    expect(link.attributes()).toMatchObject({
      href: project.url,
      target: "_blank",
      rel: "noopener noreferrer",
    });
  });

  it("adds the compact modifier only when asked", () => {
    const regular = mount(ProjectCard, { props: { project } });
    const compact = mount(ProjectCard, { props: { project, compact: true } });

    expect(regular.classes()).not.toContain("compact");
    expect(compact.classes()).toContain("compact");
    expect(compact.find(".project-visual").classes()).toContain("compact");
  });
});

describe("Project data", () => {
  it("gives every project the fields the card needs, with a unique id", () => {
    const ids = new Set();
    for (const p of projects) {
      expect(p).toMatchObject({
        id: expect.any(Number),
        category: expect.any(String),
        title: expect.any(String),
        url: expect.stringMatching(/^https:\/\//),
        img: expect.stringMatching(/^\/images\/.+\.webp$/),
        imgHeight: expect.any(Number),
      });
      expect(p.stack.length).toBeGreaterThan(0);
      ids.add(p.id);
    }
    expect(ids.size).toBe(projects.length);
  });
});
