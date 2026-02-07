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

const DeleteBook = () => {
  const [libri, setLibri] = useState([]);

  async function getLibri() {
    try {
      let response = await fetch(FIREBASE_ENDPOINTS.libri);

      if (!response.ok) throw new Error("Errore: " + response.status);

      let dati = await response.json();

      const listaLibri = Object.keys(dati).map((key) => ({
        id: key,
        ...dati[key],
      }));

      const listaLibriFiltrati = listaLibri.filter(
        (l) => l.disponibile === true,
      );

      setLibri(listaLibriFiltrati);
    } catch (error) {
      Alert.alert("Errore: " + error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getLibri();
    }, []),
  );

  async function deleteBook(libroId) {
    try {
      let response = await fetch(FIREBASE_ENDPOINTS.dettaglioLibri(libroId), {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Errore: " + response.status);

      getLibri();
    } catch (error) {
      Alert.alert("Errore: " + error);
    }
  }

  return (
    <FlatList
      data={libri}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return (
          <Pressable onPress={() => deleteBook(item.id)}>
            <View style={styles.card}>
              <Text style={styles.testo}>{item.titolo}</Text>
              <Text style={styles.testo}>{item.autore}</Text>
            </View>
          </Pressable>
        );
      }}
    />
  );
};

export default DeleteBook;

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
