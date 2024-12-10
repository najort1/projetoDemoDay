import Footer from "../footer/Footer";
import Header from "../header/Header";
import "./empressaEdicao.css";
import "./caixasEdicoes.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import SideBar from "../Dashboard_Empresas/SideBar";
import useDarkMode from "../../hooks/useDarkMode";

import {ModalConfirmacao} from "../Dashboard_Empresas/modals/index.jsx";
import {ModalError} from "../Dashboard_Empresas/modals/index.jsx";
import {ModalSucesso} from "../Dashboard_Empresas/modals/index.jsx";
import {ModalSessaoExpirada} from "../Dashboard_Empresas/modals/index.jsx";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher.jsx";

export function EdicaoEmpressa() {
  const imgPadrao =
    "https://i.pinimg.com/enabled_lo_mid/736x/5c/95/31/5c9531d05f919414e9dff0c974388f67.jpg";
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar se estamos no modo de edição
  const [isPhotoEditing, setIsPhotoEditing] = useState(false);
  const [visible, setVisible] = useState(false);
  const isDarkMode = useDarkMode();

  const [photoPerfil, setPhotoPerfil] = useState({
    photo: imgPadrao,
    error: false,
  });

  const [informacoes, setInformacoes] = useState({
    email: "",
    cnpj: "",
    cep: "",
    estado: "",
    setor: "",
    inclusao: "",
    telefone: "",
    logradouro: "",
    cidade: "",
    descricao: "",
    nome: "",
  });
  const [showModals, setShowModals] = useState(
      {
        showModalSessaoExpirada: false,
        showModalError: false,
        showModalSucesso: false,
        showModalConfirmacao: false,
      }
  )

  const [tituloModal, setTituloModal] = useState("");
  const [descricaoModal, setDescricaoModal] = useState("");



  function editPhoto() {
    setIsPhotoEditing(true); // Ativa o modo de edição
  }


  function cancelPhoto() {
    setIsPhotoEditing(false);
  }

  const removePhoto = async () => {
    
    try {

      const response = await axios.delete(
        "http://localhost:8080/imagem/deletar",
        {
          validateStatus: function (status) {
            return status <= 500;
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setPhotoPerfil({ photo: imgPadrao, error: false });
        setShowModals((prev) => ({ ...prev, sucesso: true }));
        setTituloModal("Foto removida com sucesso!");
        setDescricaoModal("Sua foto de perfil foi removida com sucesso.");
      } else {
        setShowModals((prev) => ({ ...prev, error: true }));
        setTituloModal("Erro ao remover a foto!");
        setDescricaoModal("Não foi possível remover sua foto de perfil.");
      }
    } catch (error) {
      console.error(error);
    }


  }

  const handleUploadPhoto = async (e) => {
    e.preventDefault();

    const file = e.target.files[0]; // Acessa o primeiro arquivo selecionado
    if (file) {
      const formData = new FormData();
      formData.append("imagem", file);

      try {
        const respostaApi = await axios.post(
          "http://localhost:8080/imagem/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (respostaApi.status === 200) {
            setShowModals((prev) => ({ ...prev, sucesso: true }));
            setTituloModal("Foto atualizada com sucesso!");
            setDescricaoModal("Sua foto de perfil foi atualizada com sucesso.");
        } else {
            setShowModals((prev) => ({ ...prev, error: true }));
            setTituloModal("Erro ao atualizar a foto!");
            setDescricaoModal("Não foi possível atualizar sua foto de perfil.");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const fetchActualPhoto = async () => {
    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      let cnpj = decoded.cnpjEmpresa;
      cnpj = cnpj.replace(/[^\d]+/g, "");

      const response = await axios.get(
        "http://localhost:8080/imagem/empresa/" + cnpj,
        {
          validateStatus: function (status) {
            return status <= 500;
          },
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = response.data;

      if (response.status === 200) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPhotoPerfil({ photo: reader.result, error: false });
        };
        reader.readAsDataURL(data);
      } else if (response.status === 404) {
        setPhotoPerfil({ photo: imgPadrao, error: true });
      } else {
        console.error(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditarInformacoes = async (e) => {
    e.preventDefault();

    const postData = {
      nome: informacoes.nome,
      telefone: informacoes.telefone,
      descricao: informacoes.descricao,
      categoria: informacoes.setor,
    };

    try {
      const response = await axios.put(
        "http://localhost:8080/dados/empresa/atualizar",
        postData,
        {
          validateStatus: function (status) {
            return status <= 500;
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = response.data;

      if (response.status === 200) {
        setShowModals((prev) => ({ ...prev, sucesso: true }));
        setTituloModal("Informações atualizadas com sucesso!");
        setDescricaoModal("Suas informações foram atualizadas com sucesso.");
      } else {
        setShowModals((prev) => ({ ...prev, error: true }));
        setTituloModal("Erro ao atualizar as informações!");
        setDescricaoModal("Não foi possível atualizar suas informações.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const returnUserInfo = async () => {
    try {
      const response = await axios.get("http://localhost:8080/dados/empresa", {
        validateStatus: function (status) {
          return status <= 500;
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = response.data;

      if (response.status === 200) {
        setInformacoes({
          email: data.email ? data.email : "Email não cadastrado",
          cnpj: data.cnpj ? data.cnpj : "CNPJ não cadastrado",
          cep:
            data.enderecos && data.enderecos[0] && data.enderecos[0].cep
              ? data.enderecos[0].cep
              : "CEP não cadastrado",
          estado:
            data.enderecos && data.enderecos[0] && data.enderecos[0].estado
              ? data.enderecos[0].estado
              : "Estado não cadastrado",
          setor: data.categoria ? data.categoria : "Setor não cadastrado",
          inclusao: "Sim",
          telefone: data.telefone ? data.telefone : "Telefone não cadastrado",
          logradouro:
            data.enderecos && data.enderecos[0]
              ? data.enderecos[0].rua + ", " + data.enderecos[0].numero
              : "Logradouro não cadastrado",
          cidade:
            data.enderecos && data.enderecos[0] && data.enderecos[0].cidade
              ? data.enderecos[0].cidade
              : "Cidade não cadastrada",
          descricao: data.descricao
            ? data.descricao
            : "Descrição não cadastrada",
          nome: data.nome ? data.nome : "Nome não cadastrado",
        });
      } else {
        setInformacoes({
          email: "Email não cadastrado",
          cnpj: "CNPJ não cadastrado",
          cep: "CEP não cadastrado",
          estado: "Estado não cadastrado",
          setor: "Setor não cadastrado",
          inclusao: "Sim",
          telefone: "Telefone não cadastrado",
          logradouro: "Logradouro não cadastrado",
          cidade: "Cidade não cadastrada",
          descricao: "Descrição não cadastrada",
          nome: "Nome não cadastrado",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    returnUserInfo();
    fetchActualPhoto();
  }, []);

  useEffect(() => {
    fetchActualPhoto();
  }, [photoPerfil.photo]);

  return (
      <>
        <ModalSessaoExpirada
            showModal={showModals.sessaoExpirada}
            setShowModal={(value) => setShowModals((prev) => ({...prev, sessaoExpirada: value}))}
        />
        <ModalError
            showModal={showModals.error}
            setShowModal={(value) => setShowModals((prev) => ({...prev, error: value}))}
            Titulo={tituloModal}
            Descricao={descricaoModal}
        />
        <ModalSucesso
            showModal={showModals.sucesso}
            setShowModal={(value) => setShowModals((prev) => ({...prev, sucesso: value}))}
            Titulo={tituloModal}
            Descricao={descricaoModal}
        />
        {/* Adicionando a sobreposição escura quando estamos no modo de edição */}
        {isEditing && <div className="dark-overlay"></div>}
        {isPhotoEditing && <div className="dark-overlay"></div>}

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
            Editar informações
            <ThemeSwitcher/>
          </h1>
        </header>

        <section className="perfil">
          <div className="alinhamentoTitulo">
            <div className="flex flex-row items-center">
              {/* Condicionando a exibição da imagem */}
              <img
                  src={photoPerfil.photo || imgPadrao} // Exibe uma imagem padrão caso a foto seja removida
                  className="foto-perfil"
                  alt="perfilImg"
              />
              <button className="editImagem" onClick={editPhoto}>
                {isDarkMode ? (
                    <box-icon name="edit" type="solid" color="#ffffff"></box-icon>
                ) : (
                    <box-icon name="edit" type="solid" color="#000000"></box-icon>
                )}{" "}
              </button>
            </div>
            <div className="tituloUsuario">
              <>
                <h2 className="editNome">{informacoes.nome}</h2>
              </>

              {isPhotoEditing ? (
                  <div className="editBox boxPhoto">
                    <div className="boxTitle">
                      <h2>Editar Foto</h2>
                      <button onClick={cancelPhoto}>
                        <box-icon type="solid" name="x-circle"></box-icon>
                      </button>
                    </div>

                    <div className="mainBox">
                      <img
                          src={photoPerfil.photo || imgPadrao}
                          className="foto-perfil"
                          alt="perfilImg"
                      />

                      <span id="msgEdit">
                    Use uma foto no perfil para as empresas e pessoas
                    conhece-lo.
                  </span>

                      <div className="btn-group">
                        {/* O input file escondido */}
                        <input
                            type="file"
                            id="fileUpload"
                            onChange={handleUploadPhoto}
                        />
                        {/* Botão personalizado que dispara o input file */}
                        <label htmlFor="fileUpload" className="custom-file-upload">
                          Editar
                        </label>

                        {/* Botão de remover */}
                        <button className="btn btn-warning" onClick={removePhoto}>
                          Remover
                        </button>
                      </div>
                    </div>
                  </div>
              ) : (
                  ""
              )}
            </div>
          </div>
        </section>

        <section id="formEmpresa" className="bg-[#F9FAF] dark:bg-[#313935]">
          <SideBar visible={visible} setVisible={setVisible}/>
          <div className="caixasCentrais">
            <div className="textoLei">
              Seus dados pessoais estarão protegidos, nos termos da Lei
              13.460/2017.
            </div>
            <div className="caixaInterna bg-white dark:bg-[#6a6a6a]">
              <h1 className="dark:text-white">Dados Pessoais</h1>


              {/* Formulário de edição de informações */}
              <form>
                <div>
                  <label htmlFor="email" className="dark:text-white">
                    Email corporativo
                  </label>
                  <input
                      type="email"
                      name="email"
                      className="dark:bg-[#818181]"
                      disabled
                      value={informacoes.email}
                      onChange={(e) =>
                          setInformacoes({...informacoes, email: e.target.value})
                      }
                  />

                  <label htmlFor="cnpj" className="dark:text-white">
                    CNPJ
                  </label>
                  <input
                      type="text"
                      name="cnpj"
                      className="dark:bg-[#818181]"
                      disabled
                      value={informacoes.cnpj}
                      onChange={(e) =>
                          setInformacoes({...informacoes, cnpj: e.target.value})
                      }
                  />

                  <label htmlFor="telefone" className="dark:text-white">
                    Setor
                  </label>
                  <input
                      type="text"
                      name="setor"
                      className="dark:bg-[#818181]"
                      value={informacoes.setor}
                      onChange={(e) =>
                          setInformacoes({...informacoes, setor: e.target.value})
                      }
                  />

                  <label htmlFor="cep" className="dark:text-white">
                    CEP
                  </label>
                  <input
                      type="text"
                      name="cep"
                      className="dark:bg-[#818181]"
                      value={informacoes.cep}
                      onChange={(e) =>
                          setInformacoes({...informacoes, cep: e.target.value})
                      }
                  />

                  <label htmlFor="estado">Estado</label>
                  <input
                      type="text"
                      name="estado"
                      value={informacoes.estado}
                      onChange={(e) =>
                          setInformacoes({...informacoes, estado: e.target.value})
                      }
                  />

                  <div id="botoes">
                    <input
                        type="submit"
                        value="Salvar informações"
                        onClick={handleEditarInformacoes}
                        className="bg-[#718CB3] h-[64px] w-24 border-0 focus:outline-none
                                     transition-all duration-300 ease-in-out transform hover:scale-105"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="logradouro">Logradouro</label>
                  <input
                      type="text"
                      name="logradouro"
                      className="dark:bg-[#818181]"
                      value={informacoes.logradouro}
                      onChange={(e) =>
                          setInformacoes({
                            ...informacoes,
                            logradouro: e.target.value,
                          })
                      }
                  />

                  <label htmlFor="cidade" className="dark:text-white">
                    Cidade
                  </label>
                  <input
                      type="text"
                      name="cidade"
                      className="dark:bg-[#818181]"
                      value={informacoes.cidade}
                      onChange={(e) =>
                          setInformacoes({...informacoes, cidade: e.target.value})
                      }
                  />

                  <label htmlFor="descricao" className="dark:text-white">
                    Descrição da Empresa
                  </label>
                  <textarea
                      name="descricao"
                      className="dark:bg-[#818181]"
                      cols={55}
                      rows={10}
                      value={informacoes.descricao}
                      onChange={(e) =>
                          setInformacoes({
                            ...informacoes,
                            descricao: e.target.value,
                          })
                      }
                  ></textarea>
                </div>
              </form>
            </div>
          </div>
        </section>
        <Footer/>
      </>
  );
}
