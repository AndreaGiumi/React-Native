import React from "react";
import { Text, View ,StyleSheet, Pressable} from "react-native";

const TaskItem = ({taskItem,onDelete}) => {
  return (
    <View style={styles.taskItem}>
    <Pressable 
    android_ripple={{ color: '#210644' }} 
    onPress={()=>onDelete(taskItem)}
    style={({ pressed }) => pressed && styles.pressedItem}

    >
   
      <Text style={styles.taskText}>{taskItem.text}</Text>

    </Pressable>
    </View>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  taskItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  pressedItem:{
    opacity:0.5
  },
  taskText: {
    color: "#fff", 
    padding: 8,
  },
});