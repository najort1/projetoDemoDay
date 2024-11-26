import { useEffect, useRef } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import "./sobreStyle.css";
import missao from "../../assets/missao.png"
import visao from "../../assets/vision.png"
import seta from "../../assets/seta.png"

export const Sobre = () => {
  const sectionRefs = {
    missao: useRef(null),
    visao: useRef(null),
    valores: useRef(null),
    equipe: useRef(null),
  };

  const memberRefs = useRef([]);

  // Adicionando animação de entrada nas seções e membros quando eles estão visíveis
  useEffect(() => {
    const handleScroll = () => {
      // Verificando as seções principais
      for (const sectionKey in sectionRefs) {
        const section = sectionRefs[sectionKey].current;
        if (section) {
          const sectionTop = section.getBoundingClientRect().top;
          if (sectionTop < window.innerHeight * 0.8) {
            section.classList.add("active");
          } else {
            section.classList.remove("active");
          }
        }
      }

      // Verificando os membros da equipe
      memberRefs.current.forEach((member, index) => {
        if (member) {
          const memberTop = member.getBoundingClientRect().top;
          if (memberTop < window.innerHeight * 0.8) {
            member.classList.add("active");
          } else {
            member.classList.remove("active");
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Para verificar se as seções estão visíveis logo ao carregar a página

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Header />

      <div className="container-about w-full min-h-screen flex flex-col items-center bg-[#F0F4F8]">
        {/* Título da Página */}
        <div className="sobre titulo-container flex flex-col items-center gap-4 mb-8">
          <div className="gradient">
            <h1 className="titulo-container-principal text-3xl font-bold text-center ">Sobre Nós</h1>
            <p className="descricao text-lg text-center max-w-2xl">
              Somos uma plataforma comprometida em conectar pessoas a oportunidades de emprego acessíveis, com foco na inclusão e acessibilidade no mercado de trabalho.
            </p>

            <div className="seta animate-blink text-6xl">
              <img src={seta} alt=''/>
            </div>
          </div>
        </div>

        {/* Seções */}
        <div className="section-info missao" ref={sectionRefs.missao}>
          <div>

            <h2 className="section-title">Missão</h2>
            <p className="section-description">
              Oferecer uma plataforma inclusiva que facilite a busca por empregos, promovendo acessibilidade a todos, independentemente de suas limitações.
            </p>

          </div>
          
          <img src={missao} id='imgMissao'/>
        </div>

        <div className="section-info visao" ref={sectionRefs.visao}>
          <div>

            <h2 className="section-title">Visão</h2>
            <p className="section-description">
              Ser referência nacional em plataformas inclusivas de empregos, com a missão de gerar uma sociedade mais acessível e justa para todos.
            </p>

          </div>

          <img src={visao} style={{order:'-1'}} id='imgMissao'/>
          
        </div>

        <div className="section-info valores" ref={sectionRefs.valores}>
          <h2 className="section-title">Valores</h2>
          <ul className="section-description list-disc mx-auto max-w-xl">
            <li>

                <div className='valoresBox'>
                  <img width="48" height="48" src="https://img.icons8.com/fluency/48/diversity--v1.png" alt="diversity--v1"/>
                </div>Inclusão e diversidade</li>

            <li>
              <div className='valoresBox'>
                <img width="100" height="100" src="https://img.icons8.com/clouds/100/handshake.png" alt="handshake"/>
              </div>Transparência e ética</li>

            <li>
              <div className='valoresBox'><img width="100" height="100" src="https://img.icons8.com/clouds/100/people-working-together.png" alt="people-working-together"/></div>
              Empoderamento das pessoas</li>

            <li>
              <div className='valoresBox'><img width="100" height="100" src="https://img.icons8.com/bubbles/100/earth-planet.png" alt="earth-planet"/></div>
              Responsabilidade social</li>
          </ul>

        </div>

        <div className="section-info equipe" ref={sectionRefs.equipe}>
          <div>

            <h2 className="section-title">Nossa Equipe</h2>
            <p className="section-description mb-8">
              Nossa equipe é formada por profissionais apaixonados pela missão de tornar o mundo mais acessível.
            </p>

          </div>
          
          <div className="team-members">
            {/* Primeira Linha */}
            <div className="box-members">

              <div className="member" ref={(el) => (memberRefs.current[0] = el)}>
                <img src="https://via.placeholder.com/150" alt="Membro 1" className="rounded-full mx-auto mb-4"/>
                <p className="member-name">Luana Maria</p>
                <p className="member-role">Designer <br/>Front-end</p>
              </div>
              <div className="member" ref={(el) => (memberRefs.current[1] = el)}>
                <img src="https://via.placeholder.com/150" alt="Membro 2" className="rounded-full mx-auto mb-4"/>
                <p className="member-name">Leticia</p>
                <p className="member-role">Designer <br/>Full-stack</p>
              </div>
              <div className="member" ref={(el) => (memberRefs.current[2] = el)}>
                <img src="https://via.placeholder.com/150" alt="Membro 3" className="rounded-full mx-auto mb-4"/>
                <p className="font-semibold text-[#2c3e50]">Giovana</p>
                <p className="text-[#7f8c8d]">Designer<br/>Front-end</p>
              </div>
              <div className="member" ref={(el) => (memberRefs.current[3] = el)}>
                <img src="https://via.placeholder.com/150" alt="Membro 4" className="rounded-full mx-auto mb-4"/>
                <p className="font-semibold text-[#2c3e50]">Fillipe</p>
                <p className="text-[#7f8c8d]">Full-stack</p>
              </div>

            </div>
            
            <div className="box-members">

              {/* Segunda Linha */}
              <div className="member" ref={(el) => (memberRefs.current[4] = el)}>
                <img src="https://via.placeholder.com/150" alt="Membro 5" className="rounded-full mx-auto mb-4"/>
                <p className="font-semibold text-[#2c3e50]">Valleska</p>
                <p className="text-[#7f8c8d]">PO<br/>Full-stack</p>
              </div>
              <div className="member" ref={(el) => (memberRefs.current[5] = el)}>
                <img src="https://via.placeholder.com/150" alt="Membro 6" className="rounded-full mx-auto mb-4"/>
                <p className="font-semibold text-[#2c3e50]">Eduardo</p>
                <p className="text-[#7f8c8d]">CEO<br/>Full-stack</p>
              </div>
              <div className="member" ref={(el) => (memberRefs.current[6] = el)}>
                <img src="https://via.placeholder.com/150" alt="Membro 7" className="rounded-full mx-auto mb-4"/>
                <p className="font-semibold text-[#2c3e50]">Ewerton</p>
                <p className="text-[#7f8c8d]">Financeiro<br/>Full-stack</p>
              </div>


            </div>
            
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
