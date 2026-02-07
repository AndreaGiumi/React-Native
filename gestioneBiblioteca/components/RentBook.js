import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { BASE_URL } from '../firebaseConfig'

const RentBook = () => {
  const navigation = useNavigation()
  const [libri, setLibri] = useState([])

  const getLibri = async () => {
    try {
      const response = await fetch(`${BASE_URL}/libri.json`)
      if (!response.ok) throw new Error("Errore " + response.status)

      const dati = await response.json()

      if (!dati) {
        setLibri([])
        return
      }

      const listaLibri = Object.keys(dati).map((key) => ({
        id: key,
        ...dati[key],
      }));

      const filterLibri = listaLibri.filter(
        (l) => l.disponibile === true
      );
      setLibri(filterLibri);

    } catch (error) {
      Alert.alert("Errore", error.message)
    }
  }


  useFocusEffect(
    useCallback(() => {
      getLibri()
    }, [])
  )

  return (
    <FlatList
      data={libri}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return (
          <Pressable
            style={styles.itemContainer}
            onPress={() => navigation.navigate("RentBook2", { libro: item })} 
          >
            <View>
              <Text style={styles.titolo}>Titolo: {item.titolo}</Text>
              <Text> Autore: {item.autore}</Text>
              <Text style={styles.genere}>Genere: {item.genere}</Text>
            </View>
          </Pressable>
        )
      }}
      ListEmptyComponent={<Text style={styles.emptyText}>Nessun libro disponibile</Text>}
    />
  )
}

export default RentBook

const styles = StyleSheet.create({
  itemContainer: { 
    padding: 15, 
    marginBottom: 10, 
    backgroundColor: '#f9f9f9', 
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  titolo: { fontWeight: 'bold', fontSize: 18 },
  genere: { fontStyle: 'italic', color: 'gray' },
  emptyText: { textAlign: 'center', marginTop: 20 }
})