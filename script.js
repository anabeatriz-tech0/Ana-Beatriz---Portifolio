// Recursos compartilhados do portfólio.
function abrirImagem(imagem){
 const modal=document.getElementById("modalImagem");
 const ampliada=document.getElementById("imagemAmpliada");
 if(!modal||!ampliada||!imagem)return;
 ampliada.src=imagem.currentSrc||imagem.src;
 ampliada.alt=imagem.alt||"Imagem ampliada";
 modal.classList.add("ativo");
 modal.setAttribute("aria-hidden","false");
 document.body.style.overflow="hidden";
 const fechar=modal.querySelector(".fechar-modal");
 if(fechar)fechar.focus();
}
function fecharImagem(){
 const modal=document.getElementById("modalImagem");
 if(!modal)return;
 modal.classList.remove("ativo");
 modal.setAttribute("aria-hidden","true");
 document.body.style.overflow="";
}
document.addEventListener("DOMContentLoaded",()=>{
 const modal=document.getElementById("modalImagem");
 if(modal){
  modal.setAttribute("aria-hidden","true");
  modal.addEventListener("click",e=>{if(e.target===modal)fecharImagem();});
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&modal.classList.contains("ativo"))fecharImagem();});
 }
 const itens=document.querySelectorAll(".card,.objetivo-card,.projeto,.eixo,.contato-card,.referencia-item,.anexo-card");
 if("IntersectionObserver"in window&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches){
  const obs=new IntersectionObserver((entries,observer)=>{
   entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visivel");observer.unobserve(entry.target);}});
  },{threshold:.12});
  itens.forEach(el=>{el.classList.add("entrada-suave");obs.observe(el);});
 }
});


// =====================================
// IMPRESSÃO DO CURRÍCULO
// =====================================

// Seleciona o botão de impressão
const botaoImprimir = document.getElementById("imprimirCurriculo");

// Verifica se o botão existe
if (botaoImprimir) {

    // Adiciona o evento de clique
    botaoImprimir.addEventListener("click", function () {

        // Abre a janela de impressão
        window.print();

    });

}
