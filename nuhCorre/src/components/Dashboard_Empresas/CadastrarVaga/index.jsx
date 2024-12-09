import boxicons from "boxicons";
import { useEffect, useState } from "react";
import "./styleCadastrarVagas.css";

import axios from "axios";

import { ModalSessaoExpirada } from "../modals";

import { useNavigate } from "react-router-dom";
import SideBar from "../SideBar";
import "./style.css";
import useDarkMode from "../../../hooks/useDarkMode";
import Footer from '../../footer/Footer'

import ThemeSwitcher from "../../ThemeSwitcher/ThemeSwitcher";

const CadastrarVaga = () => {
  const navigate = useNavigate();
  const RedirectCadastrarNovaVaga = () => {
    navigate("/cadastrar-vaga");
  };

  const [showModal, setShowModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const [combinarSalario, setCombinarSalario] = useState(false);
  const [endereco, setEndereco] = useState([]);
  const [tituloVaga, setTituloVaga] = useState("");
  const [requisitos, setRequisitos] = useState("");
  const [beneficios, setBeneficios] = useState("");
  const [salario, setSalario] = useState("");
  const [dataExpiracao, setDataExpiracao] = useState("");
  const [enderecoVaga, setEnderecoVaga] = useState("");
  const [idEndereco, setIdEndereco] = useState(1);
  const [cargaHoraria, setCargaHoraria] = useState("");
  const [descricao, setDescricao] = useState("");
  const isDarkMode = useDarkMode();



  const submitCadastrarVaga = async () => {
    const token = localStorage.getItem("token");

    const postData = {
      titulo: tituloVaga,
      descricao: descricao,
      requisitos: requisitos,
      beneficios: beneficios,
      salario: salario,
      cargaHoraria: cargaHoraria,
      enderecoId: idEndereco,
      status: true,
    };

    const resposta = await axios.post(
      "http://localhost:8080/vaga/cadastrar",
      postData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        validateStatus: (status) => {
          return status <= 500;
        },
      }
    );

    if (JSON.stringify(resposta.data).includes("JWT expired at")) {
      setShowModal(true);
      return;
    }

    if (resposta.status === 200) {
      alert("Vaga cadastrada com sucesso");
      navigate("/dashboard");
    }
  };

  const fetchAllAddresses = async () => {
    const token = localStorage.getItem("token");

    const resposta = await axios.get(
      "http://localhost:8080/endereco/capturar-todos",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        validateStatus: (status) => {
          return status <= 500;
        },
      }
    );

    if (resposta.status === 200) {
      setEndereco(resposta.data);
    } else {
      setEndereco[["erro", "erro", "erro", "erro", "erro", "erro"]];
    }
  };

  useEffect(() => {
    fetchAllAddresses();
  }, []);

  return (
    <>
      <ModalSessaoExpirada showModal={showModal} setShowModal={setShowModal} />
      <SideBar visible={visible} setVisible={setVisible} />

      <header
        className="header-dashboard flex flex-row w-full shadow-xl p-2 items-center
        dark:bg-gray-800
      "
      >
        <button
          className="abrir-side-bar hover:text-gray-300"
          onClick={() => setVisible(true)}
        >
          {!isDarkMode ? (
            <box-icon name="menu" size="lg"></box-icon>
          ) : (
            <box-icon name="menu" size="lg" color="#ffffff"></box-icon>
          )}
        </button>

        <h1
          className="titulo-dashboard text-blue-800 text-2xl flex justify-center items-center font-bold m-auto
          dark:text-white
        "
        >
          Cadastrar vaga
          <ThemeSwitcher />
        </h1>
      </header>

      <main className="main-cadastrar-vaga">
        <div className="container-anunciar-vaga mt-8">
          <div
            className="text-blue-800 font-bold text-xl text-center
            dark:text-blue-500
          "
          >
            Detalhes da vaga
          </div>

          <div
            className="inputs-cadastrar-vaga flex flex-col

          "
          >
            <div className="input-cadastro flex flex-col">
              <label
                className="text-blue-800 font-bold
            dark:text-blue-500
              "
              >
                Titulo da vaga{" "}
              </label>
              <input
                type="text"
                className="w-full h-12 border-2 rounded-md border-blue-800 p-2"
                placeholder="Ex: Desenvolvedor Front-end"
                onChange={(e) => setTituloVaga(e.target.value)}
              />
            </div>
            <div className="input-cadastro flex flex-col">
              <label
                className="text-blue-800 font-bold
            dark:text-blue-500
              "
              >
                Requisitos
              </label>
              <input
                type="text"
                className="w-full h-12 border-2 rounded-md border-blue-800 p-2"
                placeholder="Ex: Experiência com React.js"
                onChange={(e) => setRequisitos(e.target.value)}
              />
            </div>

            <div className="input-cadastro flex flex-col">
              <label
                className="text-blue-800 font-bold
            dark:text-blue-500
              "
              >
                Carga horaria
              </label>
              <input
                type="text"
                className="w-full h-12 border-2 rounded-md border-blue-800 p-2"
                placeholder="Ex: 40 horas semanais"
                onChange={(e) => setCargaHoraria(e.target.value)}
              />
            </div>

            <div className="input-cadastro flex flex-col">
              <label
                className="text-blue-800 font-bold
            dark:text-blue-500
              "
              >
                Beneficios
              </label>
              <input
                type="text"
                className="w-full h-12 border-2 rounded-md border-blue-800 p-2"
                placeholder="Ex: Plano de saúde"
                onChange={(e) => setBeneficios(e.target.value)}
              />
            </div>
            <div className="input-cadastro flex flex-col">
              <label
                className="text-blue-800 font-bold
            dark:text-blue-500
              "
              >
                Salario
              </label>
              <input
                type="text"
                className="w-full h-12 border-2 rounded-md border-blue-800 p-2"
                placeholder="Ex: 3000"
                onChange={(e) => setSalario(e.target.value)}
              />
              <p className="informacao-extra text-center opacity-60">
                * Caso queira combinar o salario digite no campo acima
              </p>
            </div>

            <div className="input-cadastro flex flex-col">
              <label
                className="text-blue-800 font-bold
            dark:text-blue-500
              "
              >
                Data expiração
              </label>
              <input
                type="date"
                className="w-full h-12 border-2 rounded-md border-blue-800 p-2"
                onChange={(e) => setDataExpiracao(e.target.value)}
              />
            </div>
            <div className="input-cadastro flex flex-col">
              <label
                className="text-blue-800 font-bold
            dark:text-blue-500
              "
              >
                Endereço
              </label>
              <select
                className="selecionarEndereco w-full h-12 border-2 rounded-md border-blue-800"
                onChange={(e) => setIdEndereco(e.target.value)}
              >
                <option value="vaga-remota">Vaga Remota</option>
                {endereco.map((end) => {
                  return (
                    <option key={end.id} value={end.id}>
                      {end.rua +
                        ", " +
                        end.numero +
                        ", " +
                        end.cidade +
                        " - " +
                        end.estado}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="input-cadastro flex flex-col items-center">
            <label className="text-blue-800 font-bold text-center">
              Descrição
            </label>
            <textarea
              className="w-[90%] h-40 border-2 rounded-md border-blue-800 resize-none p-2 m-2"
              placeholder="Descreva as responsabilidades e requisitos da vaga"
              onChange={(e) => setDescricao(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-center items-center gap-4 p-4">
            <button
              className="bg-blue-800 text-white font-bold  p-2 rounded-xl w-full"
              onClick={submitCadastrarVaga}
            >
              Publicar vaga
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CadastrarVaga;
