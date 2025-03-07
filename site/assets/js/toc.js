document.addEventListener("DOMContentLoaded", () => {
  // Seleciona elementos importantes
  const headings = document.querySelectorAll("h1, h2, h3");
  const tocList = document.querySelector(".toc-list");
  const toggleTocButton = document.getElementById("toggle-toc");

  if (!tocList || !toggleTocButton) return;

  // Variáveis para gerenciar o estado do Sumário
  let currentH1Item = null,
    currentH2Item = null;

  // ==============================
  // Função: Gera o Sumário Dinamicamente
  // ==============================
  const generateTOC = () => {
    headings.forEach((heading) => {
      const id = heading.id || heading.textContent.toLowerCase().replace(/\s+/g, "-");
      heading.id = id;

      const listItem = document.createElement("li");
      const link = document.createElement("a");
      link.href = `#${id}`;
      link.textContent = heading.textContent;

      if (["H1", "H2", "H3"].includes(heading.tagName)) {
        const sublist = document.createElement("ul");
        sublist.style.display = "none"; // Inicialmente oculto

        if (heading.tagName === "H1") {
          listItem.innerHTML = `<span class="expand-button">▶</span> ${heading.textContent}`;
          tocList.appendChild(listItem);
          listItem.appendChild(sublist);
          currentH1Item = sublist;
          currentH2Item = null;
        } else if (heading.tagName === "H2") {
          listItem.innerHTML = `<span class="expand-button">▶</span> ${heading.textContent}`;
          (currentH1Item || tocList).appendChild(listItem);
          listItem.appendChild(sublist);
          currentH2Item = sublist;
        } else if (heading.tagName === "H3") {
          listItem.innerHTML = `<a href="#${id}">${heading.textContent}</a>`;
          (currentH2Item || currentH1Item || tocList).appendChild(listItem);
        }

        // Expandir/recolher sublistas ao clicar no botão
        const expandButton = listItem.querySelector(".expand-button");
        if (expandButton) {
          expandButton.addEventListener("click", (e) => {
            e.stopPropagation(); // Evita que o clique afete outros elementos
            listItem.classList.toggle("expanded");
            expandButton.textContent = listItem.classList.contains("expanded") ? "▼" : "▶";
            sublist.style.display = listItem.classList.contains("expanded") ? "block" : "none";
          });
        }

        // Navegação suave ao clicar no link
        link.addEventListener("click", (e) => {
          e.preventDefault();
          document.querySelector(`#${id}`).scrollIntoView({ behavior: "smooth" });
        });
      }
    });
  };

  // ==============================
  // Função: Destaca o Item Ativo no Sumário
  // ==============================
  const highlightActiveTocItem = () => {
    let currentSection = null;
    headings.forEach((heading) => {
      const rect = heading.getBoundingClientRect();
      if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
        currentSection = heading.id;
      }
    });

    const tocLinks = document.querySelectorAll("#TOC a");
    tocLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(currentSection)) {
        link.classList.add("active");
      }
    });
  };

  // ==============================
  // Função: Expandir/Recolher Tudo
  // ==============================
  const toggleAllItems = (expand) => {
    const items = tocList.querySelectorAll("li");
    items.forEach((item) => {
      const expandButton = item.querySelector(".expand-button");
      const sublist = item.querySelector("ul");
      if (expandButton && sublist) {
        if (expand) {
          item.classList.add("expanded");
          expandButton.textContent = "▼";
          sublist.style.display = "block";
        } else {
          item.classList.remove("expanded");
          expandButton.textContent = "▶";
          sublist.style.display = "none";
        }
      }
    });
  };

  // Botão para expandir/recolher tudo
  toggleTocButton.addEventListener("click", () => {
    const isExpanded = toggleTocButton.textContent.includes("Recolher");
    toggleAllItems(!isExpanded);
    toggleTocButton.textContent = isExpanded ? "Expandir Tudo" : "Recolher Tudo";
  });

  // ==============================
  // Inicialização
  // ==============================
  generateTOC(); // Gera o Sumário dinamicamente
  highlightActiveTocItem(); // Aplica o destaque inicial ao carregar a página

  // Atualiza o item ativo enquanto o usuário rola a página
  window.addEventListener("scroll", highlightActiveTocItem);
});








// Botão voltar
document.addEventListener("DOMContentLoaded", () => {
  const backToTopButton = document.getElementById("back-to-top");

  if (!backToTopButton) return;

  // Mostra ou oculta o botão com base na posição do scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      backToTopButton.style.display = "block"; // Mostra o botão
    } else {
      backToTopButton.style.display = "none"; // Oculta o botão
    }
  });

  // Função para rolar suavemente até o topo
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Rola suavemente
    });
  });
});