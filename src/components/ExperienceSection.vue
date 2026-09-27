<script setup>
import { education, experience } from "../data/experience.js";
import { t, tr } from "../i18n.js";
</script>

<template>
  <section id="experience" class="section-wrapper content-section border-top">
    <h2 class="section-title">{{ t("experience.title") }}</h2>

    <div class="experience-layout">
      <ol class="timeline">
        <li v-for="job in experience" :key="job.company" class="timeline-item">
          <p class="timeline-period">{{ job.period }}</p>
          <h3 class="timeline-title">{{ tr(job.role) }}</h3>
          <p class="timeline-org">{{ job.company }}</p>
          <ul class="timeline-tasks">
            <li v-for="task in tr(job.tasks)" :key="task">{{ task }}</li>
          </ul>
        </li>
      </ol>

      <div>
        <p class="connect-title">{{ t("experience.education") }}</p>
        <ol class="timeline">
          <li
            v-for="course in education"
            :key="course.period"
            class="timeline-item"
          >
            <p class="timeline-period">{{ course.period }}</p>
            <h3 class="timeline-title">{{ tr(course.title) }}</h3>
            <p class="timeline-org">{{ course.center }}</p>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>
