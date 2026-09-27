# Alex Morcillo — Portfolio

Personal portfolio of Alex Morcillo Fulgencio, IT technician and web developer.

**Live:** https://portfolio-web-alex-morcillo.vercel.app/

## Stack

- [Vue 3](https://vuejs.org/) (`<script setup>` single-file components)
- [Vite](https://vite.dev/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- Self-hosted fonts via [Fontsource](https://fontsource.org/) (Inter, Barlow Condensed)
- Font Awesome free icons, rendered as inline SVG by `BaseIcon.vue`
- Vitest + Vue Test Utils, ESLint (`eslint-plugin-vue`), Prettier
- GitHub Actions: lint, format check, tests and build on every push

## Getting started

```bash
npm install
npm run dev      # dev server at http://localhost:5173
npm test         # run the test suite once (npm run test:watch to re-run on save)
npm run lint     # ESLint
npm run format   # format everything with Prettier
npm run build    # production build in dist/
npm run preview  # serve the production build
```

## Project structure

```
src/
  App.vue             Page layout: header, sections and footer
  components/         One component per section, plus ProjectCard and BaseIcon
  data/               Page content — edit these to update the site
    profile.js          Nav links, CV, social links, contact details, hobbies
    projects.js         Projects shown in "Proyectos"
    experience.js       Work experience and education
    skills.js           Skill groups
  icons.js            The Font Awesome icons the page uses
  style.css           Global styles and component classes (Tailwind @apply)
public/
  documents/          CV PDF linked from "Descargar CV"
  images/             Photos, project screenshots, preview image
index.html            Meta tags, Open Graph, structured data
```

### Common edits

- **Add a project:** add an entry to `src/data/projects.js` and a 1200px-wide
  WebP screenshot to `public/images/`. The filter buttons are generated from
  each project's `category`.
- **Update the CV:** replace `public/documents/CV_Alex_Morcillo_Fulgencio.pdf`
  (or change `cv` in `src/data/profile.js`).
- **Use a new icon:** export it from `src/icons.js`, then pass it to
  `<BaseIcon :icon="..." />`.
- **Edit interface text (both languages):** `src/i18n.js`. Content in
  `src/data/` uses `{ es, en }` pairs for anything that's translated.
- **Contact form:** by default it opens the visitor's email app. To receive
  messages directly, create a form at [Formspree](https://formspree.io/) and
  paste its endpoint into `contactFormEndpoint` in `src/data/profile.js`.
