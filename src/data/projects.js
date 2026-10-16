// `category` drives the filters; `stack` is what each repo actually uses.
// `description` is an { es, en } pair (see tr() in src/i18n.js).
// Images are 1200px wide; `imgHeight` is set so the browser can reserve space.
// `repo` is optional and adds a GitHub link to the card.
// The first two entries are the featured ones.
export const projects = [
  {
    id: 10,
    category: "Data",
    stack: ["PostgreSQL", "React", "Leaflet", "Tailwind"],
    title: "Barcelona Incidents",
    description: {
      es: "Análisis de las incidencias ciudadanas de Barcelona (Open Data BCN): qué problemas se repiten, en qué barrios y cuánto tardan en resolverse. Mapa interactivo y métricas de tiempo de resolución calculadas en SQL.",
      en: "Analysis of Barcelona's citizen incident reports (Open Data BCN): which problems keep recurring, in which neighbourhoods, and how long they take to be resolved. Interactive map and resolution-time metrics computed in SQL.",
    },
    url: "https://alexmf18.github.io/barcelona-incidents/",
    repo: "https://github.com/alexmf18/barcelona-incidents",
    img: "/images/barcelona-incidents.webp",
    imgHeight: 567,
  },
  {
    id: 9,
    category: "Data",
    stack: ["SQL", "DuckDB", "React", "Tailwind", "Recharts"],
    title: "Returns Ledger",
    description: {
      es: "Dashboard interactivo que analiza más de 1M de transacciones de un e-commerce para encontrar qué productos, países y meses concentran las devoluciones. Cada gráfico muestra la consulta SQL (CTEs, window functions) que lo genera.",
      en: "Interactive dashboard that analyses over 1M e-commerce transactions to find which products, countries and months concentrate returns. Every chart shows the SQL query (CTEs, window functions) behind it.",
    },
    url: "https://returns-ledger.vercel.app/",
    repo: "https://github.com/alexmf18/returns-ledger",
    img: "/images/returns-ledger.webp",
    imgHeight: 567,
  },
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
  {
    id: 8,
    category: "React",
    stack: ["React", "Tailwind"],
    title: "Nihongo Teacher",
    description: {
      es: "Aplicación para repasar japonés, con tablas de kana, kanji y gramática, ejercicios de práctica y seguimiento del progreso.",
      en: "Japanese review app for students, with kana, kanji and grammar tables, practice exercises and progress tracking.",
    },
    url: "https://nihongo-teacher.vercel.app/",
    img: "/images/nihongo.webp",
    imgHeight: 560,
  },
];
