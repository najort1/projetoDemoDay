import Header from '../header/Header';
import Footer from '../footer/Footer';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'boxicons';
import axios from 'axios';

export const Vagas = () => {
    const location = useLocation();

    const [vagas, setVagas] = useState(location.state?.vagas || []);
    const [filtros, setFiltros] = useState({
        cargo: '',
        local: ''
    });

    useEffect(() => {
        const fetchVagas = async () => {
            try {
                const response = await axios.get('http://localhost:8080/vagas', {
                    params: {
                        cargo: filtros.cargo,
                        local: filtros.local
                    }
                });
                setVagas(response.data);
            } catch (error) {
                console.error('Erro ao buscar vagas:', error);
            }
        };

        fetchVagas();
    }, [filtros]);

    const handleCandidatarse = async (vagaId) => {
        try {

            const respostaAPIVisualizar = await axios.post(`http://localhost:8080/vaga/${vagaId}/visualizar`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                validateStatus: (status) => status <= 500
            });

            if (respostaAPIVisualizar.status !== 200) {
                alert('Erro ao visualizar vaga');
                return;
            }
            


            const respostaAPI = await axios.post(`http://localhost:8080/vaga/${vagaId}/candidatar`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                validateStatus: (status) => status <= 500
            });




            if (respostaAPI.status === 200) {
                alert('Candidatura realizada com sucesso!');
            } else {
                alert('Erro ao candidatar-se');
            }
        } catch (error) {
            console.error('Erro ao candidatar-se:', error);
            alert('Erro ao candidatar-se');
        }
    };

    const handleFiltroChange = (e) => {
        const { name, value } = e.target;
        setFiltros((prevFiltros) => ({
            ...prevFiltros,
            [name]: value
        }));
    };

    return (
        <>
            <Header />

            <main className="secao-vagas">
                <div className="navbar-topo flex flex-col shadow-xl p-4 gap-2">
                    <input
                        type="text"
                        name="cargo"
                        placeholder="Vaga"
                        className="cargo-vaga h-14 rounded-md p-2 border-2 border-blue-800"
                        value={filtros.cargo}
                        onChange={handleFiltroChange}
                    />
                    <input
                        type="text"
                        name="local"
                        placeholder="Local"
                        className="local-vaga h-14 rounded-md p-2 border-2 border-blue-800"
                        value={filtros.local}
                        onChange={handleFiltroChange}
                    />
                </div>

                <div className="vagas flex flex-col gap-4 p-4">
                    {vagas.map((vaga) => (
                        <div key={vaga.id} className="vaga bg-white p-6 shadow-xl rounded-lg flex flex-col gap-4">
                            <h1 className="titulo-vaga font-bold text-[#718CB3] text-xl border-y-1 border-blue-800 text-center shadow-sm">{vaga.titulo}</h1>

                            <div className="empresa-salario-tipo flex flex-col gap-1">
                                <p className="empresa text-md dark:text-black dark:font-semibold">{vaga.empresa.nome} - {vaga.endereco.cidade} , {vaga.endereco.estado}</p>
                                <p className="salario text-md dark:text-black dark:font-semibold">R$ {vaga.salario} - Carga horaria: {vaga.cargaHoraria}</p>
                            </div>

                            <div className="descricao-da-vaga">
                                <p className="descricao text-md border border-blue-800 overflow-auto h-24 w-full bg-gray-200 p-1 rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-800 dark:font-semibold">{vaga.descricao}</p>
                            </div>

                            <div className="botao">
                                <button onClick={() => handleCandidatarse(vaga.id)} className="btn-candidatar bg-blue-800 text-white p-2 rounded-md w-full flex items-center flex-row justify-center gap-4">
                                    <box-icon name='briefcase' color='#ffffff'></box-icon> Candidatar-se
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