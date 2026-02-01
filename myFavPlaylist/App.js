import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import SongItem from './components/SongItem';
import { useState } from 'react';

export default function App() {

  const SONGS = [
  { id: "s1", title: "Bohemian Rhapsody", artist: "Queen" },
  { id: "s2", title: "Imagine", artist: "John Lennon" },
  { id: "s3", title: "Hotel California", artist: "Eagles" },
  { id: "s4", title: "Smells Like Teen Spirit", artist: "Nirvana" },
  { id: "s5", title: "Billie Jean", artist: "Michael Jackson" },
];

  const [favourite, setFavourite] = useState([])

  const toggleFavourite = (id)=>{
    setFavourite((currentFav)=>{
      if(currentFav.includes(id)){
        return currentFav.filter(favId=> favId != id)
      }
      return [...currentFav, id]
    })
  }

  return (
    <View style={styles.container}>
      <Text>Hai {favourite.length} canzoni preferite</Text>

      <FlatList
      data={SONGS}
      keyExtractor={(item)=>item.id}
      extraData={favourite}
      renderItem={({item})=>(
        <SongItem
          item={item}
          isLiked={favourite.includes(item.id)}
          onToggle={toggleFavourite}
        />
      )}
      />
    </View>
    
  );
}

const styles =  StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#087e9b",
    paddingTop:50,
    paddingHorizontal:30,
    alignItems:"center"
  },
})


