<script setup>
import { computed, reactive, ref } from "vue";
import BaseIcon from "./BaseIcon.vue";
import { faEnvelope } from "../icons.js";
import { contactFormEndpoint, email, socialLinks } from "../data/profile.js";
import { t } from "../i18n.js";

const linkedin = socialLinks.find((social) => social.name === "LinkedIn");

const form = reactive({ name: "", email: "", message: "" });
// Hidden field only bots fill in; Formspree drops those submissions
const honeypot = ref("");
// idle | sending | sent | error | mailOpened
const status = ref("idle");

const statusMessage = computed(() =>
  status.value === "idle" || status.value === "sending"
    ? ""
    : t(`contact.${status.value}`),
);

const openMailApp = () => {
  const body = `${form.message}\n\n— ${form.name} (${form.email})`;
  const url =
    `mailto:${email}?subject=${encodeURIComponent(t("contact.subject"))}` +
    `&body=${encodeURIComponent(body)}`;
  window.open(url, "_self");
  status.value = "mailOpened";
};

const sendToEndpoint = async () => {
  status.value = "sending";
  try {
    const response = await fetch(contactFormEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ ...form, _gotcha: honeypot.value }),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    status.value = "sent";
    Object.assign(form, { name: "", email: "", message: "" });
  } catch {
    status.value = "error";
  }
};

const onSubmit = () => (contactFormEndpoint ? sendToEndpoint() : openMailApp());
</script>

<template>
  <section id="contact" class="section-wrapper content-section border-top">
    <h2 class="section-title">{{ t("contact.title") }}</h2>

    <div class="contact-layout">
      <div class="contact-intro">
        <p>{{ t("contact.intro") }}</p>
        <p class="contact-or">{{ t("contact.or") }}</p>
        <ul class="contact-links">
          <li>
            <a :href="`mailto:${email}`"
              ><BaseIcon :icon="faEnvelope" />{{ email }}</a
            >
          </li>
          <li>
            <a :href="linkedin.href" target="_blank" rel="noopener noreferrer"
              ><BaseIcon :icon="linkedin.icon" />{{ linkedin.display }}</a
            >
          </li>
        </ul>
      </div>

      <form class="contact-form" @submit.prevent="onSubmit">
        <label>
          <span>{{ t("contact.name") }}</span>
          <input
            v-model.trim="form.name"
            name="name"
            type="text"
            autocomplete="name"
            required
          />
        </label>
        <label>
          <span>{{ t("contact.email") }}</span>
          <input
            v-model.trim="form.email"
            name="email"
            type="email"
            autocomplete="email"
            required
          />
        </label>
        <label>
          <span>{{ t("contact.message") }}</span>
          <textarea
            v-model.trim="form.message"
            name="message"
            rows="5"
            required
          ></textarea>
        </label>
        <input
          v-model="honeypot"
          class="contact-honeypot"
          name="_gotcha"
          type="text"
          tabindex="-1"
          autocomplete="off"
          aria-hidden="true"
        />

        <button
          type="submit"
          class="resume-btn contact-submit"
          :disabled="status === 'sending'"
        >
          {{ t(status === "sending" ? "contact.sending" : "contact.send") }}
        </button>
        <p class="contact-status" role="status">{{ statusMessage }}</p>
      </form>
    </div>
  </section>
</template>
