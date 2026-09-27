<script setup>
import { computed } from "vue";

// Renders a Font Awesome icon definition as inline SVG, without
// the Font Awesome runtime. `icon` is e.g. faGithub.
const props = defineProps({
  icon: { type: Object, required: true },
});

const width = computed(() => props.icon.icon[0]);
const height = computed(() => props.icon.icon[1]);
const path = computed(() => [].concat(props.icon.icon[4]).join(" "));
</script>

<template>
  <svg
    class="icon"
    :viewBox="`0 0 ${width} ${height}`"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path :d="path" />
  </svg>
</template>
