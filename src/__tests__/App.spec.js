import { mount } from "@vue/test-utils";
import App from "../App.vue";

// jsdom doesn't implement scrollIntoView, which the "VER TODOS" toggle uses
Element.prototype.scrollIntoView = () => {};

describe("Portfolio page", () => {
  it("renders required sections", () => {
    const wrapper = mount(App);

    expect(wrapper.find("#hero").exists()).toBe(true);
    expect(wrapper.find("#about").exists()).toBe(true);
    expect(wrapper.find("#experience").exists()).toBe(true);
    expect(wrapper.find("#portfolio").exists()).toBe(true);
    expect(wrapper.find("#skills").exists()).toBe(true);
    expect(wrapper.find("#footer").exists()).toBe(true);
  });

  it("shows exactly two project cards", () => {
    const wrapper = mount(App);

    expect(wrapper.findAll("#portfolio article")).toHaveLength(2);
  });

  it("opens project links in a new tab", () => {
    const wrapper = mount(App);

    for (const link of wrapper.findAll(".project-card-link")) {
      expect(link.attributes("target")).toBe("_blank");
      expect(link.attributes("rel")).toContain("noopener");
    }
  });

  it("gives every link a readable name (no empty overlay links)", async () => {
    const wrapper = mount(App);
    await wrapper.find(".view-link").trigger("click");

    for (const link of wrapper.findAll("a")) {
      const name = link.attributes("aria-label") || link.text();
      expect(name.trim()).not.toBe("");
    }
    for (const card of wrapper.findAll(".project-card")) {
      const links = card.findAll("a");
      expect(links).toHaveLength(1);
      expect(links[0].text()).toContain(card.find("h3").text().split(" (")[0]);
    }
  });

  it("skips the smooth scroll when the user prefers reduced motion", async () => {
    const calls = [];
    const original = Element.prototype.scrollIntoView;
    Element.prototype.scrollIntoView = (options) => calls.push(options);
    window.matchMedia = (query) => ({
      matches: query === "(prefers-reduced-motion: reduce)",
    });

    const wrapper = mount(App);
    await wrapper.find(".view-link").trigger("click");
    await wrapper.vm.$nextTick();

    expect(calls[0].behavior).toBe("auto");
    delete window.matchMedia;
    Element.prototype.scrollIntoView = original;
  });
});

describe("Content", () => {
  it("makes email and phone clickable", () => {
    const wrapper = mount(App);

    expect(wrapper.find('a[href^="mailto:"]').exists()).toBe(true);
    expect(wrapper.find('a[href^="tel:"]').exists()).toBe(true);
  });

  it("lists skills without percentage levels", () => {
    const wrapper = mount(App);

    expect(wrapper.findAll("#skills .skill-chips li").length).toBeGreaterThan(
      0,
    );
    expect(wrapper.find("#skills").text()).not.toMatch(/\d+%/);
  });

  it("shows experience entries with their tasks", () => {
    const wrapper = mount(App);
    const text = wrapper.find("#experience").text();

    expect(text).toContain("Mango");
    expect(text).toContain("Endesa");
    expect(
      wrapper.findAll("#experience .timeline-tasks li").length,
    ).toBeGreaterThan(0);
  });
});

describe("Mobile menu", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(App, { attachTo: document.body });
    await wrapper.find(".menu-toggle").trigger("click");
  });

  afterEach(() => wrapper.unmount());

  const isOpen = () =>
    wrapper.find(".menu-toggle").attributes("aria-expanded") === "true";

  it("closes on Escape and returns focus to the toggle", async () => {
    expect(isOpen()).toBe(true);

    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    await wrapper.vm.$nextTick();

    expect(isOpen()).toBe(false);
    expect(document.activeElement).toBe(wrapper.find(".menu-toggle").element);
  });

  it("closes when tapping outside the header", async () => {
    wrapper
      .find("#about")
      .element.dispatchEvent(new Event("pointerdown", { bubbles: true }));
    await wrapper.vm.$nextTick();

    expect(isOpen()).toBe(false);
  });

  it("stays open when tapping inside the menu", async () => {
    wrapper
      .find("#mobile-menu")
      .element.dispatchEvent(new Event("pointerdown", { bubbles: true }));
    await wrapper.vm.$nextTick();

    expect(isOpen()).toBe(true);
  });
});

describe("All projects", () => {
  it("reports expanded state and the selected filter", async () => {
    const wrapper = mount(App);
    const toggle = wrapper.find(".view-link");

    expect(toggle.attributes("aria-expanded")).toBe("false");
    await toggle.trigger("click");
    expect(toggle.attributes("aria-expanded")).toBe("true");
    expect(wrapper.find("#all-projects").exists()).toBe(true);

    const chips = wrapper.findAll(".filter-chip");
    await chips[1].trigger("click");

    expect(chips[0].attributes("aria-pressed")).toBe("false");
    expect(chips[1].attributes("aria-pressed")).toBe("true");
  });

  it("builds one filter per category and shows an image on every card", async () => {
    const wrapper = mount(App);
    await wrapper.find(".view-link").trigger("click");

    const filters = wrapper.findAll(".filter-chip").map((chip) => chip.text());
    expect(filters).toEqual(["TODOS", "React", "JavaScript", "Vue.js"]);

    const cards = wrapper.findAll("#all-projects article");
    expect(cards).toHaveLength(7);
    for (const card of cards) {
      expect(card.find("img").attributes("src")).toMatch(/\.webp$/);
    }

    await wrapper.findAll(".filter-chip")[3].trigger("click");
    expect(wrapper.findAll("#all-projects article")).toHaveLength(1);
  });
});
