import React, { useEffect, useState } from "react";
import { Button, TextInput, View, StyleSheet, Alert, Text, ActivityIndicator } from "react-native";
import { BASE_URL } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";

const AddBook = () => {
    const [autore, setAutore] = useState("");
    const [titolo, setTitolo] = useState("");
    const [genere, setGenere] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    const navigation = useNavigation()

    const handleSave = async () => {
        try {
            if (!autore || !titolo || !genere) {
                Alert.alert("Errore", "Complare tutti i campi!")
                return;
            }

            setIsLoading(true)
            const response = await fetch(`${BASE_URL}/libri.json`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    autore: autore,
                    titolo: titolo,
                    genere: genere,
                    disponibile: true
                })
            })
            if (response.ok) {
                setAutore("")
                setTitolo("")
                setGenere("")
                Alert.alert("Successo!", "Libro inserito correttamente", [{
                    text: "OK",
                    onPress: () => navigation.goBack()
                }])
            } else {
                throw new Error("Errore" + response.status)
            }
        } catch (error) {
            Alert.alert("Errore", "Qualcosa è andato storto")
        } finally {
            setIsLoading(false)
        }


    }

    return (
        <View style={styles.formContainer}>
            <Text style={styles.header}>Nuovo Libro</Text>

            <TextInput
                style={styles.input}
                placeholder=" Autore"
                value={autore}
                onChangeText={setAutore}
            />

            <TextInput
                style={styles.input}
                placeholder=" Titolo"
                value={titolo}
                onChangeText={setTitolo}
            />
            <TextInput
                style={styles.input}
                placeholder=" Genere"
                value={genere}
                onChangeText={setGenere}
            />
            <View
                style={styles.buttonContainer}
            >
                {isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <Button
                        title='Salva libro'
                        onPress={handleSave}
                        disabled={isLoading}
                    />
                )}
            </View>


        </View>
    )
}

export default AddBook

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