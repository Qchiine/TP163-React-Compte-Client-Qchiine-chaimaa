import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('axios');

beforeEach(() => {
  require('axios').get.mockResolvedValue({ data: [] });
  require('axios').post.mockResolvedValue({ data: {} });
  require('axios').delete.mockResolvedValue({ data: {} });
});

test('affiche le formulaire, la liste et les filtres', () => {
  render(<App />);
  expect(screen.getByText(/Ajouter un Compte/i)).toBeInTheDocument();
  expect(screen.getByText(/Liste des Comptes/i)).toBeInTheDocument();
  expect(screen.getByText(/Rechercher dans le portefeuille/i)).toBeInTheDocument();
});

test('le formulaire expose les champs solde, date et type', () => {
  render(<App />);
  expect(screen.getByLabelText(/^Solde$/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Date de Création/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/^Type$/i)).toBeInTheDocument();
});

test('le tableau affiche ses quatre colonnes', () => {
  render(<App />);
  expect(screen.getByRole('columnheader', { name: 'ID' })).toBeInTheDocument();
  expect(screen.getByRole('columnheader', { name: 'Solde' })).toBeInTheDocument();
  expect(screen.getByRole('columnheader', { name: /Date de Cr/i })).toBeInTheDocument();
  expect(screen.getByRole('columnheader', { name: 'Type' })).toBeInTheDocument();
});
