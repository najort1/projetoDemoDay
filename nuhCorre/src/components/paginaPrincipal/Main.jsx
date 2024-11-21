import { useState } from "react";
import "./mainStyle.css";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Dropdown } from 'primereact/dropdown';
import boxicons from "boxicons";
import { code } from "@nextui-org/react";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import {Button} from "@nextui-org/react";

export const PesquisaVagaTelaInicial = () => {

  // Estados dos campos com valores padrão
  const [tipo, setTipo] = useState("Tipo");
  const [cidade, setCidade] = useState("Cidade");
  const [pesquisa, setPesquisa] = useState("");

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
  
  return (
    <>
      <Header />

      <div className="fotos w-full h-full min-h-screen"></div>

      <div className="container absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#AAB9CE] w-[100%] h-[40%] flex flex-col justify-evenly p-2 shadow-2xl rounded-xl


      
      xl:w-[57%] xl:h-[40%]
      md:w-[80%]

      px-[10px]
      
      ">


      <div className="titulo-container flex flex-col items-center gap-2">
        <h1 className="titulo-container-principal font-bold text-md text-center text-2xl text-white">Conecte-se com Empregos Acessíveis para Todos</h1>
      </div>

      <div className="container-inputs flex flex-col items-center gap-2 xl:flex-row">

      <select name="Tipo" id="selecionado_tipo" className="opcoes-tipo h-12 w-full rounded-[5px] xl:w-20" onChange={handleTipo}>
          <option value="Vagas">Vagas</option>
          <option value="Empresas">Empresas</option>      
      </select>

      <input type="text" placeholder="Pesquise" className="input-pesquisa h-16 w-full rounded-[5px] px-[5px] xl:h-12" onChange={handlePesquisa}/>

      <select name="Estado" id="seleciona_estado" className="selecionar-estado h-12 w-full rounded-[5px] xl:w-24" onChange={handleSelectCidade}>

        {estados.map((estado) => (
          <option value={estado.name}>{estado.name}</option>
        ))}

      </select>

      <Button
      isIconOnly
      className="botao-pesquisar bg-[#718CB3] flex items-center justify-center h-1/4 w-full
      xl:h-full xl:w-24
      "
      ><box-icon name='search' color='white'></box-icon></Button>

      

      </div>



      </div>



      <Footer/>
    </>
  );
};
