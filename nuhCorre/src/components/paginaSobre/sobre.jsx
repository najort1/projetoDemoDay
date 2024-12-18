import { useEffect, useRef } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import "./sobreStyle.css";
import missao from "../../assets/missao.png"
import visao from "../../assets/vision.png"
import seta from "../../assets/seta.png"
import vall from "../../assets/Vall.jpg"
import edu from "../../assets/edu.jpg"
import rosa from "../../assets/rosa.jpg"
import fill from "../../assets/Fill.jpg"
import gio from "../../assets/gio.jpg"
import ewer from "../../assets/Ewer.jpg"
import lua from "../../assets/lua.jpeg"

export const Sobre = () => {
  
  const sectionRefs = {
    sobre: useRef(null),
    missao: useRef(null),
    visao: useRef(null),
    valores: useRef(null),
    equipe: useRef(null),
  };

  const memberRefs = useRef([]);

  // Função que verifica se a seção ou membro está visível
  const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight * 0.8; // 80% da altura da tela
  };

  useEffect(() => {
    const handleScroll = () => {
      // Verificando as seções principais
      Object.keys(sectionRefs).forEach((sectionKey) => {
        const section = sectionRefs[sectionKey].current;
        if (section) {
          if (isInViewport(section)) {
            section.classList.add("sobre-visible");
          } else {
            section.classList.remove("sobre-visible");
          }
        }
      });

      // Verificando os membros da equipe
      memberRefs.current.forEach((member) => {
        if (member && isInViewport(member)) {
          member.classList.add("active");
        } else {
          member.classList.remove("active");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Para verificar as seções quando a página for carregada

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
        {/* Imagem de fundo de <a href="https://pixabay.com/pt/users/geralt-9301/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=6188940">Gerd Altmann</a> por <a href="https://pixabay.com/pt//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=6188940">Pixabay</a> */}
      <div className="container-about w-full min-h-screen flex flex-col items-center bg-[#F0F4F8]">
          {/* Título da Página */}
          <div className="sobre titulo-container flex flex-col items-center gap-4 sobre-fade-in" ref={sectionRefs.sobre}>
          <div className="gradient">
            <h1 className="titulo-container-principal text-3xl font-bold text-center">Sobre Nós</h1>
            <p className="descricao text-lg text-center max-w-2xl">
              Somos uma plataforma comprometida em conectar pessoas a oportunidades de emprego acessíveis, com foco na inclusão e acessibilidade no mercado de trabalho.
            </p>
            <div className="seta animate-blink text-6xl">
              <img src={seta} alt="Seta para baixo" />
            </div>
          </div>
        </div>

        {/* Seções */}
        <div className="section-info missao dark:bg-black" ref={sectionRefs.missao}>
          <div>

            <h2 className="section-title dark:text-white">Missão</h2>
            <p className="section-description dark:text-white">
              Oferecer uma plataforma inclusiva que facilite a busca por empregos, promovendo acessibilidade a todos, independentemente de suas limitações.
            </p>

          </div>
          
          <img src={missao} id='imgMissao'/>
        </div>

        <div className="section-info visao dark:bg-[#003b6c]" ref={sectionRefs.visao}>
          <div>

            <h2 className="section-title">Visão</h2>
            <p className="section-description">
              Ser referência nacional em plataformas inclusivas de empregos, com a missão de gerar uma sociedade mais acessível e justa para todos.
            </p>

          </div>

          <img src={visao} style={{order:'-1'}} id='imgMissao'/>
          
        </div>

        <div className="section-info valores dark:bg-[#505050]" ref={sectionRefs.valores}>
          <h2 className="section-title dark:text-white">Valores</h2>
          <ul className="section-description list-disc mx-auto max-w-xl">
            <li className='dark:text-white'>

                <div className='valoresBox'>
                  <img width="48" height="48" src="https://img.icons8.com/fluency/48/diversity--v1.png" alt="diversity--v1"/>
                </div>Inclusão e diversidade</li>

            <li className='dark:text-white'>
              <div className='valoresBox'>
                <img width="100" height="100" src="https://img.icons8.com/clouds/100/handshake.png" alt="handshake"/>
              </div>Transparência e ética</li>

            <li className='dark:text-white'>
              <div className='valoresBox'><img width="100" height="100" src="https://img.icons8.com/clouds/100/people-working-together.png" alt="people-working-together"/></div>
              Empoderamento das pessoas</li>

            <li className='dark:text-white'>
              <div className='valoresBox'><img width="100" height="100" src="https://img.icons8.com/bubbles/100/earth-planet.png" alt="earth-planet"/></div>
              Responsabilidade social</li>
          </ul>

        </div>

        <div className="section-info equipe dark:bg-[#848e7a]" ref={sectionRefs.equipe}>
          <div>

            <h2 className="section-title dark:text-white">Nossa Equipe</h2>
            <p className="section-description mb-8 dark:text-white">
              Nossa equipe é formada por profissionais apaixonados pela missão de tornar o mundo mais acessível.
            </p>

          </div>
          
          <div className="team-members">
            {/* Primeira Linha */}
            <div className="box-members">

              <div className="member" ref={(el) => (memberRefs.current[0] = el)}>
                <img src={lua} alt="Membro 1" className="rounded-full mx-auto mb-4"/>
                <p className="member-name">Luana Maria</p>
                <p className="member-role">Designer <br/>Front-end</p>
              </div>
              <div className="member" ref={(el) => (memberRefs.current[1] = el)}>
                <img src={rosa} alt="Membro 2" className="rounded-full mx-auto mb-4"/>
                <p className="member-name">Letícia Rosa</p>
                <p className="member-role">Designer <br/>Full-stack</p>
              </div>
              <div className="member" ref={(el) => (memberRefs.current[2] = el)}>
                <img src={gio} alt="Membro 3" className="rounded-full mx-auto mb-4"/>
                <p className="font-semibold text-[#2c3e50]">Giovanna Saraiva</p>
                <p className="text-[#7f8c8d]">Designer<br/>Full-stack</p>
              </div>
              <div className="member" ref={(el) => (memberRefs.current[3] = el)}>
                <img src={fill} alt="Membro 4" className="rounded-full mx-auto mb-4"/>
                <p className="font-semibold text-[#2c3e50]">Fillipe Eduardo</p>
                <p className="text-[#7f8c8d]">Full-stack</p>
              </div>

            </div>
            
            <div className="box-members">

              {/* Segunda Linha */}
              <div className="member" ref={(el) => (memberRefs.current[4] = el)}>
                <img src={vall} alt="Membro 5" className="rounded-full mx-auto mb-4"/>
                <p className="font-semibold text-[#2c3e50]">Valleska Souza</p>
                <p className="text-[#7f8c8d]">Scrum Master<br/>Full-stack</p>
              </div>
              <div className="member" ref={(el) => (memberRefs.current[5] = el)}>
                <img src={edu} alt="Membro 6" className="rounded-full mx-auto mb-4"/>
                <p className="font-semibold text-[#2c3e50]">Eduardo Oliveira</p>
                <p className="text-[#7f8c8d]">Product Owner<br/>Full-stack</p>
              </div>
              <div className="member" ref={(el) => (memberRefs.current[6] = el)}>
                <img src={ewer} alt="Membro 7" className="rounded-full mx-auto mb-4"/>
                <p className="font-semibold text-[#2c3e50]">Ewerton Monteiro</p>
                <p className="text-[#7f8c8d]">Financeiro<br/>Full-stack</p>
              </div>


            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};
