import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

/**
 * Filtres du portefeuille : par nature de compte ou par solde minimal.
 * <p>
 * Le TP s'arrete a l'affichage de la liste complete. En agence, on cherche
 * plutot « les comptes epargne » ou « les comptes au-dessus de 5000 » : ce
 * composant s'appuie sur les endpoints de filtre du back-end.
 */
function CompteFiltres() {
  const [type, setType] = useState('COURANT');
  const [seuil, setSeuil] = useState('');
  const [resultats, setResultats] = useState(null);
  const [titre, setTitre] = useState('');
  const [erreur, setErreur] = useState('');

  const parType = (e) => {
    e.preventDefault();
    axios.get(`${API_BASE_URL}/comptes/type/${type}`)
      .then(response => {
        setResultats(response.data);
        setTitre(`Comptes de type ${type}`);
        setErreur('');
      })
      .catch(error => setErreur('Filtre impossible : ' + error.message));
  };

  const parSeuil = (e) => {
    e.preventDefault();
    axios.get(`${API_BASE_URL}/comptes/riches`, { params: { seuil } })
      .then(response => {
        setResultats(response.data);
        setTitre(`Comptes dont le solde dépasse ${seuil}`);
        setErreur('');
      })
      .catch(error => setErreur('Filtre impossible : ' + error.message));
  };

  return (
    <div className="container mt-4">
      <h2>Rechercher dans le portefeuille</h2>

      {erreur && <div className="alert alert-danger">{erreur}</div>}

      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <form onSubmit={parType} className="d-flex gap-2">
            <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="COURANT">Courant</option>
              <option value="EPARGNE">Épargne</option>
            </select>
            <button type="submit" className="btn btn-outline-primary text-nowrap">Par type</button>
          </form>
        </div>
        <div className="col-md-6">
          <form onSubmit={parSeuil} className="d-flex gap-2">
            <input
              type="number"
              className="form-control"
              placeholder="Solde minimal"
              value={seuil}
              onChange={(e) => setSeuil(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-outline-success text-nowrap">Par seuil</button>
          </form>
        </div>
      </div>

      {resultats && (
        <div>
          <h5>{titre} — {resultats.length} résultat(s)</h5>
          <ul className="list-group">
            {resultats.map(compte => (
              <li key={compte.id} className="list-group-item d-flex justify-content-between">
                <span>Compte {compte.id} ({compte.type})</span>
                <span className="fw-bold">{compte.solde}</span>
              </li>
            ))}
            {resultats.length === 0 && (
              <li className="list-group-item">Aucun compte ne correspond à ce critère.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CompteFiltres;
