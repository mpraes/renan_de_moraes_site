<?php
declare(strict_types=1);

$stylePath = __DIR__ . '/assets/css/style.css';
$scriptPath = __DIR__ . '/assets/js/app.js';
$styleVersion = is_file($stylePath) ? (string) filemtime($stylePath) : '1';
$scriptVersion = is_file($scriptPath) ? (string) filemtime($scriptPath) : '1';
$siteUrl = 'https://renan-de-moraes.com/';
$pageTitle = 'Renan De Moraes | Data & AI Engineer';
$pageDescription = 'Portfolio de Renan De Moraes com projetos em Data Engineering, IA, BI, produtos SaaS e open source.';
?>
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="color-scheme" content="dark" />
    <meta name="theme-color" content="#050505" />
    <title><?php echo htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8'); ?></title>
    <meta name="description" content="<?php echo htmlspecialchars($pageDescription, ENT_QUOTES, 'UTF-8'); ?>" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="author" content="Renan De Moraes" />
    <meta name="keywords" content="Renan De Moraes, Data Engineer, AI Engineer, BI, SQL, Python, Portfólio, Open Source" />
    <link rel="canonical" href="<?php echo htmlspecialchars($siteUrl, ENT_QUOTES, 'UTF-8'); ?>" />

    <meta property="og:type" content="website" />
    <meta property="og:locale" content="pt_BR" />
    <meta property="og:site_name" content="Renan De Moraes" />
    <meta property="og:title" content="<?php echo htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8'); ?>" />
    <meta property="og:description" content="<?php echo htmlspecialchars($pageDescription, ENT_QUOTES, 'UTF-8'); ?>" />
    <meta property="og:url" content="<?php echo htmlspecialchars($siteUrl, ENT_QUOTES, 'UTF-8'); ?>" />
    <meta property="og:image" content="<?php echo htmlspecialchars($siteUrl . 'assets/icons/home.png', ENT_QUOTES, 'UTF-8'); ?>" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="<?php echo htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8'); ?>" />
    <meta name="twitter:description" content="<?php echo htmlspecialchars($pageDescription, ENT_QUOTES, 'UTF-8'); ?>" />
    <meta name="twitter:image" content="<?php echo htmlspecialchars($siteUrl . 'assets/icons/home.png', ENT_QUOTES, 'UTF-8'); ?>" />

    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Renan De Moraes",
        "url": "https://renan-de-moraes.com/",
        "jobTitle": "Data & AI Engineer",
        "sameAs": [
          "https://www.linkedin.com/in/renan-moraes-data-ai-engineer/",
          "https://github.com/mpraes"
        ]
      }
    </script>
    <link rel="stylesheet" href="./assets/css/style.css?v=<?php echo rawurlencode($styleVersion); ?>" />
  </head>
  <body>
    <div
      id="page-status"
      class="status-message container"
      role="status"
      aria-live="polite"
      data-load-error-pt="Nao foi possivel carregar o conteudo dinamico. Exibindo versao reduzida."
      data-load-error-en="Could not load dynamic content. Showing a reduced fallback version."
      hidden
    ></div>
    <header class="topbar">
      <div class="container topbar-content">
        <a class="brand" href="#home">Renan De Moraes</a>
        <nav aria-label="Navegacao principal" data-i18n-attr="aria-label:ui.mainNavAria">
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
        <div class="lang-switch" role="group" aria-label="Selecao de idioma" data-i18n-attr="aria-label:ui.languageSwitchAria">
          <button type="button" class="lang-btn is-active" data-lang="pt" aria-pressed="true">PT</button>
          <button type="button" class="lang-btn" data-lang="en" aria-pressed="false">EN</button>
        </div>
      </div>
    </header>

    <main id="main-content">
      <section id="home" class="hero container section-home">
        <p class="kicker" data-i18n="hero.kicker">Builder Mindset</p>
        <h1 data-i18n="profile.headline">
          Python | SQL | Developer | IA | Open Source | Engenharia de Dados | Consultor
        </h1>
        <p class="lead" data-i18n="profile.summary"></p>
        <div class="hero-actions">
          <a
            class="btn"
            href="https://www.linkedin.com/in/renan-moraes-data-ai-engineer/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir perfil no LinkedIn em nova aba"
            data-i18n-attr="aria-label:hero.linkedinAria"
          >
            <img class="icon" src="./assets/icons/linkedin.png" alt="" aria-hidden="true" />
            LinkedIn
          </a>
          <a
            class="btn"
            href="https://github.com/mpraes"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir perfil no GitHub em nova aba"
            data-i18n-attr="aria-label:hero.githubAria"
          >
            <img class="icon" src="./assets/icons/github.png" alt="" aria-hidden="true" />
            GitHub
          </a>
          <a
            id="cv-download-link"
            class="btn btn-alt"
            href="./assets/resume/Resume_Renan_De_Moraes_EN_AI_Engineer.pdf"
            download="Resume_Renan_De_Moraes_EN_AI_Engineer.pdf"
          >
            <img class="icon" src="./assets/icons/resume.png" alt="" aria-hidden="true" />
            <span data-i18n="hero.cv">Download CV</span>
          </a>
        </div>
      </section>

      <section id="about" class="section container section-about">
        <h2>
          <img class="icon icon-title" src="./assets/icons/personal-card.png" alt="" aria-hidden="true" />
          <span data-i18n="about.title">Sobre</span>
        </h2>
        <p data-i18n="about.text"></p>
      </section>

      <section id="portfolio" class="section container section-portfolio">
        <h2>
          <img class="icon icon-title" src="./assets/icons/portfolio.png" alt="" aria-hidden="true" />
          <span data-i18n="portfolio.title">SaaS & Products</span>
        </h2>
        <div id="products" class="product-list"></div>
      </section>

      <section id="opensource" class="section container section-opensource">
        <h2>
          <img class="icon icon-title" src="./assets/icons/git.png" alt="" aria-hidden="true" />
          <span data-i18n="opensource.title">Open Source</span>
        </h2>
        <p class="muted" data-i18n="opensource.subtitle"></p>
        <h3 class="subsection-title" data-i18n="opensource.featuredTitle">Principais Repositórios</h3>
        <div id="featured-repos" class="grid"></div>
      </section>

      <section id="experience" class="section container section-experience">
        <h2>
          <img class="icon icon-title" src="./assets/icons/suitcase.png" alt="" aria-hidden="true" />
          <span data-i18n="experience.title">Experiência</span>
        </h2>
        <div id="timeline" class="timeline"></div>
      </section>

      <section id="contact" class="section container section-contact">
        <h2>
          <img class="icon icon-title" src="./assets/icons/email.png" alt="" aria-hidden="true" />
          <span data-i18n="contact.title">Contato</span>
        </h2>
        <p>
          <span data-i18n="contact.cta">Vamos construir algo util juntos.</span>
          <a href="mailto:renan.de.moraes77@gmail.com">renan.de.moraes77@gmail.com</a>
        </p>
      </section>
    </main>

    <footer class="footer">
      <div class="container">
        <small>&copy; <?php echo date('Y'); ?> Renan De Moraes</small>
      </div>
    </footer>

    <noscript>
      <div class="container section">
        <p>Ative o JavaScript para carregar portfolio, experiencia e repositorios dinamicamente.</p>
      </div>
    </noscript>

    <script src="./assets/js/app.js?v=<?php echo rawurlencode($scriptVersion); ?>" defer></script>
  </body>
</html>
