import { Alert, FlatList, Pressable, StyleSheet, Text, View,  } from 'react-native'
import React, { useCallback, useState } from 'react'
import { BASE_URL } from '../firebaseConfig'
import { useFocusEffect } from '@react-navigation/native'

const DeleteUser = () => {
    const [utenti, setUtenti] = useState([])

    async function getUtenti() {
        try {
            const response = await fetch(`${BASE_URL}/utenti.json`)
            if (!response.ok) throw new Error("Errore " + response.status)

            const dati = await response.json()

            if (dati) {
                const listaUtenti = Object.keys(dati).map((key) => ({
                    id: key,
                    ...dati[key]
                }))

                const filterListaUtenti = listaUtenti.filter(
                    (u) => !u.libri || u.libri.length === 0
                )
                setUtenti(filterListaUtenti)
            } else {
                setUtenti([])
            }
        } catch (error) {
            Alert.alert("Errore", "Impossibile caricare gli utenti")
        }
    }

    useFocusEffect(
        useCallback(() => {
            getUtenti()
        }, [])
    )

    async function deleteUtente(idUtente) {
        Alert.alert(
            "Elimina Utente",
            "Sei sicuro di voler eliminare questo profilo?",
            [
                { text: "Annulla", style: "cancel" },
                { 
                    text: "Elimina", 
                    style: "destructive", 
                    onPress: async () => {
                        try {
                            const response = await fetch(`${BASE_URL}/utenti/${idUtente}.json`, {
                                method: "DELETE"
                            })
                            if (!response.ok) throw new Error("Errore " + response.status)
                            
                            getUtenti() 
                        } catch (error) {
                            Alert.alert("Errore", "Non è stato possibile eliminare l'utente")
                        }
                    }
                }
            ]
        )
    }

    return (
            <FlatList
                data={utenti}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Pressable
                        style={styles.userCard}
                        onPress={() => deleteUtente(item.id)}>
                        <View>
                            <Text style={styles.userName}>{item.nome} {item.cognome}</Text>
                            <Text style={styles.userEmail}>{item.email}</Text>
                        </View>
                        <Text style={styles.deleteIcon}>🗑️</Text>
                    </Pressable>
                )}
                ListEmptyComponent={<Text style={styles.emptyText}>Nessun utente senza libri trovato.</Text>}
            />
    )
}

export default DeleteUser

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    userCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    userName: { fontSize: 18, fontWeight: 'bold' },
    userEmail: { color: '#666' },
    deleteIcon: { fontSize: 20 },
    emptyText: { textAlign: 'center', marginTop: 40, color: '#999' }
})