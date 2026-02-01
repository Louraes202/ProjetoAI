/**
 * comunidade.js - Interações da Página da Comunidade
 * Resumos LEI-ESTGV - Projeto AI 2025/2026
 * 
 * Contém:
 * - Mural de frases aleatórias
 * - Botões "Gostei" com contador em localStorage
 */

(function() {
    'use strict';

    // ============================================
    // FRASES MOTIVACIONAIS PARA O MURAL
    // ============================================

    const frases = [
        "O sucesso é a soma de pequenos esforços repetidos dia após dia. 💪",
        "Estudar é plantar sementes de conhecimento que darás os melhores frutos. 🌱",
        "Não desistas! Cada exame difícil é uma oportunidade de crescimento. 📚",
        "A prática leva à perfeição. Continue a resolver exercícios! 🎯",
        "Juntos somos mais fortes. Partilha os teus resumos com a comunidade! 🤝",
        "O código que hoje parece impossível, amanhã será trivial. 💻",
        "Errar faz parte do processo. Cada bug resolvido é uma lição aprendida. 🐛",
        "A curiosidade é o combustível da inovação. Nunca pares de perguntar 'porquê?'. 🔍",
        "Grandes projetos começam com uma linha de código. Dá o primeiro passo! 🚀",
        "O melhor momento para começar a estudar era ontem. O segundo melhor é agora. ⏰",
        "Debugging é como ser um detetive num filme de crime onde tu és o assassino. 🕵️",
        "Não tenhas medo de pedir ajuda. Os melhores programadores colaboram! 🙋",
        "Celebra cada pequena vitória. Passar num teste é uma conquista! 🎉",
        "A consistência supera a intensidade. Estuda um pouco todos os dias. 📅",
        "O conhecimento partilhado multiplica-se. Ensina o que aprendeste! 🎓"
    ];

    // ============================================
    // MURAL DE FRASES
    // ============================================

    let fraseAtual = -1;

    /**
     * Obtém uma frase aleatória diferente da atual
     * @returns {string} Nova frase motivacional
     */
    function obterFraseAleatoria() {
        let novoIndex;
        do {
            novoIndex = Math.floor(Math.random() * frases.length);
        } while (novoIndex === fraseAtual && frases.length > 1);
        
        fraseAtual = novoIndex;
        return frases[novoIndex];
    }

    /**
     * Atualiza o mural com uma nova frase
     */
    function atualizarMural() {
        const muralQuote = document.querySelector('.mural-quote');
        if (!muralQuote) return;
        
        // Adicionar animação de fade
        muralQuote.style.opacity = '0';
        muralQuote.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            muralQuote.textContent = `"${obterFraseAleatoria()}"`;
            muralQuote.style.opacity = '1';
            muralQuote.style.transform = 'translateY(0)';
        }, 300);
    }

    /**
     * Inicializa o mural de frases
     */
    function iniciarMural() {
        const muralQuote = document.querySelector('.mural-quote');
        const muralBtn = document.querySelector('.mural-btn');
        
        if (!muralQuote) return;
        
        // Adicionar transição CSS
        muralQuote.style.transition = 'opacity 0.3s, transform 0.3s';
        
        // Mostrar frase inicial
        muralQuote.textContent = `"${obterFraseAleatoria()}"`;
        
        // Adicionar event listener ao botão
        if (muralBtn) {
            muralBtn.addEventListener('click', atualizarMural);
        }
    }

    // ============================================
    // BOTÕES "GOSTEI" COM LOCALSTORAGE
    // ============================================

    /**
     * Obtém os likes guardados do localStorage
     * @returns {Object} Objeto com IDs e contagens de likes
     */
    function obterLikes() {
        try {
            const likes = localStorage.getItem('comunidade_likes');
            return likes ? JSON.parse(likes) : {};
        } catch (e) {
            console.error('Erro ao ler likes do localStorage:', e);
            return {};
        }
    }

    /**
     * Guarda os likes no localStorage
     * @param {Object} likes - Objeto com IDs e contagens
     */
    function guardarLikes(likes) {
        try {
            localStorage.setItem('comunidade_likes', JSON.stringify(likes));
        } catch (e) {
            console.error('Erro ao guardar likes no localStorage:', e);
        }
    }

    /**
     * Obtém os testemunhos que o utilizador já gostou
     * @returns {Array} Lista de IDs que o utilizador gostou
     */
    function obterMeusLikes() {
        try {
            const meusLikes = localStorage.getItem('comunidade_meus_likes');
            return meusLikes ? JSON.parse(meusLikes) : [];
        } catch (e) {
            return [];
        }
    }

    /**
     * Guarda os testemunhos que o utilizador gostou
     * @param {Array} meusLikes - Lista de IDs
     */
    function guardarMeusLikes(meusLikes) {
        try {
            localStorage.setItem('comunidade_meus_likes', JSON.stringify(meusLikes));
        } catch (e) {
            console.error('Erro ao guardar meus likes:', e);
        }
    }

    /**
     * Toggle do like num testemunho
     * @param {string} id - ID do testemunho
     * @param {HTMLElement} btn - Botão clicado
     */
    function toggleLike(id, btn) {
        const likes = obterLikes();
        let meusLikes = obterMeusLikes();
        const countSpan = btn.querySelector('.like-count');
        
        if (meusLikes.includes(id)) {
            // Remover like
            meusLikes = meusLikes.filter(l => l !== id);
            likes[id] = Math.max(0, (likes[id] || 1) - 1);
            btn.classList.remove('liked');
        } else {
            // Adicionar like
            meusLikes.push(id);
            likes[id] = (likes[id] || 0) + 1;
            btn.classList.add('liked');
            
            // Animação de feedback
            btn.style.transform = 'scale(1.2)';
            setTimeout(() => btn.style.transform = '', 200);
        }
        
        // Atualizar contagem no botão
        if (countSpan) {
            countSpan.textContent = likes[id] || 0;
        }
        
        // Guardar no localStorage
        guardarLikes(likes);
        guardarMeusLikes(meusLikes);
    }

    /**
     * Inicializa todos os botões de like
     */
    function iniciarBotoesLike() {
        const likeButtons = document.querySelectorAll('.like-btn');
        const likes = obterLikes();
        const meusLikes = obterMeusLikes();
        
        likeButtons.forEach((btn, index) => {
            const id = btn.dataset.id || `testimonial-${index}`;
            btn.dataset.id = id;
            
            // Criar span para contagem se não existir
            let countSpan = btn.querySelector('.like-count');
            if (!countSpan) {
                countSpan = document.createElement('span');
                countSpan.className = 'like-count';
                btn.appendChild(countSpan);
            }
            
            // Mostrar contagem atual
            countSpan.textContent = likes[id] || 0;
            
            // Marcar como liked se o utilizador já gostou
            if (meusLikes.includes(id)) {
                btn.classList.add('liked');
            }
            
            // Adicionar event listener
            btn.addEventListener('click', () => toggleLike(id, btn));
        });
    }

    // ============================================
    // INICIALIZAÇÃO
    // ============================================

    function init() {
        // Iniciar mural de frases
        iniciarMural();
        
        // Iniciar botões de like
        iniciarBotoesLike();
        
        console.log('✅ Comunidade.js inicializado com sucesso!');
    }

    // Aguardar DOM estar pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
