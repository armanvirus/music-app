import React,{useState} from 'react';
import {AudiosObj } from '../componets/AudiosObj';
import {
    Audio,
    InterruptionModeAndroid,
    InterruptionModeIOS,
  } from "expo-av";
export const StateContext = React.createContext();

const Stat = ({children})=>{
    const [index, setIndex] = useState(null);
    const [playbackInstance, setPlaybackInstance] = useState(null);
    const [isPlaying, setPlaying] = useState(false);
    const [isNotShuffle, setShuffle] = useState(true);
    const [isLoaded, setLoaded] = useState(false);
    const [playBackInstacePosition, setPosition] = useState(null);
    const [playBackInstaceDuration, setDuration] = useState(null);

    const  _loadNewPlaybackInstance = async (playing) => {
        if(playbackInstance === null || playbackInstance === undefined){
           const source = await AudiosObj[index].uri;
           const initialStatus = {shouldPlay:true, isLooping:false}
           try{
   
             const { sound,status} = await Audio.Sound.createAsync(
               source, initialStatus,          
               (status) => {
                   if (status.isLoaded){
                       setPosition(status.positionMillis)
                       setDuration(status.durationMillis)
                       // shouldPlay: status.shouldPlay,
                       setPlaying(status.isPlaying)
                       setLoaded(status.isLoaded)
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
                       setPosition(status.positionMillis/1000)
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
            index, 
            setIndex}}>
            {children} 
        </StateContext.Provider>
    )
}

export default Stat;