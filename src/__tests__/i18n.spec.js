import { mount } from "@vue/test-utils";
import App from "../App.vue";
import { locale, setLocale, t } from "../i18n.js";
import { projects } from "../data/projects.js";

// Every key used in Spanish must exist in English, and vice versa
const keysOf = (node, prefix = "") =>
  Object.entries(node).flatMap(([key, value]) =>
    value && typeof value === "object" && !Array.isArray(value)
      ? keysOf(value, `${prefix}${key}.`)
      : [`${prefix}${key}`],
  );

describe("Language toggle", () => {
  beforeEach(() => {
    localStorage.clear();
    setLocale("es");
  });

  it("starts in Spanish", () => {
    const wrapper = mount(App);

    expect(document.documentElement.lang).toBe("es");
    expect(wrapper.find("#about h2").text()).toBe("Sobre mí");
    expect(wrapper.find(".lang-toggle").text()).toBe("en");
  });

  it("switches the page to English, and back", async () => {
    const wrapper = mount(App);
    await wrapper.find(".lang-toggle").trigger("click");

    expect(locale.value).toBe("en");
    expect(document.documentElement.lang).toBe("en");
    expect(wrapper.find("#about h2").text()).toBe("About me");
    expect(wrapper.find("#portfolio").text()).toContain(
      projects[0].description.en,
    );
    expect(wrapper.find("#experience").text()).toContain(
      "Application Support Analyst",
    );
    expect(wrapper.find(".lang-toggle").text()).toBe("es");

    await wrapper.find(".lang-toggle").trigger("click");
    expect(wrapper.find("#about h2").text()).toBe("Sobre mí");
  });

  it("remembers the choice", () => {
    setLocale("en");
    expect(localStorage.getItem("locale")).toBe("en");
  });

  it("has every message in both languages", () => {
    setLocale("es");
    const esKeys = keysOf({
      nav: t("nav"),
      header: t("header"),
      common: t("common"),
      hero: t("hero"),
      about: t("about"),
      experience: t("experience"),
      projects: t("projects"),
      skills: t("skills"),
      contact: t("contact"),
      footer: t("footer"),
    });
    for (const key of esKeys) {
      setLocale("en");
      expect(t(key), key).not.toBe(key);
      setLocale("es");
    }
  });
});
