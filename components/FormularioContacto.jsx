/**
 * FormularioContacto.jsx - Componente React de Formulário de Contacto
 * Resumos LEI-ESTGV - Projeto AI 2025/2026
 * 
 * Funcionalidades:
 * - Campos: Nome, Motivo (select), Email, Telefone, Mensagem
 * - Validação completa de todos os campos
 * - Armazenamento em localStorage
 * - Feedback visual de erros e sucesso
 */

function FormularioContacto() {
    // === STATE ===
    const [formData, setFormData] = React.useState({
        nome: '',
        motivo: '',
        email: '',
        telefone: '',
        mensagem: ''
    });

    const [erros, setErros] = React.useState({});
    const [enviado, setEnviado] = React.useState(false);
    const [aEnviar, setAEnviar] = React.useState(false);

    // === OPÇÕES DO SELECT ===
    const motivosContacto = [
        { value: '', label: 'Seleciona um motivo...' },
        { value: 'informacao', label: 'Pedido de Informação' },
        { value: 'sugestao', label: 'Sugestão' },
        { value: 'contribuicao', label: 'Contribuir com Material' },
        { value: 'reclamacao', label: 'Reclamação' },
        { value: 'erro', label: 'Reportar Erro no Site' },
        { value: 'outro', label: 'Outro' }
    ];

    // === FUNÇÕES DE VALIDAÇÃO ===

    /**
     * Valida o formato do email
     * @param {string} email - Email a validar
     * @returns {boolean} True se válido
     */
    function validarEmail(email) {
        // Regex simples para validação de email
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    /**
     * Valida o formato do telefone
     * @param {string} telefone - Telefone a validar
     * @returns {boolean} True se válido
     */
    function validarTelefone(telefone) {
        // Remover espaços e verificar se tem apenas dígitos e pelo menos 9 caracteres
        const apenasDigitos = telefone.replace(/\s/g, '');
        return /^\d{9,}$/.test(apenasDigitos);
    }

    /**
     * Valida todos os campos do formulário
     * @returns {Object} Objeto com erros encontrados
     */
    function validarFormulario() {
        const novosErros = {};

        // Nome - obrigatório
        if (!formData.nome.trim()) {
            novosErros.nome = 'O nome é obrigatório';
        } else if (formData.nome.trim().length < 2) {
            novosErros.nome = 'O nome deve ter pelo menos 2 caracteres';
        }

        // Motivo - obrigatório
        if (!formData.motivo) {
            novosErros.motivo = 'Seleciona um motivo de contacto';
        }

        // Email - obrigatório e formato válido
        if (!formData.email.trim()) {
            novosErros.email = 'O email é obrigatório';
        } else if (!validarEmail(formData.email)) {
            novosErros.email = 'Introduz um email válido (exemplo: nome@dominio.pt)';
        }

        // Telefone - obrigatório e formato válido
        if (!formData.telefone.trim()) {
            novosErros.telefone = 'O telefone é obrigatório';
        } else if (!validarTelefone(formData.telefone)) {
            novosErros.telefone = 'Introduz um telefone válido (mínimo 9 dígitos)';
        }

        // Mensagem - obrigatória
        if (!formData.mensagem.trim()) {
            novosErros.mensagem = 'A mensagem é obrigatória';
        } else if (formData.mensagem.trim().length < 10) {
            novosErros.mensagem = 'A mensagem deve ter pelo menos 10 caracteres';
        }

        return novosErros;
    }

    // === HANDLERS ===

    /**
     * Atualiza o state quando um campo muda
     * @param {Event} e - Evento do input
     */
    function handleChange(e) {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Limpar erro do campo quando o utilizador começa a escrever
        if (erros[name]) {
            setErros(prev => {
                const novosErros = { ...prev };
                delete novosErros[name];
                return novosErros;
            });
        }

        // Resetar estado de enviado se o utilizador começar a editar
        if (enviado) {
            setEnviado(false);
        }
    }

    /**
     * Guarda os dados no localStorage
     * @param {Object} dados - Dados do formulário
     */
    function guardarNoLocalStorage(dados) {
        try {
            // Obter submissões existentes
            const submissoesExistentes = localStorage.getItem('formulario_contactos');
            const submissoes = submissoesExistentes ? JSON.parse(submissoesExistentes) : [];

            // Adicionar nova submissão com timestamp
            const novaSubmissao = {
                ...dados,
                dataSubmissao: new Date().toISOString(),
                id: Date.now()
            };

            submissoes.push(novaSubmissao);

            // Guardar no localStorage
            localStorage.setItem('formulario_contactos', JSON.stringify(submissoes));

            console.log('Dados guardados no localStorage:', novaSubmissao);
            return true;
        } catch (error) {
            console.error('Erro ao guardar no localStorage:', error);
            return false;
        }
    }

    /**
     * Processa a submissão do formulário
     * @param {Event} e - Evento do formulário
     */
    function handleSubmit(e) {
        e.preventDefault();

        // Validar formulário
        const errosValidacao = validarFormulario();

        if (Object.keys(errosValidacao).length > 0) {
            setErros(errosValidacao);
            return;
        }

        // Simular envio (mostrar loading)
        setAEnviar(true);

        // Simular delay de rede (para melhor UX)
        setTimeout(() => {
            // Guardar no localStorage
            const sucesso = guardarNoLocalStorage(formData);

            if (sucesso) {
                setEnviado(true);
                setErros({});

                // Limpar formulário
                setFormData({
                    nome: '',
                    motivo: '',
                    email: '',
                    telefone: '',
                    mensagem: ''
                });
            } else {
                setErros({ geral: 'Ocorreu um erro ao guardar. Tenta novamente.' });
            }

            setAEnviar(false);
        }, 500);
    }

    // === RENDER ===
    return (
        <form onSubmit={handleSubmit}>
            <h2 style={{ marginBottom: '25px', fontSize: '1.5rem' }}>
                - - Formulário de Contacto - -
            </h2>

            {/* Campo Nome */}
            <div className="form-group">
                <label htmlFor="nome">Nome *</label>
                <input
                    type="text"
                    id="nome"
                    name="nome"
                    placeholder="O teu nome completo"
                    value={formData.nome}
                    onChange={handleChange}
                    className={erros.nome ? 'input-error' : ''}
                />
                {erros.nome && <span className="error-message">{erros.nome}</span>}
            </div>

            {/* Campo Motivo */}
            <div className="form-group">
                <label htmlFor="motivo">Motivo de Contacto *</label>
                <select
                    id="motivo"
                    name="motivo"
                    value={formData.motivo}
                    onChange={handleChange}
                    className={erros.motivo ? 'input-error' : ''}
                >
                    {motivosContacto.map(opcao => (
                        <option key={opcao.value} value={opcao.value}>
                            {opcao.label}
                        </option>
                    ))}
                </select>
                {erros.motivo && <span className="error-message">{erros.motivo}</span>}
            </div>

            {/* Campo Email */}
            <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="exemplo@email.pt"
                    value={formData.email}
                    onChange={handleChange}
                    className={erros.email ? 'input-error' : ''}
                />
                {erros.email && <span className="error-message">{erros.email}</span>}
            </div>

            {/* Campo Telefone */}
            <div className="form-group">
                <label htmlFor="telefone">Telefone *</label>
                <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    placeholder="912 345 678"
                    value={formData.telefone}
                    onChange={handleChange}
                    className={erros.telefone ? 'input-error' : ''}
                />
                {erros.telefone && <span className="error-message">{erros.telefone}</span>}
            </div>

            {/* Campo Mensagem */}
            <div className="form-group">
                <label htmlFor="mensagem">Mensagem *</label>
                <textarea
                    id="mensagem"
                    name="mensagem"
                    placeholder="Escreve aqui a tua mensagem..."
                    value={formData.mensagem}
                    onChange={handleChange}
                    rows="5"
                    className={erros.mensagem ? 'input-error' : ''}
                />
                {erros.mensagem && <span className="error-message">{erros.mensagem}</span>}
            </div>

            {/* Erro Geral */}
            {erros.geral && (
                <div className="error-message" style={{ textAlign: 'center', marginBottom: '15px' }}>
                    {erros.geral}
                </div>
            )}

            {/* Botão Enviar */}
            <button type="submit" disabled={aEnviar}>
                {aEnviar ? ' A enviar...' : ' Enviar Mensagem'}
            </button>

            {/* Mensagem de Sucesso */}
            {enviado && (
                <div className="success-message">
                    ✅ Mensagem enviada com sucesso! Obrigado pelo teu contacto.
                </div>
            )}

            {/* Nota sobre campos obrigatórios */}
            <p style={{
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                textAlign: 'center',
                marginTop: '20px'
            }}>
                * Campos obrigatórios
            </p>
        </form>
    );
}

// === RENDERIZAÇÃO ===
// Renderizar o componente no elemento #react-form
const container = document.getElementById('react-form');
if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(<FormularioContacto />);
}
