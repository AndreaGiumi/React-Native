import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect, act } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Pressable
} from "react-native";


const Home = ({ navigation }) => {


  return (
    <>
      <View style={styles.view}>
        <Button
          title="Carica utente"
          onPress={() => navigation.navigate("AddUtente")} />
      </View>
      <View style={styles.view}>
        <Button
          title="Carica libro"
          onPress={() => navigation.navigate("AddBook")} />
      </View>
      <View style={styles.view}>
        <Button
          title="Noleggia libro"
          onPress={() => navigation.navigate("RentBook")} />
      </View>
      <View style={styles.view}>
        <Button
          title="Restituisci libro"
          onPress={() => navigation.navigate("ReturnBook")} />
      </View>
      <View style={styles.view}>
        <Button
          title="Modifica libro"
          onPress={() => navigation.navigate("ModifyBook")} />
      </View>
      <View style={styles.view}>
        <Button
          title="Modifica utente"
          onPress={() => navigation.navigate("ModifyUser")}/>
      </View>
      <View style={styles.view}>
        <Button
          title="Elimina libro"
          onPress={()=>navigation.navigate("DeleteBook")}/>
      </View>

      <View style={styles.view}>
        <Button
          title="Elimina utente"
          onPress={()=>navigation.navigate("DeleteUser")}/>
      </View>


    </>


  )
}

export default Home

const styles = StyleSheet.create({
  view: {
    marginBottom: 16
  }

})