const state = {
  lang: localStorage.getItem("lang") || "pt",
  data: null,
  githubUser: "mpraes",
  repos: [],
  reposError: false,
  featuredRepoNames: [
    "webapp_gas_mais_barato",
    "article_scout_agent",
    "single_node_dw",
    "multi_tenant_app",
    "data_scout",
    "pandas_pipeline_agent_flow_generator",
  ],
  featuredOpenSourceSites: [
    {
      name: "Can I Code Without AI?",
      url: "https://canicodewithoutai.site/",
      description: {
        pt: "Pratique programação sem assistência de IA e evolua com aprendizado ativo.",
        en: "Practice coding without AI assistance and improve through active learning.",
      },
    },
  ],
};
let sectionObserver = null;

async function init() {
  await loadContent();
  bindLanguageButtons();
  initSectionObserver();
  await loadRepos();
}

async function loadContent() {
  try {
    const response = await fetch(`./api/content.php?v=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    state.data = await response.json();
    clearStatus();
    renderPage();
  } catch (error) {
    showStatus(getLoadErrorMessage());
  }
}

function bindLanguageButtons() {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.lang = btn.dataset.lang;
      localStorage.setItem("lang", state.lang);
      renderPage();
    });
  });
}

function renderPage() {
  const t = state.data[state.lang];
  if (!t) return;

  document.documentElement.lang = state.lang === "pt" ? "pt-BR" : "en";

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    const value = key.split(".").reduce((acc, part) => acc?.[part], t);
    if (typeof value === "string") node.textContent = value;
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((node) => {
    const [attr, key] = node.dataset.i18nAttr.split(":");
    if (!attr || !key) return;
    const value = key.split(".").reduce((acc, part) => acc?.[part], t);
    if (typeof value === "string") node.setAttribute(attr, value);
  });

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    const isActive = btn.dataset.lang === state.lang;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-pressed", isActive ? "true" : "false");
  });

  syncCvLink(t);
  renderProducts(t.portfolio.items);
  renderTimeline(t.experience.items);
  renderRepos();
  refreshNavStateFromHash();
}

function showStatus(message) {
  const statusNode = document.getElementById("page-status");
  if (!statusNode) return;
  statusNode.hidden = false;
  statusNode.textContent = message;
}

function clearStatus() {
  const statusNode = document.getElementById("page-status");
  if (!statusNode) return;
  statusNode.hidden = true;
  statusNode.textContent = "";
}

function getLoadErrorMessage() {
  const statusNode = document.getElementById("page-status");
  if (!statusNode) return "Could not load dynamic content.";
  const lang = state.lang === "en" ? "en" : "pt";
  const fallback = lang === "en" ? statusNode.dataset.loadErrorEn : statusNode.dataset.loadErrorPt;
  return fallback || "Could not load dynamic content.";
}

function syncCvLink(t) {
  const cvLink = document.getElementById("cv-download-link");
  if (!cvLink) return;

  const fallbackUrl = "./assets/resume/Resume_Renan_De_Moraes_EN_AI_Engineer.pdf";
  const fallbackFile = "Resume_Renan_De_Moraes_EN_AI_Engineer.pdf";

  cvLink.setAttribute("href", t.hero.cvUrl || fallbackUrl);
  cvLink.setAttribute("download", t.hero.cvDownload || fallbackFile);
}

function renderProducts(items) {
  const t = state.data?.[state.lang];
  const container = document.getElementById("products");
  if (!container || !t) return;

  container.className = "product-list";
  container.innerHTML = "";
  items.forEach((item) => {
    const productUrl = typeof item.url === "string" ? item.url : "";
    const itemTitle = escapeHtml(item.title);
    const itemText = escapeHtml(item.text);
    const ctaText = escapeHtml(t.portfolio.viewProduct || "Visit product");
    const safeProductUrl = escapeHtml(productUrl);
    const cardInner = `
      <div class="product-copy">
        <h3>${itemTitle}</h3>
        <p>${itemText}</p>
      </div>
      ${productUrl ? `<span class="product-link">${ctaText}</span>` : ""}
    `;

    if (productUrl) {
      container.insertAdjacentHTML(
        "beforeend",
        `
        <a class="product-item product-item-link" href="${safeProductUrl}" target="_blank" rel="noopener noreferrer">
          ${cardInner}
        </a>
      `
      );
      return;
    }

    container.insertAdjacentHTML(
      "beforeend",
      `
      <article class="product-item">
        ${cardInner}
      </article>
    `
    );
  });
}

function renderTimeline(items) {
  const container = document.getElementById("timeline");
  container.innerHTML = "";
  items.forEach((item) => {
    const achievements = item.achievements
      .map((achievement) => `<li>${escapeHtml(achievement)}</li>`)
      .join("");

    container.insertAdjacentHTML(
      "beforeend",
      `
      <article class="timeline-item">
        <h3>${escapeHtml(item.company)} - ${escapeHtml(item.role)}</h3>
        <p class="meta">${escapeHtml(item.period)} | ${escapeHtml(item.location)}</p>
        <ul>${achievements}</ul>
      </article>
    `
    );
  });
}

async function loadRepos() {
  try {
    const response = await fetch(
      `https://api.github.com/users/${state.githubUser}/repos?sort=updated&per_page=30`
    );
    const repos = await response.json();

    if (!Array.isArray(repos)) throw new Error("Invalid response");
    state.repos = repos;
    state.reposError = false;
  } catch (error) {
    state.repos = [];
    state.reposError = true;
  }

  renderRepos();
}

function renderRepos() {
  const t = state.data?.[state.lang];
  const featuredContainer = document.getElementById("featured-repos");
  if (!t || !featuredContainer) return;

  featuredContainer.innerHTML = "";

  if (state.reposError) {
    const fallback = t.opensource.empty || "Could not load.";
    featuredContainer.innerHTML = `<article class="card"><p>${escapeHtml(fallback)}</p></article>`;
    return;
  }

  if (!state.repos.length) return;

  const featuredOrder = new Map(
    state.featuredRepoNames.map((name, index) => [name.toLowerCase(), index])
  );
  const featured = [];

  state.repos.forEach((repo) => {
    if (featuredOrder.has(repo.name.toLowerCase())) {
      featured.push(repo);
    }
  });

  featured.sort(
    (a, b) =>
      featuredOrder.get(a.name.toLowerCase()) - featuredOrder.get(b.name.toLowerCase())
  );

  const fallbackRepos = state.repos
    .filter((repo) => !repo.fork && !repo.archived)
    .slice(0, 6);
  const githubRepos = featured.length ? featured : fallbackRepos;

  const featuredSites = state.featuredOpenSourceSites.map((site) => ({
    name: site.name,
    description: site.description?.[state.lang] || site.description?.pt || t.opensource.noDescription,
    html_url: site.url,
  }));

  renderRepoCards(featuredContainer, [...githubRepos, ...featuredSites].slice(0, 7), t, true);
}

function renderRepoCards(container, repos, t, isFeatured) {
  if (!repos.length) return;

  repos.forEach((repo) => {
    container.insertAdjacentHTML(
      "beforeend",
      `
      <article class="card">
        ${
          isFeatured
            ? `<span class="repo-badge">${escapeHtml(t.opensource.featuredBadge)}</span>`
            : ""
        }
        <h3>${escapeHtml(repo.name)}</h3>
        <p>${escapeHtml(repo.description || t.opensource.noDescription)}</p>
        ${
          typeof repo.stargazers_count === "number" && typeof repo.forks_count === "number"
            ? `<p class="meta">
          <span class="repo-meta">
            <img class="icon" src="./assets/icons/star.png" alt="" aria-hidden="true" />
            ${repo.stargazers_count}
          </span>
          |
          <span class="repo-meta">
            <img class="icon" src="./assets/icons/git.png" alt="" aria-hidden="true" />
            ${repo.forks_count}
          </span>
        </p>`
            : ""
        }
        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${escapeHtml(
          t.opensource.viewRepo
        )}</a>
      </article>
    `
    );
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function initSectionObserver() {
  if (sectionObserver) return;

  const sectionIds = ["home", "about", "portfolio", "opensource", "experience", "contact"];
  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if (!sections.length) return;

  sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible?.target?.id) return;
      setActiveNavLink(visible.target.id);
    },
    {
      root: null,
      rootMargin: "-45% 0px -45% 0px",
      threshold: [0.2, 0.4, 0.6],
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));
  window.addEventListener("hashchange", refreshNavStateFromHash);
}

function refreshNavStateFromHash() {
  const hashId = window.location.hash?.replace("#", "");
  if (hashId) setActiveNavLink(hashId);
}

function setActiveNavLink(sectionId) {
  document.querySelectorAll(".menu a").forEach((link) => {
    const isActive = link.getAttribute("href") === `#${sectionId}`;
    link.classList.toggle("is-active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

init();
