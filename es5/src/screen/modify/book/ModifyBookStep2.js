import { StyleSheet, View, Alert, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { FIREBASE_ENDPOINTS } from "../../../../firebase/firebase";
import { useNavigation, useRoute } from "@react-navigation/native";

const ModifyBookStep2 = () => {
  const route = useRoute();
  const { libro } = route.params;

  const navigation = useNavigation();

  const [titolo, setTitolo] = useState(libro.titolo);
  const [autore, setAutore] = useState(libro.autore);

  async function modifyBook() {
    try {
      if (!titolo.trim() || !autore.trim()) {
        Alert.alert("Inserimento incompleto");
        return;
      }

      let response = await fetch(FIREBASE_ENDPOINTS.dettaglioLibri(libro.id), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titolo: titolo,
          autore: autore,
        }),
      });

      if (!response.ok) throw new Error("Errore: " + response.status);

      Alert.alert("Modifica effettuata");

      navigation.goBack();
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

      <Button title="MODIFICA LIBRO" onPress={() => modifyBook()} />
    </View>
  );
};

export default ModifyBookStep2;

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
