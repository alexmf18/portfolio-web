<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import BaseIcon from "./BaseIcon.vue";
import { faBars, faXmark } from "../icons.js";
import { cv, navLinks } from "../data/profile.js";
import { locale, setLocale, t } from "../i18n.js";

const otherLocale = () => (locale.value === "es" ? "en" : "es");

const mobileMenuOpen = ref(false);
const headerRef = ref(null);
const menuToggleRef = ref(null);

const closeMobileMenu = ({ restoreFocus = false } = {}) => {
  mobileMenuOpen.value = false;
  if (restoreFocus) menuToggleRef.value?.focus();
};

// While the mobile menu is open: Escape closes it, and Tab cycles
// through the visible header controls instead of leaving the menu.
const onKeydown = (event) => {
  if (!mobileMenuOpen.value) return;

  if (event.key === "Escape") {
    closeMobileMenu({ restoreFocus: true });
    return;
  }

  if (event.key !== "Tab") return;

  const focusable = [...headerRef.value.querySelectorAll("a, button")].filter(
    (el) => el.offsetParent !== null,
  );
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
};

const onPointerdown = (event) => {
  if (mobileMenuOpen.value && !headerRef.value.contains(event.target)) {
    closeMobileMenu();
  }
};

onMounted(() => {
  document.addEventListener("keydown", onKeydown);
  document.addEventListener("pointerdown", onPointerdown);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", onKeydown);
  document.removeEventListener("pointerdown", onPointerdown);
});
</script>

<template>
  <header ref="headerRef" class="hero-header">
    <div class="hero-header-inner">
      <a href="#hero" class="brand" :aria-label="t('header.home')">
        <img
          src="/images/logo.webp"
          width="482"
          height="191"
          :alt="t('common.logoAlt')"
          class="brand-logo"
        />
      </a>
      <div class="header-actions">
        <nav class="nav-links">
          <a v-for="link in navLinks" :key="link.key" :href="link.href">{{
            t(link.key)
          }}</a>
          <a :href="cv.href" class="resume-btn" :download="cv.filename">
            {{ t("header.downloadCv") }}
          </a>
        </nav>
        <button
          type="button"
          class="lang-toggle"
          :lang="otherLocale()"
          :aria-label="t('header.switchLanguage')"
          @click="setLocale(otherLocale())"
        >
          {{ otherLocale().toUpperCase() }}
        </button>
        <button
          ref="menuToggleRef"
          type="button"
          class="menu-toggle"
          :aria-label="
            t(mobileMenuOpen ? 'header.closeMenu' : 'header.openMenu')
          "
          :aria-expanded="mobileMenuOpen"
          aria-controls="mobile-menu"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <BaseIcon :icon="mobileMenuOpen ? faXmark : faBars" />
        </button>
      </div>
    </div>
    <nav v-show="mobileMenuOpen" id="mobile-menu" class="mobile-menu">
      <a
        v-for="link in navLinks"
        :key="link.key"
        :href="link.href"
        @click="closeMobileMenu()"
        >{{ t(link.key) }}</a
      >
      <a
        :href="cv.href"
        class="resume-btn"
        :download="cv.filename"
        @click="closeMobileMenu()"
      >
        {{ t("header.downloadCv") }}
      </a>
    </nav>
  </header>
</template>
