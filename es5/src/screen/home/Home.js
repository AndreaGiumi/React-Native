import { StyleSheet, View, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.view}>
        <Button
          title="Aggiungi libro"
          onPress={() => navigation.navigate("AddBook")}
        />
      </View>
      <View style={styles.view}>
        <Button
          title="Aggiungi Utente"
          onPress={() => navigation.navigate("AddUser")}
        />
      </View>
      <View style={styles.view}>
        <Button
          title="Noleggia Libro"
          onPress={() => navigation.navigate("RentStep1")}
        />
      </View>
      <View style={styles.view}>
        <Button
          title="Restituisci Libro"
          onPress={() => navigation.navigate("ReturnStep1")}
        />
      </View>
      <View style={styles.view}>
        <Button
          title="Modifica Libro"
          onPress={() => navigation.navigate("ModBook1")}
        />
      </View>
      <View style={styles.view}>
        <Button
          title="Modifica Utente"
          onPress={() => navigation.navigate("ModUser1")}
        />
      </View>
      <View style={styles.view}>
        <Button
          title="Elimina Libro"
          onPress={() => navigation.navigate("DelBook")}
        />
      </View>
      <View style={styles.view}>
        <Button
          title="Elimina Utente"
          onPress={() => navigation.navigate("DelUser")}
        />
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  view: {
    marginBottom: 16,
  },
});
