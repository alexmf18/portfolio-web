<script setup>
import BaseIcon from "./BaseIcon.vue";
import { skillGroups } from "../data/skills.js";
import { t, tr } from "../i18n.js";
</script>

<template>
  <section id="skills" class="section-wrapper content-section border-top">
    <h2 class="section-title">{{ t("skills.title") }}</h2>

    <div class="skills-layout">
      <div
        v-for="group in skillGroups"
        :key="group.icon.iconName"
        class="skill-group"
      >
        <h3 class="skill-group-title">
          <BaseIcon :icon="group.icon" />{{ tr(group.title) }}
        </h3>
        <ul class="skill-chips">
          <li v-for="item in group.items" :key="tr(item)">{{ tr(item) }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>
