function Formulario() {
    const [nome, setNome] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [mensagem, setMensagem] = React.useState("");
    const [enviado, setEnviado] = React.useState(false);

    const formularioValido = nome && email && mensagem;

    function handleSubmit(e) {
        e.preventDefault();
         if (!formularioValido) return;

        setEnviado(true);
    }

    return (
        <form onSubmit={handleSubmit} className="glass-card">
            <h2>Contacto</h2>

            <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={e => setNome(e.target.value)}
            />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />

            <textarea
                placeholder="Mensagem"
                value={mensagem}
                onChange={e => setMensagem(e.target.value)}
            />

            <button type="submit" disabled={!formularioValido}>Enviar</button>

            {enviado && <p>Mensagem enviada :3 </p>}
        </form>
    );
}
const root = ReactDOM.createRoot(document.getElementById("react-form"));
root.render(<Formulario />);