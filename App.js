import 'react-native-gesture-handler';
import React,{useState,useEffect,useRef} from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet,ScrollView, Text, View, 
  TouchableOpacity,
  DrawerLayoutAndroid,
  Dimensions } from 'react-native';
import Home from "./pages/Home";
import HeaderLeft from './componets/HeaderLeft';
import HeaderRight from "./componets/HeaderRight";
import {NavigationContainer} from "@react-navigation/native"; 
import { createStackNavigator } from '@react-navigation/stack';
import {AntDesign,Ionicons, MaterialCommunityIcons,Entypo} from "@expo/vector-icons";
import AudioList from './pages/AudioList';
import Stat from './Context/StateStore';
import Header from './componets/Header';
const {height:SCREEN_HEIGHT} = Dimensions.get('window');
import {
  Audio,
  InterruptionModeAndroid,
  InterruptionModeIOS,
} from "expo-av";
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
const Stack = createStackNavigator();

export default function App() {
  const [isVisible,setVisible] = useState(false);

  useEffect(() => {
    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
      
    });
  }, ['']);


  return (
    <View style={styles.container}>
    <StatusBar animated={true}
        style='light'
        // bkacgroundColor="#f2f2f2"
         />
      <Stat>
    <NavigationContainer>
    {/* <DrawerLayoutAndroid 
        drawerWidth={250}
        drawerPosition='left'
        ref={drawerLayoutRef}
        renderNavigationView={() => navigationView}> */}
    <Stack.Navigator screenOptions={{
      // initialRouteName:'Home'
    }}>
      {/* <Stack.Screen
      options={{
        presentation:'modal',
        gestureEnabled:true,
        gestureDirection:'vertical',
        detachInactiveScreens:false,
        // headerShown:false
        headerTitle:()=> <Header/>,
        headerRight: () => (
          <TouchableOpacity onPress={()=>(setVisible(!isVisible))} 
            style={{marginRight:15}}
            >
            <Entypo name="dots-three-vertical" size={24} color="white" />
          </TouchableOpacity>
        ),
        headerStyle:{
          height:100,
          backgroundColor:"rgb(0,0,20)",
          shadowColor:"rgba(245,250,250,0.9)",
          elevation:10
        }
      }} 
       name="Audios" component={gestureHandlerRootHOC(AudioList)} /> */}
      <Stack.Screen
      options={{
        presentation:'modal',
        gestureEnabled:true,
        gestureDirection:'vertical',
        detachInactiveScreens:false,
        headerTitle:()=> <Header/>,
        headerLeft:()=><HeaderLeft/> ,
        headerRight: () =><HeaderRight/>,
        headerStyle:{
          height:100,
          backgroundColor:"rgba(26,26,26,.95)",
          shadowColor:"rgba(245,250,250,0.9)",
          elevation:10,
          
        }
      }}
       name="Home" component={gestureHandlerRootHOC(Home)} />
      
      {/* <Stack.Screen name="Settings" component={Settings} /> */}
    </Stack.Navigator>
    {/* </DrawerLayoutAndroid> */}
    </NavigationContainer>
    </Stat>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    minHeight:SCREEN_HEIGHT,
  },
  menu:{
    borderRadius:50,
    alignItems:"center",
    justifyContent:"center",
    padding:10,
    marginRight:5,
    backgroundColor:"rgba(255,255,255,0.98)"
},
navigationContainer: {
  flex: 1,
  paddingTop: 50,
  backgroundColor: "#fff",
  padding: 8,
  zIndex:30
}
});
