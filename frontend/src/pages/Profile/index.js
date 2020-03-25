// Imports
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg'
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

// Componnents and functions
export default function Profile() {
  const [incidents, setIncidents] = useState([]);

  const history = useHistory();

  // Getting navigator information
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  // Calling the effect on opening this page
  // First param: function activated
  // Second param: when the function is activated
  useEffect(()=>{
    api.get('profile',{
      headers: {
        Authorization: ongId,
      }
    }).then(response=>{
      setIncidents(response.data);
    })
  }, [ongId]);

  // Function to delete a case
  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          authorization: ongId, 
        }
      });

      setIncidents(incidents.filter(incident=>incident.id!==id));
    } catch (err) {
      alert('Erro ao deletar caso, tente novamente');
    }
  }

  // Logout function
  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }


  // Componnent
  return(
    <div className="profile-container">
      {/* Header */}
      <header>
        <img src={logoImg} alt="Be the Hero"/>
        <span>Bem vinda, {ongName}</span>

        <Link className="button" to="/incidents/new">Cadastrar novo caso
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041"/>
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      {/* Incidents list */}
      <ul>
        {/* Elements on react interations must a key */}
        {incidents.map(incidents=>(
          <li key={incidents.id}>
            <strong>CASO</strong>
            <p>{incidents.title}</p> 
        
            <strong>DESCRIÇÃO</strong>
            <p>{incidents.description}</p>
        
            <strong>VALOR</strong>
            <p>{Intl.NumberFormat('pt-BR', {
              style: 'currency', currency: 'BRL'
            }).format(incidents.value)}</p>
        
            <button onClick={()=>handleDeleteIncident(incidents.id)} 
            type="button"
            >
              <FiTrash2 size={20} color="#a8a8b3"/>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}