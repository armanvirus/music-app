import React, { useState, useEffect, useContext } from 'react';
import Slider from '@react-native-community/slider';
import {StateContext} from '../Context/StateStore';
import {AudiosObj } from '../componets/AudiosObj';
import {
    Dimensions,
    View,
    ImageBackground,  
    Image, 
    TextInput, 
    StyleSheet, 
    TouchableOpacity, 
    ScrollView, 
    FlatList,
    Text} from 'react-native';
import {AntDesign, MaterialCommunityIcons,} from "@expo/vector-icons";
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
    Audio,
    InterruptionModeAndroid,
    InterruptionModeIOS,
  } from "expo-av";
import BottomSheet from '../componets/BottomSheet';
const {width:SCREEN_WIDTH} = Dimensions.get('window');
// import AudiosObj from '../componets/AudiosObj';
const Home = ({route,navigation})=>{
    const {        
            _loadNewPlaybackInstance,
            _advanceIndex,
            isNotShuffle, setShuffle,
            playbackInstance, 
            setPlaybackInstance,
            isPlaying, 
            setPlaying,
            playBackInstaceDuration, 
            setDuration,
            playBackInstacePosition, 
            setPosition,
            isLoaded,
            playinIndex, 
            setIndex 
        } = useContext(StateContext);
    // const [sound, setSound] = useState();
    // const [playbackInstance, setPlaybackInstance] = useState(null);
    const [isSeeking, setSeeking ] = useState(false);
    const [shouldPlayAtEndOfSeek,setShouldPlayAtEndOfSeek ] = useState(false)
    const [loopType, setLoopType] = useState('all');
      useEffect(()=>{
        //   getData()
        //   if(route.params.index !== 'undefined' 
        //         && route.params.index !== index){
        //             setIndex(route.params.index);
        //         }
      },[""]);

      useEffect(()=>{
          if(playinIndex !== 'undefined' && playinIndex !== null){
              console.log(playbackInstance)
            _loadNewPlaybackInstance(true)
          }
      },[playinIndex]);

      _onPlayPausePressed = () => {
        if (playbackInstance != null) {
          if (isPlaying) {
                playbackInstance.pauseAsync();
          } else {
                playbackInstance.playAsync();
          }
        }
      };


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

    const  _getSeekSliderPosition = ()=> {
    if (
      playbackInstance != null &&
      playBackInstacePosition != null &&
      playBackInstaceDuration != null
    ) {
      return (
        playBackInstacePosition /
        playBackInstaceDuration
      );
    }
    return 0;
  }

 const _onSeekSliderSlidingComplete = async value => {
    if (playbackInstance != null) {
      setSeeking(false);
      try{
        const seekPosition = value * playBackInstaceDuration;
        if (shouldPlayAtEndOfSeek) {
          playbackInstance.playFromPositionAsync(seekPosition);
        } else {
          playbackInstance.setPositionAsync(seekPosition);
        }
      }catch(error){
        console.log(error)
    }
      
    }
  };

  const _onSeekSliderValueChange = value => {
    if (playbackInstance != null && !isSeeking) {
      setSeeking(true);
      setShouldPlayAtEndOfSeek(true);
      playbackInstance.pauseAsync();
    }
  };
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
                    {/* <TouchableOpacity style={styles.menu}><AntDesign name="menufold"
                     size={22}
                     /></TouchableOpacity> */}
                </View>
                <View style={styles.details}>
                    <View style={{width:"100%",alignItems:"center"}}>
                    <Image style={styles.rotator} source={require('../assets/wizad.jpg')}/>
                    <View style={{
                            alignItems:"center",
                            marginBottom:40, 
                            justifyContent:"center"}}>
                            <Text style={styles.audioName}>{ playinIndex ? AudiosObj[playinIndex].name : 'Loading...'}</Text>
                            <Text style={styles.artist}>Sayyadi Rabil</Text>
                        </View>
                    </View>
                    <View style={styles.detail}>
                    
                        <View style={{
                            width:"100%",
                            marginTop:15
                        }}>
                            <View style={styles.progress}>
                            <Slider
                                style={{width:SCREEN_WIDTH-5, height:10}}
                                minimumValue={0}
                                tapToSeek={true}
                                disabled={!isLoaded}
                                value={_getSeekSliderPosition()}
                                onSlidingComplete={_onSeekSliderSlidingComplete}
                                // onValueChange={_onSeekSliderValueChange}
                                maximumValue={1}
                                minimumTrackTintColor="green"
                                maximumTrackTintColor="red"
/>
                            </View>
                            <View style={{
                                flexDirection:"row",
                                justifyContent:"space-between",
                                alignItems:"center",
                                width:SCREEN_WIDTH-15,
                                alignSelf:"center"
                            }}>
                            <Text style={{
                                marginHorizontal:5,
                                marginVertical:2,
                                color:"#ffffff",
                                fontSize:15
                            }}>{isLoaded? playBackInstaceDuration: 0 }</Text>
                            <Text style={{
                                marginHorizontal:5,
                                marginVertical:2,
                                color:"#ffffff",
                                fontSize:15
                            }}>{isLoaded ? playBackInstacePosition: 0}</Text>
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
                            {isPlaying ? <MaterialCommunityIcons name="pause" size={28} color="black" />
                            :
                            <AntDesign name="caretright" size={28}/>}
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
        // marginBottom:16,
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
        paddingTop:15,
        paddingBottom:30,
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center"
    },
    ctrlBtn:{
        // backgroundColor:"#f2f2f2",
        padding:10,
        borderRadius:50,
        // shadowColor:"red",
        // shadowOffset:{width:0, height:0},
        // shadowRadius:8,
        // borderRadius:5
        shadowColor: 'white', // IOS
    shadowOffset: { height:0, width: 0 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: '#fff',
    elevation: 2, // Android
    height: 50,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
        
    },
    progress:{
        height:6,
        width:SCREEN_WIDTH -20,
        backgroundColor:"#f3f3f3",
        borderRadius:3,
        marginBottom:5,
        alignItems:"center",
        justifyContent:"center",
        alignSelf:"center"
    },
    
    
})
export default Home;