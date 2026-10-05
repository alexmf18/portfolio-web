<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import BaseIcon from "./BaseIcon.vue";
import { faBars, faXmark } from "../icons.js";
import { cv, navLinks } from "../data/profile.js";
import { locale, setLocale, t } from "../i18n.js";

const otherLocale = () => (locale.value === "es" ? "en" : "es");

// Every string changes at once, so the swap is a short cross-fade of the
// page where the browser supports view transitions (instant elsewhere)
const switchLocale = () => {
  const next = otherLocale();
  if (!document.startViewTransition) return setLocale(next);
  document.startViewTransition(async () => {
    setLocale(next);
    await nextTick();
  });
};

const mobileMenuOpen = ref(false);
const headerRef = ref(null);
const menuToggleRef = ref(null);
// Over the hero the header is a soft scrim; once content scrolls
// under it, it becomes a translucent material
const scrolled = ref(false);

// The page behind an open menu shouldn't scroll. Sync, so the lock is gone
// before a menu link's default jump to its section runs.
watch(
  mobileMenuOpen,
  (open) => document.documentElement.classList.toggle("menu-open", open),
  { flush: "sync" },
);

// The menu only exists below lg; don't leave it open (and the page locked)
// when the viewport grows past it
const desktopQuery = window.matchMedia?.("(min-width: 1024px)");
const onDesktopChange = (event) => {
  if (event.matches) closeMobileMenu();
};

// Wayfinding: the nav marks the section being read. A section counts as
// current while it crosses a line ~40% down the viewport.
const activeSection = ref("");
let sectionObserver;

const observeSections = () => {
  if (!("IntersectionObserver" in window)) return;
  sectionObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) activeSection.value = `#${entry.target.id}`;
        else if (activeSection.value === `#${entry.target.id}`) {
          activeSection.value = "";
        }
      }
    },
    { rootMargin: "-40% 0px -60% 0px" },
  );
  for (const { href } of navLinks) {
    const section = document.querySelector(href);
    if (section) sectionObserver.observe(section);
  }
};

const currentFor = (href) =>
  activeSection.value === href ? "location" : undefined;

const onScroll = () => {
  scrolled.value = window.scrollY > 8;
};

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
  onScroll();
  observeSections();
  desktopQuery?.addEventListener("change", onDesktopChange);
  window.addEventListener("scroll", onScroll, { passive: true });
  document.addEventListener("keydown", onKeydown);
  document.addEventListener("pointerdown", onPointerdown);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
  sectionObserver?.disconnect();
  desktopQuery?.removeEventListener("change", onDesktopChange);
  document.documentElement.classList.remove("menu-open");
  document.removeEventListener("keydown", onKeydown);
  document.removeEventListener("pointerdown", onPointerdown);
});
</script>

<template>
  <div
    class="menu-scrim"
    :class="{ 'is-open': mobileMenuOpen }"
    aria-hidden="true"
  ></div>
  <header
    ref="headerRef"
    class="hero-header"
    :class="{ 'is-solid': scrolled || mobileMenuOpen }"
  >
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
          <a
            v-for="link in navLinks"
            :key="link.key"
            :href="link.href"
            :aria-current="currentFor(link.href)"
            >{{ t(link.key) }}</a
          >
          <a :href="cv.href" class="resume-btn" :download="cv.filename">
            {{ t("header.downloadCv") }}
          </a>
        </nav>
        <button
          type="button"
          class="lang-toggle"
          :lang="otherLocale()"
          :aria-label="t('header.switchLanguage')"
          @click="switchLocale"
        >
          {{ otherLocale() }}
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
    <!-- Always rendered so opening and closing are CSS transitions that can
         reverse mid-flight; inert keeps it out of reach while closed -->
    <nav
      id="mobile-menu"
      class="mobile-menu"
      :class="{ 'is-open': mobileMenuOpen }"
      :inert="!mobileMenuOpen || undefined"
    >
      <div class="mobile-menu-clip">
        <div class="mobile-menu-content">
          <a
            v-for="link in navLinks"
            :key="link.key"
            :href="link.href"
            :aria-current="currentFor(link.href)"
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
        </div>
      </div>
    </nav>
  </header>
</template>
