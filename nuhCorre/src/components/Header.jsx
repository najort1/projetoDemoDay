import "./styleHeader.css";

function Header() {
  return (
    <header>
      <div id="logo">NuhCorre</div>

      <div className="conteudoHeader">
        <div className="listaIdentificador">
          <ul className="identificadorCandidato">
            <li>
              <a href="">Sou candidato</a>
            </li>
            <li>
              <a href="">Sou empresa</a>
            </li>
          </ul>
        </div>

        <div className="botoes">
          <button className="btn">Entrar</button>
          <button className="btn">Cadastro</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
