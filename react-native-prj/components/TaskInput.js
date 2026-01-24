import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Button,
  Modal,
  Image,
  Pressable,
  Text,
} from "react-native";

const TaskInput = (props) => {
  const [task, setTask] = useState("");

  function taskInputHandler(enteredTask) {
    console.log(enteredTask);
    setTask(enteredTask);
  }
  function addTask() {
    
    props.onAddTask(task);
    setTask("");
    props.onCancel();
  }
  function annulla() {
    setTask("");
    props.onCancel();
  }
  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <Image style={styles.image} source={require("../assets/images/goal.png")}></Image>
        <TextInput
          style={styles.textInput}
          placeholder="Inserisci task"
          onChangeText={taskInputHandler}
          value={task}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Pressable
              onPress={addTask}
              disabled={task === ""}
              style={({ pressed }) => [
                styles.primaryBtn,
                task === "" && styles.primaryBtnDisabled,
                pressed && task !== "" && styles.primaryBtnPressed,
              ]}
            >
              <Text style={styles.primaryBtnText}>Aggiungi</Text>
            </Pressable>
          </View>
          <View style={styles.button}>
            <Button title="Annulla" onPress={annulla}  color="#b180f0"></Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: "#e4d0ff",
    width: "70%",
    padding: 8,
    backgroundColor:"#e4d0ff"
  },
  image:{
    width:100,
    height:100,
    margin:20
  },
  inputContainer: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    gap: 16,
    backgroundColor:"#311b6b"
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    marginHorizontal: 8,
  },
  primaryBtn: {
    backgroundColor: "#f31282",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  primaryBtnText: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
  },
  primaryBtnDisabled: {
    backgroundColor: "#d8a8c7",
    opacity: 0.7,
  },
  primaryBtnPressed: {
    opacity: 0.85,
  },
});
export default TaskInput;