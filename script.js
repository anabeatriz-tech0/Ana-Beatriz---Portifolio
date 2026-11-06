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





// =====================================
// REFERÊNCIAS DO PORTFÓLIO
// =====================================

// Adicione novas referências diretamente nesta lista.
// Cada referência precisa de um nome e um endereço válido.


const referencias = [
    {
        nome: "Toda Matéria",
        link: "https://www.todamateria.com.br"
    },
    {
        nome: "Descomplica",
        link: "https://descomplica.com.br"
    },
    {
        nome: "YouTube",
        link: "https://www.youtube.com"
    },
    {
        nome: "Google Gemini",
        link: "https://gemini.google.com"
    },
    {
        nome: "Claude",
        link: "https://claude.ai"
    },
    {
        nome: "ChatGPT",
        link: "https://chatgpt.com"
    },
    {
        nome: "Canva",
        link: "https://www.canva.com"
    },
    {
        nome: "Pinterest",
        link: "https://br.pinterest.com"
    }
];


// =====================================
// CARREGAR REFERÊNCIAS NA PÁGINA
// =====================================

function carregarReferencias() {

    const lista = document.getElementById("listaReferencias");

    if (!lista) return;

    lista.innerHTML = "";

    if (referencias.length === 0) {
        lista.innerHTML = `
            <p class="referencias-vazia">
                As referências serão adicionadas em breve.
            </p>
        `;
        return;
    }

    referencias.forEach(referencia => {

        // Verifica se o endereço é válido e utiliza HTTP ou HTTPS.
        let endereco;

        try {
            endereco = new URL(referencia.link);

            if (!["http:", "https:"].includes(endereco.protocol)) {
                return;
            }

        } catch {
            return;
        }

        const card = document.createElement("article");
        card.className = "referencia-card";

        const icone = document.createElement("div");
        icone.className = "referencia-icone";
        icone.innerHTML = '<i class="fas fa-book-open"></i>';

        const informacoes = document.createElement("div");
        informacoes.className = "referencia-info";

        const titulo = document.createElement("h2");
        titulo.textContent = referencia.nome;

        const link = document.createElement("a");
        link.href = endereco.href;
        link.textContent = referencia.link;
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        const seta = document.createElement("span");
        seta.className = "referencia-seta";
        seta.innerHTML = '<i class="fas fa-arrow-up-right-from-square"></i>';

        informacoes.appendChild(titulo);
        informacoes.appendChild(link);

        card.appendChild(icone);
        card.appendChild(informacoes);
        card.appendChild(seta);

        lista.appendChild(card);
    });
}


// =====================================
// AMPLIAR IMAGENS
// =====================================

function abrirImagem(imagem) {

    const modal = document.getElementById("modalImagem");
    const ampliada = document.getElementById("imagemAmpliada");

    if (!modal || !ampliada || !imagem) return;

    ampliada.src = imagem.currentSrc || imagem.src;
    ampliada.alt = imagem.alt || "Imagem ampliada";

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


// =====================================
// INICIALIZAÇÃO DAS FUNCIONALIDADES
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    // CARREGAR REFERÊNCIAS
    carregarReferencias();


    // =================================
    // MODAL DE IMAGENS
    // =================================

    const modal = document.getElementById("modalImagem");

    if (modal) {

        modal.setAttribute("aria-hidden", "true");

        modal.addEventListener("click", e => {

            if (e.target === modal) {
                fecharImagem();
            }

        });

        document.addEventListener("keydown", e => {

            if (
                e.key === "Escape" &&
                modal.classList.contains("ativo")
            ) {
                fecharImagem();
            }

        });

    }


    // =================================
    // ANIMAÇÕES DE ENTRADA
    // =================================

    const itens = document.querySelectorAll(
        ".card, .objetivo-card, .projeto, .eixo, " +
        ".contato-card, .referencia-item, .referencia-card, .anexo-card"
    );

    if (
        "IntersectionObserver" in window &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {

        const obs = new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visivel");

                    observer.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.12
        });

        itens.forEach(el => {

            el.classList.add("entrada-suave");

            obs.observe(el);

        });

    }


    // =================================
    // IMPRESSÃO DO CURRÍCULO
    // =================================

    const botaoImprimir = document.getElementById("imprimirCurriculo");

    if (botaoImprimir) {

        botaoImprimir.addEventListener("click", () => {

            window.print();

        });

    }

});

