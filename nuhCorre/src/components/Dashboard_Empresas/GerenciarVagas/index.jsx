import useDarkMode from "../../../hooks/useDarkMode";
import { useState, useEffect } from "react";
import SideBar from "../SideBar";
import ThemeSwitcher from "../../ThemeSwitcher/ThemeSwitcher";
import { useNavigate } from "react-router-dom";
import Footer from "../../footer/Footer";
import axios from "axios";

import { ModalSessaoExpirada } from "../modals";
import { ModalError } from "../modals";
import { ModalSucesso } from "../modals";

const GerenciarVagas = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [showModalEditarVaga, setShowModalEditarVaga] = useState(false);
  const isDarkMode = useDarkMode();
  const [vagas, setVagas] = useState([]);
  const [vagaSelecionada, setVagaSelecionada] = useState(null);
  const [endereco, setEndereco] = useState([]);

  const [tituloModal, setTituloModal] = useState("");
  const [descricaoModal, setDescricaoModal] = useState("");

  const [showModals, setShowModals] = useState({
    sessaoExpirada: false,
    error: false,
    sucesso: false,
  });


  const handleDeletarVaga = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/vaga/deletar/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Vaga deletada com sucesso");
        fetchAllVagas();
      } else {
        alert("Erro ao deletar vaga");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSalvarVaga = async (vagaAtualizada) => {
    try {

      console.log(vagaAtualizada);

      const postData = {
  
          "titulo": vagaAtualizada.titulo,
          "descricao": vagaAtualizada.descricao,
          "requisitos": vagaAtualizada.requisitos,
          "beneficios": vagaAtualizada.beneficios,
          "salario": vagaAtualizada.salario,
          "cargaHoraria": vagaAtualizada.cargaHoraria,
          "dataExpiracao": vagaAtualizada.dataExpiracao,
          "enderecoId": vagaAtualizada.endereco,
          "status": vagaAtualizada.status
        
      }

      const response = await axios.post(
        `http://localhost:8080/vaga/atualizar/${vagaAtualizada.id}`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          validateStatus: function (status) {
            return status <= 500; // Resolve only if the status code is less than 500
          },
        }
      );
      if (response.status === 200) {
        alert("Vaga atualizada com sucesso!");
        fetchAllVagas();
      } else {
        alert("Erro ao atualizar vaga");
      }
    } catch (error) {
      console.error(error);
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

  const fetchAllVagas = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/vaga/minhas-vagas",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          validateStatus: function (status) {
            return status <= 500; // Resolve only if the status code is less than 500
          },
        }
      );

      if (JSON.stringify(response.data).includes("JWT expired at")) {
        setShowModal(true);
        return;
      }

      if (response.status === 200) {
        setVagas(response.data);
      } else {
        alert("Erro ao buscar vagas");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllVagas();
    fetchAllAddresses();
  }, []);

  const handleEditarVaga = (vaga) => {
    setVagaSelecionada(vaga);
    setShowModalEditarVaga(true);
  };

  const ModalEditarVaga = ({ show, onClose, vaga, onSave }) => {
    const [formData, setFormData] = useState(vaga);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
      onSave(formData);
      onClose();
    };

    if (!show) return null;


    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        role="dialog"
        aria-modal="true"
      >
        <div className="bg-white dark:bg-gray-900 w-11/12 max-w-lg rounded-lg shadow-lg p-6 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-blue-800 dark:text-white text-center">
            Editar Vaga
          </h2>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleInputChange}
              placeholder="Título da Vaga"
              className="border rounded-md p-2 dark:bg-gray-700 dark:text-white"
            />
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleInputChange}
              placeholder="Descrição"
              rows="4"
              
              className="border rounded-md p-2 dark:bg-gray-700 dark:text-white resize-none"
            ></textarea>
            <input
              type="text"
              name="requisitos"
              value={formData.requisitos}
              onChange={handleInputChange}
              placeholder="Requisitos"
              className="border rounded-md p-2 dark:bg-gray-700 dark:text-white"
            />
            <input
              type="text"
              name="beneficios"
              value={formData.beneficios}
              onChange={handleInputChange}
              placeholder="Benefícios"
              className="border rounded-md p-2 dark:bg-gray-700 dark:text-white"
            />
            <input
              type="number"
              name="salario"
              value={formData.salario}
              onChange={handleInputChange}
              placeholder="Salário"
              className="border rounded-md p-2 dark:bg-gray-700 dark:text-white"
            />
            <input
              type="text"
              name="cargaHoraria"
              value={formData.cargaHoraria}
              onChange={handleInputChange}
              placeholder="Carga Horária"
              className="border rounded-md p-2 dark:bg-gray-700 dark:text-white"
            />

            <select name="status" value={formData.status} onChange={handleInputChange} className="border rounded-md p-2 dark:bg-gray-700 dark:text-white">
              <option value={true}>Ativa</option>
              <option value={false}>Inativa</option>
            </select>

            <select name="endereco" value={formData.endereco.id} onChange={handleInputChange} className="border rounded-md p-2 dark:bg-gray-700 dark:text-white">
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
              }
              )}
            </select>

          </form>
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <SideBar visible={visible} setVisible={setVisible} />

      <ModalEditarVaga
        show={showModalEditarVaga}
        onClose={() => setShowModalEditarVaga(false)}
        vaga={vagaSelecionada}
        onSave={handleSalvarVaga}
      />

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
        className="header-dashboard flex flex-row w-full shadow-xl p-2 items-center dark:bg-gray-800"
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
          className="titulo-dashboard text-blue-800 text-2xl flex justify-center items-center font-bold m-auto dark:text-white"
        >
          Gerenciar Vagas
          <ThemeSwitcher />
        </h1>
      </header>

      <main className="main-gerenciar-vagas w-screen h-screen p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {vagas.map((vaga) => (
            <div
              key={vaga.id}
              className="vaga-card bg-white p-4 rounded-md shadow-sm bg-gray-200 dark:bg-gray-800 flex flex-col gap-1"
            >
              <h2 className="text-xl font-bold text-blue-800 text-center">
                {vaga.titulo}
              </h2>
              <hr></hr>
              <p className="text-blue-600 font-bold overflow-auto h-24 text-center">
                {vaga.descricao}
              </p>
              <hr></hr>
              <p className="text-blue-600 font-bold">
                Requisitos: {vaga.requisitos}
              </p>
              <p className="text-blue-600 font-bold">Benefícios: {vaga.beneficios}</p>
              <p className="text-blue-600 font-bold">Salário: {vaga.salario}</p>
              <p className="text-blue-600 font-bold">
                Carga Horária: {vaga.cargaHoraria}
              </p>
              <p className="text-blue-600 font-bold">
                Data de Cadastro: {vaga.dataCadastro}
              </p>
              <p className="text-blue-600 font-bold">
                Data de Expiração: {vaga.dataExpiracao}
              </p>
              <p className="text-blue-600 font-bold">
                Status: {vaga.status ? "Ativa" : "Inativa"}
              </p>
              <p className="text-blue-600 font-bold">
                Endereço: {vaga.endereco.rua}, {vaga.endereco.numero},{" "}
                {vaga.endereco.cidade} - {vaga.endereco.estado}
              </p>

              <div className="botoes-acoes-vagas flex flex-row justify-evenly gap-4">
                <button
                  className="bg-blue-800 text-white p-2 rounded-md mt-4 w-1/2"
                  onClick={() => handleEditarVaga(vaga)}
                >
                  Editar
                </button>

                <button
                  className="bg-red-800 text-white p-2 rounded-md mt-4 w-1/2"
                  onClick={() => handleDeletarVaga(vaga.id)}
                >
                  Deletar
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default GerenciarVagas;