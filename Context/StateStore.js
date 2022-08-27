import React,{useState} from 'react';
import {AudiosObj } from '../componets/AudiosObj';
import {
    Audio,
    InterruptionModeAndroid,
    InterruptionModeIOS,
  } from "expo-av";
export const StateContext = React.createContext();

const Stat = ({children})=>{
    const [playinIndex, setIndex] = useState(null);
    const [playbackInstance, setPlaybackInstance] = useState(null);
    const [isPlaying, setPlaying] = useState(false);
    const [isNotShuffle, setShuffle] = useState(true);
    const [isLoaded, setLoaded] = useState(false);
    const [playBackInstacePosition, setPosition] = useState(null);
    const [playBackInstaceDuration, setDuration] = useState(null);

    const  _loadNewPlaybackInstance = async (playing) => {
        if(playbackInstance !== null && playbackInstance !== "undefined"){
            await playbackInstance.unloadAsync();
            await setPlaybackInstance(null);
        }
           
           try{
            const source = await AudiosObj[playinIndex].uri;
            const initialStatus = {shouldPlay:true,}
            const { sound,status} = await Audio.Sound.createAsync(
               source, initialStatus,          
               (status) => {
                   if (status.isLoaded){
                       setPosition(status.positionMillis/1000)
                       setDuration(status.durationMillis)
                       // shouldPlay: status.shouldPlay,
                       setLoaded(status.isLoaded);
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

     function  _advanceIndex(forwad) {
        if(!isNotShuffle){
            const randomChoice = Math.floor(Math.random() * (AudiosObj.length - 1));
            setIndex(randomChoice);
        }else
        if(forwad){
            if(playinIndex === AudiosObj.length -1){
                setIndex(1)
            }else{
                setIndex(playinIndex + 1)
            }
        } else {
            if(playinIndex > 1){
                setIndex(playinIndex - 1)
            }else{
                setIndex(AudiosObj().length - 1)
            }
        }
      }

      async function _updatePlaybackInstanceForIndex(playing) {  
        _loadNewPlaybackInstance(playing);
      }
    return(
        <StateContext.Provider value={{
            _advanceIndex,
            _loadNewPlaybackInstance,
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
            setIndex}}>
            {children} 
        </StateContext.Provider>
    )
}

export default Stat;