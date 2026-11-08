import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

/**
 * Formulaire d'ajout d'un compte.
 *
 * @param {object} props
 * @param {Function} props.onAjout appele apres une creation reussie pour rafraichir la liste
 */
function CompteForm({ onAjout }) {
  const [compte, setCompte] = useState({ solde: '', dateCreation: '', type: 'COURANT' });
  const [message, setMessage] = useState('');
  const [enCours, setEnCours] = useState(false);

  const handleChange = (e) => {
    setCompte({ ...compte, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnCours(true);
    axios.post(`${API_BASE_URL}/comptes`, {
      solde: Number(compte.solde),
      dateCreation: compte.dateCreation,
      type: compte.type,
    })
      .then(() => {
        setMessage('Compte ajouté');
        setCompte({ solde: '', dateCreation: '', type: 'COURANT' });
        if (onAjout) {
          onAjout();
        }
      })
      .catch(error => setMessage('Erreur : ' + error.message))
      .finally(() => setEnCours(false));
  };

  return (
    <div className="container mt-4">
      <h2>Ajouter un Compte</h2>

      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="solde">Solde</label>
          <input
            id="solde"
            type="number"
            name="solde"
            className="form-control"
            value={compte.solde}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="dateCreation">Date de Création</label>
          <input
            id="dateCreation"
            type="date"
            name="dateCreation"
            className="form-control"
            value={compte.dateCreation}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="type">Type</label>
          <select
            id="type"
            name="type"
            className="form-select"
            value={compte.type}
            onChange={handleChange}
          >
            <option value="COURANT">Courant</option>
            <option value="EPARGNE">Épargne</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary" disabled={enCours}>
          {enCours ? 'Envoi...' : 'Ajouter'}
        </button>
      </form>
    </div>
  );
}

export default CompteForm;
