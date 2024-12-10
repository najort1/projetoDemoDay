import boxicons from "boxicons";
import { useEffect, useState } from "react";

import axios from "axios";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, cn} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import SideBar from "../SideBar";
import imagemUsuarioDefault from "../../../assets/camaleao.png"
import Footer from '../../footer/Footer'
import ThemeSwitcher from "../../ThemeSwitcher/ThemeSwitcher";
import useDarkMode from "../../../hooks/useDarkMode";

const Candidatos = () => {
  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [vagaTitulos, setVagaTitulos] = useState([]);
  const [vagaSelecionada, setVagaSelecionada] = useState(1);
  const [candidatos, setCandidatos] = useState([]);
  const [vagas, setVagas] = useState([]);
  const [showModalInformacoesUsuario, setShowModalInformacoesUsuario] = useState(false);

  const [nomeCandidato, setNomeCandidato] = useState("");
  const [emailCandidato, setEmailCandidato] = useState("");
  const [telefoneCandidato, setTelefoneCandidato] = useState("");
  const [imagemCandidato, setImagemCandidato] = useState("");
  const [cpfCandidato, setCpfCandidato] = useState("");
  const [dataNascimentoCandidato, setDataNascimentoCandidato] = useState("");
  const [enderecosCandidato, setEnderecosCandidato] = useState([]);
  const [vulnerabilidadesCandidato, setVulnerabilidadesCandidato] = useState([]);
  const isDarkMode = useDarkMode();

  const RedirectCadastrarNovaVaga = () => {
    navigate("/cadastrar-vaga");
  };

  const handleMudarVaga = (event) => {
    const selectedVagaId = event.target.value;
    setVagaSelecionada(selectedVagaId);
  };

  const fetchImagemUsuario = async (id) => {
    const response = await axios.get(`http://localhost:8080/imagem/usuario/${id}`, {
      responseType: "blob",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      validateStatus: (status) => status <= 500,
    });
    
    if (JSON.stringify(response.data).includes("JWT expired at")) {
      setShowModal(true);
      return;
    }

    if(response.status === 404){
      return imagemUsuarioDefault;
    }

    const urlCreator = window.URL || window.webkitURL;
    setImagemCandidato(urlCreator.createObjectURL(response.data));
    return urlCreator.createObjectURL(response.data);



    
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
    ? await Promise.all(
        response.data.map(async (candidato) => ({
          id: candidato.id,
          nome: candidato.nome,
          telefone: candidato.telefone,
          email: candidato.email,
          imagem: await fetchImagemUsuario(candidato.id),
        }))
      )
    : [{ nome: "Nenhum candidato", telefone: "Nenhum candidato" }];

  setCandidatos(data);
};

  const fetchInformacoesUsuario = async (id) => {
    const response = await axios.get(`http://localhost:8080/dados/informacoes/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      validateStatus: (status) => status <= 500,
    });

    if (JSON.stringify(response.data).includes("JWT expired at")) {
      setShowModal(true);
      return;
    }

    
    if(response.status === 200){
      setNomeCandidato(response.data.nome);
      setEmailCandidato(response.data.email);
      setTelefoneCandidato(response.data.telefone);
      setCpfCandidato(response.data.cpf);
      setDataNascimentoCandidato(response.data.dataNascimento);
      setEnderecosCandidato(response.data.enderecos);
      setVulnerabilidadesCandidato(response.data.vulnerabilidades);
      setShowModalInformacoesUsuario(true);
    }


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
      <div className="modal-container fixed inset-0 flex items-center justify-center z-50">
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

  const modalInformacoesUsuario = () => {
    return (
      <div className="modal-container fixed inset-0 flex items-center justify-center z-50">
        <div className="overlay fixed inset-0 bg-black opacity-50 overflow-auto"></div>
        <div className="modal flex
        w-[90%]
        md:w-[50%]
        xl:w-[30%]
        dark:bg-gray-800
        
        flex-col items-center justify-center gap-4 p-4 bg-white shadow-2xl rounded-md border-2 z-10">
          <h1 className="titulo-modal text-2xl font-bold
            dark:text-white
          ">Dados de {nomeCandidato}</h1>
          <button
            className="botao-modal bg-blue-800 text-white p-2 rounded-md"
            onClick={() => {
              setShowModalInformacoesUsuario(false);
            }}
          >
            Fechar
          </button>
  
          <div className="informacoes-usuario flex flex-col gap-4">
            <div className="imagem-usuario">
              <img src={imagemCandidato} alt="Imagem do usuário" className="w-20 h-20 rounded-full" />
            </div>
  
            <div className="dados-usuario flex flex-col gap-4">
              <p className="paragrafo-modal text-blue-800 font-bold
                dark:text-blue-400
              ">Nome: {nomeCandidato}</p>
              <p className="paragrafo-modal text-blue-800 font-bold
                dark:text-blue-400
              ">Email: {emailCandidato}</p>
              <p className="paragrafo-modal text-blue-800 font-bold
                dark:text-blue-400
              ">Telefone: {telefoneCandidato}</p>
              <p className="paragrafo-modal text-blue-800 font-bold
                dark:text-blue-400
              ">CPF: {cpfCandidato ? cpfCandidato : "Não informado"}</p>
              <p className="paragrafo-modal text-blue-800 font-bold
                dark:text-blue-400
              ">Data de Nascimento: {dataNascimentoCandidato}</p>
              <p className="paragrafo-modal text-blue-800 font-bold
                dark:text-blue-400
              ">Endereços:</p>
              <ul className="lista-enderecos flex flex-col h-12 overflow-auto">

                {enderecosCandidato && enderecosCandidato.length > 0 ? (
                  enderecosCandidato.map((endereco, index) => (
                    <li key={index} className="item-endereco">
                      {endereco.rua}, {endereco.numero} - {endereco.cidade} - {endereco.estado} - {endereco.cep}
                    
                    </li>
                  ))
                ) : (
                  <li className="item-endereco
                dark:text-blue-400
                   dark:font-bold
                  ">Nenhum endereço cadastrado</li>
                )}
              </ul>
              <p className="paragrafo-modal text-blue-800 font-bold
                dark:text-blue-400
              ">Vulnerabilidades:</p>
              <ul className="lista-vulnerabilidades flex flex-col h-12 overflow-auto">
                {vulnerabilidadesCandidato && vulnerabilidadesCandidato.length > 0 ? (
                  vulnerabilidadesCandidato.map((vulnerabilidade, index) => (
                    <li key={index} className="item-vulnerabilidade">
                      {vulnerabilidade.nome}
                    </li>
                  ))
                ) : (
                  <li className="item-vulnerabilidade
                dark:text-blue-400
                     dark:font-bold
                  ">Nenhuma vulnerabilidade cadastrada</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <SideBar visible={visible} setVisible={setVisible} />
      {showModal && modal()}
      {showModalInformacoesUsuario && modalInformacoesUsuario()}
      <header className="header-dashboard flex flex-row w-full shadow-xl p-2 items-center
        dark:bg-gray-800
      ">
        <button
          className="abrir-side-bar hover:text-gray-300"
          onClick={() => setVisible(true)}
        >

          {!isDarkMode ? <box-icon name="menu" size="lg"></box-icon> : <box-icon name="menu" size="lg" color='#ffffff'></box-icon>}
        </button>

        <h1 className="titulo-dashboard text-blue-800 text-2xl flex justify-center items-center font-bold m-auto
          dark:text-white
        ">
          Gerenciar Candidatos
          <ThemeSwitcher />
        </h1>

        <div className="selecionar-vaga">
          <label className="flex flex-row items-center gap-2">
            Selecione a vaga
            <select
              name="vagas"
              id="vagas"
              className="bg-white border-2 border-blue-500 rounded-md p-2
                dark:bg-gray-800
              "
              onChange={handleMudarVaga}
            >
              {vagaTitulos.map((vaga,index) => (
                <option value={vaga.id} key={vaga.id}>
                  {index} - {vaga.titulo}
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

            <button className="bg-blue-800 text-white p-2 rounded-md">Filtrar</button>
          </div>

          <div className="lista-de-candidatos">
    <h2 className="text-blue-800 font-bold text-2xl text-center m-4">Candidatos</h2>
    <div className="candidatos-lista flex flex-col gap-2">
            
            {candidatos.map((candidato, index) => (
                <div
                className="candidato-card flex flex-row items-center justify-around md:justify-between p-4"
                key={candidato.id}
              >
                <img
                  src={candidato.imagem}
                  alt="Imagem do candidato"
                  className="candidato-imagem w-20 h-20 rounded-full"
                />
                <div className="candidato-info flex flex-col gap-2">
                  <h3 className="candidato-nome text-blue-800 font-bold text-lg
                    dark:text-blue-300
                  ">
                    {candidato.nome}
                  </h3>
                  <p className="candidato-email text-blue-800
                    dark:text-blue-300
                    ">{candidato.email}</p>
                  <p className="candidato-telefone text-blue-800
                    dark:text-blue-300
                  ">{candidato.telefone}</p>
                </div>

                <div className="botao-acao-candidato">
                <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="bordered" 
          color="primary"
          className="dark:text-white"
        >
          Ações
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dropdown menu with icons">

      <DropdownItem
          key="new"
          color="secondary"
          onClick={() => fetchInformacoesUsuario(candidato.id)}
        >
            <div className="acao-candidato flex flex-row items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {isDarkMode ? <box-icon type='solid' name='user-check' color='#ffffff'></box-icon> : <box-icon type='solid' name='user-check' ></box-icon>}
                <p className="paragrafo-drop font-bold text-black
                  dark:text-white
                ">Informações</p>
            </div>

        </DropdownItem>

        <DropdownItem
          key="new"
          color="primary"
        >
            <div className="acao-candidato flex flex-row items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {isDarkMode ? <box-icon type='solid' name='user-check' color='#ffffff'></box-icon> : <box-icon type='solid' name='user-check' ></box-icon>}
                <p className="paragrafo-drop font-bold text-black
                  dark:text-white
                ">Aprovar</p>
            </div>

        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
        >
            <div className="acao-candidato flex flex-row items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                {isDarkMode ? <box-icon type='solid' name='user-x' color='#ffffff'></box-icon> : <box-icon type='solid' name='user-x' ></box-icon>}

                <p className="paragrafo-drop font-bold text-black
                  dark:text-white
                ">Reprovar</p>
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
      <Footer />
    </>
  );
};

export default Candidatos;
