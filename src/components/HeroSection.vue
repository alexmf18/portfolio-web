<script setup>
import BaseIcon from "./BaseIcon.vue";
import { socialLinks } from "../data/profile.js";
import { t } from "../i18n.js";
</script>

<template>
  <section id="hero" class="hero-frame">
    <img
      src="/images/perfil-1600.webp"
      srcset="
        /images/perfil-800.webp   800w,
        /images/perfil-1200.webp 1200w,
        /images/perfil-1600.webp 1600w
      "
      sizes="100vw"
      width="1600"
      height="1200"
      fetchpriority="high"
      :alt="t('hero.portraitAlt')"
      class="hero-image"
    />
    <div class="hero-overlay" aria-hidden="true"></div>

    <div class="hero-content section-wrapper">
      <div class="inline-chip">{{ t("hero.available") }}</div>
      <h1 class="hero-title">ALEX MORCILLO FULGENCIO</h1>
      <p class="hero-subtitle">
        {{ t("hero.subtitleStart") }}
        <strong>{{ t("hero.subtitleStrong") }}</strong>
        {{ t("hero.subtitleEnd") }}
      </p>

      <div class="hero-icons" :aria-label="t('hero.socialLabel')">
        <a
          v-for="social in socialLinks"
          :key="social.name"
          :href="social.href"
          :aria-label="social.name"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BaseIcon :icon="social.icon" />
        </a>
      </div>
    </div>
  </section>
</template>
