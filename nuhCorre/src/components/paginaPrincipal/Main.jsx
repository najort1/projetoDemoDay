import { useState, useEffect } from "react";
import "./mainStyle.css";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { Vagas } from "../paginaVagas/IndexVagas";
import { Sobre } from "../paginaSobre/sobre";
import { Navigate, useNavigate } from "react-router-dom";




export const PesquisaVagaTelaInicial = () => {
  // Estados dos campos com valores padrão
  const [tipo, setTipo] = useState("Vagas");
  const [estado, setCidade] = useState("PE");
  const [pesquisa, setPesquisa] = useState("");
  const [vagas, setVagas] = useState([]);
  const [pesquisou, setPesquisou] = useState(false);

  const navigate = useNavigate();
  

  const handlePesquisaVaga = async () => {

    if (tipo === "Vagas" && pesquisa === "") {
      const vagas = await fetchAllVagas();
      setVagas(vagas);
      setPesquisou(true);
      navigate('/vagas', { state: { vagas } });
    }else if (tipo === "Vagas" && pesquisa !== "" && estado === "PE") {
      const vagas = await fetchVagasPorTitulo();
      setVagas(vagas);
      setPesquisou(true);
      navigate('/vagas', { state: { vagas } });
    }else if (tipo === "Vagas" && pesquisa !== "" && estado !== "PE") {
      const vagas = await fetchVagasPorTituloEEstado();
      setVagas(vagas);
      setPesquisou(true);
      navigate('/vagas', { state: { vagas } });
    }else{
      navigate('/');
    }

  };
  


  const fetchAllVagas = async () => {
    const resposta = await axios.get("http://localhost:8080/vaga/buscar/todas", {
      validateStatus: (status) => status <= 500,
    });
  
    if (resposta.status === 200) {
      return resposta.data; // Retorna os dados
    } else {
      console.log("Erro ao buscar vagas");
      return [];
    }
  };
  
  const fetchVagasPorTitulo = async () => {
    const resposta = await axios.get(`http://localhost:8080/vaga/buscar/titulo/${pesquisa}`, {
      validateStatus: (status) => status <= 500,
    });
  
    if (resposta.status === 200) {
      return resposta.data;
    } else {
      console.log("Erro ao buscar vagas");
      return [];
    }
  };
  
  const fetchVagasPorTituloEEstado = async () => {
    const resposta = await axios.get(
      `http://localhost:8080/vaga/buscar/estado/${estado}/titulo/${pesquisa}`,
      { validateStatus: (status) => status <= 500 }
    );
  
    if (resposta.status === 200) {
      return resposta.data;
    } else {
      console.log("Erro ao buscar vagas");
      return [];
    }
  };
  


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
    console.log(value)
    setCidade(value);
  };

  const estados = [
    { name: 'Acre', code: 'AC' },
    { name: 'Alagoas', code: 'AL' },
    { name: 'Amapá', code: 'AP' },
    { name: 'Amazonas', code: 'AM' },
    { name: 'Bahia', code: 'BA' },
    { name: 'Ceará', code: 'CE' },
    { name: 'Distrito Federal', code: 'DF' },
    { name: 'Espírito Santo', code: 'ES' },
    { name: 'Goiás', code: 'GO' },
    { name: 'Maranhão', code: 'MA' },
    { name: 'Mato Grosso', code: 'MT' },
    { name: 'Mato Grosso do Sul', code: 'MS' },
    { name: 'Minas Gerais', code: 'MG' },
    { name: 'Pará', code: 'PA' },
    { name: 'Paraíba', code: 'PB' },
    { name: 'Paraná', code: 'PR' },
    { name: 'Pernambuco', code: 'PE' },
    { name: 'Piauí', code: 'PI' },
    { name: 'Rio de Janeiro', code: 'RJ' },
    { name: 'Rio Grande do Norte', code: 'RN' },
    { name: 'Rio Grande do Sul', code: 'RS' },
    { name: 'Rondônia', code: 'RO' },
    { name: 'Roraima', code: 'RR' },
    { name: 'Santa Catarina', code: 'SC' },
    { name: 'São Paulo', code: 'SP' },
    { name: 'Sergipe', code: 'SE' },
    { name: 'Tocantins', code: 'TO' }
  ];

  // Adicionar animação ao carregar a página
  useEffect(() => {
    document.querySelector('.container').classList.add('fade-in');
  }, []);

  return (
    <>
      
      <Header />

      {/* Div das fotos de fundo */}
      <div className="fotos w-full min-h-screen"></div>

      <div
        className="container absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#AAB9CE]
        w-[100%] flex flex-col justify-evenly shadow-2xl rounded-xl xl:w-[57%] xl:h-[40%] md:w-[80%] fade-in">

        {/* Caixa de titulo */}
        <div className="titulo-container flex flex-col items-center gap-2">
          <h1 className="dark:text-white titulo-container-principal font-bold text-md text-center text-3xl text-white">
            Conecte-se com Empregos Acessíveis para Todos
          </h1>
        </div>

        <div className="container-inputs">
          {/* Select Tipo */}
          <select
            name="Tipo"
            id="selecionado_tipo"
            className="opcoes-tipo h-[64px] rounded-[5px] transition-all duration-300 ease-in-out 
                    focus:ring-2 focus:ring-[#1797f5] border-0 focus:outline-none"
            onChange={handleTipo}
          >
            <option value="Vagas">Vagas</option>
            <option value="Empresas">Empresas</option>
          </select>

          {/* Input Pesquisa */}
          <input
            type="text"
            className="input-pesquisa h-[64px] w-full rounded-[5px] px-[5px] border-0 focus:outline-none
                    focus:border-b-4 focus:border-b-[#1797f5] transition-all duration-300 ease-in-out"
            placeholder="Pesquisa"
            onChange={handlePesquisa}
          />
        <select
          name="Estado"
          id="seleciona_estado"
          className="selecionar-estado h-[64px] rounded-[5px] border-0 focus:outline-none focus:ring-2
                          focus:ring-[#1797f5] transition-all duration-300 ease-in-out"
          onChange={handleSelectCidade}
        >
          {estados.map((estado) => (
            <option value={estado.code} key={estado.code}>
              {estado.name}
            </option>
          ))}
        </select>


          {/* Botão de Pesquisa */}
          <Button
            isIconOnly
            className="botao-pesquisar md:w-1/5 bg-[#718CB3] flex items-center justify-center w-[100%] h-[64px] border-0 focus:outline-none transition-all duration-300 ease-in-out transform hover:scale-105"
            onClick={handlePesquisaVaga}
          >
            <box-icon name="search" color="white"></box-icon>
          </Button>
        </div>

      </div>
      
      <Sobre />
      <Footer/>
    </>
  );
};
