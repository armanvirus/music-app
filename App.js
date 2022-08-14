import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from "./pages/Home";
import {NavigationContainer} from "@react-navigation/native"; 
import { createStackNavigator } from '@react-navigation/stack';
import AudioList from './pages/AudioList';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

export default function App() {
  return (

    <View style={styles.container}>
    <StatusBar animated={true}
        bkacgroundColor="#f2f2f2"
        hidden={true} />
    <NavigationContainer>
    <Stack.Navigator screenOptions={{
      // initialRouteName:'Home'
    }}>
      <Stack.Screen
      options={{
        presentation:'modal',
        gestureEnabled:true,
        gestureDirection:'vertical',
        detachInactiveScreens:false,
        headerShown:false
      }} 
       name="Audios" component={gestureHandlerRootHOC(AudioList)} />
      <Stack.Screen
      options={{
        presentation:'modal',
        gestureEnabled:true,
        gestureDirection:'vertical',
        detachInactiveScreens:false
      }}
       name="Home" component={gestureHandlerRootHOC(Home)} />
      
      {/* <Stack.Screen name="Settings" component={Settings} /> */}
    </Stack.Navigator>
    </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
