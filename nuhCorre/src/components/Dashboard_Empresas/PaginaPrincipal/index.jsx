import boxicons from "boxicons";
import Chart from "chart.js/auto";
import { useEffect, useState } from "react";

import logo from "../../../assets/logo.png";
import { Slider } from "@nextui-org/react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import SideBar from "../SideBar";

const DashBoardPrincipal = () => {
  const [visible, setVisible] = useState(false);
  const [chartInstance, setChartInstance] = useState(null);
  const [data, setData] = useState([]);
  const [visualizacaoTotal, setVisualizacaoTotal] = useState(0);
  const [vagaTitulos, setVagaTitulos] = useState([]);
  const [vagaSelecionada, setVagaSelecionada] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [candidatos, setCandidatos] = useState([]);
  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const [vagas, setVagas] = useState([]);
  const [maximoCandidatos, setMaximoCandidatos] = useState(0);
  const [fetchInicial, setFetchInicial] = useState(false);

  const navigate = useNavigate();

  const RedirectCadastrarNovaVaga = () => {
    navigate("/cadastrar-vaga");
  };

  const modal = () => {
    return (
      <div className="modal-container fixed inset-0 flex items-center justify-center">
        <div className="overlay fixed inset-0 bg-black opacity-50"></div>
        <div className="modal flex flex-col items-center justify-center gap-4 p-4 bg-white shadow-2xl rounded-md z-10">
          <h1 className="titulo-modal text-2xl font-bold">Sessão Expirada</h1>
          <p className="descricao-modal text-center">
            Sua sessão expirou, por favor faça login novamente
          </p>
          <button
            className="botao-modal bg-blue-800 text-white p-2 rounded-md"
            onClick={() => {
              navigate("/login");
              localStorage.clear();
              setShowModal(false);
            }}
          >
            Fazer login
          </button>
        </div>
      </div>
    );
  };

  const meses = {
    1: "Janeiro",
    2: "Fevereiro",
    3: "Março",
    4: "Abril",
    5: "Maio",
    6: "Junho",
    7: "Julho",
    8: "Agosto",
    9: "Setembro",
    10: "Outubro",
    11: "Novembro",
    12: "Dezembro",
  };

  const handleMudarVaga = (event) => {
    const selectedVagaId = event.target.value;
    setVagaSelecionada(selectedVagaId);
  };


  const fetchVagasCadastradas = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/vaga/minhas-vagas",
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          validateStatus: (status) => status <= 500,
        }
      );

      if (JSON.stringify(response.data).includes("JWT expired at")) {
        setShowModal(true);
        return;
      }

      const titulos = response.data.map((vaga) => vaga.titulo);
      const ids = response.data.map((vaga) => vaga.id);
      const candidaturas = response.data.map((vaga) => vaga.candidaturas);
      setVagaSelecionada(ids[0]);
      geraGrafico();

      const vagasFormatadas = titulos.map((titulo, index) => ({
        titulo,
        id: ids[index],
      }));
      setVagaTitulos(vagasFormatadas);
      setVagas(response.data);
      setMaximoCandidatos(Math.max(...candidaturas));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUltimasCandidaturas = async () => {
    const response = await axios.get(
      `http://localhost:8080/vaga/${vagaSelecionada}/candidatos`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        validateStatus: (status) => status <= 500,
      }
    );

    let resposta = JSON.stringify(response.data);

    if (resposta.includes("JWT expired at")) {
      setShowModal(true);
      return;
    }

    const data = response.data.length
      ? response.data.map((candidato) => ({
          nome: candidato.nome,
          telefone: candidato.telefone,
        }))
      : [{ nome: "Nenhum candidato", telefone: "Nenhum candidato" }];

    setCandidatos(data);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/vaga/${vagaSelecionada}/visualizacoes`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          validateStatus: (status) => status <= 500,
        }
      );

      if (JSON.stringify(response.data).includes("JWT expired at")) {
        setShowModal(true);
        return;
      }

      const data = response.data.visualizacoes;
      const formattedData = Object.keys(data).flatMap((year) =>
        Object.keys(data[year]).map((month) => ({
          mes: meses[month],
          count: data[year][month],
        }))
      );

      const totalVisualizacoes = Object.values(data)
        .flat()
        .reduce((acc, curr) => acc + curr, 0);
      setVisualizacaoTotal(totalVisualizacoes);
      setData(formattedData);
    } catch (error) {
      console.error(error);
    }
  };

  const geraGrafico = () => {
    const ctx = document
      .getElementById("grafico-candidatura-por-mes")
      .getContext("2d");
    if (chartInstance) {
      chartInstance.destroy();
    }
    const newChartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.map((item) => item.mes),
        datasets: [
          {
            label: "Candidaturas por mês",
            data: data.map((item) => item.count),
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgb(113, 140, 179)",
            tension: 0.1,
          },
        ],
      },
    });
    setChartInstance(newChartInstance);
  };

  useEffect(() => {
    if (fetchInicial) {
      console.log("Atualizando dados para a vaga:", vagaSelecionada);
      fetchData();
      fetchUltimasCandidaturas();
      geraGrafico();
    } else {
      console.log("Carregando dados iniciais");
      fetchVagasCadastradas();
      fetchData();
      fetchUltimasCandidaturas();
      const usuario = jwtDecode(localStorage.getItem("token"));
      setNomeEmpresa(usuario.nomeEmpresa);
      setFetchInicial(true);
    }
  }, [vagaSelecionada]);
  

  return (
    <>
      {showModal && modal()}
    <SideBar visible={visible} setVisible={setVisible} />

      <header className="header-dashboard flex flex-row w-full shadow-xl p-2 items-center">
        <button
          className="abrir-side-bar hover:text-gray-300"
          onClick={() => setVisible(true)}
        >
          <box-icon name="menu" size="lg"></box-icon>
        </button>

        <h1 className="titulo-dashboard text-blue-800 text-2xl flex justify-center items-center font-bold m-auto">
          Dashboard
        </h1>

        <div className="selecionar-vaga">
          <label className="flex flex-row items-center gap-2">
            Selecione a vaga
            <select
              name="vagas"
              id="vagas"
              className="bg-white border-2 border-blue-500 rounded-md p-2"
              onChange={handleMudarVaga}
            >
              {vagaTitulos.map((vaga) => (
                <option value={vaga.id} key={vaga.id}>
                  {vaga.id} - {vaga.titulo}
                </option>
              ))}
            </select>
          </label>
        </div>
      </header>

      <main className="main-dashboard flex flex-col items-center gap-4 p-4">
        <div className="flex flex-row items-center gap-4">
          <h1 className="text-2xl font-bold">
            Bem vindo, <span className="text-blue-800">{nomeEmpresa}</span>
          </h1>
        </div>

        <div className="flex flex-row items-center gap-4">
          <div className="card flex flex-col items-center gap-4 p-4 shadow-md bg-white border-2 border-blue-500">
            <h1 className="titulo-card text-2xl font-bold text-center">
              Total candidatos
            </h1>
            <h1 className="numero-card text-4xl font-bold">
              {candidatos.length}
            </h1>
          </div>
          <div className="card flex flex-col items-center gap-4 p-4 shadow-md bg-white border-2 border-blue-500">
            <h1 className="titulo-card text-2xl font-bold text-center">
              Visualizações totais
            </h1>
            <h1 className="numero-card text-4xl font-bold">
              {visualizacaoTotal}
            </h1>
          </div>
        </div>
      </main>

      <section
        className="grafico mt-4 w-full border shadow-2xl
            xl:flex
            xl:justify-center

            "
      >
        <div
          className="grafico-candidatura w-full
                        xl:w-[40%]
                    "
        >
          <canvas id="grafico-candidatura-por-mes"></canvas>
        </div>
      </section>

      <section
        className="outras-informacoes flex flex-col gap-4 p-2 mt-8
            
            xl:flex-row
            xl:gap-8
            "
      >
        <div
          className="container-atividade-recente flex flex-col gap-4 p-4 shadow-md bg-white border-2 border-blue-500 rounded-md
                
                xl:w-[50%]

                "
        >
          <h1 className="titulo-card text-md font-bold text-center">
            Atividades recentes
          </h1>

          <div className="atividade-recente flex flex-col gap-4">
            {candidatos.map((candidato) => (
              <div
                key={candidato.telefone}
                className="atividade flex flex-row justify-between
                            xl:justify-evenly
                            "
              >
                <div className="informacoes-usuario flex flex-row">
                  <box-icon name="user"></box-icon>
                  <div className="nome-funcao flex flex-col">
                    <h1 className="nome font-bold">{candidato.nome}</h1>
                    <p className="telefone text-gray-400 text-sm">
                      {candidato.telefone}
                    </p>
                  </div>
                </div>
                <div className="acao-usuario">
                  <p className="acao border-2 rounded-xl p-1 border-gray-400">
                    Novo candidato
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="container-vagas-em-destaque flex flex-col gap-4 p-4 shadow-md bg-white border-2 border-blue-500 rounded-md
                
                xl:w-[50%]
                "
        >
          <h1 className="titulo-card text-md font-bold text-center">
            Vagas em destaque
          </h1>

          <div className="vagas-em-destaque flex flex-col gap-4">
            {vagas.map((vaga) => (
              <div
                key={vaga.id}
                className="vaga-em-destaque flex flex-col gap-4"
              >
                <h1 className="titulo-vaga font-bold">{vaga.titulo}</h1>

                <div className="slider-candidatos flex flex-row gap-4 items-center">
                  <Slider
                    isDisabled
                    aria-label="Player progress"
                    color="primary"
                    hideThumb={true}
                    value={vaga.candidaturas}
                    maxValue={maximoCandidatos}
                    className="max-w-md"
                  />
                  <p className="candidatos font-bold text-center">
                    {vaga.candidaturas} candidatos
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default DashBoardPrincipal;
