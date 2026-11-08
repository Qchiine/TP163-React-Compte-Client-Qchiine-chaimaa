import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

/**
 * Affiche le portefeuille : tableau des comptes, totaux et suppression.
 *
 * @param {object} props
 * @param {number} props.version compteur incremente par le formulaire pour forcer le rechargement
 */
function CompteList({ version }) {
  const [comptes, setComptes] = useState([]);
  const [erreur, setErreur] = useState('');

  useEffect(() => {
    axios.get(`${API_BASE_URL}/comptes`)
      .then(response => {
        setComptes(response.data);
        setErreur('');
      })
      .catch(error => setErreur('Impossible de charger les comptes : ' + error.message));
  }, [version]);

  const supprimer = (id) => {
    axios.delete(`${API_BASE_URL}/comptes/${id}`)
      .then(() => setComptes(comptes.filter(compte => compte.id !== id)))
      .catch(error => setErreur('Suppression impossible : ' + error.message));
  };

  const total = comptes.reduce((somme, compte) => somme + compte.solde, 0);

  return (
    <div className="container mt-4">
      <h2>Liste des Comptes</h2>

      {erreur && <div className="alert alert-danger">{erreur}</div>}

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Solde</th>
            <th>Date de Création</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {comptes.map(compte => (
            <tr key={compte.id}>
              <td>{compte.id}</td>
              <td>{compte.solde}</td>
              <td>{compte.dateCreation}</td>
              <td>{compte.type}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => supprimer(compte.id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="fw-bold">
        {comptes.length} compte(s) — masse totale : {total.toFixed(2)}
      </p>
    </div>
  );
}

export default CompteList;
