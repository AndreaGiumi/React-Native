import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
} from 'react-native';
import Products from './components/Products';

const PRODUCTS = [
  { id: "p1", name: "Olio Motore 5W-30", price: 19.90 },
  { id: "p2", name: "Additivo Pulizia Iniettori", price: 14.50 },
  { id: "p3", name: "Liquido Freni DOT4", price: 8.99 },
  { id: "p4", name: "Filtro Aria", price: 12.00 },
  { id: "p5", name: "Trattamento Antiattrito", price: 24.90 },
  { id: "p6", name: "Additivo Pulizia FAP/DPF", price: 21.50 },
  { id: "p7", name: "Olio Cambio Automatico ATF", price: 16.90 },
  { id: "p8", name: "Spray Detergente Freni", price: 6.50 },
];

const App = () => {



  const [selectedId, setSelectedId] = useState([])

  const handleToggleProduct = (id) => {
    setSelectedId((currentId) => {
      if (currentId.includes(id)) {
        return currentId.filter(itemId => (itemId != id))

      }
      return [...currentId, id]
    })
  }

  const handlClearSelection = () => {
    setSelectedId([])
  }


  const totalPrice = PRODUCTS
    .filter(product => selectedId.includes(product.id))
    .reduce((sum, product) => sum + product.price, 0)


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Lista Prodotti</Text>
      </View>
      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        renderItem={({ item }) => (

          <Products
            item={item}
            isSelected={selectedId.includes(item.id)}
            onToggle={handleToggleProduct}
          />

        )}
      />

      <View style={styles.footer}>
        <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Totale Stimato:</Text>
        <Text style={styles.totalValue}>{totalPrice.toFixed(2)}</Text>
        </View>

        {
          selectedId.length > 0 && (
            <Pressable
              onPress={handlClearSelection}
              style={styles.clearButton}
            >
              <Text style={styles.clearButtonText}>
                Svuota selezione ({selectedId.length})
              </Text>
            </Pressable>
          )
        }
      </View>

    </View>
  )
}
export default App
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },

  // Stili per il Footer
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    elevation: 10, // Ombra su Android
    shadowColor: '#000', // Ombra su iOS
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  totalLabel: {
    fontSize: 18,
    color: '#333',
  },
  totalValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  clearButton: {
    backgroundColor: '#ffcdd2',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#c62828',
    fontWeight: '600',
  },
})