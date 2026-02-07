import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { BASE_URL } from '../firebaseConfig'

const ModifyUser2 = () => {
    const route = useRoute()
    const { utente } = route.params
    const navigation = useNavigation()

    const [nome, setNome] = useState(utente.nome)
    const [cognome, setCognome] = useState(utente.cognome)
    const [email, setEmail] = useState(utente.email)

    try {
        async function patchUtenti() {
            const response = await fetch(`${BASE_URL}/utenti.json`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nome: nome,
                    cognome: cognome,
                    email: email
                })
            })

            if (!response.ok) throw new Error("Errore " + response.status)

            Alert.alert("Successo!", "Modifica effettuata.")
            navigation.goBack()

        }
    } catch (error) {
        Alert.alert("Errore", error)
    }
    return (
        <>
            <TextInput
                placeholder='Nome'
                value={nome}
                onChangeText={setNome} />

            <TextInput
                placeholder='Cognome'
                value={cognome}
                onChangeText={setCognome} />
            <TextInput
                placeholder='Email'
                value={email}
                onChangeText={setEmail}/>
            <Button
                title='Modifica utente'
                onPress={()=>patchUtenti()}/>
    
    </>


    )
}

export default ModifyUser2

const styles = StyleSheet.create({})