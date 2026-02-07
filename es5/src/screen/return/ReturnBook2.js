import {
  StyleSheet,
  Text,
  View,
  Alert,
  Pressable,
  FlatList,
} from "react-native";
import React, { useState, useCallback } from "react";
import { FIREBASE_ENDPOINTS } from "../../../firebase/firebase";
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from "@react-navigation/native";

const ReturnBook2 = () => {
  const route = useRoute();
  const { utente } = route.params;

  const navigation = useNavigation();

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

      const listaLibriFiltrati = listaLibri.filter((l) =>
        utente.libri.includes(l.id),
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

  async function fx1(libro) {
    try {
      const oggi = new Date();

      let response1 = fetch(FIREBASE_ENDPOINTS.dettaglioLibri(libro.id), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          disponibile: true,
        }),
      });

      let response2 = fetch(FIREBASE_ENDPOINTS.dettaglioUtenti(utente.id), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          libri: utente.libri.filter((id) => id !== libro.id),
        }),
      });

      let response3 = fetch(FIREBASE_ENDPOINTS.noleggi);

      const [responseA, responseB, responseC] = await Promise.all([
        response1,
        response2,
        response3,
      ]);

      if (!responseA.ok) throw new Error("Errore: " + responseA.status);
      if (!responseB.ok) throw new Error("Errore: " + responseB.status);
      if (!responseC.ok) throw new Error("Errore: " + responseC.status);

      let dati = await responseC.json();

      const listaNoleggi = Object.keys(dati).map((key) => ({
        id: key,
        ...dati[key],
      }));

      let idNoleggioDaTerminare = null;

      listaNoleggi.forEach((n) => {
        if (
          n.libroId === libro.id &&
          n.utenteId === utente.id &&
          n.stato === "Attivo"
        ) {
          idNoleggioDaTerminare = n.id;
        }
      });

      if (!idNoleggioDaTerminare) throw new Error("Errore");

      let response4 = await fetch(
        FIREBASE_ENDPOINTS.dettaglioNoleggi(idNoleggioDaTerminare),
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            dataFine: oggi.toLocaleDateString("it-IT"),
            stato: "Terminato",
          }),
        },
      );

      if (!response4.ok) throw new Error("Errore");

      Alert.alert("Successo", "Restituzione completata");
      navigation.goBack();
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
          <Pressable onPress={() => fx1(item)}>
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

export default ReturnBook2;

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
