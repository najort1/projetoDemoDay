import { useState } from "react";
import "./mainStyle.css";
import Header from "../header/Header";
import Footer from "../footer/Footer";

const PesquisaVaga = () => {

  // Estados dos campos com valores padrão
  const [tipo, setTipo] = useState("Tipo");
  const [cidade, setCidade] = useState("Cidade");
  const [pesquisa, setPesquisa] = useState("");

  // Estado do select do tipo
  const handleTipo = (event) => {
    const value = event.target.value;
    setTipo(value);
  };

  // Estado do input de pesquisa
  const handlePesquisa = (event) => {
    const value = event.target.value;
    setPesquisa(value);
  };

  // Estado do select da cidade
  const handleSelectCidade = (event) => {
    const value = event.target.value;
    setCidade(value);
  };

  return (
    <>
      <Header />

      <div className="tudo">

        <div className="container">

          <div className="titulo">
            <h1>Conecte-se com Empregos Acessíveis para Todos</h1>
            <h2>Temos mais de 320 mil oportunidades para você</h2>
          </div>

          <div className="pesquisa">

            <select onChange={handleTipo} value={tipo}>
              <option value="Tipo" disabled>Tipo</option>
              <option value="vagas">Vagas</option>
              <option value="empresas">Empresas</option>
              <option value="curriculos">Currículos</option>
            </select>

            <input type="text" placeholder="Pesquisar" required onChange={handlePesquisa} value={pesquisa} />

            <select name="Cidade" id="selecionarCidade" onChange={handleSelectCidade} value={cidade}>

              <option value="Cidade" disabled>Cidade</option>
              <option value="saoPaulo">São Paulo</option>
              <option value="rioDeJaneiro">Rio de Janeiro</option>
              <option value="beloHorizonte">Belo Horizonte</option>
              <option value="brasilia">Brasília</option>
              <option value="salvador">Salvador</option>
              <option value="curitiba">Curitiba</option>
              <option value="fortaleza">Fortaleza</option>
              <option value="manaus">Manaus</option>
              <option value="goiania">Goiânia</option>
              <option value="belem">Belém</option>
              <option value="portoAlegre">Porto Alegre</option>
              <option value="recife">Recife</option>
              <option value="campinas">Campinas</option>
              <option value="saoLuis">São Luís</option>
              <option value="maceio">Maceió</option>
              <option value="teresina">Teresina</option>
              <option value="natal">Natal</option>
              <option value="joaoPessoa">João Pessoa</option>
              <option value="aracaju">Aracaju</option>
              <option value="cuiaba">Cuiabá</option>
              <option value="campoGrande">Campo Grande</option>
              <option value="palmas">Palmas</option>
              <option value="rioBranco">Rio Branco</option>
              <option value="boaVista">Boa Vista</option>
              <option value="macapa">Macapá</option>
              <option value="portoVelho">Porto Velho</option>

            </select>

            <button id='pesquisar'>Pesquisar</button>

          </div>
        </div>
      </div>

      <Footer/>
    </>
  );
};

export default PesquisaVaga;
