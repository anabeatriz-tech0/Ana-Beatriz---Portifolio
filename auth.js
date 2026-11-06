// ===== Controle de acesso (login obrigatório) =====
// Roda antes da página aparecer: sem login, vai para login.html.
(function () {
  if (sessionStorage.getItem('logado') === 'sim') return;
  document.documentElement.style.visibility = 'hidden';
  window.location.replace('login.html');
})();

function sair() {
  sessionStorage.removeItem('logado');
  window.location.href = 'login.html';
}
