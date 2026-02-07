import { Alert, StyleSheet, Text, TextInput, View, Button, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { BASE_URL } from '../firebaseConfig'

const ModifyBook2 = () => {
  const route = useRoute()
  const navigation = useNavigation()

  const { libro } = route.params

  const [titolo, setTitolo] = useState(libro.titolo)
  const [autore, setAutore] = useState(libro.autore)
  const [genere, setGenere] = useState(libro.genere)

  async function patchLibro() {
    try {
      if (!titolo.trim() || !autore.trim() || !genere.trim()) {
        Alert.alert("Errore", "Tutti i campi sono obbligatori")
        return;
      }

      const response = await fetch(`${BASE_URL}/libri/${libro.id}.json`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({
          titolo: titolo,
          autore: autore,
          genere: genere
        })
      })

      if (!response.ok) {
        throw new Error("Impossibile aggiornare il libro")
      }

      Alert.alert("Successo!", "Modifica completata", [
        { text: "OK", onPress: () => navigation.goBack() }
      ])
      
    } catch (error) {
      Alert.alert("Errore", error.message)
    }
  }

  return (
    <>
      <Text style={styles.label}>Titolo:</Text>
      <TextInput
        style={styles.input}
        placeholder='Titolo'
        value={titolo}
        onChangeText={setTitolo}
      />
      
      <Text style={styles.label}>Autore:</Text>
      <TextInput
        style={styles.input}
        placeholder='Autore'
        value={autore}
        onChangeText={setAutore}
      />
      
      <Text style={styles.label}>Genere:</Text>
      <TextInput
        style={styles.input}
        placeholder='Genere'
        value={genere}
        onChangeText={setGenere}
      />
      
      <View style={{ marginTop: 20 }}>
        <Button 
          title='Salva Modifiche'
          onPress={patchLibro}
       />
      </View>
    </>

  )
}

export default ModifyBook2

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16
  }
})