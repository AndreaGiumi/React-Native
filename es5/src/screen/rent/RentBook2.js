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

const RentBook2 = () => {
  const route = useRoute();
  const { libro } = route.params;

  const navigation = useNavigation();

  const [utenti, setUtenti] = useState([]);

  async function getUtenti() {
    try {
      let response = await fetch(FIREBASE_ENDPOINTS.utenti);

      if (!response.ok) throw new Error("Errore");

      let dati = await response.json();

      let listaUtenti = Object.keys(dati).map((key) => ({
        id: key,
        ...dati[key],
      }));

      setUtenti(listaUtenti);
    } catch (error) {
      Alert.alert("Errore: " + error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getUtenti();
    }, []),
  );

  async function fx1(utente) {
    try {
      const oggi = new Date();

      let response1 = fetch(FIREBASE_ENDPOINTS.noleggi, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          libroId: libro.id,
          utenteId: utente.id,
          stato: "Attivo",
          dataInizio: oggi.toLocaleDateString("it-IT"),
          dataFine: null,
        }),
      });

      let response2 = fetch(FIREBASE_ENDPOINTS.dettaglioUtenti(utente.id), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ libri: [...(utente.libri || []), libro.id] }),
      });

      let response3 = fetch(FIREBASE_ENDPOINTS.dettaglioLibri(libro.id), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ disponibile: false }),
      });

      const [responseA, responseB, responseC] = await Promise.all([
        response1,
        response2,
        response3,
      ]);

      if (!responseA.ok) throw new Error("Errore: " + responseA.status);
      if (!responseB.ok) throw new Error("Errore: " + responseB.status);
      if (!responseC.ok) throw new Error("Errore: " + responseC.status);

      Alert.alert("Successo", "Affitto completato");
      navigation.goBack();
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
          <Pressable onPress={() => fx1(item)}>
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

export default RentBook2;

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
