import React, { useState, useEffect } from 'react'
import {AudiosObj } from '../componets/AudiosObj';
import {
    View,
    ImageBackground, 
    Button, 
    Image, 
    TextInput, 
    StyleSheet, 
    TouchableOpacity, 
    ScrollView, 
    FlatList,
    Text} from 'react-native';
import {AntDesign, MaterialCommunityIcons} from "@expo/vector-icons";
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
    Audio,
    InterruptionModeAndroid,
    InterruptionModeIOS,
  } from "expo-av";
import BottomSheet from '../componets/BottomSheet';
// import AudiosObj from '../componets/AudiosObj';
const Home = ({route,navigation})=>{
    // console.log(route.params.music.name)
    const [index, setIndex] = useState(null);
    const [obj, setObj] = useState(null);
    // const [sound, setSound] = useState();
    const [isPlaying, setPlaying] = useState(false);
    const [playbackInstance, setPlaybackInstance] = useState(null);
    const [isSeeking, setSeeking ] = useState(false);
    const [isNotShuffle, setShuffle] = useState(true);
    const [loopType, setLoopType] = useState('all');
    const [isLoading, setLoading] = useState(true);
    const [playBackInstacePosition, setPosition] = useState(null);
    const [playBackInstaceDuration, setDuration] = useState(null);
      useEffect(()=>{
        //   getData()
          if(route.params.index !== 'undefined' 
                && route.params.index !== index){
                    setIndex(route.params.index);
                }
        Audio.setAudioModeAsync({
            staysActiveInBackground: true,
            interruptionModeIOS: InterruptionModeIOS.DoNotMix,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
            
          });
      },[""]);

      useEffect(()=>{
          if(index !== 'undefined' && index !== null){
            _loadNewPlaybackInstance(true)
          }
      },[index])

     const  _loadNewPlaybackInstance = async (playing) => {
         if(playbackInstance === null || playbackInstance === undefined){
            const source = await AudiosObj[index].uri;
            const initialStatus = {shouldPlay:true,}
            try{
    
              const { sound,status} = await Audio.Sound.createAsync(
                source, initialStatus,          
                (status) => {
                    if (status.isLoaded){
                        setPosition(status.positionMillis)
                        setDuration(status.durationMillis)
                        // shouldPlay: status.shouldPlay,
                        setPlaying(status.isPlaying)
                        // loopingType: status.isLooping ? LOOPING_TYPE_ONE : LOOPING_TYPE_ALL,
                      
                      if (status.didJustFinish) {
                          console.log('finished')
                        _advanceIndex(true);
                        _updatePlaybackInstanceForIndex(true);
                      }
                    } else{
                      if (status.error) {
                        console.log(`FATAL PLAYER ERROR: ${status.error}`);
                      }}
                    
                  }
              )
              setPlaybackInstance(sound)
            //   console.log(status)
            //   await sound.playAsync()
        }catch(error){
            console.log(error)
        }
         }
         else{
            await playbackInstance.unloadAsync();
            await setPlaybackInstance(null);

            const source = await AudiosObj[index].uri;
            const initialStatus = {shouldPlay:true,}
            try{
    
              const { sound,status} = await Audio.Sound.createAsync(
                source, initialStatus,          
                (status) => {
                    if (status.isLoaded){
                        setPosition(status.positionMillis)
                        setDuration(status.durationMillis)
                        // shouldPlay: status.shouldPlay,
                        setPlaying(status.isPlaying)
                        // loopingType: status.isLooping ? LOOPING_TYPE_ONE : LOOPING_TYPE_ALL,
                      
                      if (status.didJustFinish) {
                          console.log('finished')
                        _advanceIndex(true);
                        _updatePlaybackInstanceForIndex(true);
                      }
                    } else{
                      if (status.error) {
                        console.log(`FATAL PLAYER ERROR: ${status.error}`);
                      }}
                    
                  }
              )
              setPlaybackInstance(sound)
            //   console.log(status)
            //   await sound.playAsync()
        }catch(error){
            console.log(error)
        }
        }
    
        
    
      }

      _onPlayPausePressed = () => {
        if (playbackInstance != null) {
          if (isPlaying) {
                playbackInstance.pauseAsync();
          } else {
                playbackInstance.playAsync();
          }
        }
      };

    // const  _onPlaybackStatusUpdate = status => {
    //     if (status.isLoaded) {
    //         setPosition(status.positionMillis)
    //         setDuration(status.durationMillis)
    //         // shouldPlay: status.shouldPlay,
    //         setPlaying(status.isPlaying)
    //         // loopingType: status.isLooping ? LOOPING_TYPE_ONE : LOOPING_TYPE_ALL,
          
    //       if (status.didJustFinish && !status.isLooping) {
    //         _advanceIndex(true);
    //         _updatePlaybackInstanceForIndex(true);
    //       }
    //     } else {
    //       if (status.error) {
    //         console.log(`FATAL PLAYER ERROR: ${status.error}`);
    //       }
    //     }
    //   }

    function  _advanceIndex(forwad) {
        if(!isNotShuffle){
            const randomChoice = Math.floor(Math.random() * (AudiosObj.length - 1));
            setIndex(randomChoice);
        }else
        if(forwad){
            if(index === AudiosObj.length -1){
                setIndex(1)
            }else{
                setIndex(index + 1)
            }
        } else {
            if(index > 1){
                setIndex(index - 1)
            }else{
                setIndex(AudiosObj().length - 1)
            }
        }
      }
      async function _updatePlaybackInstanceForIndex(playing) {  
        _loadNewPlaybackInstance(playing);
      }

      const _onForwardPressed = () => {
        if (playbackInstance != null) {
          _advanceIndex(true);
        //   _updatePlaybackInstanceForIndex(this.state.shouldPlay);
        }
      };
    
      const _onBackPressed = () => {
        if (playbackInstance != null) {
          _advanceIndex(false);
        //   _updatePlaybackInstanceForIndex(this.state.shouldPlay);
        }
      };

     const _onStopPressed = () => {
        if (playbackInstance != null) {
            playbackInstance.stopAsync();
        }
      };
  
     const bottomSheetHandler = (count)=>{
          return setIndex(count)
      }
    return(
        <GestureHandlerRootView style={{flex:1}}>
        <View style={styles.homeContainer}>
        <ImageBackground source={require('../assets/wizad.jpg')} 
                  resizeMode="cover">
            <View style={{zIndex:2,
                height:"96%",
                justifyContent:"space-between",
                backgroundColor:"rgba(26,26,26,.95)"}}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.menu}><AntDesign name="menufold"
                     size={22}
                     /></TouchableOpacity>
                </View>
                <View style={styles.details}>
                    <View>
                    <Image style={styles.rotator} source={require('../assets/wizad.jpg')}/>
                    <View style={{
                            alignItems:"center",
                            marginBottom:40, 
                            justifyContent:"center"}}>
                            <Text style={styles.audioName}>{ index ? AudiosObj[index].name : 'Loading...'}</Text>
                            <Text style={styles.artist}>Sayyadi Rabil</Text>
                        </View>
                    </View>
                    <View style={styles.detail}>
                    
                        <View style={{
                            width:"100%",
                            marginTop:15
                        }}>
                            <View style={styles.progress}></View>
                            <View style={{
                                flexDirection:"row",
                                justifyContent:"space-between",
                                alignItems:"center"
                            }}>
                            <Text style={{
                                marginHorizontal:5,
                                marginVertical:2,
                                color:"#ffffff"
                            }}>00</Text>
                            <Text style={{
                                marginHorizontal:5,
                                marginVertical:2,
                                color:"#ffffff"
                            }}>03</Text>
                            </View>
                        </View>
                        <View style={styles.controls}>
                            <TouchableOpacity>
                                <MaterialCommunityIcons name="shuffle-disabled" color="#f2f2f2" size={20}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>(_onBackPressed())} >
                                <AntDesign name="stepbackward" color="#f2f2f2" size={25}/>
                            </TouchableOpacity>
                            <TouchableOpacity 
                            onPress={ ()=>_onPlayPausePressed()}
                            style={styles.ctrlBtn}>
                            <AntDesign name="caretright" size={28}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>_onForwardPressed()}>
                            <AntDesign name="stepforward" color="#f2f2f2" size={25}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <MaterialCommunityIcons name="repeat" color="#f2f2f2" size={20}/>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>
            {/* <View style={styles.cover}></View> */}
            </ImageBackground>
            <BottomSheet setI={setIndex}/>
        </View>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    homeContainer:{
        backgroundColor:"rgb(239, 241, 248)",
        flex:1,
        // padding:30
    },
    header:{
        flexDirection:"row",
        justifyContent:"flex-end",
        alignItems:"center",
        marginBottom:16,
        padding:30
    },
    // cover:{
    //     height:"80vh",
    //     width:"100vw",
    //     position:"absolute",
    //     top:0,
    //     left:0,
    //     backgroundColor:"rgba(26,26,26,.92)",
    //     zIndex:1
    // },
    menu:{
        borderRadius:50,
        alignItems:"center",
        justifyContent:"center",
        padding:10,
        backgroundColor:"rgba(255,255,255,0.98)"
    },
    details:{
        flexDirection:"column",
        justifyContent:"space-between",
        alignItems:"center",
        height:"80%",
        paddingHorizontal:30,
        paddingBottom:30,
        color:"white",
        // transform:[{translateY:-30}]

    },
    rotator:{
        height:150,
        width:150,
        marginVertical:16,
        borderRadius:75,
        marginBottom:30
    },
    detail:{
        width:"100%",
        justifyContent:"center",
        alignItems:"center",
        alignSelf:"flex-start"
        
    },
    audioName:{
        marginBottom:5,
        color:"#ffffff",
        fontSize:18
    },
    artist:{
        color:"#f2f2f2",
        fontSize:13 
    },
    controls:{
        width:"95%",
        paddingHorizontal:20,
        paddingTop:5,
        paddingBottom:30,
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center"
    },
    ctrlBtn:{
        backgroundColor:"#f2f2f2",
        padding:10,
        borderRadius:50
    },
    progress:{
        height:4,
        width:"100%",
        backgroundColor:"#f3f3f3",
        borderRadius:3,
        marginBottom:5
    },
    
    
})
export default Home;