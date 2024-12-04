import Header from '../header/Header';
import Footer from '../footer/Footer';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import boxicons from 'boxicons';

export const Vagas = () => {
    const location  = useLocation();

    const [vagas, setVagas] = useState(location.state?.vagas || []);
    const [filtros, setFiltros] = useState({
        cargo: '',
        local: ''
    });

    console.log(vagas)

    // {
    //     "id": 1,
    //     "titulo": "Auxliar",
    //     "descricao": "Auxliar Auxliar embalagens de empacotamento",
    //     "requisitos": "ser gay",
    //     "beneficios": "Auxilio emergencial",
    //     "salario": 4000,
    //     "cargaHoraria": "2 horas",
    //     "dataCadastro": "2024-11-28",
    //     "dataExpiracao": "2024-12-28",
    //     "status": false,
    //     "endereco": {
    //       "id": 1,
    //       "rua": "Jardim Aero Rancho",
    //       "numero": "16",
    //       "cidade": "Campo Grande",
    //       "estado": "MS",
    //       "cep": "79083340",
    //       "principal": null
    //     },
    //     "empresa": {
    //       "cnpj": "05.424.215/0001-53",
    //       "nome": "Pietro e Eliane Vidros ME",
    //       "email": "fiscal1@pietroeelianevidrosme.com.br",
    //       "telefone": "(12) 99463-1702"
    //     },
    //     "candidaturas": 2
    //   }

    return (
        <>
            <Header />

            <main className="secao-vagas">

                <div className="navbar-topo flex flex-col shadow-xl p-4 gap-2">
                    <input type="text" name="Titulo" placeholder="Vaga" className="cargo-vaga h-14 rounded-md p-2 border-2 border-blue-800" />
                    <input type="text" name="Local" placeholder="Local" className="local-vaga h-14 rounded-md p-2 border-2 border-blue-800" />
                </div>

                <div className="vagas flex flex-col gap-4 p-4">

                    {vagas.map((vaga) => (
                        <div key={vaga.id} className="vaga bg-white p-6 shadow-xl rounded-lg flex flex-col gap-4">
                            <h1 className="titulo-vaga font-bold text-[#718CB3] text-xl border-y-1 border-blue-800 text-center shadow-sm">{vaga.titulo}</h1>

                            <div className="empresa-salario-tipo flex flex-col gap-1">
                                <p className="empresa text-md
                                    dark:text-black
                                    dark:font-semibold
                                ">{vaga.empresa.nome} - {vaga.endereco.cidade} , {vaga.endereco.estado}</p>
                                <p className="salario text-md
                                    dark:text-black
                                    dark:font-semibold
                                ">R$ {vaga.salario} - Carga horaria: {vaga.cargaHoraria}</p>
                            </div>

                            <div className="descricao-da-vaga">
                                <p className="descricao text-md border border-blue-800 overflow-auto h-24 w-full bg-gray-200 p-1 rounded-md
                                
                                dark:bg-gray-800
                                dark:text-white
                                dark:border-gray-800
                                dark:font-semibold

                                " >{vaga.descricao}</p>
                            </div>

                            <div className="botao">
                                
                                <button className="btn-candidatar bg-blue-800 text-white p-2 rounded-md w-full flex items-center flex-row justify-center gap-4  "><box-icon name='briefcase' color='#ffffff' ></box-icon> Candidatar-se</button>
                            </div>

                        </div>
                    ))}

                    
                </div>

            </main>

            <Footer />
        </>
    );
}