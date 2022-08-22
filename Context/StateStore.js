import React,{useState} from 'react';
export const StateContext = React.createContext();

const Stat = ({children})=>{
    const [playbackInstance, setPlaybackInstance] = useState(null);
    return(
        <StateContext.Provider value={[playbackInstance, setPlaybackInstance]}>
            {children} 
        </StateContext.Provider>
    )
}

export default Stat;