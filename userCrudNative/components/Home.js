import { useNavigation } from "@react-navigation/native";
import { collection, doc, onSnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from "react-native";
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
  return (
    
    <View style={styles.container}>
        <FlatList 
        data={users}
        keyExtractor={(item)=>item.id}
        renderItem={({ item })=>(
            <View>
                <Text>{item.nome}</Text>
            </View>
        )}
        >

        </FlatList>
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