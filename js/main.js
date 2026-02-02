/**
 * main.js - Módulo Principal JavaScript
 * Resumos LEI-ESTGV - Projeto AI 2025/2026
 * 
 * Contém:
 * - Relógio em tempo real (atualiza a cada segundo)
 * - Sistema de pesquisa de cadeiras
 * - Toggle de tema claro/escuro (opcional)
 * - Inicialização de componentes
 */

(function() {
    'use strict';

    // ============================================
    // DADOS DAS CADEIRAS PARA PESQUISA
    // ============================================
    const cadeiras = [
        // 1º Ano
        { nome: 'Análise Matemática', sigla: 'AM', ano: 1, semestre: 1, url: 'pages/cadeiras/AM.html' },
        { nome: 'Álgebra', sigla: 'AL', ano: 1, semestre: 1, url: 'pages/cadeiras/AL.html' },
        { nome: 'Sistemas Digitais', sigla: 'SD', ano: 1, semestre: 1, url: 'pages/cadeiras/SD.html' },
        { nome: 'Algoritmos e Programação', sigla: 'AP', ano: 1, semestre: 1, url: 'pages/cadeiras/AP.html' },
        { nome: 'Tecnologias dos Computadores', sigla: 'TC', ano: 1, semestre: 1, url: 'pages/cadeiras/TC.html' },
        { nome: 'Arquiteturas de Computador', sigla: 'AC', ano: 1, semestre: 2, url: 'pages/cadeiras/AC.html' },
        { nome: 'Matemática Discreta', sigla: 'MD', ano: 1, semestre: 2, url: 'pages/cadeiras/MD.html' },
        { nome: 'Matemática Aplicada', sigla: 'MA', ano: 1, semestre: 2, url: 'pages/cadeiras/MA.html' },
        { nome: 'Redes de Comunicação I', sigla: 'R1', ano: 1, semestre: 2, url: 'pages/cadeiras/R1.html' },
        { nome: 'Estruturas de Dados', sigla: 'ED', ano: 1, semestre: 2, url: 'pages/cadeiras/ED.html' },
        
        // 2º Ano
        { nome: 'Programação Orientada aos Objetos', sigla: 'POO', ano: 2, semestre: 1, url: 'pages/cadeiras/POO.html' },
        { nome: 'Análise de Sistemas', sigla: 'AS', ano: 2, semestre: 1, url: 'pages/cadeiras/AS.html' },
        { nome: 'Sistemas Operativos', sigla: 'SO', ano: 2, semestre: 1, url: 'pages/cadeiras/SO.html' },
        { nome: 'Aplicações para a Internet I', sigla: 'AI1', ano: 2, semestre: 1, url: 'pages/cadeiras/AI1.html' },
        { nome: 'Usabilidade', sigla: 'U', ano: 2, semestre: 1, url: 'pages/cadeiras/U.html' },
        { nome: 'Engenharia de Software I', sigla: 'ES1', ano: 2, semestre: 2, url: 'pages/cadeiras/ES1.html' },
        { nome: 'Bases de Dados I', sigla: 'BD1', ano: 2, semestre: 2, url: 'pages/cadeiras/BD1.html' },
        { nome: 'Aplicações para a Internet II', sigla: 'AI2', ano: 2, semestre: 2, url: 'pages/cadeiras/AI2.html' },
        { nome: 'Redes de Comunicação II', sigla: 'R2', ano: 2, semestre: 2, url: 'pages/cadeiras/R2.html' },
        { nome: 'Programação para Dispositivos Móveis', sigla: 'PDM', ano: 2, semestre: 2, url: 'pages/cadeiras/PDM.html' },
        { nome: 'Projeto Integrado', sigla: 'PI', ano: 2, semestre: 2, url: 'pages/cadeiras/PI.html' },
        
        // 3º Ano
        { nome: 'Segurança Informática', sigla: 'SI', ano: 3, semestre: 1, url: 'pages/cadeiras/SI.html' },
        { nome: 'Redes de Comunicação III', sigla: 'R3', ano: 3, semestre: 1, url: 'pages/cadeiras/R3.html' },
        { nome: 'Complementos de Sistemas Operativos', sigla: 'CSO', ano: 3, semestre: 1, url: 'pages/cadeiras/CSO.html' },
        { nome: 'Bases de Dados II', sigla: 'BD2', ano: 3, semestre: 1, url: 'pages/cadeiras/BD2.html' },
        { nome: 'Sistemas Embebidos', sigla: 'SE', ano: 3, semestre: 1, url: 'pages/cadeiras/SE.html' },
        { nome: 'Sistemas Distribuídos', sigla: 'SDi', ano: 3, semestre: 1, url: 'pages/cadeiras/SDi.html' },
        { nome: 'Inteligência Artificial', sigla: 'IA', ano: 3, semestre: 2, url: 'pages/cadeiras/IA.html' },
        { nome: 'Engenharia de Software II', sigla: 'ES2', ano: 3, semestre: 2, url: 'pages/cadeiras/ES2.html' },
        { nome: 'Empreendedorismo e Gestão de Empresas', sigla: 'EGE', ano: 3, semestre: 2, url: 'pages/cadeiras/EGE.html' },
        { nome: 'Projeto', sigla: 'Proj', ano: 3, semestre: 2, url: 'pages/cadeiras/Proj.html' }
    ];

    // ============================================
    // RELÓGIO EM TEMPO REAL
    // ============================================
    
    /**
     * Formata um número com zero à esquerda se necessário
     * @param {number} num - Número a formatar
     * @returns {string} Número formatado com 2 dígitos
     */
    function padZero(num) {
        return num.toString().padStart(2, '0');
    }

    /**
     * Atualiza o relógio com a hora atual
     * Formato: HH:MM:SS
     */
    function atualizarRelogio() {
        const timeDisplay = document.getElementById('time-display');
        if (!timeDisplay) return;

        const agora = new Date();
        
        // Formatar hora: HH:MM:SS
        const horas = padZero(agora.getHours());
        const minutos = padZero(agora.getMinutes());
        const segundos = padZero(agora.getSeconds());
        
        // Mostrar apenas hora
        const horaFormatada = `${horas}:${minutos}:${segundos}`;
        
        timeDisplay.textContent = horaFormatada;
    }

    /**
     * Inicia o relógio e configura atualização a cada segundo
     */
    function iniciarRelogio() {
        // Atualizar imediatamente para evitar delay inicial
        atualizarRelogio();
        
        // Atualizar a cada segundo (1000ms)
        setInterval(atualizarRelogio, 1000);
    }

    // ============================================
    // SISTEMA DE PESQUISA
    // ============================================

    /**
     * Normaliza texto para pesquisa (remove acentos e converte para minúsculas)
     * @param {string} texto - Texto a normalizar
     * @returns {string} Texto normalizado
     */
    function normalizarTexto(texto) {
        return texto
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, ''); // Remove acentos
    }

    /**
     * Pesquisa cadeiras pelo termo inserido
     * @param {string} termo - Termo de pesquisa
     * @returns {Array} Lista de cadeiras que correspondem ao termo
     */
    function pesquisarCadeiras(termo) {
        if (!termo || termo.length < 2) return [];
        
        const termoNormalizado = normalizarTexto(termo);
        
        return cadeiras.filter(cadeira => {
            const nomeNormalizado = normalizarTexto(cadeira.nome);
            const siglaNormalizada = normalizarTexto(cadeira.sigla);
            
            return nomeNormalizado.includes(termoNormalizado) || 
                   siglaNormalizada.includes(termoNormalizado);
        });
    }

    /**
     * Mostra os resultados da pesquisa
     * @param {Array} resultados - Lista de cadeiras encontradas
     * @param {HTMLElement} container - Container para mostrar resultados
     */
    function mostrarResultados(resultados, container) {
        container.innerHTML = '';
        
        if (resultados.length === 0) {
            container.innerHTML = '<div class="search-no-results">Nenhum resultado encontrado</div>';
            container.classList.add('active');
            return;
        }
        
        resultados.forEach(cadeira => {
            const link = document.createElement('a');
            link.href = cadeira.url;
            link.innerHTML = `
                <strong>${cadeira.sigla}</strong> - ${cadeira.nome}
                <small style="display: block; opacity: 0.7;">${cadeira.ano}º Ano, ${cadeira.semestre}º Semestre</small>
            `;
            container.appendChild(link);
        });
        
        container.classList.add('active');
    }

    /**
     * Esconde os resultados da pesquisa
     * @param {HTMLElement} container - Container dos resultados
     */
    function esconderResultados(container) {
        container.classList.remove('active');
    }

    /**
     * Inicializa o sistema de pesquisa
     */
    function iniciarPesquisa() {
        const searchBox = document.querySelector('.search-box');
        if (!searchBox) return;
        
        const searchInput = searchBox.querySelector('input');
        if (!searchInput) return;
        
        // Criar container de resultados se não existir
        let resultsContainer = searchBox.querySelector('.search-results');
        if (!resultsContainer) {
            resultsContainer = document.createElement('div');
            resultsContainer.className = 'search-results';
            searchBox.appendChild(resultsContainer);
        }
        
        // Event listener para pesquisa
        searchInput.addEventListener('input', function(e) {
            const termo = e.target.value.trim();
            
            if (termo.length < 2) {
                esconderResultados(resultsContainer);
                return;
            }
            
            const resultados = pesquisarCadeiras(termo);
            mostrarResultados(resultados, resultsContainer);
        });
        
        // Esconder resultados ao clicar fora
        document.addEventListener('click', function(e) {
            if (!searchBox.contains(e.target)) {
                esconderResultados(resultsContainer);
            }
        });
        
        // Esconder resultados ao pressionar Escape
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                esconderResultados(resultsContainer);
                searchInput.blur();
            }
        });
        
        // Atalho Ctrl+K para focar na pesquisa
        document.addEventListener('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                searchInput.focus();
            }
        });
    }

    // ============================================
    // TOGGLE DE TEMA (OPCIONAL)
    // ============================================

    /**
     * Alterna entre modo claro e escuro
     */
    function toggleTema() {
         const body = document.body;
         const glassCards = document.querySelectorAll('.glass-card');
         const yearNum = document.querySelectorAll('.year-num');
         const glow = document.querySelectorAll('.bg-glow');
         const dots = document.querySelectorAll('.dot');

    // alternar tema no body
          const isLightMode = body.classList.toggle('light-mode');

    // alternar tema em todos os glass cards, yearNums e o glow
        glassCards.forEach(card => {
            card.classList.toggle('light-mode', isLightMode);
        });

        yearNum.forEach(card => {
            card.classList.toggle('light-mode', isLightMode);
        });

        glow.forEach(card => {
            card.classList.toggle('light-mode', isLightMode);
        }); 

        dots.forEach(card => {
            card.classList.toggle('light-mode', isLightMode);
        }); 

    // guardar preferência
        localStorage.setItem('tema', isLightMode ? 'light' : 'dark');

    // atualizar texto dos botões
        const themeBtns = document.querySelectorAll('.theme-toggle');
        themeBtns.forEach(btn => {
            btn.textContent = isLightMode ? 'Escuro' : 'Claro';
        });
    }

    /**
     * Carrega a preferencia de tema guardada
     */
    function carregarTema() {
        const temaSalvo = localStorage.getItem('tema');
        
        if (temaSalvo === 'light') {
            document.body.classList.add('light-mode');
            const themeBtn = document.querySelector('.theme-toggle');
            if (themeBtn) {
                themeBtn.textContent = 'Escuro';
            }
        }
    }

    /**
     * Inicializa o toggle de tema
     */
    function iniciarToggleTema() {
        carregarTema();
        
        const themeBtns = document.querySelectorAll('.theme-toggle');
        themeBtns.forEach(btn => {
            btn.addEventListener('click', toggleTema);
        });
    }

    // ============================================
    // ACCORDION/FAQ
    // ============================================

    /**
     * Inicializa os acordeões expansíveis
     */
    function iniciarAccordion() {
        const items = document.querySelectorAll('.accordion .item');
        
        items.forEach(item => {
            const header = item.querySelector('.header');
            if (header) {
                header.addEventListener('click', () => {
                    // Fechar outros itens (opcional - para comportamento exclusivo)
                    // items.forEach(i => i !== item && i.classList.remove('active'));
                    
                    // Toggle do item atual
                    item.classList.toggle('active');
                });
            }
        });
    }

    // ============================================
    // CONTADOR DE VISITAS (OPCIONAL)
    // ============================================

    /**
     * Atualiza e mostra o contador de visitas
     */
    function iniciarContadorVisitas() {
        const contador = document.getElementById('visit-counter');
        if (!contador) return;
        
        // Obter contagem atual do localStorage
        let visitas = parseInt(localStorage.getItem('visitCount') || '0', 10);
        
        // Incrementar contagem
        visitas++;
        
        // Guardar nova contagem
        localStorage.setItem('visitCount', visitas.toString());
        
        // Atualizar elemento na página
        contador.textContent = visitas;
    }

    // ============================================
    // MENU MOBILE (HAMBURGUER)
    // ============================================

    /**
     * Inicializa o menu hamburguer para dispositivos moveis
     */
    function iniciarMenuMobile() {
        const menuToggle = document.querySelector('.menu-toggle');
        const mainNav = document.querySelector('.main-nav');
        const navOverlay = document.querySelector('.nav-overlay');
        
        if (!menuToggle || !mainNav) return;
        
        // Toggle menu ao clicar no hamburguer
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
            if (navOverlay) {
                navOverlay.classList.toggle('active');
            }
        });
        
        // Fechar menu ao clicar no overlay
        if (navOverlay) {
            navOverlay.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                navOverlay.classList.remove('active');
            });
        }
        
        // Fechar menu ao clicar em links (exceto dropdowns e toggles)
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                // Se for um link de dropdown, previne fechar e interage com o submenu
                if (link.parentElement.classList.contains('dropdown')) {
                    // Para mobile, podemos querer alternar a classe active/hover
                    // Mas como o CSS usa :hover, podemos ter que forçar o comportamento
                    // Por enquanto, apenas evitamos fechar o menu principal
                    return; 
                }
                
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                if (navOverlay) {
                    navOverlay.classList.remove('active');
                }
            });
        });

        // Adicionar suporte para click no dropdown em mobile
        const dropdownToggles = mainNav.querySelectorAll('.dropdown > a');
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                e.preventDefault(); // Previne navegação do #
                const parent = this.parentElement;
                parent.classList.toggle('active-mobile');
            });
        });
    }

    // ============================================
    // INICIALIZACAO
    // ============================================

    /**
     * Inicializa todos os modulos quando o DOM esta pronto
     */
    function init() {
        // Iniciar relogio em tempo real
        iniciarRelogio();
        
        // Iniciar sistema de pesquisa
        iniciarPesquisa();
        
        // Iniciar toggle de tema
        iniciarToggleTema();
        
        // Iniciar acordeoes
        iniciarAccordion();
        
        // Iniciar menu mobile
        iniciarMenuMobile();
        
        // Iniciar contador de visitas (se existir)
        iniciarContadorVisitas();
        
        console.log('Resumos LEI-ESTGV - Modulos inicializados');
    }

    // Aguardar DOM estar pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
