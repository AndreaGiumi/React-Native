import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { checkForm, isValidForm } from './controllForm';

export default function App() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [messaggio, setMessaggio] = useState("");
  const [isPress, setIsPress] = useState(false);

  useEffect(() => {
    const validForm = isValidForm(nome, email, messaggio);
    setIsPress(!validForm);
  }, [nome, email, messaggio]);

  function resetForm() {
    setNome('');
    setEmail('');
    setMessaggio('');
  }

  return (
    <View style={styles.container}>
      <Text>Nome</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />

      <Text>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text>Messaggio</Text>
      <TextInput
        style={styles.input}
        value={messaggio}
        onChangeText={setMessaggio}
        multiline
      />

      <Button
        title="Invia"
        disabled={isPress}
        onPress={() => {
          checkForm(nome, email, messaggio);
          resetForm();
        }}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: 'rgba(236, 157, 9, 0.47)'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 12,
  },
});
