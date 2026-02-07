import { Alert, StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { BASE_URL } from '../firebaseConfig'

const ReturnBook = () => {
    const navigation = useNavigation()

    const [utenti, setUtenti] = useState([])


    async function getUtenti() {
        try {
            const response = await fetch(`${BASE_URL}/utenti.json`)

            if (!response.ok) throw new Error("Errore" + response.status)

            const dati = await response.json()

            if (!dati) (
                setUtenti([])
            )

            const listaUtenti = Object.keys(dati).map((key) => ({
                id: key,
                ...dati[key]
            }));

            const filterUtenti =
                listaUtenti.filter(
                    (u) => u.libri && u.libri.length > 0,
                )
            setUtenti(filterUtenti);

        } catch (error) {
            Alert.alert("Errore" + error)
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
                        onPress={() => navigation.navigate("ReturnBook2", { utente: item })}
                    >
                        <View style={styles.itemContainer}>
                            <Text style={styles.nome}>Nome: {item.nome}</Text>
                            <Text style={styles.cognome}>Cognome: {item.cognome}</Text>
                            <Text style={styles.email}>Email: {item.email}</Text>
                            <Text style={styles.badge}>Libri noleggiati: {item.libri.length}</Text>

                        </View>
                    </Pressable>
                )
            }}
        />
    )
}

export default ReturnBook

const styles = StyleSheet.create({
    itemContainer: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    nome: {
        fontWeight: 'bold',
        fontSize: 18
    },
    cognome: {
        fontStyle: 'italic',
        color: 'gray'
    },
    email: {
        fontSize: 14
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20
    },
    badge:{
        fontWeight:"bold",
        color:"red"
    }

})