import React from "react";

import "./global.css";
import "./App.css";
import "./sidebar.css";

function App() {
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do Github</label>
            <input name="github_username" id="github_username" required />
          </div>
          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input name="techs" id="techs" required />
          </div>
          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latidude">Latitude</label>
              <input name="latidude" id="latidude" required />
            </div>
            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input name="longitude" id="longitude" required />
            </div>
          </div>
          <button type="submit">Salvar</button>
        </form>
      </aside>
      <main>
        <ul>
          <li className="dev-item">
            <header>
              <img
                src="https://avatars3.githubusercontent.com/u/11803606?s=460&v=4"
                alt="Leandro Ferreira"
              />
              <div className="user-info">
                <strong>Leandro Ferreira</strong>
                <span>ReactJs, NodeJS</span>
              </div>
            </header>
            <p>Desenvolvedor de Software Full Stack</p>
            <a href="https://github.com/leanfj">Acessar perfil do Github</a>
          </li>
        </ul>
      </main>
    </div>
  );
}

export default App;
