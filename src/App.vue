<script setup>
import { computed, nextTick, ref } from "vue";

const navLinks = [
  { name: "SOBRE MI", href: "#about" },
  { name: "PROJECTOS", href: "#portfolio" },
  { name: "HABILIDADES", href: "#skills" },
];

const heroSocialLinks = [
  {
    name: "LinkedIn",
    icon: "fa-brands fa-linkedin-in",
    href: "https://www.linkedin.com/in/alex-morcillo",
  },
  {
    name: "GitHub",
    icon: "fa-brands fa-github",
    href: "https://github.com/alexmf18?tab=repositories",
  },
  {
    name: "Instagram",
    icon: "fa-brands fa-instagram",
    href: "https://www.instagram.com/alexmf97/",
  },
];

const allProjects = [
  {
    id: 1,
    category: "React",
    year: "HTML5 · TAILWIND · React",
    title: "RC-cars",
    description:
      "One landing page para una marca de coches de control remoto, con un diseño moderno y limpio.",
    tag: "RC-cars",
    url: "https://rc-cars-dkai.vercel.app/",
    img: "/images/RC-cars.png",
  },
  {
    id: 2,
    category: "CSS",
    year: "HTML5 · TAILWIND · ANIMACIONES",
    title: "Japontravel Agency",
    description:
      "Landing page para una agencia de viajes especializada en tours por Japón, con un diseño moderno y creativo.",
    tag: "Japontravel",
    url: "https://alexmf18.github.io/travel-agency/",
    img: "/images/japon.png",
  },
  {
    id: 3,
    category: "React",
    year: "HTML5 · TAILWIND · REACT",
    title: "Patientapp",
    description:
      "aplicacion de gestión de pacientes para clínicas, con funcionalidades de registro y historial médico",
    tag: "Patientapp",
    url: "https://patient-app-zeta.vercel.app/",
  },
  {
    id: 4,
    category: "JS",
    year: "HTML5 · TAILWIND · ANIMACIONES",
    title: "Voltaic cars",
    description:
      "Website para una marca de coches eléctricos, con un diseño moderno y animaciones llamativas.",
    tag: "Voltaic",
    url: "https://alexmf18.github.io/voltaic-cars/",
  },
  {
    id: 5,
    category: "React",
    year: "HTML5 · TAILWIND · REACT",
    title: "Music festival",
    description:
      "Website para un festival de música, con un diseño vibrante y secciones para artistas y entradas.",
    tag: "Music",
    url: "https://music-festival-omega-five.vercel.app/",
  },
  {
    id: 6,
    category: "JS",
    year: "HTML5 · TAILWIND · ANIMACIONES",
    title: "Finanzapp Dashboard",
    description:
      "Dashboard para una aplicación de finanzas personales, con gráficos interactivos y un diseño moderno.",
    tag: "Finanzapp",
    url: "https://alexmf18.github.io/finanzapp/",
  },
  {
    id: 7,
    category: "Vue.js",
    year: "TAILWIND · THREE.JS · VUE.JS",
    title: "Planetarium",
    description:
      "Website para un planetario 3D, con un diseño moderno y animaciones interactivas de los planetas.",
    tag: "Planetarium",
    url: "https://planetarium-flame.vercel.app/",
  },
];

const featuredProjects = allProjects.slice(0, 2);
const projectFilters = ["TODOS", "React", "JS", "CSS", "Vue.js"];
const showAllProjects = ref(false);
const selectedFilter = ref("TODOS");
const allProjectsWrapRef = ref(null);

const toggleAllProjects = async () => {
  showAllProjects.value = !showAllProjects.value;

  if (showAllProjects.value) {
    await nextTick();
    const headerOffset = 110;
    const targetY =
      allProjectsWrapRef.value.getBoundingClientRect().top +
      window.scrollY -
      headerOffset;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  }
};

const filteredProjects = computed(() =>
  selectedFilter.value === "TODOS"
    ? allProjects
    : allProjects.filter(
        (project) => project.category === selectedFilter.value,
      ),
);

const leftSkills = [
  { label: "FRONTEND (React.JS)", level: 95 },
  { label: "UI/UX DESIGN", level: 88 },
  { label: "TYPESCRIPT", level: 90 },
  { label: "SOPORTE TECNICO (N1/N2)", level: 92 },
];

const rightSkills = [
  { label: "BACKEND (NODE.JS)", level: 82 },
  { label: "DATABASE (POSTGRESQL)", level: 75 },
  { label: "CLOUD (AWS/VERCEL)", level: 80 },
  { label: "AI ENGINERING", level: 90 },
];

const currentYear = new Date().getFullYear();
</script>

<template>
  <div class="site-shell text-[#f3f4f6]">
    <section id="hero" class="hero-frame">
      <img
        src="/images/perfil2.jpeg"
        alt="Developer portrait"
        class="hero-image"
      />
      <div class="hero-overlay" aria-hidden="true"></div>

      <header class="hero-header">
        <div class="hero-header-inner">
          <a href="#hero" class="brand" aria-label="Ir al inicio">
            <img
              src="/images/logo.png"
              alt="Logo de DE VPORTFOLIO"
              class="brand-logo"
            />
          </a>
          <nav class="nav-links">
            <a v-for="link in navLinks" :key="link.name" :href="link.href">{{
              link.name
            }}</a>
            <a
              href="/documents/CVitae_Alex_Morcillo_Fulgencio.pdf"
              class="resume-btn"
              download="CV_Alex_Morcillo_Fulgencio.pdf"
            >
              Descargar CV
            </a>
          </nav>
        </div>
      </header>

      <div class="hero-content section-wrapper">
        <div class="inline-chip">DISPONIBLE PARA CONTRATACION</div>
        <h1 class="hero-title">ALEX MORCILLO FULGENCIO</h1>
        <p class="hero-subtitle">
          técnico informático y desarrollador web con
          <strong>alma creativa y mente analítica.</strong> Me encanta
          transformar ideas en proyectos digitales que conectan con las
          personas.
        </p>

        <div class="hero-icons" aria-label="social links">
          <a
            v-for="social in heroSocialLinks"
            :key="social.name"
            :href="social.href"
            :aria-label="social.name"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i :class="social.icon" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </section>

    <main>
      <section id="about" class="section-wrapper content-section border-top">
        <h2 class="section-title">SOBRE MI</h2>

        <div class="about-layout">
          <aside class="connect-panel">
            <p class="connect-title">CONECTAR</p>
            <ul>
              <li><span>UBICACION</span>Vallirana, BCN</li>
              <li><span>TELEFONO</span>+34 602 106 614</li>
              <li><span>EMAIL</span>alexmf188@gmail.com</li>
              <li><span>EXPERIENCIA</span>7+ Años de experiencia</li>
              <li>
                <a
                  :href="heroSocialLinks[0].href"
                  target="_blank"
                  rel="noopener noreferrer"
                  ><span>LINKEDIN</span>linkedin.com/in/alex-morcillo</a
                >
              </li>
              <li>
                <a
                  :href="heroSocialLinks[1].href"
                  target="_blank"
                  rel="noopener noreferrer"
                  ><span>GITHUB</span>github.com/alexmf18</a
                >
              </li>
            </ul>
          </aside>

          <article class="about-copy">
            <p>
              Profesional IT con más de 7 años de experiencia en soporte técnico
              y gestión de sistemas, especializado en resolución de incidencias,
              soporte N1/N2 y trabajo con bases de datos. A lo largo de mi
              trayectoria he participado en la implementación de cambios en
              entornos web y en la optimización de procesos técnicos para
              clientes.
            </p>

            <p>
              Actualmente estoy ampliando mi perfil hacia el desarrollo web,
              trabajando con HTML, CSS y JavaScript, y combinando mi experiencia
              en soporte y sistemas con el desarrollo de soluciones digitales.
              Destaco por mi capacidad para analizar problemas, aprender rápido
              y adaptarme a entornos técnicos exigentes.
            </p>

            <p>
              Busco oportunidades donde pueda aportar valor técnico y seguir
              creciendo como desarrollador web dentro de equipos tecnológicos.
            </p>

            <div class="hobbies-line"></div>
            <p class="hobbies-title">CUANDO NO ESTOY PROGRAMANDO...</p>
            <div class="hobbies-grid">
              <div>
                <span
                  ><i
                    class="fa-solid fa-book-open"
                    aria-hidden="true"
                  ></i></span
                >LIBROS
              </div>
              <div>
                <span
                  ><i class="fa-solid fa-gamepad" aria-hidden="true"></i></span
                >VIDEOJUEGOS
              </div>
              <div>
                <span
                  ><i
                    class="fa-solid fa-plane-departure"
                    aria-hidden="true"
                  ></i></span
                >VIAJES
              </div>
              <div>
                <span><i class="fa-solid fa-film" aria-hidden="true"></i></span
                >PELICULAS
              </div>
            </div>
          </article>
        </div>
      </section>

      <section
        id="portfolio"
        class="section-wrapper content-section border-top"
      >
        <div class="section-head">
          <div>
            <h2 class="projects-title">Projectos Destacados</h2>
          </div>
          <button class="view-link" type="button" @click="toggleAllProjects">
            {{ showAllProjects ? "SHOW LESS" : "VIEW ALL" }}
          </button>
        </div>

        <div class="project-grid">
          <article
            v-for="project in featuredProjects"
            :key="project.id"
            class="project-card"
          >
            <a
              :href="project.url"
              class="project-card-link"
              :aria-label="`Open ${project.title}`"
            ></a>
            <div class="project-visual">
              <img
                v-if="project.img"
                :src="project.img"
                :alt="`Imagen del proyecto ${project.title}`"
                class="project-visual-image"
              />
            </div>
            <div class="project-body">
              <p class="meta">{{ project.year }}</p>
              <h3>{{ project.title }}</h3>
              <p>{{ project.description }}</p>
              <span class="project-arrow">-></span>
            </div>
          </article>
        </div>

        <transition name="fade-slide">
          <div
            v-if="showAllProjects"
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
                @click="selectedFilter = filter"
              >
                {{ filter }}
              </button>
            </div>

            <div class="all-projects-grid">
              <article
                v-for="project in filteredProjects"
                :key="`all-${project.id}`"
                class="project-card compact"
              >
                <a
                  :href="project.url"
                  class="project-card-link"
                  :aria-label="`Open ${project.title}`"
                ></a>
                <div class="project-body">
                  <p class="meta">{{ project.year }}</p>
                  <h3>{{ project.title }}</h3>
                  <p>{{ project.description }}</p>
                  <span class="project-arrow">-></span>
                </div>
              </article>
            </div>
          </div>
        </transition>
      </section>

      <section id="skills" class="section-wrapper content-section border-top">
        <h2 class="projects-title">Experiencia Tecnica</h2>

        <div class="skills-layout">
          <div class="skill-col">
            <div
              v-for="skill in leftSkills"
              :key="skill.label"
              class="skill-row"
            >
              <div class="skill-top">
                <span>{{ skill.label }}</span
                ><span>{{ skill.level }}%</span>
              </div>
              <div class="bar">
                <div class="fill" :style="{ width: `${skill.level}%` }"></div>
              </div>
            </div>
          </div>

          <div class="skill-col">
            <div
              v-for="skill in rightSkills"
              :key="skill.label"
              class="skill-row"
            >
              <div class="skill-top">
                <span>{{ skill.label }}</span
                ><span>{{ skill.level }}%</span>
              </div>
              <div class="bar">
                <div class="fill" :style="{ width: `${skill.level}%` }"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer id="footer" class="border-top">
      <div class="footer-inner footer-line">
        <p class="footer-brand">
          <img
            src="/images/logo.png"
            alt="Logo de DE VPORTFOLIO"
            class="footer-logo"
          />
          <span>© {{ currentYear }}</span>
        </p>
        <nav>
          <a
            :href="heroSocialLinks[0].href"
            target="_blank"
            rel="noopener noreferrer"
          >
            LINKEDIN
          </a>
          <a
            :href="heroSocialLinks[1].href"
            target="_blank"
            rel="noopener noreferrer"
          >
            GITHUB
          </a>
          <a
            :href="heroSocialLinks[2].href"
            target="_blank"
            rel="noopener noreferrer"
          >
            INSTAGRAM
          </a>
        </nav>
        <p>CONSTRUIDO CON MINIMALISMO</p>
      </div>
    </footer>
  </div>
</template>
