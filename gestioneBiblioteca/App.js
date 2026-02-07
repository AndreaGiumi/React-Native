import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './components/Home';

import AddUtente from './components/AddUtente';
import AddBook from './components/AddBook';

import RentBook from './components/RentBook';
import RentBook2 from './components/RentBook2';

import ReturnBook from './components/ReturnBook';
import ReturnBook2 from './components/ReturnBook2';

import ModifyBook from './components/ModifyBook';
import ModifyBook2 from './components/ModifyBook2';

import ModifyUser from './components/ModifyUser';
import ModifyUser2 from './components/ModifyUser2';

import DeleteBook from './components/DeleteBook';
import DeleteUser from './components/DeleteUser';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{ title: "Home Page" }} />

        <Stack.Screen
          name='AddUtente'
          component={AddUtente}
          options={{ title: "Aggiungi Utente" }}
        />

        <Stack.Screen
          name='AddBook'
          component={AddBook}
          options={{ title: "Aggiungi Libro" }}

        />

        <Stack.Screen
          name='RentBook'
          component={RentBook}
          options={{ title: "Seleziona libro" }}
        />

        <Stack.Screen
          name='RentBook2'
          component={RentBook2}
          options={{ title: "Seleziona utente" }}
        />
        <Stack.Screen
          name='ReturnBook'
          component={ReturnBook}
          options={{ title: "Seleziona Utente" }} />

        <Stack.Screen
          name='ReturnBook2'
          component={ReturnBook2}
          options={{ title: "Seleziona libro" }} />

        <Stack.Screen
          name='ModifyBook2'
          component={ModifyBook2}
          options={{ title: "Seleziona libro" }} />

        <Stack.Screen
          name="ModifyBook"
          component={ModifyBook}
          options={{ title: "Modifica libro" }} />

        <Stack.Screen
          name='ModifyUser'
          component={ModifyUser}
          options={{ title: "Seleziona utente" }} />

        <Stack.Screen
          name='ModifyUser2'
          component={ModifyUser2}
          options={{ title: "Modifica utente" }} />
          
        <Stack.Screen
          name='DeleteBook'
          component={DeleteBook}
          options={{ title: "Elimina libro" }} />

        <Stack.Screen
          name='DeleteUser'
          component={DeleteUser}
          options={{ title: "Elimina utente" }} />
      </Stack.Navigator>


    </NavigationContainer>

  );
}

