import React, { useState } from 'react';
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

  return (
    <>
    <Header />
    
    <div className="contact-container dark:bg-[url('../../assets/.png')] bg-cover bg-center">

      <div className="contact-content">
        <div className="contact-header">
          <h1>Entre em Contato</h1>
          <p>Tem alguma dúvida? Envie sua mensagem!</p>
        </div>

        {/* Formulário de Contato */}
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                id="nome"
                name="nome"
                placeholder="Digite seu nome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Digite seu e-mail"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="mensagem">Mensagem</label>
              <textarea
                id="mensagem"
                name="mensagem"
                rows="5"
                placeholder="Digite sua mensagem"
                value={formData.mensagem}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="submit-btn">Enviar</button>
          </form>
        </div>

      </div>

    </div>
    <div id='contatosAmais'>

      <div className="contact-info">
        <h2>Formas alternativas de contato</h2>
        <p><FaPhoneAlt /> (81) 91234-5678</p>
        <p><FaEnvelope /> contato@exemplo.com</p>
        <p><FaMapMarkerAlt /> Rua Exemplo, 123, Pernambuco, PE</p>
      </div>


    </div>
    <Footer/>
    
    </>
  );
};
