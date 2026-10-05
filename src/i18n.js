import { ref } from "vue";

// Minimal i18n for a one-page site. Spanish is the default (and the language
// of the meta tags in index.html); a visitor's choice is remembered.
export const LOCALES = ["es", "en"];
const STORAGE_KEY = "locale";

const messages = {
  es: {
    meta: { title: "Alex Morcillo | Portfolio" },
    nav: {
      about: "Sobre mí",
      experience: "Experiencia",
      projects: "Proyectos",
      skills: "Habilidades",
      contact: "Contacto",
    },
    header: {
      home: "Ir al inicio",
      downloadCv: "Descargar CV",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
      switchLanguage: "Switch to English",
    },
    common: {
      logoAlt: "Logo de Alex Morcillo",
      opensInNewTab: "(se abre en una pestaña nueva)",
    },
    hero: {
      portraitAlt: "Retrato de Alex Morcillo",
      available: "Disponible para contratación",
      subtitleStart: "Técnico informático y desarrollador web con",
      subtitleStrong: "alma creativa y mente analítica.",
      subtitleEnd:
        "Me encanta transformar ideas en proyectos digitales que conectan con las personas.",
      socialLabel: "Redes sociales",
    },
    about: {
      title: "Sobre mí",
      connect: "Conectar",
      location: "Ubicación",
      phone: "Teléfono",
      email: "Email",
      experience: "Experiencia",
      experienceValue: "7+ años de experiencia",
      paragraphs: [
        "Profesional IT con más de 7 años de experiencia en soporte técnico y gestión de sistemas, especializado en resolución de incidencias, soporte N1/N2 y trabajo con bases de datos. A lo largo de mi trayectoria he participado en la implementación de cambios en entornos web y en la optimización de procesos técnicos para clientes.",
        "Actualmente estoy ampliando mi perfil hacia el desarrollo web, trabajando con HTML, CSS y JavaScript, y combinando mi experiencia en soporte y sistemas con el desarrollo de soluciones digitales. Destaco por mi capacidad para analizar problemas, aprender rápido y adaptarme a entornos técnicos exigentes.",
        "Busco oportunidades donde pueda aportar valor técnico y seguir creciendo como desarrollador web dentro de equipos tecnológicos.",
      ],
      hobbiesTitle: "Cuando no estoy programando…",
      hobbies: {
        books: "Libros",
        games: "Videojuegos",
        travel: "Viajes",
        films: "Películas",
      },
    },
    experience: { title: "Experiencia", education: "Formación" },
    projects: {
      title: "Proyectos destacados",
      viewAll: "Ver todos",
      viewLess: "Ver menos",
      all: "Todos",
      imageAlt: "Imagen del proyecto",
    },
    skills: { title: "Habilidades" },
    contact: {
      title: "Contacto",
      intro:
        "¿Tienes una oferta, un proyecto o una pregunta? Escríbeme y te responderé lo antes posible.",
      name: "Nombre",
      email: "Email",
      message: "Mensaje",
      send: "Enviar mensaje",
      sending: "Enviando…",
      sent: "¡Gracias! He recibido tu mensaje y te responderé pronto.",
      error:
        "No se ha podido enviar el mensaje. Escríbeme directamente a alexmf188@gmail.com.",
      mailOpened:
        "Se ha abierto tu aplicación de correo con el mensaje preparado. Solo tienes que enviarlo.",
      subject: "Contacto desde el portfolio",
      or: "O escríbeme directamente:",
      sentButton: "Enviado",
      errors: {
        nameRequired: "Dime cómo te llamas.",
        emailRequired: "Necesito un email para poder responderte.",
        emailInvalid: "Este email no parece válido (ej. nombre@dominio.com).",
        messageRequired: "Escribe un mensaje antes de enviarlo.",
      },
    },
    footer: { builtWith: "Construido con minimalismo" },
  },

  en: {
    meta: { title: "Alex Morcillo | Portfolio" },
    nav: {
      about: "About",
      experience: "Experience",
      projects: "Projects",
      skills: "Skills",
      contact: "Contact",
    },
    header: {
      home: "Go to top",
      downloadCv: "Download CV (ES)",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      switchLanguage: "Cambiar a español",
    },
    common: {
      logoAlt: "Alex Morcillo logo",
      opensInNewTab: "(opens in a new tab)",
    },
    hero: {
      portraitAlt: "Portrait of Alex Morcillo",
      available: "Open to work",
      subtitleStart: "IT technician and web developer with a",
      subtitleStrong: "creative soul and an analytical mind.",
      subtitleEnd:
        "I love turning ideas into digital projects that connect with people.",
      socialLabel: "Social links",
    },
    about: {
      title: "About me",
      connect: "Connect",
      location: "Location",
      phone: "Phone",
      email: "Email",
      experience: "Experience",
      experienceValue: "7+ years of experience",
      paragraphs: [
        "IT professional with over 7 years of experience in technical support and systems management, specialised in incident resolution, L1/L2 support and working with databases. Throughout my career I have helped roll out changes to web environments and optimise technical processes for clients.",
        "I am currently expanding my profile into web development, working with HTML, CSS and JavaScript and combining my support and systems background with building digital solutions. I stand out for my ability to analyse problems, learn quickly and adapt to demanding technical environments.",
        "I am looking for opportunities where I can add technical value and keep growing as a web developer within technology teams.",
      ],
      hobbiesTitle: "When I'm not coding…",
      hobbies: {
        books: "Books",
        games: "Video games",
        travel: "Travel",
        films: "Films",
      },
    },
    experience: { title: "Experience", education: "Education" },
    projects: {
      title: "Featured Projects",
      viewAll: "View all",
      viewLess: "View less",
      all: "All",
      imageAlt: "Screenshot of",
    },
    skills: { title: "Skills" },
    contact: {
      title: "Contact",
      intro:
        "Have a job offer, a project or a question? Send me a message and I'll get back to you as soon as I can.",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send message",
      sending: "Sending…",
      sent: "Thanks! I've received your message and will reply soon.",
      error:
        "The message couldn't be sent. Please email me directly at alexmf188@gmail.com.",
      mailOpened:
        "Your email app has opened with the message ready. Just press send.",
      subject: "Message from your portfolio",
      or: "Or email me directly:",
      sentButton: "Sent",
      errors: {
        nameRequired: "Please tell me your name.",
        emailRequired: "I need an email address to reply to.",
        emailInvalid: "This email doesn't look valid (e.g. name@domain.com).",
        messageRequired: "Write a message before sending it.",
      },
    },
    footer: { builtWith: "Built with minimalism" },
  },
};

const readSaved = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return LOCALES.includes(saved) ? saved : null;
  } catch {
    return null;
  }
};

export const locale = ref(readSaved() ?? "es");

const applyToDocument = () => {
  document.documentElement.lang = locale.value;
  document.title = t("meta.title");
};

export function setLocale(next) {
  if (!LOCALES.includes(next)) return;
  locale.value = next;
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Storage can be blocked (private mode); the choice just isn't remembered
  }
  applyToDocument();
}

// t("hero.available") -> string (or array) for the current locale.
// Reading locale.value here makes templates re-render when it changes.
export function t(key) {
  const value = key
    .split(".")
    .reduce((node, part) => node?.[part], messages[locale.value]);
  return value ?? key;
}

// Data fields are either plain values (same in every language)
// or { es, en } objects.
export function tr(value) {
  return value && typeof value === "object" && !Array.isArray(value)
    ? value[locale.value]
    : value;
}

applyToDocument();
