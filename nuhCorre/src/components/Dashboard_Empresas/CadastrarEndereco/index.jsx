import useDarkMode from "../../../hooks/useDarkMode";
import { useState, useEffect } from "react";
import SideBar from "../SideBar";
import { ModalSessaoExpirada } from "../modals";
import ThemeSwitcher from "../../ThemeSwitcher/ThemeSwitcher";
import { useNavigate } from "react-router-dom";
import Footer from '../../footer/Footer'
import axios from "axios";

import { ModalError } from "../modals";
import { ModalSucesso } from "../modals";
import { ModalConfirmacao } from "../modals";

const CadastrarEndereco = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isDarkMode = useDarkMode();
  const [tituloModal, setTituloModal] = useState("");
  const [descricaoModal, setDescricaoModal] = useState("");

  const [showModals, setShowModals] = useState({
    sessaoExpirada: false,
    error: false,
    sucesso: false,
    confirmacao: false,
  });
  
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

  const [informacoes, setInformacoes] = useState({
    cep: "",
    cidade: "",
    estado: "",
    rua: "",
    numero: "",
  });

  const validaCep = (cep) => {
    return cep.replace(/\D/g, "").length === 8;
    };


    const ConsultarCep = async (cep) => {
        const url = `http://localhost:8080/endereco/consultar-cep/${cep}`;

        const resposta = await axios.get(url, {
            validateStatus: (status) => status <= 500,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (JSON.stringify(resposta.data).includes("JWT expired at")) {
            setShowModal(true);
            return;
        }

        if (resposta.status === 200) {
            const endereco = resposta.data;
            setInformacoes({
                ...informacoes,
                cidade: endereco.localidade,
                estado: endereco.uf,
                rua: endereco.logradouro,
            });
        }

    }

    useEffect(() => {
        if (informacoes.cep.length === 8) {
          ConsultarCep(informacoes.cep);
        }
      }, [informacoes.cep]);

    const handleAutoComplete = (e) => {
        const cep = e.target.value;
        setInformacoes({ ...informacoes, cep: cep });
    };



  const handleCadastrarEndereco = async () => {
    const token = localStorage.getItem("token");

    if (!validaCep(informacoes.cep)) {
        setShowModals(prev => ({ ...prev, error: true }));
        setTituloModal("Erro ao cadastrar endereço");
        setDescricaoModal("CEP inválido");
        return;
    }


    const postData = {
        cep: informacoes.cep,
        cidade: informacoes.cidade,
        estado: informacoes.estado,
        rua: informacoes.rua,
        numero: informacoes.numero,
    };


    const resposta = await axios.post(
      "http://localhost:8080/endereco/cadastrar",
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
        setShowModals(prev => ({ ...prev, sessaoExpirada: true }));
        return;
      }

    if (resposta.status === 201) {
      setShowModals(prev => ({ ...prev, sucesso: true }));
      setTituloModal("Endereço cadastrado com sucesso");
      setDescricaoModal("Endereço cadastrado com sucesso");

    } else {
      setShowModals(prev => ({ ...prev, error: true }));
      setTituloModal("Erro ao cadastrar endereço");
      setDescricaoModal("Erro ao cadastrar endereço");

    }
  };

  return (
    <>
      <SideBar visible={visible} setVisible={setVisible} />
      <ModalSessaoExpirada 
  showModal={showModals.sessaoExpirada} 
  setShowModal={(value) => setShowModals(prev => ({ ...prev, sessaoExpirada: value }))} 
/>
<ModalError 
  showModal={showModals.error} 
  setShowModal={(value) => setShowModals(prev => ({ ...prev, error: value }))}
  Titulo={tituloModal}
  Descricao={descricaoModal}
/>
<ModalSucesso 
  showModal={showModals.sucesso} 
  setShowModal={(value) => setShowModals(prev => ({ ...prev, sucesso: value }))} 
  Titulo={tituloModal}
  Descricao={descricaoModal}
/>

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
          Cadastrar Endereço
          <ThemeSwitcher />
        </h1>
      </header>

    <main className="principal-cadastrar-endereco w-screen h-screen"> 

          <div className="container-cadastrar-endereco flex flex-col gap-4 p-4 shadow-2xl
            dark:bg-gray-800
            bg-gray-100
            mt-8

            md:grid md:grid-cols-2 md:grid-rows-2 gap-4

          ">


            <div className="item-container-endereco flex flex-col items-center">
                <label className="titulo-endereco">CEP</label>
                <input type="text" className="w-full h-12 border-2 rounded-md border-blue-800 p-2" placeholder="Digite o CEP" 
                onChange={(e) => handleAutoComplete(e)}
                value={informacoes.cep}
                />
            </div>

            <div className="item-container-endereco flex flex-col items-center">
                <label className="titulo-endereco">Cidade</label>
                <input type="text" className="w-full h-12 border-2 rounded-md border-blue-800 p-2" placeholder="Digite a cidade" 
                onChange={(e) => setInformacoes({ ...informacoes, cidade: e.target.value })}
                value={informacoes.cidade}
                />
            </div>

            <div className="item-container-endereco flex flex-col items-center flex flex-col items-center">
                <label className="titulo-endereco">Estado</label>
                <select
                    name="Estado"
                    id="seleciona_estado"
                    className="w-full h-12 border-2 rounded-md border-blue-800 p-2"
                    onChange={(e) => setInformacoes({ ...informacoes, estado: e.target.value })}
                    value={informacoes.estado}
                >
                    {estados.map((estado) => (
                    <option 
                    value={estado.code} key={estado.code}>
                        {estado.name}
                    </option>
                    ))}
                </select>

            </div>

            <div className="item-container-endereco flex flex-col items-center">
                <label className="titulo-endereco">Rua</label>
                <input type="text" className="w-full h-12 border-2 rounded-md border-blue-800 p-2" placeholder="Digite a rua" 
                onChange={(e) => setInformacoes({ ...informacoes, rua: e.target.value })}
                value={informacoes.rua}
                />
            </div>

            <div className="item-container-endereco flex flex-col items-center">
                <label className="titulo-endereco">Número</label>
                <input type="text" className="w-full h-12 border-2 rounded-md border-blue-800 p-2" placeholder="Digite o número" 
                onChange={(e) => setInformacoes({ ...informacoes, numero: e.target.value })}
                value={informacoes.numero}
                />
            </div>


          </div>

          <div className="item-container-endereco flex flex-col items-center mt-4">
                <button className="bg-blue-800 text-white font-bold  p-2 rounded-xl w-full"
                onClick={handleCadastrarEndereco}
                >Cadastrar</button>
            </div>
    </main>

    <Footer />

    </>
  );
};

export default CadastrarEndereco;
