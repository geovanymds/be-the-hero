// Imports
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';

// Componnent (page) Register
export default function Register() {
  // Declaring states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  // Declaring state history to change URL
  const history = useHistory(); 


  // Function to submit the registration
  async function handleRegister(e) {
    e.preventDefault();

    // Getting data to register an ONG
    const data = {
      name,
      email,
      whatsapp,
      city,
      uf
    };

    // Getting the id, the response from post method
    
    try {
      const response = await api.post('ongs', data);

      alert(`Seu ID de acesso ${response.data.id}`);

      history.push('/');

    } catch(err) {
      alert('Erro no cadastro, tente novamente');
    }
  }

  // Componnent
  return(
    <div className="register-container">
      <div className="content">
        {/* Logo and call */}
        <section>
          <img src={logoImg} alt="Be The Hero"/>

          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041"/>
            Não tenho cadastro
          </Link>
        </section>
        {/* Forms */}
        <form onSubmit={handleRegister}>
          {/* ONG's Name */}
          <input 
            placeholder="Nome da ONG"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          {/* ONG's e-mail */}
          <input 
            type="email" 
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          {/* ONG's whatsapp */}
          <input 
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />
          {/* ONG's city and uf */}
          <div className="input-group">
            <input 
              placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)}
              />
            <input 
              placeholder="UF" 
              style={{ width: 80 }}
              value={uf}
              onChange={e => setUf(e.target.value)}
            />
          </div>

          <button className="button" type="submit">Cadastrar</button>

        </form>

      </div>
    </div>
  );
}