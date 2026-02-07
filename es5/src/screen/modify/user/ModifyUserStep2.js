import { StyleSheet, View, Alert, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { FIREBASE_ENDPOINTS } from "../../../../firebase/firebase";
import { useNavigation, useRoute } from "@react-navigation/native";

const ModifyUserStep2 = () => {
  const route = useRoute();
  const { utente } = route.params;

  const navigation = useNavigation();

  const [nome, setNome] = useState(utente.nome);
  const [cognome, setCognome] = useState(utente.cognome);

  async function modifyUser() {
    try {
      let response = await fetch(
        FIREBASE_ENDPOINTS.dettaglioUtenti(utente.id),
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome: nome,
            cognome: cognome,
          }),
        },
      );

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

      <Button title="MODIFICA UTENTE" onPress={() => modifyUser()} />
    </View>
  );
};

export default ModifyUserStep2;

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
