import React, { useEffect, useState } from 'react';

import './global.css';
import './App.css';
import './sidebar.css';
import './main.css';

import DeveloperItem from './components/developerItem';
import DeveloperForm from './components/developerForm';

import apiService from './services/apiService';

function App() {
  const [developers, setDevelopers] = useState([]);

  async function handleAddDeveloper(data) {
    const response = await apiService.post('/developers', data);

    console.log(response);

    setDevelopers([...developers, response.data]);
  }

  useEffect(() => {
    async function loadDevelopers() {
      const response = await apiService.get('/developers');

      setDevelopers(response.data);
    }

    loadDevelopers();
  }, []);

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DeveloperForm onSubmit={handleAddDeveloper}></DeveloperForm>
      </aside>
      <main>
        <ul>
          {developers.map(dev => (
            <DeveloperItem key={dev._id} dev={dev}></DeveloperItem>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
