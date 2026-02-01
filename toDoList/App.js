import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import TaskItem from './components/TaskItem';

export default function App() {
  const TASKS = [
    { id: "t1", description: "Fare la spesa", urgency: "Alta" },
    { id: "t2", description: "Pagare bolletta luce", urgency: "Media" },
    { id: "t3", description: "Portare fuori il cane", urgency: "Alta" },
    { id: "t4", description: "Chiamare la nonna", urgency: "Bassa" },
    { id: "t5", description: "Studiare React Native", urgency: "Altissima" },
  ];

  const [tasks, setTasks] = useState([]);

  const toggleTasks = (id) => {
    setTasks((currentId) => {
      if (currentId.includes(id)) {
        return currentId.filter(taskId => taskId != id);
      }
      return [...currentId, id];
    });
  };

  return (
    <View style={styles.container}>
      {/* Ho aggiunto TASKS.length per completare la richiesta "X su 5" */}
      <Text style={styles.header}>
         Ha completato {tasks.length} su {TASKS.length}
      </Text>

      <FlatList
        data={TASKS}
        extraData={tasks}
        keyExtractor={(item) => item.id} // Anche qui, meglio chiamarlo 'item' per coerenza, ma 'task' qui funzionava
        
        // --- CORREZIONI QUI SOTTO ---
        renderItem={({ item }) => (  // 1. Usa ({ item }), non ({ task })
          <TaskItem
            task={item}             // 2. Passiamo 'item' come prop 'task'
            isCompleted={tasks.includes(item.id)}
            onToggle={toggleTasks}
          />
        )}
        // ----------------------------
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50, // Un po' di spazio dall'alto
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold'
  }
});

