let slideIndex = 0;
let intervalo = null;
let escolhidas = [];
console.log(escolhidas);


function criarSlides(imagensEscolhidas) {
    const slideshow = document.getElementById("slideshowContainer");
    slideshow.innerHTML = "";

    imagensEscolhidas.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("Foto");
        if (index === 0) div.classList.add("ligado");

        const link = document.createElement("a");
        link.href = item.href;

        const img = document.createElement("img");
        img.src = item.img;
        img.style.width = "100%";

        link.appendChild(img);
        div.appendChild(link);
        slideshow.appendChild(div);
    });

    slideIndex = 0;
    if (intervalo) clearInterval(intervalo);
    intervalo = setInterval(trocarSlide, 4000);
}

function trocarSlide() {
    const slides = document.getElementsByClassName("Foto");
    if (slides.length === 0) return;

    let atual = slides[slideIndex];

    slideIndex++;
    if (slideIndex >= slides.length) slideIndex = 0;

    let seguinte = slides[slideIndex];

    atual.classList.remove("ligado");
    seguinte.classList.add("ligado");
}

document.querySelectorAll(".opcao").forEach(card => {
    card.addEventListener("click", () => {
        const img = card.dataset.img;
        const href = card.dataset.href;

        // se já estiver selecionada → desmarca
        if (escolhidas.some(e => e.img === img)) {
            escolhidas = escolhidas.filter(e => e.img !== img);
            card.classList.remove("ativa");
            return;
        }

        // se já houver 3 → bloqueia
        if (escolhidas.length >= 3) {
            alert("Só podes escolher 3 cadeiras <33333");
            return;
        }

        // adiciona
        escolhidas.push({
            img: img,
            href: href
        });
        card.classList.add("ativa");
    });
});


function mostrarSlides() {
    if (escolhidas.length !== 3) {
        alert("Escolhe exatamente 3 cadeiras <3333");
        return;
    }

        // ✨ esconder escolhas
    document.getElementById("zonaEscolhas").classList.add("esconder");

    setTimeout(() => {
        criarSlides(escolhidas);
        document.getElementById("zonaEscolhas").style.display = "none";
    }, 333);

    document.querySelector(".SlideShow").style.height = "400px";
}

function abrirTab(evt, ano) {

  var i, tabcontador, botaoAtivo;

  tabcontador = document.getElementsByClassName("opcoes");
  botaoAtivo = document.getElementsByClassName("tablink");
  jaAtivo = evt.currentTarget.className.includes("active")

  for (i = 0; i < tabcontador.length; i++) {
    tabcontador[i].style.display = "none";
    botaoAtivo[i].className = botaoAtivo[i].className.replace(" active", "");
  }

  if(jaAtivo){
    document.getElementById(ano).style.display = "none";
    evt.currentTarget.className = evt.currentTarget.className.replace(" active", "");
    }else{
    document.getElementById(ano).style.display = "flex";
    evt.currentTarget.className += " active";
  }
}

const items = document.querySelectorAll('.item');

items.forEach(item => {
    const header = item.querySelector('.header');

    header.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});