import React, { useState } from 'react';
import CompteList from './components/CompteList';
import CompteForm from './components/CompteForm';
import CompteFiltres from './components/CompteFiltres';

function App() {
  const [version, setVersion] = useState(0);

  const rafraichir = () => setVersion(version + 1);

  return (
    <div className="bg-light pb-5">
      <nav className="navbar navbar-dark bg-dark mb-4">
        <div className="container">
          <span className="navbar-brand mb-0 h1">Banque — Gestion des comptes</span>
          <span className="text-white-50 small">Spring Boot + React</span>
        </div>
      </nav>

      <CompteForm onAjout={rafraichir} />
      <CompteList version={version} />
      <CompteFiltres />
    </div>
  );
}

export default App;
