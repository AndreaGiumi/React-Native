import {
  StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
  Pressable,
} from "react-native";
import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { FIREBASE_ENDPOINTS } from "../../../firebase/firebase";

const DeleteUser = () => {
  const [utenti, setUtenti] = useState([]);

  async function getUtenti() {
    try {
      let response = await fetch(FIREBASE_ENDPOINTS.utenti);

      if (!response.ok) throw new Error("Errore: " + response.status);

      let dati = await response.json();

      const listaUtenti = Object.keys(dati).map((key) => ({
        id: key,
        ...dati[key],
      }));

      const listaUtentiFiltrati = listaUtenti.filter((u) => {
        return !u.libri || u.libri.length === 0;
      });

      setUtenti(listaUtentiFiltrati);
    } catch (error) {
      Alert.alert("Errore: " + error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getUtenti();
    }, []),
  );

  async function deleteUser(utenteId) {
    try {
      let response = await fetch(FIREBASE_ENDPOINTS.dettaglioUtenti(utenteId), {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Errore: " + response.status);

      getUtenti();
    } catch (error) {
      Alert.alert("Errore: " + error);
    }
  }

  return (
    <FlatList
      data={utenti}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return (
          <Pressable onPress={() => deleteUser(item.id)}>
            <View style={styles.card}>
              <Text style={styles.testo}>{item.nome}</Text>
              <Text style={styles.testo}>{item.cognome}</Text>
            </View>
          </Pressable>
        );
      }}
    />
  );
};

export default DeleteUser;

const styles = StyleSheet.create({
  card: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    padding: 20,
  },
  testo: {
    fontSize: 20,
  },
});
