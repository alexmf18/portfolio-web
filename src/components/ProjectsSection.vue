<script setup>
import { computed, nextTick, ref } from "vue";
import ProjectCard from "./ProjectCard.vue";
import { projects } from "../data/projects.js";
import { t } from "../i18n.js";

// "all" is shown as Todos / All; the other filters are project categories
const ALL = "all";

const featuredProjects = projects.slice(0, 2);
const projectFilters = [
  ALL,
  ...new Set(projects.map((project) => project.category)),
];
const showAllProjects = ref(false);
const selectedFilter = ref(ALL);
const allProjectsWrapRef = ref(null);

const toggleAllProjects = async () => {
  showAllProjects.value = !showAllProjects.value;

  if (showAllProjects.value) {
    await nextTick();
    // Offset for the fixed header comes from scroll-padding-top in style.css
    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;
    allProjectsWrapRef.value.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }
};

const filteredProjects = computed(() =>
  selectedFilter.value === ALL
    ? projects
    : projects.filter((project) => project.category === selectedFilter.value),
);
</script>

<template>
  <section id="portfolio" class="section-wrapper content-section border-top">
    <div class="section-head">
      <div>
        <h2 class="section-title">{{ t("projects.title") }}</h2>
      </div>
      <button
        class="view-link"
        type="button"
        :aria-expanded="showAllProjects"
        aria-controls="all-projects"
        @click="toggleAllProjects"
      >
        {{ t(showAllProjects ? "projects.viewLess" : "projects.viewAll") }}
      </button>
    </div>

    <div class="project-grid">
      <ProjectCard
        v-for="project in featuredProjects"
        :key="project.id"
        :project="project"
      />
    </div>

    <transition name="fade-slide">
      <div
        v-if="showAllProjects"
        id="all-projects"
        ref="allProjectsWrapRef"
        class="all-projects-wrap"
      >
        <div class="project-filters">
          <button
            v-for="filter in projectFilters"
            :key="filter"
            type="button"
            class="filter-chip"
            :class="{ active: selectedFilter === filter }"
            :aria-pressed="selectedFilter === filter"
            @click="selectedFilter = filter"
          >
            {{ filter === ALL ? t("projects.all") : filter }}
          </button>
        </div>

        <div class="all-projects-grid">
          <ProjectCard
            v-for="project in filteredProjects"
            :key="project.id"
            :project="project"
            compact
          />
        </div>
      </div>
    </transition>
  </section>
</template>
