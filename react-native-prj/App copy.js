import { useState } from "react";
import { Button, FlatList, Modal, StyleSheet, Text, TextInput, View } from "react-native";

export default function App() {
  const [messaggio, setMessaggio] = useState("Ciao");
  const [visible, setVisible] = useState(false);
  const [nome, setNome] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [contatore, setContatore] = useState(0)
  const [primo, setPrimo] = useState("")
  const [secondo, setSecondo] = useState("")
  const [somma, setSomma] = useState("")


  const dati = [
    { id: "1", nome: "Mario" },
    { id: "2", nome: "Rob" },
    { id: "3", nome: "Gino" },
  ];
  return (
    <View style={styles.container}>
      <Text>{nome}</Text>
      {visible && <Text>{messaggio}</Text>}
      <TextInput
        placeholder="Inserisci testo"
        onChangeText={setNome}
        style={styles.inputText}
        value={nome}
      ></TextInput>
      <Button
        title="Cambia testo"
        onPress={() => setMessaggio("Ho premuto il pulsante")}
      />
      <Button
        title={visible ? "Nascondi" : "Visualizza"}
        onPress={() => setVisible(!visible)}
      />
      <View style={styles.containerList}>
        <FlatList
          data={dati}
          renderItem={(dato) => <Text>{dato.item.nome}</Text>}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.containerList}>
        <Button title="Apri" onPress={() => setOpenModal(true)}></Button>
        <Modal visible={openModal} animationType="slide">
          <View style={{padding:50}}> 
            <Text>Sono una moda</Text>
            <Button title="Chiudi" onPress={() => setOpenModal(false)}></Button>
          </View>
        </Modal>
        <Text>{contatore}</Text>
        <Button title="aumenta" onPress={()=>setContatore(contatore + 1)}></Button>
        <Button title="decrementa" onPress={()=>setContatore(contatore - 1)}></Button>
        <Button title="azzera" onPress={()=>setContatore(0)}></Button>
        <View>
          <Text>{somma}</Text>
          <TextInput
          placeholder="Inserisci numero: "
          onChangeText={setPrimo}
          style={styles.inputText}
          value={primo}
          inputMode="numeric"
          >
          </TextInput>
          <TextInput
          placeholder="Inserisci numero: "
          onChangeText={setSecondo}
          style={styles.inputText}
          value={secondo}
          inputMode="numeric"
          >
          </TextInput>
          <Button title="somma" onPress={()=>setSomma(Number(primo) + Number(secondo))}></Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#377a3dff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 46,
    padding: 50,
    gap:20
  },
  containerList: {
    flex: 2,
    backgroundColor: "#377a3dff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputText: {
    borderWidth: 1,
    padding: 10,
  },
});