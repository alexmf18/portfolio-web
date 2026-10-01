import {
  faBookOpen,
  faFilm,
  faGamepad,
  faGithub,
  faInstagram,
  faLinkedinIn,
  faPlaneDeparture,
} from "../icons.js";

// Labels are i18n keys (see src/i18n.js)
export const navLinks = [
  { key: "nav.about", href: "#about" },
  { key: "nav.experience", href: "#experience" },
  { key: "nav.projects", href: "#portfolio" },
  { key: "nav.skills", href: "#skills" },
  { key: "nav.contact", href: "#contact" },
];

export const cv = {
  href: "/documents/CV_Alex_Morcillo.pdf",
  filename: "CV_Alex_Morcillo.pdf",
};

export const email = "alexmf188@gmail.com";

// Paste a Formspree endpoint (https://formspree.io/f/xxxxxxx) to have the
// contact form send messages directly. While it's empty, the form opens the
// visitor's email app with the message filled in.
export const contactFormEndpoint = "https://formspree.io/f/maenlaqa";

// `display` is shown in the About contact panel; links without it only
// appear as icons in the hero and as text in the footer.
export const socialLinks = [
  {
    name: "LinkedIn",
    icon: faLinkedinIn,
    href: "https://www.linkedin.com/in/alex-morcillo",
    display: "linkedin.com/in/alex-morcillo",
  },
  {
    name: "GitHub",
    icon: faGithub,
    href: "https://github.com/alexmf18?tab=repositories",
    display: "github.com/alexmf18",
  },
  {
    name: "Instagram",
    icon: faInstagram,
    href: "https://www.instagram.com/alexmf97/",
  },
];

export const contactItems = [
  { labelKey: "about.location", value: "Vallirana, BCN" },
  {
    labelKey: "about.phone",
    value: "+34 602 106 614",
    href: "tel:+34602106614",
  },
  { labelKey: "about.email", value: email, href: `mailto:${email}` },
  { labelKey: "about.experience", valueKey: "about.experienceValue" },
];

export const hobbies = [
  { key: "about.hobbies.books", icon: faBookOpen },
  { key: "about.hobbies.games", icon: faGamepad },
  { key: "about.hobbies.travel", icon: faPlaneDeparture },
  { key: "about.hobbies.films", icon: faFilm },
];
