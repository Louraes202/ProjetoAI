/**
 * slider.js - Slider e Slideshow de Cadeiras
 * Resumos LEI-ESTGV - Projeto AI 2025/2026
 * 
 * Contém:
 * - Hero slider automático na homepage
 * - Sistema de seleção de cadeiras para slideshow
 * - Navegação por tabs de ano
 */

(function() {
    'use strict';

    // ============================================
    // HERO SLIDER (SLIDES PRINCIPAIS)
    // ============================================

    let heroSlideIndex = 0;
    let heroIntervalo = null;

    /**
     * Mostra o slide atual e esconde os outros
     * @param {number} index - Índice do slide a mostrar
     */
    function mostrarSlide(index) {
        const slides = document.querySelectorAll('.hero-slider .slide');
        const dots = document.querySelectorAll('.slider-dots .dot');
        
        if (slides.length === 0) return;
        
        // Ajustar índice se estiver fora dos limites
        if (index >= slides.length) heroSlideIndex = 0;
        if (index < 0) heroSlideIndex = slides.length - 1;
        
        // Esconder todos os slides e remover classe active dos dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Mostrar slide atual
        slides[heroSlideIndex].classList.add('active');
        if (dots[heroSlideIndex]) {
            dots[heroSlideIndex].classList.add('active');
        }
    }

    /**
     * Avança para o próximo slide
     */
    function proximoSlide() {
        heroSlideIndex++;
        mostrarSlide(heroSlideIndex);
    }

    /**
     * Volta para o slide anterior
     */
    function slideAnterior() {
        heroSlideIndex--;
        mostrarSlide(heroSlideIndex);
    }

    /**
     * Vai para um slide específico
     * @param {number} index - Índice do slide
     */
    function irParaSlide(index) {
        heroSlideIndex = index;
        mostrarSlide(heroSlideIndex);
        
        // Reiniciar intervalo automático
        if (heroIntervalo) {
            clearInterval(heroIntervalo);
            heroIntervalo = setInterval(proximoSlide, 5000);
        }
    }

    /**
     * Inicializa o hero slider
     */
    function iniciarHeroSlider() {
        const slider = document.querySelector('.hero-slider');
        if (!slider) return;
        
        const slides = slider.querySelectorAll('.slide');
        if (slides.length === 0) return;
        
        // Mostrar primeiro slide
        mostrarSlide(0);
        
        // Iniciar rotação automática (5 segundos)
        heroIntervalo = setInterval(proximoSlide, 5000);
        
        // Adicionar event listeners aos dots
        const dots = slider.querySelectorAll('.slider-dots .dot');
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => irParaSlide(index));
        });
        
        // Pausar slider ao passar o rato por cima
        slider.addEventListener('mouseenter', () => {
            if (heroIntervalo) {
                clearInterval(heroIntervalo);
                heroIntervalo = null;
            }
        });
        
        // Retomar slider ao tirar o rato
        slider.addEventListener('mouseleave', () => {
            if (!heroIntervalo) {
                heroIntervalo = setInterval(proximoSlide, 5000);
            }
        });
    }

    // ============================================
    // SLIDESHOW DE CADEIRAS (SELEÇÃO DE 3)
    // ============================================

    let slideIndex = 0;
    let intervalo = null;
    let escolhidas = [];

    /**
     * Cria slides a partir das cadeiras escolhidas
     * @param {Array} imagensEscolhidas - Lista de cadeiras escolhidas
     */
    function criarSlides(imagensEscolhidas) {
        const slideshow = document.getElementById('slideshowContainer');
        if (!slideshow) return;
        
        slideshow.innerHTML = '';

        imagensEscolhidas.forEach((item, index) => {
            const div = document.createElement('div');
            div.classList.add('Foto');
            if (index === 0) div.classList.add('ligado');

            const link = document.createElement('a');
            link.href = item.href;

            const img = document.createElement('img');
            img.src = item.img;
            img.alt = item.nome || 'Cadeira';
            img.style.width = '100%';
            img.style.borderRadius = '12px';

            // Adicionar placeholder se imagem não existir
            img.onerror = function() {
                this.style.display = 'none';
                const placeholder = document.createElement('div');
                placeholder.style.cssText = `
                    width: 100%;
                    height: 400px;
                    background: var(--primary-color);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 3rem;
                    color: var(--text-main);
                    font-family: Verdana, sans-serif;
                    font-size: 4rem;
                `;
                placeholder.textContent = item.sigla || '📚';
                link.appendChild(placeholder);
            };

            link.appendChild(img);
            div.appendChild(link);
            slideshow.appendChild(div);
        });

        slideIndex = 0;
        if (intervalo) clearInterval(intervalo);
        intervalo = setInterval(trocarSlide, 4000);
    }

    /**
     * Troca para o próximo slide do slideshow de cadeiras
     */
function trocarSlide() {
    const slides = document.getElementsByClassName('Foto');
    if (slides.length === 0) return;

    const atual = slides[slideIndex];

    slideIndex++;
    if (slideIndex >= slides.length) slideIndex = 0;

    const seguinte = slides[slideIndex];

    // ativa o próximo primeiro
    seguinte.classList.add('ligado');

    // remove do atual (fade out automático)
    atual.classList.remove('ligado');
}

    /**
     * Inicializa os event listeners das opções de cadeiras
     */
    function iniciarOpcoesCards() {
        document.querySelectorAll('.opcao').forEach(card => {
            card.addEventListener('click', () => {
                const img = card.dataset.img;
                const href = card.dataset.href;
                const sigla = card.querySelector('p')?.textContent || '';

                // Se já estiver selecionada → desmarca
                if (escolhidas.some(e => e.img === img)) {
                    escolhidas = escolhidas.filter(e => e.img !== img);
                    card.classList.remove('ativa');
                    return;
                }

                // Se já houver 3 → bloqueia
                if (escolhidas.length >= 3) {
                    mostrarMensagem('Só podes escolher 3 cadeiras!', 'warning');
                    return;
                }

                // Adiciona à seleção
                escolhidas.push({
                    img: img,
                    href: href,
                    sigla: sigla
                });
                card.classList.add('ativa');
            });
        });
    }

    /**
     * Mostra uma mensagem temporária ao utilizador
     * @param {string} texto - Texto da mensagem
     * @param {string} tipo - Tipo: 'warning', 'success', 'error'
     */
    function mostrarMensagem(texto, tipo = 'warning') {
        // Remover mensagem existente
        const existente = document.querySelector('.temp-message');
        if (existente) existente.remove();
        
        const msg = document.createElement('div');
        msg.className = 'temp-message';
        msg.style.cssText = `
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            padding: 15px 30px;
            border-radius: 10px;
            font-weight: 600;
            z-index: 9999;
            animation: fadeIn 0.3s ease;
            ${tipo === 'warning' ? 'background: #FEF3C7; color: #92400E; border: 1px solid #F59E0B;' : ''}
            ${tipo === 'success' ? 'background: #D1FAE5; color: #065F46; border: 1px solid #10B981;' : ''}
            ${tipo === 'error' ? 'background: #FEE2E2; color: #991B1B; border: 1px solid #EF4444;' : ''}
        `;
        msg.textContent = texto;
        document.body.appendChild(msg);
        
        // Remover após 3 segundos
        setTimeout(() => msg.remove(), 3000);
    }

    /**
     * Mostra o slideshow das cadeiras escolhidas
     * Função global para ser chamada pelo botão
     */
    window.mostrarSlides = function() {
        if (escolhidas.length !== 3) {
            mostrarMensagem('Escolhe exatamente 3 cadeiras!', 'warning');
            return;
        }

        // Esconder zona de escolhas com animação
        const zonaEscolhas = document.getElementById('zonaEscolhas');
        if (zonaEscolhas) {
            zonaEscolhas.classList.add('esconder');

            setTimeout(() => {
                criarSlides(escolhidas);
                zonaEscolhas.style.display = 'none';
            }, 333);
        }

        // Expandir área do slideshow
        const slideshow = document.querySelector('.SlideShow');
        if (slideshow) {
            slideshow.style.height = '400px';
        }
        
        // Esconder botão
        const btn = document.querySelector('.btn-Slideshow');
        if (btn) btn.style.display = 'none';
    };

    // ============================================
    // SISTEMA DE TABS
    // ============================================

    /**
     * Abre uma tab específica
     * Função global para ser chamada pelos botões das tabs
     * @param {Event} evt - Evento do clique
     * @param {string} ano - ID da tab a abrir
     */
    window.abrirTab = function(evt, ano) {
        const tabcontador = document.getElementsByClassName('opcoes');
        const botaoAtivo = document.getElementsByClassName('tablink');
        const jaAtivo = evt.currentTarget.className.includes('active');

        // Fechar todas as tabs e remover classe active dos botões
        for (let i = 0; i < tabcontador.length; i++) {
            tabcontador[i].style.display = 'none';
        }
        for (let i = 0; i < botaoAtivo.length; i++) {
            botaoAtivo[i].className = botaoAtivo[i].className.replace(' active', '');
        }

        // Se já estava ativo, fecha; senão, abre a tab
        if (jaAtivo) {
            document.getElementById(ano).style.display = 'none';
            evt.currentTarget.className = evt.currentTarget.className.replace(' active', '');
        } else {
            document.getElementById(ano).style.display = 'flex';
            evt.currentTarget.className += ' active';
        }
    };

    // ============================================
    // INICIALIZAÇÃO
    // ============================================

    function init() {
        // Iniciar hero slider (para a homepage)
        iniciarHeroSlider();
        
        // Iniciar sistema de seleção de cadeiras
        iniciarOpcoesCards();
        
        console.log('✅ Slider.js inicializado com sucesso!');
    }

    // Aguardar DOM estar pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
