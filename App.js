import { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions } from 'react-native';
import SearchBar from './components/SearchBar';
import Weather from './components/Weather';

export default function App() {

  const [ newName, setNewName ] = useState('');
  const [ backgroundImg, setBackgroundImg ] = useState('');

  function cityName(name){
    setNewName(name);
  }

  function backgroundHandler(background){
    setBackgroundImg(background);
    console.log(backgroundImg)
  }

  return (
    <View style={styles.container}>
        <ImageBackground source={backgroundImg} resizeMode='cover' style={styles.container}>
          <SearchBar newName={cityName} />
          <Weather cityName={newName} background={backgroundHandler} />
        </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('screen').width,
  },
});
