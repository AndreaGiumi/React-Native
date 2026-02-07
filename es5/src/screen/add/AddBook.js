import { StyleSheet, View, TextInput, Button, Alert } from "react-native";
import React, { useState } from "react";
import { FIREBASE_ENDPOINTS } from "../../../firebase/firebase";

const AddBook = () => {
  const [titolo, setTitolo] = useState("");
  const [autore, setAutore] = useState("");

  async function AggiungiLibro() {
    try {
      if (!titolo.trim() || !autore.trim()) {
        Alert.alert("Inserimento incompleto");
        return;
      }

      let response = await fetch(FIREBASE_ENDPOINTS.libri, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titolo: titolo,
          autore: autore,
          disponibile: true,
        }),
      });

      if (!response.ok) throw new Error("Errore: " + response.status);

      Alert.alert("Inserimento riuscito");
      setTitolo("");
      setAutore("");
    } catch (error) {
      Alert.alert("Errore: " + error);
    }
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.campo}
        placeholder="titolo"
        value={titolo}
        onChangeText={(text) => setTitolo(text)}
      />

      <TextInput
        style={styles.campo}
        placeholder="autore"
        value={autore}
        onChangeText={(text) => setAutore(text)}
      />

      <Button title="AGGIUNGI LIBRO" onPress={() => AggiungiLibro()} />
    </View>
  );
};

export default AddBook;

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
