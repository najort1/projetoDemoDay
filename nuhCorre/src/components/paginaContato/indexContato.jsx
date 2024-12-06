import React, { useState, useEffect } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './styleContato.css';
import Header from '../header/Header';
import Footer from '../footer/Footer';

export const Contato = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    mensagem: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Mensagem enviada com sucesso!');
  };

  useEffect(() => {
    // Detecta automaticamente o modo escuro com base nas preferências do sistema.
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <>
      <Header />
      {/* Definindo as imagens de fundo com base no modo escuro ou claro */}
      <div className="contact-container bg-img-clara dark:bg-img-escuro bg-cover bg-center">
        <div className="contact-content">
          <div className="contact-header">
            <h1 className='dark:text-white'>Entre em Contato</h1>
            <p className='dark:text-[#ababab]'>Tem alguma dúvida? Envie sua mensagem!</p>
          </div>

          {/* Formulário de Contato */}
          <div className="contact-form dark:bg-[#6a6a6a]">
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="nome" className='dark:text-white'>Nome</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Digite seu nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  className='dark:border-2 dark:border-white'
                />
              </div>

              <div className="input-group">
                <label htmlFor="email" className='dark:text-white'>E-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Digite seu e-mail"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className='dark:border-2 dark:border-white'
                />
              </div>

              <div className="input-group">
                <label htmlFor="mensagem" className='dark:text-white'>Mensagem</label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  rows="5"
                  placeholder="Digite sua mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  required
                  className='dark:border-2 dark:border-white'
                />
              </div>

              <button type="submit" className="submit-btn">Enviar</button>
            </form>
          </div>
        </div>
      </div>

      <div className='bg-[#7999c7] dark:bg-[#4b6b99]'id="contatosAmais">
        <div className="contact-info dark:bg-[#313131]">
          <h2 className='dark:text-white'>Formas alternativas de contato</h2>
          <p className='dark:text-white'><FaPhoneAlt  /> (81) 91234-5678</p>
          <p className='dark:text-white'><FaEnvelope /> contato@exemplo.com</p>
          <p className='dark:text-white'><FaMapMarkerAlt /> Rua Exemplo, 123, Pernambuco, PE</p>
        </div>
      </div>

      <Footer />
    </>
  );
};
