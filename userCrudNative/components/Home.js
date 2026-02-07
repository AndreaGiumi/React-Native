import { useNavigation } from "@react-navigation/native";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useState, useEffect, act } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { db } from "../firebaseConfig";

const Home = () => {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const userList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
    });

    return () => unsubscribe();
  }, []);


  function handleDelete(id) {
    Alert.alert(
      "Attenzione!",
      "Vuoi davvero cancellare l'utente?",
      [
        {
          text: "Annulla",
          style: "cancel",

        },
        {
          text: "Cancella",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, "users", id))
            } catch (error) {
              console.log(error)
              Alert.alert("Errore", "Si è verificato un errore durante l'eliminazione dell'utente" + error.message)
            }
          }
        }
      ]
    );
  }


  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.name}>
          {item.nome} {item.cognome}
        </Text>
        <Text style={styles.details}>{item.email} </Text>
        <Text style={styles.details}>{item.telefono} </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.btn, styles.editBtn]}
          onPress={() => navigation.navigate("AddEditUser", { user: item })}
        >
          <Text style={styles.btnText}>Modifica </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.deleteBtn]} onPress={()=>handleDelete(item.id)}>
          <Text style={styles.btnText}>Cancella </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}> Nessun utente Trovato</Text>
        }
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddEditUser")}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5fe" },
  card: {
    backgroundColor: "white",
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  info: { flex: 1 },
  name: { fontSize: 18, fontWeight: "bold" },
  details: { fontSize: 16, color: "grey", marginTop: 2 },
  actions: { flexDirection: "column", gap: 5 },
  btn: {
    marginHorizontal: 5,
    padding: 10,
  },
  editBtn: { backgroundColor: "#f0ad4e" },
  deleteBtn: { backgroundColor: "#d9534f" },
  btnText: { color: "white", fontWeight: "bold" },
  emptyText: { textAlign: "center", marginTop: 20, fontSize: 16, color: "grey" },
  fab: {
    position: "absolute",
    width: 60,
    height: 60,
    bottom: 30,
    right: 30,
    backgroundColor: "#5067FF",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
  fabText: { color: "white", fontSize: 30 },
});