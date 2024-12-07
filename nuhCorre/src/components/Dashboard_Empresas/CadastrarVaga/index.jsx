import boxicons from "boxicons";
import { useEffect, useState } from "react";
import './styleCadastrarVagas.css';

import axios from "axios";

import { useNavigate } from "react-router-dom";
import SideBar from "../SideBar";
import './style.css';

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
          Anunciar Nova Vaga
        </h1>
      </header>

      <main className="main-cadastrar-vaga">
        <div className="container-anunciar-vaga mt-8">
          <div className="text-blue-800 font-bold text-xl text-center">
            Detalhes da vaga
          </div>

          <div className="inputs-cadastrar-vaga flex flex-col

          ">
            <div className="input-cadastro flex flex-col">
              <label className="text-blue-800 font-bold">Titulo da vaga </label>
              <input
                type="text"
                className="w-full h-12 border-2 rounded-md border-blue-800 p-2"
                placeholder="Ex: Desenvolvedor Front-end"
                onChange={(e) => setTituloVaga(e.target.value)}
              />
            </div>
            <div className="input-cadastro flex flex-col">
              <label className="text-blue-800 font-bold">Requisitos</label>
              <input
                type="text"
                className="w-full h-12 border-2 rounded-md border-blue-800 p-2"
                placeholder="Ex: Experiência com React.js"
                onChange={(e) => setRequisitos(e.target.value)}
              />
            </div>

            <div className="input-cadastro flex flex-col">
              <label className="text-blue-800 font-bold">Carga horaria</label>
              <input
                type="text"
                className="w-full h-12 border-2 rounded-md border-blue-800 p-2"
                placeholder="Ex: 40 horas semanais"
                onChange={(e) => setCargaHoraria(e.target.value)}
              />
            </div>

            <div className="input-cadastro flex flex-col">
              <label className="text-blue-800 font-bold">Beneficios</label>
              <input
                type="text"
                className="w-full h-12 border-2 rounded-md border-blue-800 p-2"
                placeholder="Ex: Plano de saúde"
                onChange={(e) => setBeneficios(e.target.value)}
              />
            </div>
            <div className="input-cadastro flex flex-col">
              <label className="text-blue-800 font-bold">Salario</label>
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
              <label className="text-blue-800 font-bold">Data expiração</label>
              <input
                type="date"
                className="w-full h-12 border-2 rounded-md border-blue-800 p-2"
                onChange={(e) => setDataExpiracao(e.target.value)}
              />
            </div>
            <div className="input-cadastro flex flex-col">
              <label className="text-blue-800 font-bold">Endereço</label>
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
              <label className="text-blue-800 font-bold text-center">Descrição</label>
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
    </>
  );
};

export default CadastrarVaga;
