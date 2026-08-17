const LANG_KEY = "portfolio-lang";
const CONTACT_FORM_URL = "https://form.typeform.com/to/WQPiXRuC";

const PROJECT_LOGOS = {
  "walmart-sales": "assets/images/logos/walmart.svg",
  "uber-pickups": "assets/images/logos/uber.svg",
  "kayak-trip": "assets/images/logos/kayak.svg",
  "att-spam": "assets/images/logos/atandt.svg",
  "tinder-eda": "assets/images/logos/tinder.svg",
  "steam-market": "assets/images/logos/steam.svg",
  "north-face": "assets/images/logos/thenorthface.svg",
  "spotify-governance": "assets/images/logos/spotify.svg",
  getaround: "assets/images/logos/getaround.png",
  "stripe-architecture": "assets/images/logos/stripe.svg",
  "local-airflow": "assets/images/logos/airflow.svg",
  "fraud-detection": "assets/images/logos/fraud-detection.png",
  "rtsp-yolo": "assets/images/logos/yolo.png",
  "conversion-rate": "assets/images/logos/data-science-weekly.png",
  "windscan-predictive": "assets/images/logos/windscan.png",
};

let data = null;
let lang = localStorage.getItem(LANG_KEY) || "fr";

function resolvePath(relativePath) {
  const segments = window.location.pathname.split("/").filter(Boolean);
  const last = segments[segments.length - 1];

  if (last && last.includes(".")) {
    segments.pop();
  }

  const base = segments.length ? `/${segments.join("/")}/` : "/";
  return `${base}${relativePath}`;
}

function t(obj) {
  if (!obj) return "";
  if (typeof obj === "string") return obj;
  return obj[lang] || obj.fr || obj.en || "";
}

function setLang(newLang) {
  lang = newLang;
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang;
  document.getElementById("lang-toggle").textContent = lang.toUpperCase();
  if (data) render();
}

function toggleLang() {
  setLang(lang === "fr" ? "en" : "fr");
}

function renderNav() {
  const nav = document.getElementById("nav");
  const links = [
    { href: "#about", label: t(data.nav.about) },
    { href: "#projects", label: t(data.nav.projects) },
    { href: "#skills", label: t(data.nav.skills) },
    { href: "#education", label: t(data.nav.education) },
    { href: "#experience", label: t(data.nav.experience) },
    { href: CONTACT_FORM_URL, label: t(data.nav.contact), external: true },
  ];

  nav.innerHTML = links
    .map(({ href, label, external }) =>
      external
        ? `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`
        : `<a href="${href}">${label}</a>`
    )
    .join("");
}

function renderHero() {
  const { profile } = data;
  const labels = data.labels;

  document.getElementById("hero").innerHTML = `
    <div class="container hero-inner hero-text-panel">
      <div class="hero-photo-frame">
        <img
          class="hero-photo"
          src="${profile.photo}"
          alt="${profile.name}"
          width="140"
          height="140"
        />
      </div>
      <div>
        <h1 class="hero-title">${profile.name}</h1>
        <p class="hero-role">${t(profile.title)}</p>
        <p class="hero-tagline">${t(profile.tagline)}</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="${CONTACT_FORM_URL}" target="_blank" rel="noopener noreferrer">
            ${t({ fr: "Me contacter", en: "Contact me" })}
          </a>
          <a class="btn btn-outline" href="${profile.github}" target="_blank" rel="noopener noreferrer">
            ${t(labels.viewGithub)}
          </a>
          <a class="btn btn-outline" href="https://www.linkedin.com/in/julien-charlier-data/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  `;
}

function renderAbout() {
  document.getElementById("about").innerHTML = `
    <div class="container">
      <h2 class="section-title">${t(data.nav.about)}</h2>
      <p class="about-text">${t(data.about)}</p>
    </div>
  `;
}

function renderTimeline(items, { titleKey, nameKey, orgKey }) {
  return items
    .map((item) => {
      const stack = item.stack?.length
        ? `<div class="timeline-stack">
            ${item.stack.map((tech) => `<span>${tech}</span>`).join("")}
          </div>`
        : "";

      return `
        <article class="timeline-item">
          <div class="timeline-meta">
            <time class="timeline-period">${t(item.period)}</time>
            <span class="timeline-location">${t(item.location)}</span>
          </div>
          <div class="timeline-body">
            <h3 class="timeline-title">${t(item[titleKey])}</h3>
            <p class="timeline-org">${item[orgKey]}</p>
            <p class="timeline-desc">${t(item.description)}</p>
            ${stack}
          </div>
        </article>
      `;
    })
    .join("");
}

function renderExperience() {
  document.getElementById("experience").innerHTML = `
    <div class="container">
      <h2 class="section-title">${t(data.nav.experience)}</h2>
      <div class="timeline-list">${renderTimeline(data.experience, {
        titleKey: "role",
        orgKey: "company",
      })}</div>
    </div>
  `;
}

function renderEducation() {
  document.getElementById("education").innerHTML = `
    <div class="container">
      <h2 class="section-title">${t(data.nav.education)}</h2>
      <div class="timeline-list">${renderTimeline(data.education, {
        titleKey: "degree",
        orgKey: "school",
      })}</div>
    </div>
  `;
}

function renderSkills() {
  const groups = data.skills
    .map(
      (group) => `
      <div class="skill-group">
        <h3 class="skill-group-title">${t(group.category)}</h3>
        <div class="skill-tags">
          ${group.items.map((item) => `<span class="skill-tag">${item}</span>`).join("")}
        </div>
      </div>
    `
    )
    .join("");

  document.getElementById("skills").innerHTML = `
    <div class="container">
      <h2 class="section-title">${t(data.nav.skills)}</h2>
      <div class="skills-grid">${groups}</div>
    </div>
  `;
}

function renderProjects() {
  const featured = data.projects.slice(0, 2);
  const others = data.projects.slice(2);
  const labels = data.labels;

  const cards = featured
    .map((project) => {
      const demoLink = project.demo_url
        ? `<a href="${project.demo_url}" target="_blank" rel="noopener noreferrer">${t(labels.demo)}</a>`
        : "";

      const contextBlock = project.context
        ? `<div class="project-context">
            <span class="project-context-label">${t(labels.context)}</span>
            <p>${t(project.context)}</p>
          </div>`
        : "";

      return `
        <article class="project-card">
          <h3>${t(project.title)}</h3>
          <p class="project-summary">${t(project.summary)}</p>
          ${contextBlock}
          <div class="project-stack">
            ${project.stack.map((tech) => `<span>${tech}</span>`).join("")}
          </div>
          <div class="project-links">
            <a href="${project.repo_url}" target="_blank" rel="noopener noreferrer">${t(labels.repo)}</a>
            ${demoLink}
          </div>
        </article>
      `;
    })
    .join("");

  const otherCards = others
    .map((project) => {
      const logo = PROJECT_LOGOS[project.id];
      if (logo) {
        const shortTitle = t(project.title).replace(/^[^-]+-\s*/, "");
        return `
          <div class="flip-card">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <img class="flip-card-logo" src="${logo}" alt="${t(project.title)}" />
                <h3>${shortTitle}</h3>
                <span class="flip-card-hint">${t({ fr: "Cliquer pour voir le détail", en: "Click for details" })}</span>
              </div>
              <div class="flip-card-back">
                <h3>${t(project.title)}</h3>
                <p class="project-summary">${t(project.summary)}</p>
                <div class="project-stack">
                  ${project.stack.map((tech) => `<span>${tech}</span>`).join("")}
                </div>
                <div class="project-links">
                  <a href="${project.repo_url}" target="_blank" rel="noopener noreferrer">${t(labels.repo)}</a>
                </div>
              </div>
            </div>
          </div>
        `;
      }

      return `
        <article class="project-card project-card-compact">
          <h3>${t(project.title)}</h3>
          <p class="project-summary">${t(project.summary)}</p>
          <div class="project-stack">
            ${project.stack.map((tech) => `<span>${tech}</span>`).join("")}
          </div>
          <div class="project-links">
            <a href="${project.repo_url}" target="_blank" rel="noopener noreferrer">${t(labels.repo)}</a>
          </div>
        </article>
      `;
    })
    .join("");

  const othersBlock = others.length
    ? `<h3 class="projects-subtitle">${t(labels.otherProjects)}</h3>
      <div class="projects-grid-compact">${otherCards}</div>`
    : "";

  document.getElementById("projects").innerHTML = `
    <div class="container">
      <h2 class="section-title">${t(data.nav.projects)}</h2>
      <div class="projects-grid">${cards}</div>
      ${othersBlock}
    </div>
  `;

  document.querySelectorAll(".flip-card").forEach((card) => {
    card.addEventListener("click", () => card.classList.toggle("flipped"));
  });
}

function renderFooter() {
  const year = new Date().getFullYear();
  document.getElementById("footer").innerHTML = `
    <div class="container">
      <p>&copy; ${year} ${data.profile.name}. ${t(data.labels.rights)}</p>
    </div>
  `;
}

function render() {
  document.title = t(data.meta.siteTitle);
  document.getElementById("nav-name").textContent = "Codaix";
  renderNav();
  renderHero();
  renderAbout();
  renderEducation();
  renderExperience();
  renderSkills();
  renderProjects();
  renderFooter();
}

function showError(message) {
  const banner = document.getElementById("error-banner");
  banner.textContent = message;
  banner.classList.remove("hidden");
}

async function init() {
  document.getElementById("lang-toggle").addEventListener("click", toggleLang);
  setLang(lang);

  const dataUrl = resolvePath("data/portfolio.json");

  try {
    const response = await fetch(dataUrl);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    data = await response.json();
    render();

    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) target.scrollIntoView();
    }
  } catch (err) {
    const detail = err?.message ? ` (${err.message})` : "";
    showError(
      lang === "fr"
        ? `Impossible de charger ${dataUrl}${detail}. Lancez le serveur depuis le dossier du projet : python3 -m http.server 8081 puis ouvrez http://localhost:8081/`
        : `Unable to load ${dataUrl}${detail}. Start the server from the project folder: python3 -m http.server 8081 then open http://localhost:8081/`
    );
  }
}

document.addEventListener("DOMContentLoaded", init);