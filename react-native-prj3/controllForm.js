import { Alert } from "react-native";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function checkForm(nome, email, messaggio) {
  if (nome === '') {
    Alert.alert("Errore!", "Inserire il nome!");
    return;
  } else if (email === '' || !emailRegex.test(email)) {
    Alert.alert("Errore!", "Email non valida!");
    return;
  } else if (messaggio === '') {
    Alert.alert("Errore!", "Messaggio non inserito!");
    return;
  }

  console.log(`\nNome: ${nome} \nEmail: ${email} \nMessaggio: ${messaggio}`);
  Alert.alert("Conferma Ricezione Dati", "Dati ricevuti con successo.");
}

export function isValidForm(nome, email, messaggio) {
  if (nome === '') {
    return false;
  } else if (email === '' || !emailRegex.test(email)) {
    return false;
  } else if (messaggio === '') {
    return false;
  }
  return true;
}
