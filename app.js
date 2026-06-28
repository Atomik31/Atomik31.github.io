const LANG_KEY = "portfolio-lang";

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
    { href: "#education", label: t(data.nav.education) },
    { href: "#experience", label: t(data.nav.experience) },
    { href: "#skills", label: t(data.nav.skills) },
    { href: "#projects", label: t(data.nav.projects) },
    { href: "#contact", label: t(data.nav.contact) },
  ];

  nav.innerHTML = links
    .map(({ href, label }) => `<a href="${href}">${label}</a>`)
    .join("");
}

function renderHero() {
  const { profile } = data;
  const labels = data.labels;

  document.getElementById("hero").innerHTML = `
    <div class="container hero-inner">
      <img
        class="hero-photo"
        src="${profile.photo}"
        alt="${profile.name}"
        width="140"
        height="140"
      />
      <div>
        <h1 class="hero-title">${profile.name}</h1>
        <p class="hero-role">${t(profile.title)}</p>
        <p class="hero-tagline">${t(profile.tagline)}</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="${profile.cv}" download>
            ${t(labels.downloadCv)}
          </a>
          <a class="btn btn-outline" href="${profile.github}" target="_blank" rel="noopener noreferrer">
            ${t(labels.viewGithub)}
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
  const featured = data.projects.filter((p) => p.featured);
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

  document.getElementById("projects").innerHTML = `
    <div class="container">
      <h2 class="section-title">${t(data.nav.projects)}</h2>
      <div class="projects-grid">${cards}</div>
    </div>
  `;
}

function renderContact() {
  const { profile } = data;
  const labels = data.labels;

  const items = [
    { label: t(labels.email), value: profile.email, href: `mailto:${profile.email}` },
    { label: "GitHub", value: "Atomik31", href: profile.github },
    { label: "LinkedIn", value: t(labels.linkedinProfile), href: profile.linkedin },
  ];

  document.getElementById("contact").innerHTML = `
    <div class="container">
      <h2 class="section-title">${t(data.nav.contact)}</h2>
      <div class="contact-list">
        ${items
          .map(
            ({ label, value, href }) => `
          <div class="contact-item">
            <span class="contact-label">${label}</span>
            <a href="${href}" target="_blank" rel="noopener noreferrer">${value}</a>
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  `;
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
  document.getElementById("nav-name").textContent = data.profile.name;
  renderNav();
  renderHero();
  renderAbout();
  renderEducation();
  renderExperience();
  renderSkills();
  renderProjects();
  renderContact();
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