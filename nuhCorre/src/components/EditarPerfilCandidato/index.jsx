import Footer from "../footer/Footer";
import Header from "../header/Header";
import { useState, useEffect } from 'react';
import "./style.css";

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import useDarkMode from "../../hooks/useDarkMode";
import validarCPF from "../../hooks/ValidaCPF";
import { validarTelefone } from "../../hooks/ValidarCelular";
import HeaderLogado from "../header/HeaderLogado.jsx";

import {ModalConfirmacao} from "../Dashboard_Empresas/modals/index.jsx";
import {ModalError} from "../Dashboard_Empresas/modals/index.jsx";
import {ModalSucesso} from "../Dashboard_Empresas/modals/index.jsx";
import {ModalSessaoExpirada} from "../Dashboard_Empresas/modals/index.jsx";
import { useNavigate } from "react-router-dom";

export default function EditarPerfilCandidato() {

    const imgPadrao = "https://i.pinimg.com/enabled_lo_mid/736x/5c/95/31/5c9531d05f919414e9dff0c974388f67.jpg";
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar se estamos no modo de edição
  const [isPhotoEditing, setIsPhotoEditing] = useState(false);
  const isDarkMode = useDarkMode();
  const [vulnerabilidadesApi, setVulnerabilidadesApi] = useState([]);

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

  const [photoPerfil, setPhotoPerfil] = useState({
    photo: imgPadrao,
    error: false,
  });

  const [informacoes, setInformacoes] = useState({
    email: "",
    nome: "",
    cpf: "",
    telefone: "",
    nascimento: "",
    vulnerabilidades: [],
  });

  const [errosInputs, setErrosInputs] = useState({
    cpf: "",
    telefone: "",
  });


    function editPhoto() {
        setIsPhotoEditing(true); // Ativa o modo de edição
    }


    const handleValidarCpf = (e) => {

      if (e.target.value.length > 0) {
        if (!validarCPF(e.target.value)) {
          setErrosInputs({ ...errosInputs, cpf: "CPF inválido" });
        } else {
          setErrosInputs({ ...errosInputs, cpf: "" });
        }
      } else {
        setErrosInputs({ ...errosInputs, cpf: "" });
      }

      setInformacoes({ ...informacoes, cpf: e.target.value });
      console.log(informacoes)


    };

    const handleValidarTelefone = (e) => {
      if (e.target.value.length > 0) {
        if (!validarTelefone(e.target.value)) {
          setErrosInputs({ ...errosInputs, telefone: "Telefone inválido" });
        } else {
          setErrosInputs({ ...errosInputs, telefone: "" });
        }
      } else {
        setErrosInputs({ ...errosInputs, telefone: "" });
      }

      setInformacoes({ ...informacoes, telefone: e.target.value });
      console.log(informacoes)
    };

    // Função chamada quando o botão "Salvar" é clicado
    function altSub(e) {
        e.preventDefault(); // Previne o comportamento padrão do formulário
        setIsEditing(false); // Desativa o modo de edição após salvar
    }

    // Função chamada quando o botão "Cancelar" é clicado
    function altCancel() {
        setIsEditing(false); // Desativa o modo de edição após cancelar
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
        } else {
          console.error(response.data);
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
            setPhotoPerfil({ photo: URL.createObjectURL(file), error: false });
          } else {
            console.error(respostaApi.data);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    const fetchVulnerabilidades = async () => {

      try {
        const response = await axios.get(
          "http://localhost:8080/vulnerabilidades/listar",
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
          setVulnerabilidadesApi(data);
        } else {
          console.error(data);
        }
      } catch (error) {
        console.error(error);
      }
      
    }
  
    const fetchActualPhoto = async () => {
      try {
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        let cnpj = decoded.usuarioId;
  
        const response = await axios.get(
          "http://localhost:8080/imagem/usuario/" + cnpj,
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

    const atribuirVulnerabilidades = async () => {


      try {
        const response = await axios.post("http://localhost:8080/vulnerabilidades/atribuir-vulnerabilidade", {
          vulnerabilidades: informacoes.vulnerabilidades,
        }, {
          validateStatus: function (status) {
            return status <= 500;
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = response.data;

        if (response.status === 200) {
          setShowModals((prev) => ({ ...prev, sucesso: true }));
          setTituloModal("Dados atualizados com sucesso !");
          setDescricaoModal("Seus dados e vulnerabilidades foram atualizados com sucesso.");
        }else{
            setShowModals((prev) => ({ ...prev, error: true }));
            setTituloModal("Erro ao atualizar vulnerabilidades");
            setDescricaoModal("Ocorreu um erro ao atualizar suas vulnerabilidades. Tente novamente mais tarde.");
        }


      } catch (error) {
        console.error(error);
      }


    }

  
    const handleEditarInformacoes = async (e) => {
      e.preventDefault();
      
      const postData = {
        cpf: informacoes.cpf,
        telefone: informacoes.telefone,
      };
  
      try {
        const response = await axios.put(
          "http://localhost:8080/dados/usuario/atualizar",
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
          atribuirVulnerabilidades();

        } else {
          console.error(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    const returnUserInfo = async () => {
      try {
        const response = await axios.get("http://localhost:8080/dados/usuario", {
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
          nome: data.nome ? data.nome : "Nome não cadastrado",
          cpf: data.cpf ? data.cpf : "CPF não cadastrado",
          telefone: data.telefone ? data.telefone : "Telefone não cadastrado",
          nascimento: data.dataNascimento ? data.dataNascimento : "Data de nascimento não cadastrada",
          vulnerabilidades: data.vulnerabilidades ? data.vulnerabilidades : []
        });

    } else {
          setInformacoes({
            email: "Email não cadastrado",
            nome: "Nome não cadastrado",
            cpf: "CPF não cadastrado",
            telefone: "Telefone não cadastrado",
            nascimento: "Data de nascimento não cadastrada",
            vulnerabilidades: ['Nenhuma vulnerabilidade cadastrada'],
          });
        }
      setShowModals((prev) => ({ ...prev, showModalSessaoExpirada: true }));



    } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      returnUserInfo();
      fetchActualPhoto();
      fetchVulnerabilidades();
    }, []);


    useEffect(() => {
      fetchActualPhoto();
    }, [photoPerfil.photo]);
  
    return (
        <>
          <HeaderLogado/>
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

          <ModalConfirmacao
              showModal={showModals.showModalConfirmacao}
              setShowModal={(value) => setShowModals((prev) => ({...prev, showModalConfirmacao: value}))}
              Titulo={tituloModal}
              Descricao={descricaoModal}
          />

          {/* Adicionando a sobreposição escura quando estamos no modo de edição */}
          {isEditing && <div className="dark-overlay"></div>}
          {isPhotoEditing && <div className="dark-overlay"></div>}

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
                {/* Exibe o nome e profissão ou a caixa de edição */}
                {isEditing ? (
                    <div className="editBoxNome editBox">
                      <form onSubmit={altSub}>
                        <h2>Editar</h2>
                        <label htmlFor="nome">Nome</label>
                        <input
                            type="text"
                            name="nome"
                            value={informacoes.nome}
                            onChange={(e) =>
                                setInformacoes({...informacoes, nome: e.target.value})
                            }
                            className="input-pesquisa h-[64px] w-full rounded-[5px] px-[5px] focus:outline-none
                                          focus:border-b-4 focus:border-b-[#1797f5] transition-all duration-300 ease-in-out"
                        />
                        <div className="botoes">
                          <input
                              type="submit"
                              className='submitCancel "bg-[#718CB3] h-[64px] w-24 border-0 focus:outline-none
                                          transition-all duration-300 ease-in-out transform hover:scale-105"'
                              value="Salvar"
                          />

                          <input
                              type="button"
                              onClick={altCancel}
                              className='submitCancel "bg-[#718CB3] h-[64px] w-24 border-0 focus:outline-none
                                          transition-all duration-300 ease-in-out transform hover:scale-105"'
                              value="Cancelar"
                          />
                        </div>
                      </form>
                    </div>
                ) : (
                    ""
                )}
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
                        className="dark:bg-[#818181] w-full h-12"
                        disabled
                        value={informacoes.email}
                        onChange={(e) =>
                            setInformacoes({...informacoes, email: e.target.value})
                        }
                    />

                    <label htmlFor="cnpj" className="dark:text-white">
                      CPF
                    </label>
                    <input
                        type="text"
                        name="cpf"
                        className="dark:bg-[#818181] w-full h-12"
                        value={informacoes.cpf}
                        placeholder={informacoes.cpf}
                        onChange={handleValidarCpf}
                    />
                    <p className="erro-input-editar-candidato text-red-700 font-bold text-center">{errosInputs.cpf}</p>

                    <label htmlFor="telefone" className="dark:text-white">
                      Telefone
                    </label>
                    <input
                        type="text"
                        name="telefone"
                        value={informacoes.telefone}
                        onChange={handleValidarTelefone}
                        className="dark:bg-[#818181] w-full h-12"
                    />
                    <p className="erro-input-editar-candidato text-red-700 font-bold text-center">{errosInputs.telefone}</p>

                    <label htmlFor="nascimento" className="dark:text-white">
                      Data de nascimento
                    </label>

                    <input
                        type="date"
                        name="nascimento"
                        value={informacoes.nascimento}
                        onChange={(e) =>
                            setInformacoes({...informacoes, nascimento: e.target.value})
                        }
                        className="dark:bg-[#818181] w-full h-12"

                    />

                    <div className="candidato-selecionar-vulnerabilidade">

                      <label htmlFor="vulnerabilidades" className="dark:text-white">
                        Vulnerabilidades
                      </label>

                      <div
                          className="campo-all-vulnerabilidades h-48 overflow-auto shadow-md border-2 border-blue-800 flex flex-col">
                        {vulnerabilidadesApi.map((vulnerabilidade) => (

                            <div key={vulnerabilidade.nome} className="campo-vulnerabilidade flex flex-row gap-2">
                              <label htmlFor={vulnerabilidade.nome}>{vulnerabilidade.nome.replace(/_/g, " ")}</label>
                              <input
                                  type="checkbox"
                                  name="vulnerabilidades"
                                  value={vulnerabilidade.nome}
                                  checked={informacoes.vulnerabilidades.includes(vulnerabilidade.nome)}
                                  onChange={(e) => {

                                    if (e.target.checked) {
                                      setInformacoes({
                                        ...informacoes,
                                        vulnerabilidades: [...informacoes.vulnerabilidades, e.target.value],
                                      });
                                    } else {
                                      setInformacoes({
                                        ...informacoes,
                                        vulnerabilidades: informacoes.vulnerabilidades.filter(
                                            (v) => v !== e.target.value
                                        ),
                                      });
                                    }

                                  }}
                              />

                            </div>
                        ))}

                      </div>

                      <div className="vulnerabilidade-customizada flex flex-col">
                        <p className="nao-encontrou-vulnerabilidade font-bold
                      dark:text-white text-center cursor-pointer hover:underline
                      mt-4
                    ">
                          Não encontrou sua vulnerabilidade? Especifique ela nos campos abaixo.
                        </p>


                        <label htmlFor="vulnerabilidade" className="dark:text-white">
                          Vulnerabilidade
                        </label>

                        <input
                            type="text"
                            name="vulnerabilidade"
                            placeholder="Vulnerabilidade"
                            className="dark:bg-[#818181] w-full h-12"
                        />

                        <textarea name="descricao" id="descricao" cols="30" rows="10"
                                  className="dark:bg-[#818181] w-full h-24 mt-4 resize-none"
                                  placeholder="Descreva a sua vulnerabilidade"
                        ></textarea>
                      </div>


                    </div>


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

                </form>
              </div>
            </div>
          </section>
          <Footer/>
        </>
    );
}
