import React, { useEffect, useState } from 'react';

import './global.css';
import './App.css';
import './sidebar.css';
import './main.css';

import apiService from './services/apiService';

function App() {
  const [github_username, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const [developers, setDevelopers] = useState([]);

  async function handleAddDeveloper(e) {
    e.preventDefault();

    const response = await apiService.post('/developers', {
      github_username,
      techs,
      latitude,
      longitude
    });

    console.log(response);

    setGithubUsername('');
    setTechs('');

    setDevelopers([...developers, response.data]);
  }

  useEffect(() => {
    async function loadDevelopers() {
      const response = await apiService.get('/developers');

      setDevelopers(response.data);
    }

    loadDevelopers();
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      err => {
        console.log(err);
      },
      {
        timeout: 30000
      }
    );
  }, []);

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={handleAddDeveloper}>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do Github</label>
            <input
              name="github_username"
              id="github_username"
              required
              value={github_username}
              onChange={e => setGithubUsername(e.target.value)}
            />
          </div>
          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input
              name="techs"
              id="techs"
              required
              value={techs}
              onChange={e => setTechs(e.target.value)}
            />
          </div>
          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latidude">Latitude</label>
              <input
                name="latidude"
                id="latidude"
                required
                value={latitude}
                onChange={e => setLatitude(e.target.value)}
              />
            </div>
            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input
                name="longitude"
                id="longitude"
                required
                value={longitude}
                onChange={e => setLongitude(e.target.value)}
              />
            </div>
          </div>
          <button type="submit">Salvar</button>
        </form>
      </aside>
      <main>
        <ul>
          {developers.map(dev => (
            <li key={dev._id} className="dev-item">
              <header>
                <img src={dev.avatar_url} alt={dev.name} />
                <div className="user-info">
                  <strong>{dev.name}</strong>
                  <span>{dev.techs.join(', ')}</span>
                </div>
              </header>
              <p>{dev.bio}</p>
              <a href={`https://github.com/${dev.github_username}`}>
                Acessar perfil do Github
              </a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
