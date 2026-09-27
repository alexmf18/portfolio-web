import {
  faCode,
  faDatabase,
  faHeadset,
  faLanguage,
  faRobot,
  faScrewdriverWrench,
} from "../icons.js";

// Grouped from the CV and the stacks used in the projects.
// Text is either a plain string (same in both languages) or { es, en }.
export const skillGroups = [
  {
    title: { es: "Desarrollo web", en: "Web development" },
    icon: faCode,
    items: [
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "JavaScript",
      "React",
      "Vue.js",
      "TypeScript",
      "Three.js",
    ],
  },
  {
    title: { es: "Soporte y sistemas", en: "Support & systems" },
    icon: faHeadset,
    items: [
      { es: "Soporte N1 / N2", en: "L1 / L2 support" },
      "Application Support",
      { es: "Gestión de incidencias", en: "Incident management" },
      { es: "Monitorización de sistemas", en: "System monitoring" },
      {
        es: "Instalación y mantenimiento de equipos",
        en: "Hardware installation & maintenance",
      },
      "Office 365",
    ],
  },
  {
    title: { es: "Inteligencia Artificial", en: "Artificial Intelligence" },
    icon: faRobot,
    items: [
      { es: "Inteligencia Artificial Generativa", en: "Generative AI" },
      "Prompt Engineering",
      "Vibe Coding",
      "AI-assisted Development",
      "Claude Code",
      "GitHub Copilot",
      "Cursor",
      "LLMs",
      {
        es: "Generación y refactorización de código",
        en: "Code generation & refactoring",
      },
      { es: "Debugging asistido por IA", en: "AI-assisted debugging" },
      { es: "Automatización de tareas", en: "Task automation" },
      { es: "Integración de APIs de IA", en: "AI API integration" },
    ],
  },
  {
    title: { es: "Herramientas", en: "Tools" },
    icon: faScrewdriverWrench,
    items: ["Git / GitHub", "Jira", "Vite", "Vercel", "CMS"],
  },
  {
    title: { es: "Idiomas", en: "Languages" },
    icon: faLanguage,
    items: [
      { es: "Español", en: "Spanish" },
      { es: "Catalán", en: "Catalan" },
      { es: "Inglés", en: "English" },
    ],
  },
  {
    title: { es: "Datos", en: "Data" },
    icon: faDatabase,
    items: ["SQL (Oracle)", "Power BI", "Python"],
  },
];
