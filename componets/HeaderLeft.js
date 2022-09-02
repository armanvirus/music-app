import React from 'react';
import { StyleSheet, View, 
    Pressable,
    Dimensions } from 'react-native';
    import {AntDesign,Ionicons, MaterialCommunityIcons,Entypo} from "@expo/vector-icons";

const HeaderLeft = ()=>{
    return(
        <Pressable 
          onPress={()=>(console.log("back btn pressed"))} 
          style={{marginLeft:15}}
          >
          <Ionicons name="chevron-down" size={24} color="white" />
        </Pressable>
    )
}

export default HeaderLeft;