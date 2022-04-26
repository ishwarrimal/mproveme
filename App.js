import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Realm from "realm";
import { BottomNavigation } from 'react-native-paper';
import MyProgress from './src/Page/MyProgress';
import HomePage from './src/Page/HomePage';
import GlobalContext from './src/Context/context';
import { ProgressSchema } from './src/Lib/schema';

export const GlobalInstanceProvider = GlobalContext.Provider

export function BottomNav() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'me', title: 'HOME', icon: 'image-album', color: '#6200ee' },
    {
      key: 'myProgress',
      title: 'My Progress',
      icon: 'inbox',
      color: '#2962ff',
      badge: true,
    }
  ]);

  return (
    <BottomNavigation
    navigationState={{ index, routes }}
    onIndexChange={index => setIndex(index)}
    renderScene={BottomNavigation.SceneMap({
      me: HomePage,
      myProgress: MyProgress,
    })}
    sceneAnimationEnabled={false}
  />
      // <View style={styles.container}>
      //     <HomePage />
      //   <StatusBar style="auto" />
      // </View>
  );
}

export default function App(){
  const [dbInstance, setDbInstance] = React.useState(null);
  return (
    <GlobalInstanceProvider value={dbInstance}>
      <BottomNav />
    </GlobalInstanceProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});