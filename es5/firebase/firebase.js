const BASE_URL =
  "https://biblioteca-8979b-default-rtdb.europe-west1.firebasedatabase.app";

export const FIREBASE_ENDPOINTS = {
  libri: `${BASE_URL}/libri.json`,
  utenti: `${BASE_URL}/utenti.json`,
  noleggi: `${BASE_URL}/noleggi.json`,

  dettaglioLibri: (id) => `${BASE_URL}/libri/${id}.json`,
  dettaglioUtenti: (id) => `${BASE_URL}/utenti/${id}.json`,
  dettaglioNoleggi: (id) => `${BASE_URL}/noleggi/${id}.json`,
};
