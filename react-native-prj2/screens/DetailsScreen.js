import { View, Text, Button } from "react-native";

export default function DetailsScreen({ navigation }) {
  return (
    <View>
      <Text>Details Screen</Text>
      <Button title="Torna indietro" onPress={() => navigation.goBack()} />
    </View>
  );
}