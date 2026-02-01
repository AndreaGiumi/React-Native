import React from 'react'
import { Pressable, View, Text, StyleSheet } from 'react-native'

// CORREZIONE QUI SOTTO: Aggiunte le { }
const SongItem = ({ item, isLiked, onToggle }) => {
  return (
    <Pressable
      onPress={() => onToggle(item.id)}
      style={styles.container} // Aggiungi uno stile base
    >
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text>{item.artist}</Text>
      </View>

      <Text>
        {isLiked ? "♥️" : "🤍"}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Mette testo e cuore sulla stessa riga
    justifyContent: 'space-between', // Li spinge agli estremi
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  title: {
    fontWeight: 'bold'
  }
})

export default SongItem
