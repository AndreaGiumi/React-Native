import { StyleSheet, View, TextInput, Button, Alert } from "react-native";
import React, { useState } from "react";
import { FIREBASE_ENDPOINTS } from "../../../firebase/firebase";

const AddUser = () => {
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");

  async function AggiungiUtente() {
    try {
      if (!nome.trim() || !cognome.trim()) {
        Alert.alert("Inserimento incompleto");
        return;
      }

      let response = await fetch(FIREBASE_ENDPOINTS.utenti, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: nome,
          cognome: cognome,
          libri: [],
        }),
      });

      if (!response.ok) throw new Error("Errore: " + response.status);

      Alert.alert("Inserimento riuscito");
      setNome("");
      setCognome("");
    } catch (error) {
      Alert.alert("Errore: " + error);
    }
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.campo}
        placeholder="nome"
        value={nome}
        onChangeText={(text) => setNome(text)}
      />

      <TextInput
        style={styles.campo}
        placeholder="cognome"
        value={cognome}
        onChangeText={(text) => setCognome(text)}
      />

      <Button title="AGGIUNGI UTENTE" onPress={() => AggiungiUtente()} />
    </View>
  );
};

export default AddUser;

const styles = StyleSheet.create({
  campo: {
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    fontSize: 25,
  },
  container: {
    padding: 25,
  },
});
