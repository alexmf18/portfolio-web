import { mount, flushPromises } from "@vue/test-utils";
import ContactSection from "../components/ContactSection.vue";
import { setLocale } from "../i18n.js";

// Lets each test choose whether a form endpoint is configured
const profile = vi.hoisted(() => ({ endpoint: "" }));
vi.mock("../data/profile.js", async (importOriginal) => ({
  ...(await importOriginal()),
  get contactFormEndpoint() {
    return profile.endpoint;
  },
}));

const fillAndSubmit = async (wrapper) => {
  await wrapper.find('input[name="name"]').setValue("Ana");
  await wrapper.find('input[name="email"]').setValue("ana@example.com");
  await wrapper.find("textarea").setValue("Hola, ¿hablamos?");
  await wrapper.find("form").trigger("submit");
  await flushPromises();
};

describe("Contact form", () => {
  beforeEach(() => {
    setLocale("es");
    profile.endpoint = "";
    vi.restoreAllMocks();
  });

  it("has labelled, required fields", () => {
    const wrapper = mount(ContactSection);

    for (const field of ["name", "email"]) {
      const input = wrapper.find(`input[name="${field}"]`);
      expect(input.attributes("required")).toBeDefined();
      expect(input.element.closest("label").textContent).toBeTruthy();
    }
    expect(wrapper.find("textarea").attributes("required")).toBeDefined();
  });

  it("opens the email app with the message when no endpoint is set", async () => {
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    const wrapper = mount(ContactSection);

    await fillAndSubmit(wrapper);

    const [url, target] = open.mock.calls[0];
    expect(target).toBe("_self");
    expect(url.startsWith("mailto:alexmf188@gmail.com?subject=")).toBe(true);
    expect(decodeURIComponent(url)).toContain("Hola, ¿hablamos?");
    expect(decodeURIComponent(url)).toContain("Ana (ana@example.com)");
    expect(wrapper.find('[role="status"]').text()).toContain(
      "aplicación de correo",
    );
  });

  it("posts to the endpoint when one is set, then clears the form", async () => {
    profile.endpoint = "https://formspree.io/f/test";
    const fetch = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue({ ok: true, status: 200 });
    const wrapper = mount(ContactSection);

    await fillAndSubmit(wrapper);

    const [url, options] = fetch.mock.calls[0];
    expect(url).toBe("https://formspree.io/f/test");
    expect(JSON.parse(options.body)).toMatchObject({
      name: "Ana",
      email: "ana@example.com",
      message: "Hola, ¿hablamos?",
    });
    expect(wrapper.find('[role="status"]').text()).toContain("Gracias");
    expect(wrapper.find('input[name="name"]').element.value).toBe("");
    expect(wrapper.find(".contact-submit").text()).toBe("Enviado");
  });

  it("shows an error with the direct email when sending fails", async () => {
    profile.endpoint = "https://formspree.io/f/test";
    vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: false, status: 500 });
    const wrapper = mount(ContactSection);

    await fillAndSubmit(wrapper);

    expect(wrapper.find('[role="status"]').text()).toContain(
      "alexmf188@gmail.com",
    );
    expect(wrapper.find('input[name="name"]').element.value).toBe("Ana");
  });

  it("flags every empty field and focuses the first instead of sending", async () => {
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    const wrapper = mount(ContactSection, { attachTo: document.body });

    await wrapper.find("form").trigger("submit");

    expect(open).not.toHaveBeenCalled();
    expect(wrapper.findAll(".field-error")).toHaveLength(3);
    const name = wrapper.find('input[name="name"]');
    expect(name.attributes("aria-invalid")).toBe("true");
    expect(name.attributes("aria-describedby")).toBe("contact-name-error");
    expect(document.activeElement).toBe(name.element);
    wrapper.unmount();
  });

  it("checks a field when it's left, and clears the error as it's fixed", async () => {
    const wrapper = mount(ContactSection);
    const emailInput = wrapper.find('input[name="email"]');

    // Leaving an untouched empty field doesn't nag
    await emailInput.trigger("blur");
    expect(wrapper.find(".field-error").exists()).toBe(false);

    await emailInput.setValue("ana@");
    await emailInput.trigger("blur");
    expect(wrapper.find("#contact-email-error").text()).toContain(
      "no parece válido",
    );

    await emailInput.setValue("ana@example.com");
    expect(wrapper.find("#contact-email-error").exists()).toBe(false);
    expect(emailInput.attributes("aria-invalid")).toBe("false");
  });
});
