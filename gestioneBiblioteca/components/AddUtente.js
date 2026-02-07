import { ActivityIndicator, Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { BASE_URL } from '../firebaseConfig'


const AddUtente = () => {
  const [nome, setNome] = useState("")
  const [cognome, setCognome] = useState("")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const navigation = useNavigation()

  const oggi = new Date();

  const registraUtente = async () => {
    if (!nome || !cognome || !email) {
      Alert.alert("Errore: ", "Compilare tutti i campi")
      return;
    }

    setIsLoading(true)

    const utente = {
      nome: nome,
      cognome: cognome,
      email: email,
      data: oggi.toLocaleDateString("it-IT"),
      libri: []
    }

    try {
      const response = await fetch(`${BASE_URL}/utenti.json`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(utente)
      })
      if (response.ok) {
        setNome("")
        setCognome("")
        setEmail("")
        Alert.alert("Successo!", "Registrazione completata.", [{
          text: "Ok",
          onPress: () => navigation.goBack()
        }])
      } else {
        Alert.alert("Errore", "Qualcosa è andato storto!", [{
          text: "OK",
          onPress: () => navigation.goBack()
        }])
      }
    } catch (error) {
      Alert.alert("Errore", "Riprova più tardi")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.formContainer}>
      <Text style={styles.header}>Nuovo Utente</Text>
      <TextInput
        style={styles.input}
        placeholder='Nome'
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder='Cognome'
        value={cognome}
        onChangeText={setCognome}
      />

      <TextInput
        style={styles.input}
        placeholder='Email'
        value={email}
        autoCapitalize='none'
        keyboardType='email-address'
        onChangeText={setEmail}
      />
      <View
        style={styles.buttonContainer}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button
            title='Salva utente'
            onPress={registraUtente}
            disabled={isLoading}
          />
        )}

      </View>

    </View>
  )
}

export default AddUtente

const styles = StyleSheet.create({

  formContainer: {
    padding: 20,
    marginTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginTop: 2,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  buttonContainer: {
    marginTop: 10,
  }
})