import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { BASE_URL } from '../firebaseConfig'

const ModifyUser = () => {
    const navigation = useNavigation()
    const [utenti, setUtenti] = useState([])

    async function getUtenti() {
        try {
            const response = await fetch(`${BASE_URL}/utenti.json`)

            if (!response.ok) throw new Error("Errore")

            const dati = await response.json()

            const listaUtenti = Object.keys(dati).map((key) => ({
                id: key,
                ...dati[key]
            }))

            setUtenti(listaUtenti)
        } catch (error) {
            Alert.alert("Error", error)
        }

    }
    useFocusEffect(
        useCallback(() => {
            getUtenti()
        }, [])
    )
    return (
        <FlatList
            data={utenti}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
                return (
                    <Pressable
                        onPress={() => navigation.navigate("ModifyUser2", { utente: item })}>
                        <View>
                            <Text>{item.nome}</Text>
                            <Text>{item.cognome}</Text>
                            <Text>{item.email}</Text>
                        </View>
                    </Pressable>

                )
            }}
        />
    )
}

export default ModifyUser

const styles = StyleSheet.create({})