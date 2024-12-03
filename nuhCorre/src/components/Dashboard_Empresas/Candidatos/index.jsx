import boxicons from "boxicons";
import { useEffect, useState } from "react";

import axios from "axios";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, cn} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import SideBar from "../SideBar";

const Candidatos = () => {
  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [vagaTitulos, setVagaTitulos] = useState([]);
  const [vagaSelecionada, setVagaSelecionada] = useState(1);
  const [candidatos, setCandidatos] = useState([]);
  const [vagas, setVagas] = useState([]);

  const RedirectCadastrarNovaVaga = () => {
    navigate("/cadastrar-vaga");
  };

  const handleMudarVaga = (event) => {
    const selectedVagaId = event.target.value;
    setVagaSelecionada(selectedVagaId);
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
          email: candidato.email,
          imagem: candidato.imagem,
        }))
      : [{ nome: "Nenhum candidato", telefone: "Nenhum candidato" }];

    setCandidatos(data);
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
      setVagaSelecionada(ids[0]);

      const vagasFormatadas = titulos.map((titulo, index) => ({
        titulo,
        id: ids[index],
      }));
      setVagaTitulos(vagasFormatadas);
      setVagas(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVagasCadastradas();
  }, []);

  useEffect(() => {
    fetchUltimasCandidaturas();
  }, [vagaSelecionada]);

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

  return (
    <>
      <SideBar visible={visible} setVisible={setVisible} />
      {showModal && modal()}

      <header className="header-dashboard flex flex-row w-full shadow-xl p-2 items-center">
        <button
          className="abrir-side-bar hover:text-gray-300"
          onClick={() => setVisible(true)}
        >
          <box-icon name="menu" size="lg"></box-icon>
        </button>

        <h1 className="titulo-dashboard text-blue-800 text-2xl flex justify-center items-center font-bold m-auto">
          Gerenciar Candidatos
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

      <main className="candidatos-dashboard">
        <div className="candidaturas-container shadow-md w-screen h-screen p-4 ">


          <div className="inputs-filtro-candidato flex flex-col gap-4 border-b-2 border-blue-800 p-4">
            <h2 className="text-blue-800 font-bold text-xl text-center">Filtrar Candidatos</h2>
            <input
              type="text"
              placeholder="Buscar por nome"
              className="w-full h-12 border-2 rounded-md border-blue-800 p-2"
            />
            <input
              type="text"
              placeholder="Buscar por vaga"
              className="w-full h-12 border-2 rounded-md border-blue-800 p-2"
            />

            <button className="bg-blue-800 text-white p-2 rounded-md">Filtrar</button>
          </div>

          <div className="lista-de-candidatos">
    <h2 className="text-blue-800 font-bold text-2xl text-center m-4">Candidatos</h2>
    <div className="candidatos-lista flex flex-col gap-2">
            
            {candidatos.map((candidato, index) => (
                <div
                className="candidato-card flex flex-row items-center justify-around md:justify-between p-4"
                key={index}
              >
                <img
                  src={candidato.imagem}
                  alt="Imagem do candidato"
                  className="candidato-imagem w-20 h-20 rounded-full"
                />
                <div className="candidato-info flex flex-col gap-2">
                  <h3 className="candidato-nome text-blue-800 font-bold text-lg">
                    {candidato.nome}
                  </h3>
                  <p className="candidato-email text-blue-800">{candidato.email}</p>
                  <p className="candidato-telefone text-blue-800">{candidato.telefone}</p>
                </div>

                <div className="botao-acao-candidato">
                <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="bordered" 
          color="primary"
        >
          Ações
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dropdown menu with icons">
        <DropdownItem
          key="new"
          color="primary"
        >
            <div className="acao-candidato flex flex-row items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <box-icon type='solid' name='user-check' ></box-icon>
                <p className="paragrafo-drop font-bold text-black">Aprovar</p>
            </div>

        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
        >
            <div className="acao-candidato flex flex-row items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <box-icon type='solid' name='user-x' ></box-icon>
                <p className="paragrafo-drop font-bold text-black">Reprovar</p>
            </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
                </div>

              </div>
            ))}

    </div>
</div>


        </div>
      </main>
    </>
  );
};

export default Candidatos;
