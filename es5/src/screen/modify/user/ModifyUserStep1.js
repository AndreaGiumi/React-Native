import {
  StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
  Pressable,
} from "react-native";
import React, { useState, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { FIREBASE_ENDPOINTS } from "../../../../firebase/firebase";

const ModifyUserStep1 = () => {
  const navigation = useNavigation();

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

  return (
    <FlatList
      data={utenti}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return (
          <Pressable
            onPress={() => navigation.navigate("ModUser2", { utente: item })}
          >
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

export default ModifyUserStep1;

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
