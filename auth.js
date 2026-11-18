// ===== Controle de acesso (login obrigatório) =====
// Roda antes da página aparecer: sem login, vai para login.html.
(function () {
  if (sessionStorage.getItem('logado') === 'sim') return;
  document.documentElement.style.visibility = 'hidden';
  window.location.replace('login.html');
})();

// ===== Saída: tela de encerramento =====
const TEMPO_FIM = 7000; // tempo (ms) até voltar sozinho para o login

function sair() {
  if (document.getElementById('telaFim')) return;
  sessionStorage.removeItem('logado');

  const estilo = document.createElement('style');
  estilo.textContent = `
    #telaFim{position:fixed;inset:0;z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:32px 24px;text-align:center;color:#fff;
      background:radial-gradient(circle at 15% 20%,rgba(255,255,255,.09),transparent 30%),radial-gradient(circle at 85% 80%,rgba(255,255,255,.07),transparent 30%),#720019;
      font-family:'Hanken Grotesk',system-ui,sans-serif;animation:fimEntrada .8s ease both}
    #telaFim::before,#telaFim::after{content:"";position:absolute;border:1px solid rgba(255,255,255,.14);border-radius:50%;pointer-events:none}
    #telaFim::before{width:420px;height:420px;top:-230px;left:-170px}
    #telaFim::after{width:520px;height:520px;bottom:-320px;right:-220px}
    #telaFim>*{position:relative;z-index:1}
    #telaFim .fim-sub{font-size:.85rem;font-weight:600;letter-spacing:.3em;opacity:.75}
    #telaFim h1{font:700 clamp(4.5rem,18vw,9rem)/1 'Fraunces',Georgia,serif;color:#fff;letter-spacing:.06em;animation:fimTitulo 1.2s .3s ease both}
    #telaFim .fim-linha{width:56px;height:3px;border-radius:3px;background:#fff;opacity:.85}
    #telaFim .fim-texto{max-width:46ch;font-size:1.1rem;line-height:1.7;opacity:.95}
    #telaFim .fim-assina{font:italic 600 1.5rem 'Fraunces',Georgia,serif;margin-top:6px}
    #telaFim button{margin-top:14px;height:48px;padding:0 28px;border:1.5px solid #fff;border-radius:999px;background:transparent;color:#fff;font:600 .95rem 'Hanken Grotesk',sans-serif;cursor:pointer;transition:background .2s,color .2s}
    #telaFim button:hover{background:#fff;color:#720019}
    #telaFim button:focus-visible{outline:3px solid #fff;outline-offset:3px}
    #telaFim .fim-barra{position:absolute;left:0;bottom:0;height:4px;width:100%;background:rgba(255,255,255,.8);transform-origin:left;animation:fimBarra ${TEMPO_FIM}ms linear forwards}
    @keyframes fimEntrada{from{opacity:0}to{opacity:1}}
    @keyframes fimTitulo{from{opacity:0;transform:scale(.92);letter-spacing:.3em}to{opacity:1;transform:none;letter-spacing:.06em}}
    @keyframes fimBarra{from{transform:scaleX(1)}to{transform:scaleX(0)}}
    @media(prefers-reduced-motion:reduce){#telaFim,#telaFim h1,#telaFim .fim-barra{animation:none!important}}
  `;
  document.head.appendChild(estilo);

  const tela = document.createElement('div');
  tela.id = 'telaFim';
  tela.setAttribute('role', 'dialog');
  tela.setAttribute('aria-modal', 'true');
  tela.setAttribute('aria-label', 'Fim da experiência');
  tela.innerHTML = `
    <span class="fim-sub">PORTFÓLIO ENCERRADO</span>
    <h1>FIM</h1>
    <div class="fim-linha"></div>
    <p class="fim-texto">Esta experiência está se encerrando. Obrigada por ter explorado o meu portfólio e por dedicar um pouco do seu tempo a conhecer a minha trajetória.</p>
    <p class="fim-assina">Ana Beatriz</p>
    <button type="button">Voltar ao login</button>
    <div class="fim-barra"></div>`;
  document.body.appendChild(tela);
  document.body.style.overflow = 'hidden';

  const voltar = () => { window.location.href = 'login.html'; };
  const botao = tela.querySelector('button');
  botao.addEventListener('click', voltar);
  botao.focus();
  setTimeout(voltar, TEMPO_FIM);
}
