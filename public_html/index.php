<?php
declare(strict_types=1);
?>
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Renan De Moraes | Portfolio</title>
    <meta
      name="description"
      content="Portfolio de Renan De Moraes - Data Engineering, AI e Desenvolvimento Full Stack."
    />
    <link rel="stylesheet" href="./assets/css/style.css" />
  </head>
  <body>
    <header class="topbar">
      <div class="container topbar-content">
        <a class="brand" href="#home">Renan De Moraes</a>
        <nav>
          <ul class="menu">
            <li>
              <a href="#home">
                <img class="icon icon-nav" src="./assets/icons/home.png" alt="" aria-hidden="true" />
                <span data-i18n="nav.home">Home</span>
              </a>
            </li>
            <li>
              <a href="#about">
                <img class="icon icon-nav" src="./assets/icons/personal-card.png" alt="" aria-hidden="true" />
                <span data-i18n="nav.about">Sobre</span>
              </a>
            </li>
            <li>
              <a href="#portfolio">
                <img class="icon icon-nav" src="./assets/icons/portfolio.png" alt="" aria-hidden="true" />
                <span data-i18n="nav.portfolio">Portfólio</span>
              </a>
            </li>
            <li>
              <a href="#experience">
                <img class="icon icon-nav" src="./assets/icons/suitcase.png" alt="" aria-hidden="true" />
                <span data-i18n="nav.experience">Experiência</span>
              </a>
            </li>
            <li>
              <a href="#contact">
                <img class="icon icon-nav" src="./assets/icons/email.png" alt="" aria-hidden="true" />
                <span data-i18n="nav.contact">Contato</span>
              </a>
            </li>
          </ul>
        </nav>
        <div class="lang-switch" role="group" aria-label="Seleção de idioma">
          <button type="button" class="lang-btn is-active" data-lang="pt">PT</button>
          <button type="button" class="lang-btn" data-lang="en">EN</button>
        </div>
      </div>
    </header>

    <main>
      <section id="home" class="hero container">
        <p class="kicker" data-i18n="hero.kicker">Builder Mindset</p>
        <h1 data-i18n="profile.headline">
          Python | SQL | Developer | IA | Open Source | Engenharia de Dados | Consultor
        </h1>
        <p class="lead" data-i18n="profile.summary"></p>
        <div class="hero-actions">
          <a class="btn" href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
            <img class="icon" src="./assets/icons/linkedin.png" alt="" aria-hidden="true" />
            LinkedIn
          </a>
          <a class="btn" href="https://github.com/mpraes" target="_blank" rel="noreferrer">
            <img class="icon" src="./assets/icons/github.png" alt="" aria-hidden="true" />
            GitHub
          </a>
          <a
            class="btn btn-alt"
            href="./assets/resume/Resume_Renan_De_Moraes_EN_AI_Engineer.pdf"
            download="Resume_Renan_De_Moraes_EN_AI_Engineer.pdf"
          >
            <img class="icon" src="./assets/icons/resume.png" alt="" aria-hidden="true" />
            <span data-i18n="hero.cv">Download CV</span>
          </a>
        </div>
      </section>

      <section id="about" class="section container">
        <h2>
          <img class="icon icon-title" src="./assets/icons/personal-card.png" alt="" aria-hidden="true" />
          <span data-i18n="about.title">Sobre</span>
        </h2>
        <p data-i18n="about.text"></p>
      </section>

      <section id="portfolio" class="section container">
        <h2>
          <img class="icon icon-title" src="./assets/icons/portfolio.png" alt="" aria-hidden="true" />
          <span data-i18n="portfolio.title">SaaS & Products</span>
        </h2>
        <div id="products" class="grid"></div>
      </section>

      <section class="section container">
        <h2>
          <img class="icon icon-title" src="./assets/icons/git.png" alt="" aria-hidden="true" />
          <span data-i18n="opensource.title">Open Source</span>
        </h2>
        <p class="muted" data-i18n="opensource.subtitle"></p>
        <h3 class="subsection-title" data-i18n="opensource.featuredTitle">Principais Repositórios</h3>
        <div id="featured-repos" class="grid"></div>
        <h3 class="subsection-title" data-i18n="opensource.latestTitle">Outros Repositórios</h3>
        <div id="repos" class="grid"></div>
      </section>

      <section id="experience" class="section container">
        <h2>
          <img class="icon icon-title" src="./assets/icons/suitcase.png" alt="" aria-hidden="true" />
          <span data-i18n="experience.title">Experiência</span>
        </h2>
        <div id="timeline" class="timeline"></div>
      </section>

      <section id="contact" class="section container">
        <h2>
          <img class="icon icon-title" src="./assets/icons/email.png" alt="" aria-hidden="true" />
          <span data-i18n="contact.title">Contato</span>
        </h2>
        <p>
          <span data-i18n="contact.cta">Vamos construir algo útil juntos.</span>
          <a href="mailto:renan@example.com">renan@example.com</a>
        </p>
      </section>
    </main>

    <footer class="footer">
      <div class="container">
        <small>&copy; <?php echo date('Y'); ?> Renan De Moraes</small>
      </div>
    </footer>

    <script src="./assets/js/app.js" defer></script>
  </body>
</html>
