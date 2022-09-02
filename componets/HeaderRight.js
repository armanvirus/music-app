import React,{useContext} from 'react';
import {StateContext} from "../Context/StateStore"
import { 
    StyleSheet, 
    View, 
    TouchableOpacity} from 'react-native';
import {AntDesign,Ionicons, MaterialCommunityIcons,Entypo} from "@expo/vector-icons";

const HeaderRight = ()=>{
    const {        
        showModel, 
        setShowModel, 
    } = useContext(StateContext);
    return(
        <TouchableOpacity onPress={()=>( setShowModel(!showModel) )} 
            style={{marginRight:15}}
            >
            <Entypo name="dots-three-vertical" size={24} color="white" />
          </TouchableOpacity>
    )
}

export default HeaderRight;