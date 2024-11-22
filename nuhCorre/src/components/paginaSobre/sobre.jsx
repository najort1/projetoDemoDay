import { useEffect, useRef } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import "./sobreStyle.css";

export const Sobre = () => {
  const sectionRefs = {
    missao: useRef(null),
    visao: useRef(null),
    valores: useRef(null),
    equipe: useRef(null),
  };

  // Adicionando animação de entrada nas seções quando elas estão visíveis
  useEffect(() => {
    const handleScroll = () => {
      for (const sectionKey in sectionRefs) {
        const section = sectionRefs[sectionKey].current;
        if (section) {
          const sectionTop = section.getBoundingClientRect().top;
          if (sectionTop < window.innerHeight * 0.8) {
            section.classList.add('active');
          } else {
            section.classList.remove('active');
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Para verificar se as seções estão visíveis logo ao carregar a página

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Header />

      <div className="container-about w-full min-h-screen flex flex-col items-center bg-[#F0F4F8] p-8">
        {/* Título da Página */}
        <div className="titulo-container flex flex-col items-center gap-4 mb-8">
          <h1 className="titulo-container-principal text-3xl font-bold text-center text-[#1a2a3a]">Sobre Nós</h1>
          <p className="descricao text-lg text-center text-[#6a6a6a] max-w-2xl">
            Somos uma plataforma comprometida em conectar pessoas a oportunidades de emprego acessíveis, com foco na inclusão e acessibilidade no mercado de trabalho.
          </p>
        </div>

        {/* Seções */}
        <div className="section-info missao" ref={sectionRefs.missao}>
          <h2 className="section-title">Missão</h2>
          <p className="section-description">
            Oferecer uma plataforma inclusiva que facilite a busca por empregos, promovendo acessibilidade a todos, independentemente de suas limitações.
          </p>
        </div>

        <div className="section-info visao" ref={sectionRefs.visao}>
          <h2 className="section-title">Visão</h2>
          <p className="section-description">
            Ser referência nacional em plataformas inclusivas de empregos, com a missão de gerar uma sociedade mais acessível e justa para todos.
          </p>
        </div>

        <div className="section-info valores" ref={sectionRefs.valores}>
          <h2 className="section-title">Valores</h2>
          <ul className="section-description list-disc mx-auto max-w-xl">
            <li>Inclusão e diversidade</li>
            <li>Transparência e ética</li>
            <li>Empoderamento das pessoas</li>
            <li>Responsabilidade social</li>
          </ul>
        </div>

        <div className="section-info equipe" ref={sectionRefs.equipe}>
            <h2 className="section-title">Nossa Equipe</h2>
            <p className="section-description mb-8">
                Nossa equipe é formada por profissionais apaixonados pela missão de tornar o mundo mais acessível.
            </p>
            <div className="team-members">
                {/* Primeira Linha */}
                <div className="member">
                        <img src="https://via.placeholder.com/150" alt="Membro 1" className="rounded-full mx-auto mb-4"/>
                        <p className="member-name">Luana Maria</p>
                        <p className="member-role">Designer Front-end</p>
                </div>
                <div className="member">
                    <img src="https://via.placeholder.com/150" alt="Membro 2" className="rounded-full mx-auto mb-4"/>
                    <p className="member-name">Leticia</p>
                    <p className="member-role">Designer Full-stack</p>
                </div>
                <div className="member">
                    <img src="https://via.placeholder.com/150" alt="Membro 3" className="rounded-full mx-auto mb-4"/>
                    <p className="font-semibold text-[#2c3e50]">Giovana</p>
                    <p className="text-[#7f8c8d]">Designer<br/>Front-end</p>
                </div>
                <div className="member">
                    <img src="https://via.placeholder.com/150" alt="Membro 4" className="rounded-full mx-auto mb-4"/>
                    <p className="font-semibold text-[#2c3e50]">Fillipe</p>
                    <p className="text-[#7f8c8d]">Full-stack</p>
                </div>

                {/* Segunda Linha */}
                <div className="member">
                    <img src="https://via.placeholder.com/150" alt="Membro 5" className="rounded-full mx-auto mb-4"/>
                    <p className="font-semibold text-[#2c3e50]">Valleska</p>
                    <p className="text-[#7f8c8d]">PO<br/>Full-stack</p>
                </div>
                <div className="member">
                    <img src="https://via.placeholder.com/150" alt="Membro 6" className="rounded-full mx-auto mb-4"/>
                    <p className="font-semibold text-[#2c3e50]">Eduardo</p>
                    <p className="text-[#7f8c8d]">CEO<br/>Full-stack</p>
                </div>
                <div className="member">
                    <img src="https://via.placeholder.com/150" alt="Membro 7" className="rounded-full mx-auto mb-4"/>
                    <p className="font-semibold text-[#2c3e50]">Ewerton</p>
                    <p className="text-[#7f8c8d]">Financeiro<br/>Full-stack</p>
                </div>
            </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
