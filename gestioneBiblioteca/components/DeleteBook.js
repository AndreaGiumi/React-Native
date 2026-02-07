import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { BASE_URL } from '../firebaseConfig'
import { useFocusEffect } from '@react-navigation/native'

const DeleteBook = () => {
    const [libri, setLibri] = useState([])

    const getLibri = async () => {
        try {
            const response = await fetch(`${BASE_URL}/libri.json`)
            if (!response.ok) throw new Error("Errore " + response.status)

            const dati = await response.json()

            if (dati) {
                const listaLibri = Object.keys(dati).map((key) => ({
                    id: key,
                    ...dati[key]
                }))
                
                const filterListaLibri = listaLibri.filter((l) => l.disponibile === true)
                setLibri(filterListaLibri)
            } else {
                setLibri([]) 
            }
        } catch (error) {
            Alert.alert("Errore caricamento", error.message)
        }
    }

    useFocusEffect(
        useCallback(() => {
            getLibri()
        }, []) 
    )

    async function deleteLibri(libroId) {
        Alert.alert(
            "Conferma", 
            "Vuoi davvero eliminare questo libro?", 
            [
                { text: "Annulla", style: "cancel" },
                { 
                    text: "Elimina", 
                    style: "destructive", 
                    onPress: async () => {
                        try {
                            const response = await fetch(`${BASE_URL}/libri/${libroId}.json`, {
                                method: "DELETE",
                            })

                            if (!response.ok) throw new Error("Errore " + response.status)

                            Alert.alert("Eliminato", "Libro rimosso con successo")
                        } catch (error) {
                            Alert.alert("Errore", error.message)
                        }
                    }
                }
            ]
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={libri}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<Text style={styles.empty}>Nessun libro disponibile</Text>}
                renderItem={({ item }) => (
                    <Pressable
                        style={styles.card}
                        onPress={() => deleteLibri(item.id)}>
                        <View>
                            <Text style={styles.title}>{item.titolo}</Text>
                            <Text>{item.autore} - {item.genere}</Text>
                        </View>
                        <Text style={styles.deleteHint}>Tocca per eliminare</Text>
                    </Pressable>
                )}
            />
        </View>
    )
}

export default DeleteBook

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    card: {
        backgroundColor: 'white',
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        elevation: 3, // ombra su Android
        shadowColor: '#000', // ombra su iOS
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: { fontSize: 18, fontWeight: 'bold' },
    deleteHint: { color: 'red', fontSize: 12 },
    empty: { textAlign: 'center', marginTop: 50, fontSize: 16 }
})