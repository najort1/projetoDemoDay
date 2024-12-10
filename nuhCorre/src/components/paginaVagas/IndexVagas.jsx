import Header from "../header/Header";
import Footer from "../footer/Footer";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "boxicons";
import axios from "axios";
import gifSuccess from '../../assets/Sucesso.webm';
import gifError from '../../assets/Error.webm';
import HeaderLogado from "../header/HeaderLogado.jsx";
import {jwtDecode} from "jwt-decode";


export const Vagas = () => {
  const location = useLocation();

  const [vagas, setVagas] = useState(location.state?.vagas || []);
  const [filtros, setFiltros] = useState({
    cargo: "",
    local: "",
  });

  const [retorno, setErro] = useState(
    {
      erro: false,
      sucesso: false,
    }
  );
  const [detalheErro, setDetalheErro] = useState("");
  const [tituloErro, setTitulo] = useState("");
  const [logado, setLogado] = useState(false);

  const getUsuarioLogado = () => {
    const token = localStorage.getItem("token");
    if(!token){
      return null;
    }

    const decoded = jwtDecode(token);
    setLogado(decoded.cpfUsuario ? true : false);

  }

  useEffect(() => {
    const fetchVagas = async () => {
      try {
        const response = await axios.get("http://localhost:8080/vagas", {
          params: {
            cargo: filtros.cargo,
            local: filtros.local,
          },
        });
        setVagas(response.data);
      } catch (error) {
        console.error("Erro ao buscar vagas:", error);
      }
    };

    fetchVagas();
  }, [filtros]);




  const handleVisualizar = async (vagaId) => {
    try {
      const respostaAPI = await axios.post(
        `http://localhost:8080/vaga/${vagaId}/visualizar`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          validateStatus: (status) => status <= 500,
        }
      );

    } catch (error) {
      console.error("Erro ao visualizar vaga:", error);
    }
  };

        


  const modalError = () => {
    return (
        <div className="modal-error bg-red-700 text-white p-4 rounded-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[25%] flex justify-center flex-col items-center bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-60 gap-4 
        
        
        xl:w-[20%]
        xl:h-[30%]
        md:w-[40%]
        md:h-[20%]
        ">
            
            <video src={gifError} alt="Erro" className="w-20 h-20 flex justify-center items-center" autoPlay playsInline />
            <div className="mensagens-modal flex items-center flex-col">
                <h1 className="titulo-erro font-bold text-xl">{tituloErro}</h1>
                <p className="detalhe-erro font-bold">{detalheErro}</p>

            </div>

            <button onClick={() => setErro(false)} className="btn-fechar-erro bg-white text-black p-2 rounded-md">Fechar</button>


        </div>
    );
  };


  const modalSuccess = () => {
    return (
        <div className="modal-success bg-green-700 text-white p-4 rounded-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[25%] flex justify-center flex-col items-center bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-60 gap-4 
        xl:w-[20%]
        xl:h-[30%]
        md:w-[40%]
        md:h-[20%]

        ">
            <video src={gifSuccess} alt="Sucesso" className="w-20 h-20 flex justify-center items-center" autoPlay playsInline />
            <div className="mensagens-modal flex items-center flex-col"> 
                <h1 className="titulo-sucesso font-bold text-xl">Candidatura realizada</h1>
                <p className="detalhe-sucesso font-bold">Boa sorte!</p>
            </div>
            <button onClick={() => setErro(false)} className="btn-fechar-sucesso bg-white text-black p-2 rounded-md">Fechar</button>

        </div>
    );
};
  

  const handleCandidatarse = async (vagaId) => {

    if(!localStorage.getItem("token") || localStorage.getItem("token") === "" || localStorage.getItem("token") === null){
      setErro({ erro: true, sucesso: false });
      setDetalheErro("Realize login para candidatar-se");
      setTitulo("Erro ao candidatar-se");
      return;
    }

    try {
      const respostaAPIVisualizar = await axios.post(
        `http://localhost:8080/vaga/${vagaId}/visualizar`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          validateStatus: (status) => status <= 500,
        }
      );

      const respostaAPI = await axios.post(
        `http://localhost:8080/vaga/${vagaId}/candidatar`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          validateStatus: (status) => status <= 500,
        }
      );

      const respostaString = JSON.stringify(respostaAPI.data);

      if(respostaString.includes('JWT expired at')){
        setErro({ erro: true, sucesso: false });
        setDetalheErro("Sessão expirada, realize login novamente");
        setTitulo("Erro ao candidatar-se");
        localStorage.removeItem("token");
        return;
      }else if(respostaString.includes('Usuário não autenticado')){
        setErro({ erro: true, sucesso: false });
        setDetalheErro("Empresas não podem candidatar-se");
        setTitulo("Erro ao candidatar-se");
        return;
      }

      if (respostaAPI.status === 200) {
        setErro({ erro: false, sucesso: true });
        setDetalheErro("Candidatura realizada com sucesso!");
        setTitulo("Candidatura realizada");
      } else if (respostaString.includes("JWT strings must contain exactly")) {
        setErro({ erro: true, sucesso: false });
        setDetalheErro("Realize login para candidatar-se");
        setTitulo("Erro ao candidatar-se");
      }else if (respostaString.includes('já está na lista de candidatos')){
        setErro({ erro: true, sucesso: false });
        setDetalheErro("Usuário já está na lista de candidatos");
        setTitulo("Erro ao candidatar-se");
      } 
      else {
        setErro({ erro: true, sucesso: false });
        setDetalheErro("Erro ao candidatar-se");
        setTitulo("Erro ao candidatar-se");
      }
    } catch (error) {
      setErro({ erro: true, sucesso: false });
      setDetalheErro("Erro ao candidatar-se");
      setTitulo("Erro ao candidatar-se");
      console.error("Erro ao candidatar-se:", error);
    }
  };

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prevFiltros) => ({
      ...prevFiltros,
      [name]: value,
    }));
  };

  return (
    <>
      {retorno.erro && modalError()}
      {retorno.sucesso && modalSuccess()}
      {logado ? <HeaderLogado /> : <Header />}

      <main className="secao-vagas">
        <div
          className="navbar-topo flex flex-col shadow-xl p-4 gap-2
                
                md:flex-row md:justify-evenly md:items-center
                

                "
        >
          <input
            type="text"
            name="cargo"
            placeholder="Vaga"
            className="cargo-vaga h-14 rounded-md p-2 border-2 border-blue-800 md:w-1/2"
            value={filtros.cargo}
            onChange={handleFiltroChange}
          />
          <input
            type="text"
            name="local"
            placeholder="Local"
            className="local-vaga h-14 rounded-md p-2 border-2 border-blue-800 md:w-1/2"
            value={filtros.local}
            onChange={handleFiltroChange}
          />
        </div>

        <div className="vagas flex flex-col gap-4 p-4">
          {vagas.map((vaga) => (
            <div
              key={vaga.id}
              className="vaga bg-white p-6 shadow-xl rounded-lg flex flex-col gap-4
                        
                        dark:bg-gray-800 dark:text-white dark:border-gray-800 dark:shadow-lg dark:border-2 dark:border-gray-800
                        md:w-[70%]
                        md:mx-auto
                        xl:w-[40%]

                        "
            >
              <h1
                className="titulo-vaga font-bold text-[#718CB3] text-xl border-blue-800 text-center shadow-sm
                                md:text-left
                                md:text-2xl


                            "
              >
                {vaga.titulo}
              </h1>

              <div className="empresa-salario-tipo flex flex-col gap-1">
                <p className="empresa text-md dark:text-white dark:font-semibold">
                  {vaga.empresa.nome} - {vaga.endereco.cidade} ,{" "}
                  {vaga.endereco.estado}
                </p>
                <p className="salario text-md dark:text-white dark:font-semibold">
                  R$ {vaga.salario} - Carga horaria: {vaga.cargaHoraria}
                </p>
              </div>

              <div className="descricao-da-vaga">
                <p
                  className="descricao text-md border-1 border-blue-800 overflow-auto h-24 w-full bg-gray-200 text-center p-1 rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-800 dark:font-semibold
                                dark:border-blue-800

            
                                "
                >
                  {vaga.descricao}
                </p>
              </div>

              <div className="bota-candidatar-se">
                <button
                  onMouseEnter={() => handleVisualizar(vaga.id)}
                  onClick={() => handleCandidatarse(vaga.id)}
                  className="btn-candidatar bg-[#718CB3] text-white p-2 rounded-md w-full flex items-center flex-row justify-center gap-4"
                >
                  <box-icon name="briefcase" color="#ffffff"></box-icon>{" "}
                  Candidatar-se
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
};
