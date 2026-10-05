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
// The list is only built the first time it's opened (its images are lazy),
// then kept so closing and reopening are reversible CSS transitions
const hasOpened = ref(false);
const selectedFilter = ref(ALL);
const allProjectsWrapRef = ref(null);

const toggleAllProjects = async () => {
  showAllProjects.value = !showAllProjects.value;
  hasOpened.value = true;

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

// A leaving card is lifted out of the grid flow where it stands, so the
// remaining cards can glide into their new places while it fades
const pinLeavingCard = (el) => {
  const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = el;
  Object.assign(el.style, {
    position: "absolute",
    left: `${offsetLeft}px`,
    top: `${offsetTop}px`,
    width: `${offsetWidth}px`,
    height: `${offsetHeight}px`,
  });
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

    <div
      id="all-projects"
      ref="allProjectsWrapRef"
      class="all-projects"
      :class="{ 'is-open': showAllProjects }"
      :inert="!showAllProjects || undefined"
    >
      <div class="all-projects-clip">
        <div v-if="hasOpened" class="all-projects-wrap">
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

          <TransitionGroup
            tag="div"
            name="card"
            class="all-projects-grid"
            @before-leave="pinLeavingCard"
          >
            <ProjectCard
              v-for="project in filteredProjects"
              :key="project.id"
              :project="project"
              compact
            />
          </TransitionGroup>
        </div>
      </div>
    </div>
  </section>
</template>
