import React, { useState } from "react";
import SideBar from "../Dashboard_Empresas/SideBar";
import "./vagas.css";

function FormularioDeVagas() {
  const [dadosForm, setDadosForm] = useState({
    titulo: "",
    nomeEmpresa: "",
    localizacao: "",
    tipoVaga: "",
    salarioMinimo: "",
    salarioMaximo: "",
    descricao: "",
    gruposVulneraveis: [],
    nivelExperiencia: "",
  });

  const [erros, setErros] = useState({});
  const [visible, setVisible] = useState(false); // Inicialmente o menu está fechado

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setDadosForm((prev) => ({
        ...prev,
        gruposVulneraveis: checked
          ? [...prev.gruposVulneraveis, value]
          : prev.gruposVulneraveis.filter((item) => item !== value),
      }));
    } else {
      setDadosForm({ ...dadosForm, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const novosErros = {};

    if (!dadosForm.titulo) novosErros.titulo = "Título é obrigatório";
    if (!dadosForm.nomeEmpresa) novosErros.nomeEmpresa = "Nome da empresa é obrigatório";

    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      return;
    }

    console.log("Dados do formulário:", dadosForm);

    setDadosForm({
      titulo: "",
      nomeEmpresa: "",
      localizacao: "",
      tipoVaga: "",
      salarioMinimo: "",
      salarioMaximo: "",
      descricao: "",
      gruposVulneraveis: [],
      nivelExperiencia: "",
    });
    setErros({});
  };

  return (
    <div className="dashboard-container">
      <SideBar visible={visible} setVisible={setVisible} />
      
      {/* Botão para alternar a visibilidade do SideBar */}
      <button
        className="toggle-sidebar-btn"
        onClick={() => setVisible((prev) => !prev)}
      >
        {visible ? "Fechar Menu" : "Abrir Menu"}
      </button>

      <div className={`form-container ${visible ? 'form-expanded' : ''}`}>
        <h1>Anunciar Nova Vaga</h1>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend id='detalhVagas'>Detalhes da vaga</legend>
            <div>
              <label htmlFor="titulo">Título da vaga:</label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                placeholder="Ex: Desenvolvedor Frontend"
                value={dadosForm.titulo}
                onChange={handleChange}
              />
              {erros.titulo && <span className="error">{erros.titulo}</span>}
            </div>
            <div>
              <label className="titulosInputs" htmlFor="nomeEmpresa">Nome da Empresa:</label>
              <input
                type="text"
                id="nomeEmpresa"
                name="nomeEmpresa"
                placeholder="Sua Empresa Ltda."
                value={dadosForm.nomeEmpresa}
                onChange={handleChange}
              />
              {erros.nomeEmpresa && <span className="error">{erros.nomeEmpresa}</span>}
            </div>

            <div>
              <label className="titulosInputs" htmlFor="localizacao">Localização:</label>
              <input
                type="text"
                id="localizacao"
                name="localizacao"
                placeholder="Cidade, Estado ou Remoto"
                value={dadosForm.localizacao}
                onChange={handleChange}
              />
            </div>

            <div className="row-group">
              <div>
                <label className="titulosInputs">Tipo de Vaga:</label>
                {["CLT", "PJ", "Temporário", "Estágio", "Freelance"].map((tipo) => (
                  <div key={tipo}>
                    <input
                      type="radio"
                      name="tipoVaga"
                      value={tipo}
                      checked={dadosForm.tipoVaga === tipo}
                      onChange={handleChange}
                    />
                    {tipo}
                  </div>
                ))}
              </div>

              <div>
                <label className="titulosInputs">Modelo de Trabalho:</label>
                <input type="text" disabled placeholder="Adicionar opções futuramente" />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend className="titulosInputs">Faixa Salarial</legend>
            <div className="range-group flex">
              <div>
                <input
                  type="number"
                  id="salarioMinimo"
                  name="salarioMinimo"
                  placeholder="Mínimo"
                  value={dadosForm.salarioMinimo}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  type="number"
                  id="salarioMaximo"
                  name="salarioMaximo"
                  placeholder="Máximo"
                  value={dadosForm.salarioMaximo}
                  onChange={handleChange}
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend className="titulosInputs">Grupos Vulneráveis (selecione todos que se aplicam)</legend>
            <div className="options-group">
              {[
                "PCD",
                "Mães",
                "LGBTQIA+",
                "Grupos Étnicos e Raciais",
                "Mulheres",
                "50+",
                "Imigrantes e Refugiados",
              ].map((grupo) => (
                <label key={grupo}>
                  <input
                    type="checkbox"
                    name="gruposVulneraveis"
                    value={grupo}
                    checked={dadosForm.gruposVulneraveis.includes(grupo)}
                    onChange={handleChange}
                  />
                  {grupo}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="titulosInputs">Nível de Experiência</legend>
            <div>
              <label htmlFor="nivelExperiencia">Selecione o nível:</label>
              <select
                id="nivelExperiencia"
                name="nivelExperiencia"
                value={dadosForm.nivelExperiencia}
                onChange={handleChange}
              >
                <option value="">Selecione</option>
                <option value="Júnior">Júnior</option>
                <option value="Pleno">Pleno</option>
                <option value="Sênior">Sênior</option>
              </select>
            </div>
          </fieldset>

          <div>
            <label className="titulosInputs" htmlFor="descricao">Descrição da Vaga:</label>
            <textarea
              id="descricao"
              name="descricao"
              placeholder="Descreva as responsabilidades e requisitos da vaga"
              value={dadosForm.descricao}
              onChange={handleChange}
            />
          </div>

          <button type="submit">Publicar Vaga</button>
        </form>
      </div>
    </div>
  );
}

export default FormularioDeVagas;
