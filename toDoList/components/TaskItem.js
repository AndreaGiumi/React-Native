import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';

const TaskItem = ({ task, isCompleted, onToggle }) => {
  return (
    <Pressable
      onPress={() => onToggle(task.id)}
      style={styles.container} // Stile del contenitore principale
    >
      <View>
        <Text style={styles.title}>{task.description}</Text>
        <Text style={styles.subtitle}>Urgenza: {task.urgency}</Text>
      </View>

      <Text style={isCompleted ? styles.textDone : styles.textTodo}>
        {isCompleted ? "☑️ FATTO" : "◻️ DA FARE"}
      </Text>
    </Pressable>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',       // Dispone gli elementi in orizzontale
    justifyContent: 'space-between', // Spinge gli elementi agli estremi (Sinistra <-> Destra)
    alignItems: 'center',       // Centra verticalmente
    padding: 15,                // Spazio interno
    borderBottomWidth: 1,       // Linea separatrice sotto
    borderBottomColor: '#ccc',  // Colore della linea
    backgroundColor: '#fff',    // Sfondo bianco
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',              // Grigio scuro per info secondarie
    marginTop: 4,
  },
  textDone: {
    color: 'green',             // Verde per confermare
    fontWeight: 'bold',
  },
  textTodo: {
    color: 'red',               // Rosso per attirare l'attenzione
    fontWeight: 'bold',
  }
});
