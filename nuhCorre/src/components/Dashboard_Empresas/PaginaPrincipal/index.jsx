import boxicons from "boxicons";
import Chart from 'chart.js/auto';
import { Sidebar } from 'primereact/sidebar';
import { useEffect, useState } from 'react';

import logo from '../../../assets/logo.png';
import { Avatar } from 'primereact/avatar';
import {Slider} from "@nextui-org/react";

const DashBoardPrincipal = () => {

const [visible, setVisible] = useState(false);
const [chartInstance, setChartInstance] = useState(null);
const data = [
    { year: 'Janeiro', count: 10 },
    { year: 'Fevereiro', count: 20 },
    { year: 'Março', count: 30 },
    { year: 'Abril', count: 40 },
    { year: 'Maio', count: 50 },
    { year: 'Junho', count: 60 },
    { year: 'Julho', count: 70 },
    { year: 'Agosto', count: 80 },
    { year: 'Setembro', count: 90 },
    { year: 'Outubro', count: 100 },
    { year: 'Novembro', count: 110 },
    { year: 'Dezembro', count: 120 },
];

async function geraGrafico() {
  const ctx = document.getElementById('grafico-candidatura-por-mes').getContext('2d');

  if (chartInstance) {
    chartInstance.destroy();
  }

  const newChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map((item) => item.year),
      datasets: [
        {
          label: 'Candidaturas por mês',
          data: data.map((item) => item.count),
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgb(113, 140, 179)',
          tension: 0.1,
        },
      ],
    },
  });

  setChartInstance(newChartInstance);
}

useEffect(() => {
  geraGrafico();
}, []);



  return (
    <>
        

        <Sidebar visible={visible} onHide={() => setVisible(false)} className="w-[60%] h-full relative shadow-2xl bg-[#718CB3] xl:w-[15%] overflow-auto
        md:w-[30%]
        "
            content={({closeIcon, hide})  => (
                    
                    <div className="h-full flex flex-col justify-between">
                        <div className="flex justify-between items-center p-4 md:justify-center">
                            
                            <img src={logo} alt="Logo" className="w-full h-24 object-cover
                            md:w-[90%]

                            " />

                            <button onClick={hide} className="text-white text-3xl">
                                <box-icon type='solid' name='x-circle'></box-icon>
                            </button>
                        </div>
                        <div className="flex flex-col items-center gap-4">

                            <div className="nav-item flex flex-row items-center gap-2">
                                <box-icon type='solid' name='home'></box-icon>
                                <a href="#" className="text-white text-xl">Inicio</a>
                            </div>
                            <div className="nav-item flex flex-row items-center gap-2">
                                <box-icon name='file-plus' type='solid' ></box-icon>
                                <a href="#" className="text-white text-xl">Nova vaga</a>
                            </div>
                            <div className="nav-item flex flex-row items-center gap-2">
                                <box-icon name='user-detail' type='solid' ></box-icon>
                                <a href="#" className="text-white text-xl">Candidatos</a>
                            </div>
                            <div className="nav-item flex flex-row items-center gap-2">
                                <box-icon name='spreadsheet' ></box-icon>
                                <a href="#" className="text-white text-xl">Vagas</a>
                            </div>

                        </div>

                        <div className="flex flex-row justify-between items-center p-4">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIMDsWFBoBCZUhHBwy7G9G65_pJ2SZngH5BQ&s" alt="Usuario logado" className="usuario-logado-foto rounded-full w-16 object-cover" />
                            <button className="botao-sair text-white font-2xl font-bold">Sair</button>
                        </div>
                    </div>
            )} 
            >

              

            


            </Sidebar>

            <header className="header-dashboard flex flex-row w-full shadow-xl p-2 items-center">

                <button className="abrir-side-bar" onClick={() => setVisible(true)} ><box-icon name='menu' size='lg'></box-icon></button>
                <h1 className="titulo-dashboard text-blue-800 text-2xl flex justify-center items-center font-bold m-auto">Dashboard</h1>

            </header>

            <main className="main-dashboard flex flex-col items-center gap-4 p-4">
                    
                    <div className="flex flex-row items-center gap-4">
                        <h1 className="text-2xl font-bold">Bem vindo, <span className="text-blue-800">Fulano</span></h1>
                    </div>
    
                    <div className="flex flex-row items-center gap-4">
                        <div className="card flex flex-col items-center gap-4 p-4 shadow-md bg-white border-2 border-blue-500">
                            <h1 className="titulo-card text-2xl font-bold text-center">Total candidatos</h1>
                            <h1 className="numero-card text-4xl font-bold">100</h1>
                        </div>
                        <div className="card flex flex-col items-center gap-4 p-4 shadow-md bg-white border-2 border-blue-500">
                            <h1 className="titulo-card text-2xl font-bold text-center">Visualizações totais</h1>
                            <h1 className="numero-card text-4xl font-bold">1000</h1>
                        </div>
                    </div>

            </main>

            <section className="grafico mt-4 w-full border shadow-2xl
            xl:flex
            xl:justify-center

            ">
                    <div className="grafico-candidatura w-full
                        xl:w-[40%]
                    ">
                        <canvas id="grafico-candidatura-por-mes"></canvas>
                    </div>
            </section>
            
            <section className="outras-informacoes flex flex-col gap-4 p-2 mt-8
            
            xl:flex-row
            xl:gap-8
            ">


                <div className="container-atividade-recente flex flex-col gap-4 p-4 shadow-md bg-white border-2 border-blue-500 rounded-md
                
                xl:w-[50%]

                ">

                    <h1 className="titulo-card text-md font-bold text-center">Atividades recentes</h1>

                    <div className="atividade-recente flex flex-col gap-4">
                        
                        <div className="atividade flex flex-row justify-between
                        
                        xl:justify-evenly
                        ">
                            <div className="informacoes-usuario flex flex-row">
                                <box-icon name='user' ></box-icon>
                                <div className="nome-funcao flex flex-col">
                                    <h1 className="nome font-bold">Fulano</h1>
                                    <p className="descricao text-gray-400 text-sm">Programador front-end</p>
                                </div>
                            </div>
                            <div className="acao-usuario">
                                <p className="acao border-2 rounded-xl p-1 border-gray-400">Novo candidato</p>
                            </div>
                        </div>
                        <div className="atividade flex flex-row justify-between
                        xl:justify-evenly
                        ">
                            <div className="informacoes-usuario flex flex-row">
                                <box-icon name='user' ></box-icon>
                                <div className="nome-funcao flex flex-col">
                                    <h1 className="nome font-bold">Fulano</h1>
                                    <p className="descricao text-gray-400 text-sm">Programador front-end</p>
                                </div>
                            </div>
                            <div className="acao-usuario">
                                <p className="acao border-2 rounded-xl p-1 border-gray-400">Novo candidato</p>
                            </div>
                        </div>
                        <div className="atividade flex flex-row justify-between
                        xl:justify-evenly
                        ">
                            <div className="informacoes-usuario flex flex-row">
                                <box-icon name='user' ></box-icon>
                                <div className="nome-funcao flex flex-col">
                                    <h1 className="nome font-bold">Fulano</h1>
                                    <p className="descricao text-gray-400 text-sm">Programador front-end</p>
                                </div>
                            </div>
                            <div className="acao-usuario">
                                <p className="acao border-2 rounded-xl p-1 border-gray-400">Novo candidato</p>
                            </div>
                        </div>

                    </div>

                </div>

                <div className="container-vagas-em-destaque flex flex-col gap-4 p-4 shadow-md bg-white border-2 border-blue-500 rounded-md
                
                xl:w-[50%]
                ">

                    <h1 className="titulo-card text-md font-bold text-center">Vagas em destaque</h1>

                    <div className="vagas-em-destaque flex flex-col gap-4">
                            
                            <div className="vaga-em-destaque flex flex-col gap-4">
                                <h1 className="titulo-vaga font-bold">Vaga para programador front-end</h1>

                                <div className="slider-candidatos flex flex-row gap-4 items-center">
                                    <Slider 
                                    isDisabled
                                        aria-label="Player progress" 
                                        color="primary"
                                        hideThumb={true}
                                        value={110}
                                        maxValue={120}
                                        className="max-w-md"
                                    />
                                    <p className="candidatos font-bold text-center">100 candidatos</p>
                                </div>

       
                            </div>
                            <div className="vaga-em-destaque flex flex-col gap-4">
                                <h1 className="titulo-vaga font-bold">Vaga para programador front-end</h1>
                                <div className="slider-candidatos flex flex-row gap-4 items-center">
                                    <Slider 
                                    isDisabled
                                        aria-label="Player progress" 
                                        color="primary"
                                        hideThumb={true}
                                        value={80}
                                        maxValue={120}
                                        className="max-w-md"
                                    />
                                    <p className="candidatos font-bold text-center">80 candidatos</p>
                                </div>
                            </div>
                            <div className="vaga-em-destaque flex flex-col gap-4">
                                <h1 className="titulo-vaga font-bold">Vaga para programador front-end</h1>
                                <div className="slider-candidatos flex flex-row gap-4 items-center">
                                    <Slider 
                                    isDisabled
                                        aria-label="Player progress" 
                                        color="primary"
                                        hideThumb={true}
                                        value={40}
                                        maxValue={120}
                                        className="max-w-md"
                                    />
                                    <p className="candidatos font-bold text-center">40 candidatos</p>
                                </div>
                            </div>
                            
                        </div>

                </div>


            </section>


    </>
  );
};

export default DashBoardPrincipal;
