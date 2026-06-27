const state = {
  lang: localStorage.getItem("lang") || "pt",
  data: null,
  githubUser: "mpraes",
  repos: [],
  reposError: false,
  featuredRepoNames: [
    "quickelt",
    "webapp_gas_mais_barato",
    "pandas_pipeline_agent_flow_generator",
    "awesome_list_faith_tech_materials",
  ],
};

async function init() {
  await loadContent();
  bindLanguageButtons();
  await loadRepos();
}

async function loadContent() {
  const response = await fetch("./api/content.php");
  state.data = await response.json();
  renderPage();
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

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.lang === state.lang);
  });

  renderProducts(t.portfolio.items);
  renderTimeline(t.experience.items);
  renderRepos();
}

function renderProducts(items) {
  const container = document.getElementById("products");
  container.innerHTML = "";
  items.forEach((item) => {
    container.insertAdjacentHTML(
      "beforeend",
      `
      <article class="card">
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.text)}</p>
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
  const otherContainer = document.getElementById("repos");
  if (!t || !featuredContainer || !otherContainer) return;

  featuredContainer.innerHTML = "";
  otherContainer.innerHTML = "";

  if (state.reposError) {
    const fallback = t.opensource.empty || "Could not load.";
    otherContainer.innerHTML = `<article class="card"><p>${escapeHtml(fallback)}</p></article>`;
    return;
  }

  if (!state.repos.length) return;

  const featuredOrder = new Map(
    state.featuredRepoNames.map((name, index) => [name.toLowerCase(), index])
  );
  const featured = [];
  const others = [];

  state.repos.forEach((repo) => {
    if (featuredOrder.has(repo.name.toLowerCase())) {
      featured.push(repo);
      return;
    }
    others.push(repo);
  });

  featured.sort(
    (a, b) =>
      featuredOrder.get(a.name.toLowerCase()) - featuredOrder.get(b.name.toLowerCase())
  );

  renderRepoCards(featuredContainer, featured.slice(0, 4), t, true);
  renderRepoCards(otherContainer, others.slice(0, 6), t, false);
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
        <p class="meta">
          <span class="repo-meta">
            <img class="icon" src="./assets/icons/star.png" alt="" aria-hidden="true" />
            ${repo.stargazers_count}
          </span>
          |
          <span class="repo-meta">
            <img class="icon" src="./assets/icons/git.png" alt="" aria-hidden="true" />
            ${repo.forks_count}
          </span>
        </p>
        <a href="${repo.html_url}" target="_blank" rel="noreferrer">${escapeHtml(
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

init();
