<script setup>
import { computed, onBeforeUnmount, reactive, ref } from "vue";
import BaseIcon from "./BaseIcon.vue";
import { faCheck, faEnvelope } from "../icons.js";
import { contactFormEndpoint, email, socialLinks } from "../data/profile.js";
import { t } from "../i18n.js";

const linkedin = socialLinks.find((social) => social.name === "LinkedIn");

const FIELDS = ["name", "email", "message"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const form = reactive({ name: "", email: "", message: "" });
// Hidden field only bots fill in; Formspree drops those submissions
const honeypot = ref("");
// idle | sending | sent | error | mailOpened
const status = ref("idle");

// Validation is inline: a field is checked once the visitor has left it with
// something typed (or tried to send), then re-checked live as they fix it
const touched = reactive({ name: false, email: false, message: false });

const fieldError = (field) => {
  const value = form[field];
  if (!value) return `contact.errors.${field}Required`;
  if (field === "email" && !EMAIL_PATTERN.test(value)) {
    return "contact.errors.emailInvalid";
  }
  return "";
};

const errorFor = (field) => (touched[field] ? fieldError(field) : "");

const onBlur = (field) => {
  if (form[field]) touched[field] = true;
};

// The button itself confirms a send for a moment ("✓ Sent"), and the
// cleared fields fade back in instead of blanking at once
const justSent = ref(false);
const fieldsRefreshed = ref(0);
let sentTimer;

onBeforeUnmount(() => clearTimeout(sentTimer));

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
    Object.assign(touched, { name: false, email: false, message: false });
    fieldsRefreshed.value++;
    justSent.value = true;
    clearTimeout(sentTimer);
    sentTimer = setTimeout(() => (justSent.value = false), 2500);
  } catch {
    status.value = "error";
  }
};

const onSubmit = (event) => {
  FIELDS.forEach((field) => (touched[field] = true));
  const firstInvalid = FIELDS.find((field) => fieldError(field));
  if (firstInvalid) {
    event.target.elements[firstInvalid].focus();
    return;
  }
  contactFormEndpoint ? sendToEndpoint() : openMailApp();
};
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

      <form class="contact-form" novalidate @submit.prevent="onSubmit">
        <div
          :key="fieldsRefreshed"
          class="contact-fields"
          :class="{ 'is-refreshed': fieldsRefreshed > 0 }"
        >
          <label>
            <span>{{ t("contact.name") }}</span>
            <input
              v-model.trim="form.name"
              name="name"
              type="text"
              autocomplete="name"
              required
              :aria-invalid="!!errorFor('name')"
              :aria-describedby="
                errorFor('name') ? 'contact-name-error' : undefined
              "
              @blur="onBlur('name')"
            />
            <small
              v-if="errorFor('name')"
              id="contact-name-error"
              class="field-error"
              >{{ t(errorFor("name")) }}</small
            >
          </label>
          <label>
            <span>{{ t("contact.email") }}</span>
            <input
              v-model.trim="form.email"
              name="email"
              type="email"
              autocomplete="email"
              required
              :aria-invalid="!!errorFor('email')"
              :aria-describedby="
                errorFor('email') ? 'contact-email-error' : undefined
              "
              @blur="onBlur('email')"
            />
            <small
              v-if="errorFor('email')"
              id="contact-email-error"
              class="field-error"
              >{{ t(errorFor("email")) }}</small
            >
          </label>
          <label>
            <span>{{ t("contact.message") }}</span>
            <textarea
              v-model.trim="form.message"
              name="message"
              rows="5"
              required
              :aria-invalid="!!errorFor('message')"
              :aria-describedby="
                errorFor('message') ? 'contact-message-error' : undefined
              "
              @blur="onBlur('message')"
            ></textarea>
            <small
              v-if="errorFor('message')"
              id="contact-message-error"
              class="field-error"
              >{{ t(errorFor("message")) }}</small
            >
          </label>
        </div>
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
          :class="{ 'is-sent': justSent }"
          :disabled="status === 'sending'"
        >
          <span
            v-if="status === 'sending'"
            class="contact-spinner"
            aria-hidden="true"
          ></span>
          <BaseIcon v-else-if="justSent" :icon="faCheck" />
          {{
            t(
              status === "sending"
                ? "contact.sending"
                : justSent
                  ? "contact.sentButton"
                  : "contact.send",
            )
          }}
        </button>
        <p class="contact-status" role="status">{{ statusMessage }}</p>
      </form>
    </div>
  </section>
</template>
