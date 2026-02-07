import { StyleSheet } from "react-native";
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// Stack Home
import Home from "./src/es5/src/screens/home/Home";

// Stack Add
import AddBook from "./src/es5/src/screen/add/AddBook";
import AddUser from "./src/es5/src/screen/add/AddUser";

// Stack Rent
import RentBook1 from "./src/es5/src/screen/rent/RentBook1";
import RentBook2 from "./src/es5/src/screen/rent/RentBook2";

// Stack Return
import ReturnBook1 from "./src/es5/src/screen/return/ReturnBook1";
import ReturnBook2 from "./src/es5/src/screen/return/ReturnBook2";

// Stack Modify Book
import ModifyBookStep1 from "./src/es5/src/screen/modify/book/ModifyBookStep1";
import ModifyBookStep2 from "./src/es5/src/screen/modify/book/ModifyBookStep2";

// Stack Modify User
import ModifyUserStep1 from "./src/es5/src/screen/modify/user/ModifyUserStep1";
import ModifyUserStep2 from "./src/es5/src/screen/modify/user/ModifyUserStep2";

// Stack Delete
import DeleteBook from "./src/es5/src/screen/delete/DeleteBook";
import DeleteUser from "./src/es5/src/screen/delete/DeleteUser";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />

        <Stack.Screen name="AddBook" component={AddBook} />
        <Stack.Screen name="AddUser" component={AddUser} />

        <Stack.Screen
          name="RentStep1"
          component={RentBook1}
          options={{ title: "Seleziona Libro" }}
        />
        <Stack.Screen
          name="RentStep2"
          component={RentBook2}
          options={{ title: "Seleziona Utente" }}
        />

        <Stack.Screen
          name="ReturnStep1"
          component={ReturnBook1}
          options={{ title: "Seleziona Utente" }}
        />
        <Stack.Screen
          name="ReturnStep2"
          component={ReturnBook2}
          options={{ title: "Seleziona Libro" }}
        />

        <Stack.Screen
          name="ModBook1"
          component={ModifyBookStep1}
          options={{ title: "Seleziona Libro" }}
        />
        <Stack.Screen
          name="ModBook2"
          component={ModifyBookStep2}
          options={{ title: "Modifica Libro" }}
        />

        <Stack.Screen
          name="ModUser1"
          component={ModifyUserStep1}
          options={{ title: "Seleziona Utente" }}
        />
        <Stack.Screen
          name="ModUser2"
          component={ModifyUserStep2}
          options={{ title: "Modifica Utente" }}
        />

        <Stack.Screen
          name="DelBook"
          component={DeleteBook}
          options={{ title: "Elimina Libro" }}
        />
        <Stack.Screen
          name="DelUser"
          component={DeleteUser}
          options={{ title: "Elimina Utente" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
