import { Alert, StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useFocusEffect, useNavigation, useRoute, } from '@react-navigation/native'
import { BASE_URL } from '../firebaseConfig'



const ReturnBook2 = () => {
    const route = useRoute();
    const { utente } = route.params;
    const navigation = useNavigation();
    const [libri, setLibri] = useState([]);

    async function getLibri() {
        try {
            const response = await fetch(`${BASE_URL}/libri.json`);
            const dati = await response.json();
            const listaLibri = Object.keys(dati).map(key => ({ id: key, ...dati[key] }));

            const filterLibri = listaLibri.filter(l => utente.libri?.includes(l.id));
            setLibri(filterLibri);
        } catch (error) {
            Alert.alert("Errore", error.message);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getLibri();
        }, [])
    );

    async function patchNoleggio(libroScelto) {
        try {
            const oggi = new Date().toLocaleDateString("it-IT");

            const pLibro = fetch(`${BASE_URL}/libri/${libroScelto.id}.json`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ disponibile: true })
            });

            const pUtente = fetch(`${BASE_URL}/utenti/${utente.id}.json`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    libri: utente.libri.filter(id => id !== libroScelto.id)
                })
            });

            const resNoleggi = await fetch(`${BASE_URL}/noleggi.json`);
            const datiNoleggi = await resNoleggi.json();

            let idNoleggio = null;
            Object.keys(datiNoleggi).forEach(key => {
                const n = datiNoleggi[key];
                if (n.idLibro === libroScelto.id && n.idUtente === utente.id && n.stato === "Attivo") {
                    idNoleggio = key;
                }
            });

            if (!idNoleggio) throw new Error("Noleggio attivo non trovato");

            const pChiusuraNoleggio = fetch(`${BASE_URL}/noleggi/${idNoleggio}.json`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ dataFine: oggi, stato: "Terminato" })
            });

            await Promise.all([pLibro, pUtente, pChiusuraNoleggio]);

            Alert.alert("Successo", "Libro restituito correttamente");
            navigation.goBack();
        } catch (error) {
            Alert.alert("Errore", error.message);
        }
    }

    return (
        <FlatList
            data={libri}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <Pressable style={{ padding: 20 }} onPress={() => patchNoleggio(item)}>
                    <Text>Titolo: {item.titolo}</Text>
                    <Text>Autore: {item.autore}</Text>
                   <Text>Genere: {item.genere}</Text> 
                </Pressable>
            )}
        />
    );
};
export default ReturnBook2