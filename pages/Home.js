import React, { useState, useRef, useEffect, useContext } from 'react';
import Slider from '@react-native-community/slider';
import {StateContext} from '../Context/StateStore';
import {AudiosObj } from '../componets/AudiosObj';
import {
    Dimensions,
    View,
    ImageBackground,  
    Image,
    Modal, 
    TextInput, 
    StyleSheet, 
    // TouchableOpacity,
    Pressable, 
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
import AboutModal from "../componets/AboutModal";
const {width:SCREEN_WIDTH, height:SCREEN_HEIGHT} = Dimensions.get('window');
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
            showModel,
            playBackInstaceDuration, 
            setDuration,
            playBackInstacePosition, 
            setPosition,
            isLoaded,
            looping,setlooping,
            playinIndex, 
            setIndex 
        } = useContext(StateContext);
    const scroller = useRef();
    const [isSeeking, setSeeking ] = useState(false);
    const [chooseIcon,setIcon] = useState(0);
    const [shouldPlayAtEndOfSeek,setShouldPlayAtEndOfSeek ] = useState(false)
    // const [loopType, setLoopType] = useState('all');

    const images = [
        {uri:require('../assets/random/logo.png')},
        {uri:require('../assets/random/abul.png')},
        {uri:require('../assets/random/abulfatahi.png')},
        {uri:require('../assets/random/shehi.png')}
    ]
      useEffect(()=>{

        // scrollIntoView(scrollList.current);
        scroller.current.scrollToEnd({animated:true})
      },[""]);

      useEffect(()=>{
          if(playinIndex !== 'undefined' && playinIndex !== null){
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
          setIcon(Math.floor(Math.random() * 4))
        //   _updatePlaybackInstanceForIndex(this.state.shouldPlay);
        }
      };
    
      const _onBackPressed = () => {
        if (playbackInstance != null) {
          _advanceIndex(false);
          setIcon(Math.floor(Math.random() * 4))
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

  const handlePlay = (index)=>{
     setIndex(index)
    //  scrollMusic.current.scrollIntoView({block: "start",behavior:"smooth"})
    setIcon(Math.floor(Math.random() * 4))
    scroller.current.scrollTo({
        x:0,
        y:0,
        animated:true
    })
    
}


const _getTimestamp = () => {
    if (
      playbackInstance != null &&
      playBackInstacePosition != null &&
      playBackInstaceDuration != null
    ) {
      return `${_getMMSSFromMillis(
        playBackInstacePosition
      )}`;
    }
    return "";
  }

  const _getMMSSFromMillis = (millis)=>{
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = number => {
      const string = number.toString();
      if (number < 10) {
        return "0" + string;
      }
      return string;
    };
    return padWithZero(minutes) + ":" + padWithZero(seconds);
  }
    return(
        <>
        <ScrollView ref={scroller} style={styles.homeContainer}>
        {/* <ImageBackground source={require('../assets/wizad.jpg')} 
                  resizeMode="cover"> */}
            <View style={{zIndex:2,
                height:SCREEN_HEIGHT/1.2,
                justifyContent:"flex-end",
                backgroundColor:"rgb(0,0,10)"}}>
                <View style={styles.details}>
                    <View style={{width:"100%",alignItems:"center"}}>
                    <Image style={styles.rotator} source={playinIndex === null ? require('../assets/random/musicIcon.jpg') : images[chooseIcon].uri }/>
                    <View style={{
                            alignItems:"center",
                            marginBottom:40, 
                            justifyContent:"center"}}>
                            <Text style={styles.audioName}>{ playinIndex !== null ? AudiosObj[playinIndex].name : 'Loading...'}</Text>
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
                            }}>{ playinIndex !== null? AudiosObj[playinIndex].duration: 0 }</Text>
                            <Text style={{
                                marginHorizontal:5,
                                marginVertical:2,
                                color:"#ffffff",
                                fontSize:15
                            }}>{isLoaded ? _getTimestamp(): 0}</Text>
                            </View>
                        </View>
                        <View style={styles.controls}>
                            <Pressable onPress={()=> setShuffle(!isNotShuffle)}>
                               { isNotShuffle ? <MaterialCommunityIcons name="shuffle-disabled" color="#f2f2f2" size={20}/> : 
                                 <MaterialCommunityIcons name="shuffle" color="#f2f2f2" size={20}/>}
                            </Pressable>
                            <Pressable onPress={()=>(_onBackPressed())} >
                                <AntDesign name="stepbackward" color="#f2f2f2" size={25}/>
                            </Pressable>
                            <Pressable 
                            onPress={ ()=>_onPlayPausePressed()}
                            style={styles.ctrlBtn}>
                            {isPlaying ? <MaterialCommunityIcons name="pause" size={28} color="black" />
                            :
                            <AntDesign name="caretright" size={28}/>}
                            </Pressable>
                            <Pressable onPress={()=>_onForwardPressed()}>
                            <AntDesign name="stepforward" color="#f2f2f2" size={25}/>
                            </Pressable>
                            <Pressable onPress={()=>(setlooping(!looping))}>
                                {looping ? <MaterialCommunityIcons name="repeat-once" color="#f2f2f2" size={20}/>:<MaterialCommunityIcons name="repeat" color="#f2f2f2" size={20}/>}
                            </Pressable>
                        </View>
                    </View>

                </View>
            </View>
            {/* <View style={styles.cover}></View> */}
            {/* </ImageBackground> */}
            {/* <BottomSheet setI={setIndex}/> */}

            <View style={styles.audioList}>
                <View style={styles.drawaCt}>
                    <Pressable style={styles.drawerBtn}></Pressable>
                </View>
                <View style={styles.listHead}>
                <MaterialCommunityIcons name="playlist-music" 
                size={35} style={{
                    backgroundColor:"rgba(26,26,26,.95)", 
                    padding:3,
                    borderWidth:1.5,
                    borderColor:"rgba(0,153,0,0.25)",
                    borderRadius:5,
                    marginHorizontal:7}}
                color="#f2f2f2"/>
                <Text style={{
                    color:"#f2f2f2",
                    // fontFamily:"poppins",
                    // fontWeight:500,
                    fontSize:20,
                    marginLeft:5
                }}>Play Lists</Text>
            </View>

                {
                AudiosObj.map((item,index)=>{
                   return( <Pressable key={index}
                            onPress={()=> handlePlay(index)} 
                            style={playinIndex == index ? styles.playingMusic: styles.music}>
                        <View style={ styles.musicInfo}>
                        <View>
                           <Image style={styles.musicIcon} source={require('../assets/wizad.jpg')}/>
                       </View>
                            <View>
                                <Text style={styles.musicName}>{item.name}</Text>
                                <Text style={styles.musicTitle}>{item.title}</Text>   
                            </View> 
                        </View>
                        <Text style={styles.musicDuration}>{item.duration}</Text>
                    </Pressable>)
                })}
        </View>

        </ScrollView>
        <AboutModal visible={showModel}/>
        </>
    )
}

const styles = StyleSheet.create({
    homeContainer:{
        backgroundColor:"rgb(22,27,57)",
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
    borderWidth:2,
    borderColor:"rgba(0,153,0,0.4)"
        
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
    audioList:{
        backgroundColor:"rgb(0,0,10)",
        // paddingHorizontal:30,
        paddingBottom:32,
        // borderTopLeftRadius:20,
        // borderTopRightRadius:20,
        // transform:[{translateY:-50}],
        width:"100%",
        // margingBottom:SCREEN_HEIGHT/2
        
        
    
        
    },
    listHead:{
        paddingVertical:15,
        color:"#f2f2f2",
        flexDirection:"row",
        alignItems:"center",
        gap:10,
        marginBottom:10

    },
    drawaCt:{
        width:"100%",
        flexDirection:"row",
        justifyContent:"center",
        marginBottom:16,
        backgroundColor:'red',
        paddingVertical:10,
        backgroundColor:"rgba(26,26,26,.95)",
        // borderTopLeftRadius:20,
        // borderTopRightRadius:20,
    },
    drawerBtn:{
        backgroundColor:"#f2f2f2",
        width:80,
        height:6,
        borderRadius:3
    },
    music:{
        paddingRight:20,
        paddingLeft:5,
        paddingVertical:10,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        backgroundColor:"rgba(38,38,38,1)",
        marginVertical:3,
        // borderRadius:5
    },
    playingMusic:{
        paddingRight:20,
        paddingLeft:10,
        paddingVertical:10,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        backgroundColor:"rgba(38,38,38,1)",
        marginVertical:3,
        marginLeft:10,
        shadowColor: '#004d00', // IOS
        shadowOffset: { height:0, width: 0 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 3, // Android
        // borderRadius:5,
        borderWidth:1,
        borderColor:"rgba(0,153,0,0.3)"
    },
    musicInfo:{
        flexDirection:"row",
        alignItems:"center",
        gap:10,
        
    },
    musicIcon:{
        height:50,
        width:50,
        borderRadius:3,
        marginRight:5
    },
    musicName:{
        color:"#f3f3f3",
        fontSize:16,
    },
    musicTitle:{
        fontSize:12,
        color:"#f4f4f4",
        marginTop:3
    },
    musicDuration:{
        color:"#ffffff",
    }
    
    
})
export default Home;