import { StyleSheet, Text, View, Pressable, FlatList, Alert } from 'react-native'
import React, { useCallback, useState } from 'react'
import { BASE_URL } from '../firebaseConfig'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'

const RentBook2 = () => {
  const route = useRoute()

  const { libro } = route.params

  const navigation = useNavigation()

  const [utenti, setUtenti] = useState([])

  async function getUtenti() {
    try {
      const response = await fetch(`${BASE_URL}/utenti.json`)

      if (!response.ok) throw new Error("Errore" + response.status)

      const dati = await response.json()

      const listaUtenti = Object.keys(dati).map((key) => ({
        id: key,
        ...dati[key],
      }));
      setUtenti(listaUtenti)
    } catch (error) {
      Alert.alert("Error" + error)
    }

  }

  useFocusEffect(
    useCallback(() => {
      getUtenti()
    }, [])
  )


  async function newNoleggio(utente) {

    try {
      const oggi = new Date()

      const response = await fetch(`${BASE_URL}/noleggi.json`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idLibro: libro.id,
          idUtente: utente.id,
          stato: "Attivo",
          dataInizio: oggi.toLocaleDateString("it-IT"),
          dataFine: null
        })
      })
      const response2 = await fetch(`${BASE_URL}/libri/${libro.id}.json`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ disponibile: false })
      })

      const response3 = await fetch(`${BASE_URL}/utenti/${utente.id}.json`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          libri: [...(utente.libri || []), libro.id]
        })
      })

      const [responseA, responseB, responseC] = await Promise.all([
        response,
        response2,
        response3
      ])

      if (!responseA.ok) throw new Error("Error" + responseA.status)
      if (!responseB.ok) throw new Error("Error" + responseB.status)
      if (!responseC.ok) throw new Error("Error" + responseC.status)


      Alert.alert("Successo!", "Affitto completato")
      navigation.goBack()

    } catch (error) {
      Alert.alert("Errore" + error)
    }
  }

  return (
    <FlatList
      data={utenti}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return (
          <Pressable
            style={styles.itemContainer}
            onPress={() => newNoleggio(item)}>
            <View>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.cognome}>{item.cognome}</Text>
              <Text style={styles.email}>{item.email}</Text>

            </View>

          </Pressable>
        )
      }}
      ListEmptyComponent={<Text style={styles.emptyText}>Nessun libro da restituire</Text>}

    />
  )
}

export default RentBook2

const styles = StyleSheet.create({
  itemContainer: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  nome: { fontWeight: 'bold', fontSize: 18 },
  cognome: { fontStyle: 'italic', color: 'gray' },
  email: { fontSize: 14 },
  emptyText: { textAlign: 'center', marginTop: 20 }
})