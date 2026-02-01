import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native';

const Products = ({ item, isSelected, onToggle }) => {
  return (
    <Pressable
      onPress={() => onToggle(item.id)}
      style={[
        styles.itemContainer,
        isSelected && styles.itemSelected
      ]}
    >
      <View>
        <Text style={[styles.itemName, isSelected && styles.textSelected]}>
          {item.name}
        </Text>
        <Text style={styles.itemSubText}>Cod: {item.id}</Text>
      </View>
      
      <Text style={[styles.itemPrice, isSelected && styles.textSelected]}>
        € {item.price.toFixed(2)}
      </Text>
    </Pressable>
  )
}

export default Products

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  itemSelected: {
    backgroundColor: '#e3f2fd', 
    borderColor: '#2196f3',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  itemSubText: {
    fontSize: 12,
    color: '#999',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  textSelected: {
    color: '#1565c0',
  },
})
