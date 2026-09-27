// `category` drives the filters; `stack` is what each repo actually uses.
// `description` is an { es, en } pair (see tr() in src/i18n.js).
// Images are 1200px wide; `imgHeight` is set so the browser can reserve space.
export const projects = [
  {
    id: 1,
    category: "React",
    stack: ["React", "React Router", "Tailwind"],
    title: "RC-cars",
    description: {
      es: "Landing page para una marca de coches de control remoto, con un diseño moderno y limpio.",
      en: "Landing page for a remote-control car brand, with a clean, modern design.",
    },
    url: "https://rc-cars-dkai.vercel.app/",
    img: "/images/RC-cars.webp",
    imgHeight: 536,
  },
  {
    id: 2,
    category: "JavaScript",
    stack: ["HTML5", "Tailwind", "JavaScript"],
    title: "Japontravel Agency",
    description: {
      es: "Landing page para una agencia de viajes especializada en tours por Japón, con un diseño moderno y creativo.",
      en: "Landing page for a travel agency specialising in tours of Japan, with a modern, creative design.",
    },
    url: "https://alexmf18.github.io/travel-agency/",
    img: "/images/japon.webp",
    imgHeight: 547,
  },
  {
    id: 3,
    category: "React",
    stack: ["React", "TypeScript", "Tailwind"],
    title: "Patientapp",
    description: {
      es: "Aplicación de gestión de pacientes para clínicas, con funcionalidades de registro e historial médico.",
      en: "Patient management app for clinics, with patient registration and medical history.",
    },
    url: "https://patient-app-zeta.vercel.app/",
    img: "/images/patient.webp",
    imgHeight: 515,
  },
  {
    id: 4,
    category: "JavaScript",
    stack: ["HTML5", "Tailwind", "JavaScript"],
    title: "Voltaic cars",
    description: {
      es: "Website para una marca de coches eléctricos, con un diseño moderno y animaciones llamativas.",
      en: "Website for an electric car brand, with a modern design and eye-catching animations.",
    },
    url: "https://alexmf18.github.io/voltaic-cars/",
    img: "/images/voltaic.webp",
    imgHeight: 583,
  },
  {
    id: 5,
    category: "React",
    stack: ["React", "React Router", "Tailwind"],
    title: "Music festival",
    description: {
      es: "Website para un festival de música, con un diseño vibrante y secciones para artistas y entradas.",
      en: "Website for a music festival, with a vibrant design and sections for artists and tickets.",
    },
    url: "https://music-festival-omega-five.vercel.app/",
    img: "/images/festival.webp",
    imgHeight: 604,
  },
  {
    id: 6,
    category: "JavaScript",
    stack: ["HTML5", "Tailwind", "JavaScript"],
    title: "Finanzapp Dashboard",
    description: {
      es: "Dashboard para una aplicación de finanzas personales, con gráficos interactivos y un diseño moderno.",
      en: "Personal finance dashboard with interactive charts and a modern design.",
    },
    url: "https://alexmf18.github.io/finanzapp/",
    img: "/images/finanzapp.webp",
    imgHeight: 559,
  },
  {
    id: 7,
    category: "Vue.js",
    stack: ["Vue 3", "Three.js", "Tailwind"],
    title: "Planetarium",
    description: {
      es: "Website para un planetario 3D, con un diseño moderno y animaciones interactivas de los planetas.",
      en: "3D planetarium website, with a modern design and interactive planet animations.",
    },
    url: "https://planetarium-flame.vercel.app/",
    img: "/images/planetarium.webp",
    imgHeight: 569,
  },
];
