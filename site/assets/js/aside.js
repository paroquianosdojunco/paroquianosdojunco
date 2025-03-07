document.addEventListener('DOMContentLoaded', () => {
  // Seleciona o aside
  const sidebar = document.querySelector('aside');

  // Verifica se o aside contém o sumário (TOC)
  const tocExists = sidebar.querySelector('#TOC');
  if (!tocExists) return; // Se não houver TOC, não adiciona o botão

  // Cria o botão de toggle
  const toggleButton = document.createElement('button');
  toggleButton.id = 'toggleSidebar';
  toggleButton.className = 'toggle-btn';
  toggleButton.innerHTML = '☰'; // Ícone do botão

  // Adiciona o botão ao aside
  sidebar.prepend(toggleButton);

  // Adiciona o evento de clique ao botão
  toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });
});