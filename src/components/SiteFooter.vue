<script setup>
import { socialLinks } from "../data/profile.js";
import { t } from "../i18n.js";

const currentYear = new Date().getFullYear();
</script>

<template>
  <footer id="footer" class="border-top">
    <div class="footer-inner footer-line">
      <p class="footer-brand">
        <img
          src="/images/logo.webp"
          width="482"
          height="191"
          loading="lazy"
          :alt="t('common.logoAlt')"
          class="footer-logo"
        />
        <span>© {{ currentYear }}</span>
      </p>
      <nav>
        <a
          v-for="social in socialLinks"
          :key="social.name"
          :href="social.href"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ social.name }}
        </a>
      </nav>
      <p>{{ t("footer.builtWith") }}</p>
    </div>
  </footer>
</template>
