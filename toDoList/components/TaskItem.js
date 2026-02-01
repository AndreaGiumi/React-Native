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
    flexDirection: 'row',       
    justifyContent: 'space-between', 
    alignItems: 'center',       
    padding: 15,                
    borderBottomWidth: 1,      
    borderBottomColor: '#ccc',  
    backgroundColor: '#fff',    
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',             
    marginTop: 4,
  },
  textDone: {
    color: 'green',            
    fontWeight: 'bold',
  },
  textTodo: {
    color: 'red',              
    fontWeight: 'bold',
  }
});
