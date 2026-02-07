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

const ModifyBookStep1 = () => {
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

      setLibri(listaLibri);
    } catch (error) {
      Alert.alert("Errore: " + error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getLibri();
    }, []),
  );

  return (
    <FlatList
      data={libri}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return (
          <Pressable
            onPress={() => navigation.navigate("ModBook2", { libro: item })}
          >
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

export default ModifyBookStep1;

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
