// ===== Recursos compartilhados do portfólio =====
const referencias = [
  { nome: "Toda Matéria", link: "https://www.todamateria.com.br" },
  { nome: "Descomplica", link: "https://descomplica.com.br" },
  { nome: "YouTube", link: "https://www.youtube.com" },
  { nome: "Google Gemini", link: "https://gemini.google.com" },
  { nome: "Claude", link: "https://claude.ai" },
  { nome: "ChatGPT", link: "https://chatgpt.com" },
  { nome: "Canva", link: "https://www.canva.com" },
  { nome: "Pinterest", link: "https://br.pinterest.com" }
]; // para adicionar uma referência, inclua { nome, link } aqui

function carregarReferencias() {
  const lista = document.getElementById("listaReferencias");
  if (!lista) return;
  lista.innerHTML = "";
  let total = 0;
  referencias.forEach(ref => {
    let url;
    try { url = new URL(ref.link); } catch { return; }
    if (!["http:", "https:"].includes(url.protocol)) return;
    const card = document.createElement("article");
    card.className = "referencia-card";
    card.innerHTML = '<div class="referencia-icone"><i class="fas fa-book-open"></i></div><div class="referencia-info"><h2></h2><a target="_blank" rel="noopener noreferrer"></a></div><span class="referencia-seta"><i class="fas fa-arrow-up-right-from-square"></i></span>';
    card.querySelector("h2").textContent = ref.nome;
    const a = card.querySelector("a");
    a.href = url.href; a.textContent = ref.link;
    lista.appendChild(card); total++;
  });
  if (!total) lista.innerHTML = '<p class="referencias-vazia">As referências serão adicionadas em breve.</p>';
}

function abrirImagem(img) {
  const modal = document.getElementById("modalImagem");
  const grande = document.getElementById("imagemAmpliada");
  if (!modal || !grande || !img) return;
  grande.src = img.currentSrc || img.src;
  grande.alt = img.alt || "Imagem ampliada";
  modal.classList.add("ativo");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  const fechar = modal.querySelector(".fechar-modal");
  if (fechar) fechar.focus();
}
function fecharImagem() {
  const modal = document.getElementById("modalImagem");
  if (!modal) return;
  modal.classList.remove("ativo");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

// ===== Página de agradecimentos: fotos =====
// Para adicionar uma foto: coloque o arquivo na pasta img e inclua { src, legenda } aqui.
const fotosGratidao = [
  // { src: "img/gratidao 1.jpg", legenda: "Meus amigos" },
  // { src: "img/gratidao 2.jpg", legenda: "Meus professores" },
  // { src: "img/gratidao 3.jpg", legenda: "Projeto Virtex SENAI" }
];

function carregarGratidao() {
  const lista = document.getElementById("listaGratidao");
  if (!lista) return;
  lista.innerHTML = "";
  if (!fotosGratidao.length) {
    lista.innerHTML = '<p class="gratidao-vazia"><i class="fa-regular fa-images"></i>img/fotos colab.png</p>';
    return;
  }
  fotosGratidao.forEach((foto, i) => {
    const fig = document.createElement("figure");
    fig.className = "polaroid";
    fig.innerHTML = '<div class="polaroid-foto"><img loading="lazy"></div><figcaption></figcaption>';
    const img = fig.querySelector("img");
    img.src = foto.src;
    img.alt = foto.legenda || "Foto de recordação";
    img.addEventListener("click", () => abrirImagem(img));
    img.addEventListener("error", () => { img.style.display = "none"; img.parentElement.classList.add("img/fotos colab.png"); });
    fig.querySelector("figcaption").textContent = foto.legenda || "";
    lista.appendChild(fig);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  carregarReferencias();
  carregarGratidao();

  // menu mobile
  const botao = document.querySelector(".menu-toggle");
  const nav = document.querySelector("header nav");
  if (botao && nav) {
    const alternar = abrir => {
      nav.classList.toggle("aberto", abrir);
      botao.setAttribute("aria-expanded", abrir);
      botao.querySelector("i").className = abrir ? "fa-solid fa-xmark" : "fa-solid fa-bars";
    };
    botao.addEventListener("click", () => alternar(!nav.classList.contains("aberto")));
    nav.addEventListener("click", e => { if (e.target.closest("a")) alternar(false); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") alternar(false); });
  }

  // modal de imagens
  const modal = document.getElementById("modalImagem");
  if (modal) {
    modal.setAttribute("aria-hidden", "true");
    modal.addEventListener("click", e => { if (e.target === modal) fecharImagem(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape" && modal.classList.contains("ativo")) fecharImagem(); });
  }

  // imagens que não carregam viram um espaço reservado
  document.querySelectorAll(".imagem-atividade img").forEach(img => {
    const marcar = () => { img.style.display = "none"; img.parentElement.classList.add("sem-imagem"); };
    img.addEventListener("error", marcar);
    if (img.complete && img.naturalWidth === 0) marcar();
  });

  // impressão do currículo
  const imprimir = document.getElementById("imprimirCurriculo");
  if (imprimir) imprimir.addEventListener("click", () => window.print());
});
