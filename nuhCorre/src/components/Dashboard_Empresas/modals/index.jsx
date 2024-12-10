import { useNavigate } from "react-router-dom";

const ModalSessaoExpirada = ({ showModal, setShowModal }) => {
  const navigate = useNavigate();

  return (
    <>
      {showModal && (
        <div
          className="modal-container fixed inset-0 flex items-center justify-center z-50"
          role="dialog"
          aria-labelledby="titulo-sessao-expirada"
          aria-describedby="descricao-sessao-expirada"
        >
          {/* Overlay escuro */}
          <div className="overlay fixed inset-0 bg-black opacity-50 z-40"></div>

          {/* Modal */}
          <div
            className="modal flex flex-col items-center justify-center gap-4 p-6 bg-white shadow-2xl rounded-md z-50 dark:bg-gray-800 dark:text-white"
          >
            <h1
              id="titulo-sessao-expirada"
              className="text-2xl font-bold text-blue-800 dark:text-blue-400"
            >
              Sessão Expirada
            </h1>
            <p
              id="descricao-sessao-expirada"
              className="text-center text-gray-600 dark:text-gray-300"
            >
              Sua sessão expirou. Por favor, faça login novamente.
            </p>
            <button
              className="bg-blue-800 text-white p-2 rounded-md hover:bg-blue-700 transition-colors w-full md:w-auto"
              onClick={() => {
                navigate("/login-Empresa");
                localStorage.clear();
                setShowModal(false);
              }}
            >
              Fazer login
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const ModalError = ({ showModal, setShowModal, Titulo, Descricao }) => {


  return (
    <>
      {showModal && (
        <div
          className="modal-container fixed inset-0 flex items-center justify-center z-50"
          role="dialog"
          aria-labelledby="titulo-modal-error"
          aria-describedby="descricao-modal-error"
        >
          {/* Overlay escuro */}
          <div className="overlay fixed inset-0 bg-black opacity-50 z-40"></div>

          {/* Modal */}
          <div
            className="modal flex flex-col items-center justify-center gap-4 p-6 bg-white shadow-2xl rounded-md z-50 dark:bg-gray-800 dark:text-white"
          >
            <h1
              id="titulo-modal-error"
              className="text-2xl font-bold text-red-800 dark:text-red-400"
            >
              {Titulo}
            </h1>
            <p
              id="descricao-modal-error"
              className="text-center text-gray-600 dark:text-gray-300"
            >
              {Descricao}
            </p>
            <button
              className="bg-red-800 text-white p-2 rounded-md hover:bg-red-700 transition-colors w-full md:w-auto"
              onClick={() => setShowModal(false)}
            >
              Ok
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const ModalSucesso = ({ showModal, setShowModal, Titulo, Descricao }) => {
  return (
    <>
      {showModal && (
        <div
          className="modal-container fixed inset-0 flex items-center justify-center z-50"
          role="dialog"
          aria-labelledby="titulo-modal-sucesso"
          aria-describedby="descricao-modal-sucesso"
        >
          {/* Overlay escuro */}
          <div className="overlay fixed inset-0 bg-black opacity-50 z-40"></div>

          {/* Modal */}
          <div
            className="modal flex flex-col items-center justify-center gap-4 p-6 bg-white shadow-2xl rounded-md z-50 dark:bg-gray-800 dark:text-white"
          >
            <h1
              id="titulo-modal-sucesso"
              className="text-2xl font-bold text-green-800 dark:text-green-400"
            >
              {Titulo}
            </h1>
            <p
              id="descricao-modal-sucesso"
              className="text-center text-gray-600 dark:text-gray-300"
            >
              {Descricao}
            </p>
            <button
              className="bg-green-800 text-white p-2 rounded-md hover:bg-green-700 transition-colors w-full md:w-auto"
              onClick={() => setShowModal(false)}
            >
              Ok
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const ModalConfirmacao = ({ 
  showModal, 
  setShowModal, 
  Titulo, 
  Descricao, 
  onDelete,
  vagaId // Adicione esta linha
}) => {
  return (
    <>
      {showModal && (
        <div
          className="modal-container fixed inset-0 flex items-center justify-center z-50"
          role="dialog"
          aria-labelledby="titulo-modal-confirmacao"
          aria-describedby="descricao-modal-confirmacao"
        >
          {/* Overlay escuro */}
          <div
            className="overlay fixed inset-0 bg-black opacity-50 z-40"
            onClick={() => setShowModal(false)} // Fecha ao clicar fora do modal
          ></div>

          {/* Modal */}
          <div
            className="modal flex flex-col items-center justify-center gap-6 p-6 bg-white shadow-2xl rounded-md z-50 dark:bg-gray-800 dark:text-white"
          >
            <h1
              id="titulo-modal-confirmacao"
              className="text-2xl font-bold text-red-800 dark:text-red-400"
            >
              {Titulo}
            </h1>
            <p
              id="descricao-modal-confirmacao"
              className="text-center text-gray-600 dark:text-gray-300"
            >
              {Descricao}
            </p>
            <div className="flex gap-4">
              {/* Botão Deletar */}
              <button
                className="bg-red-800 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                onClick={() => {
                  onDelete(vagaId); // Passe o vagaId aqui
                  setShowModal(false); // Fecha o modal
                }}
              >
                Deletar
              </button>
              {/* Botão Cancelar */}
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { ModalSessaoExpirada, ModalError, ModalSucesso, ModalConfirmacao };
