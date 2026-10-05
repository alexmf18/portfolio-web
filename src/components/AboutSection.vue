<script setup>
import BaseIcon from "./BaseIcon.vue";
import { contactItems, hobbies, socialLinks } from "../data/profile.js";
import { t } from "../i18n.js";

const contactSocials = socialLinks.filter((social) => social.display);
</script>

<template>
  <section id="about" class="section-wrapper content-section border-top">
    <h2 class="section-title">{{ t("about.title") }}</h2>

    <div class="about-layout">
      <aside class="connect-panel">
        <p class="connect-title">{{ t("about.connect") }}</p>
        <ul>
          <li v-for="item in contactItems" :key="item.labelKey">
            <a v-if="item.href" :href="item.href"
              ><span>{{ t(item.labelKey) }}</span
              >{{ item.value }}</a
            >
            <template v-else
              ><span>{{ t(item.labelKey) }}</span
              >{{ item.valueKey ? t(item.valueKey) : item.value }}</template
            >
          </li>
          <li v-for="social in contactSocials" :key="social.name">
            <a :href="social.href" target="_blank" rel="noopener noreferrer"
              ><span>{{ social.name }}</span
              >{{ social.display }}</a
            >
          </li>
        </ul>
      </aside>

      <article class="about-copy">
        <p v-for="paragraph in t('about.paragraphs')" :key="paragraph">
          {{ paragraph }}
        </p>

        <div class="hobbies-line"></div>
        <p class="hobbies-title">{{ t("about.hobbiesTitle") }}</p>
        <div class="hobbies-grid">
          <div v-for="hobby in hobbies" :key="hobby.key">
            <span><BaseIcon :icon="hobby.icon" /></span>{{ t(hobby.key) }}
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
