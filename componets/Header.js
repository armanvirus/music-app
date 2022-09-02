import React from 'react';
import {View, Text} from 'react-native';

const Header = ({ navigation, route, options, back })=>{
    return(
        <View style={{paddingLeft:5}}>
            <Text style={{fontSize:20, color:"#ffffff"}}>Ruhina Da Jikina</Text>
        </View>

    )
}


export default Header;