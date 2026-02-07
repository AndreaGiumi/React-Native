import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { BASE_URL } from '../firebaseConfig'

const ModifyBook = () => {

    const navigation = useNavigation()

    const [libri, setLibri] = useState([])

    async function getLibri() {
        try{
            const response = await fetch(`${BASE_URL}/libri.json`)

            if(!response.ok) throw new Error("Errore" + response.status)
            
            const dati = await response.json()

            const listaLibri = Object.keys(dati).map((key)=>({
                id:key,
                ...dati[key]
            }));
            setLibri(listaLibri)
        }catch(error){
            Alert.alert("Errore", error)
        }
        
    }

    useFocusEffect(
        useCallback(()=>{
            getLibri()
        })
    )
  return (
    <FlatList
        data={libri}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=>{
            return(
                <Pressable
                onPress={()=>navigation.navigate("ModifyBook2", {libro:item})}
                >
                <View style={styles.itemContainer}>
                    <Text style={styles.titolo}>{item.titolo}</Text>
                    <Text style={styles.autore}>{item.autore}</Text>
                    <Text style={styles.genere}>{item.genere}</Text>
                </View>
                </Pressable>
            )
        }}
    />
  )
}

export default ModifyBook

const styles = StyleSheet.create({
  itemContainer: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  titolo: { fontWeight: 'bold', fontSize: 18 },
  autore: { fontStyle: 'italic', color: 'gray' },
  genere: { fontSize: 14 },
  emptyText: { textAlign: 'center', marginTop: 20 }
})