import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import SettingsModal from '../Components/SettingsModal';
import bg from '../assets/bg.png';

const img = {uri : 'https://images.unsplash.com/photo-1647011824705-bf560991ca4a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80`'}

export default function HomePage() {
    const [showSettings, setShowSettings] = React.useState(false);
  return (
    <View style={styles.container}>
      <ImageBackground source={bg} resizeMode='cover' style={styles.image}>

      {showSettings && <SettingsModal handleShowSettings={setShowSettings}/>}
      <View style={styles.innerContainer}>
        <Image source={{ uri: 'https://images.unsplash.com/photo-1618253794954-ec116c62a7a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3032&q=80' }} style={styles.logo} />
        <Text style={styles.instructions}>
          To plan your day, just press the button below!
        </Text>

        <TouchableOpacity onPress={() => setShowSettings(true)} style={styles.button}>
          <Text style={styles.buttonText}>Make a Plan</Text>
        </TouchableOpacity>
      </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      
    },
    image: {
      flex: 1,
      justifyContent: "center"
    },
    innerContainer: {
      flex:1,
      justifyContent:'center',
      alignItems: 'center'
    },
    logo: {
      width: 305,
      height: 159,
      marginBottom: 20,
    },
    instructions: {
      color: '#111',
      fontSize: 18,
      marginHorizontal: 15,
      marginBottom: 10,
    },
    button: {
      backgroundColor: "blue",
      padding: 20,
      borderRadius: 5,
    },
    buttonText: {
      fontSize: 20,
      color: '#fff',
    }, 
  });