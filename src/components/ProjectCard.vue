<script setup>
import BaseIcon from "./BaseIcon.vue";
import { faArrowRight } from "../icons.js";
import { t, tr } from "../i18n.js";

defineProps({
  project: { type: Object, required: true },
  compact: { type: Boolean, default: false },
});
</script>

<template>
  <article class="project-card" :class="{ compact }">
    <div class="project-visual" :class="{ compact }">
      <img
        :src="project.img"
        width="1200"
        :height="project.imgHeight"
        loading="lazy"
        :alt="`${t('projects.imageAlt')} ${project.title}`"
        class="project-visual-image"
      />
    </div>
    <div class="project-body">
      <p class="meta">{{ project.stack.join(" · ") }}</p>
      <h3>
        <a
          :href="project.url"
          class="project-card-link"
          target="_blank"
          rel="noopener noreferrer"
          >{{ project.title
          }}<span class="sr-only"> {{ t("common.opensInNewTab") }}</span></a
        >
      </h3>
      <p>{{ tr(project.description) }}</p>
      <span class="project-arrow" aria-hidden="true"
        ><BaseIcon :icon="faArrowRight"
      /></span>
    </div>
  </article>
</template>
