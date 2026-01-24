import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ScrollView,
  FlatList,
} from "react-native";
import TaskItem from "./components/TaskItem";
import TaskInput from "./components/TaskInput";
import { addTask, doneTask, fetchTasks } from "./services/taskServices";

export default function App() {
  // const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  function startAddTask() {
    setModalVisible(true); //Apre la modale
  }

  function endAddTask() {
    setModalVisible(false); //Apre la modale
  }

  // function taskInputHandler(enteredTask) {
  //   console.log(enteredTask);
  //   setTask(enteredTask);
  // }
  function deleteTask(task) {
    // setTasks((current) => {
    //   return current.filter((t) => t.id !== id);
    // });
    doneTask(task)
    loaaTasks()
  }
  function addTaskHandler(task) {
   // setTasks((current) => [...current, { task, id: new Date() }]);
   addTask(task)
    loaaTasks()
  }
  // function addTaskHandler() {
  //   setTasks((current) => [...current, { task,id:new Date()}]);
  //   setTask("");
  // }
  async function loaaTasks(){
    const tasks=await fetchTasks();
    console.log(tasks)
    setTasks(tasks)
  }
  useEffect(()=>{
    loaaTasks()
  },[])
 const visibleTask=tasks.filter(t=>!t.done)
  return (
    <View style={styles.appContainer}>
      <Button title="Add New Task" color="#5e0acc" onPress={startAddTask} />

      <TaskInput visible={modalVisible} onAddTask={addTaskHandler} onCancel={endAddTask}></TaskInput>
      {/* <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Inserisci task"
          onChangeText={taskInputHandler}
          value={task}
        />
        <Button
          title="Aggiungi"
          onPress={addTaskHandler}
          disabled={task === ""}
        ></Button>
      </View> */}
      <View style={styles.goalsContainer}>
        <FlatList
          alwaysBounceVertical={true}
          data={visibleTask}
          renderItem={(itemData) => {
            return (
              <TaskItem
                onDelete={deleteTask}
                taskItem={itemData.item}
              ></TaskItem>
              // <View style={styles.taskItem}>
              //   <Text style={styles.taskText}>{itemData.item.task}</Text>
              // </View>
            );
          }}
          keyExtractor={(item) => item.id}
        />
        {/* <ScrollView>
          {tasks.map((t, index) => (
            <View key={index} style={styles.taskItem}>
              <Text style={styles.taskText}>{t}</Text>
            </View>
          ))}
        </ScrollView> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  // textInput: {
  //   borderWidth: 1,
  //   borderColor: "#cccccc",
  //   width: "70%",
  //   padding: 8,
  // },
  // inputContainer: {
  //   flex: 1,
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   marginBottom: 24,
  //   borderBottomWidth: 1,
  //   borderColor: "#cccccc",
  // },
  goalsContainer: {
    flex: 4,
  },
});