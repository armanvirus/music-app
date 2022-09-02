import React,{useContext} from "react";
import {Modal,Text,View,StyleSheet,Image,Dimensions,TouchableWithoutFeedback} from 'react-native';
const {width:SCREEN_WIDTH, height:SCREEN_HEIGHT} = Dimensions.get('window');
import {StateContext} from "../Context/StateStore"
import { useFonts } from 'expo-font';
import { FontAwesome5,MaterialCommunityIcons } from '@expo/vector-icons';

const AboutModal =({visible})=>{
    const [fontsLoaded] = useFonts({
        'Lato-Regular': require('../assets/fonts/Lato-Regular.ttf'),
        'RobotoCondensed-Regular': require('../assets/fonts/RobotoCondensed-Regular.ttf'),
        'JosefinSans-Regular': require('../assets/fonts/JosefinSans-Regular.ttf'),
        'JosefinSans-SemiBold': require('../assets/fonts/JosefinSans-SemiBold.ttf'),
        'RobotoCondensed-Bold': require('../assets/fonts/RobotoCondensed-Bold.ttf')
      });
     
    const {        
        showModel, 
        setShowModel, 
    } = useContext(StateContext);
    return( 
        <Modal animationType="slide" transparent style={styles.modalContainer} visible={visible}>
            <View style={styles.contentWraper}>
                <View>
                    <Image  style={styles.imgs} source={require('../assets/rabil.png')}/>
                    <View style={styles.alDet}>
                        <Text style={[styles.alhead,{fontFamily:"RobotoCondensed-Regular"}]}>
                        New Audio Album Released 2022
                        </Text>
                        <Text style={[styles.alname,,{fontFamily:"RobotoCondensed-Bold"}]}>"RUHINA DA JIKINA"</Text>
                        <Text style={[styles.altrac,{fontFamily:"JosefinSans-Regular", fontSize:16}]}>The album comprises the following track list :-</Text>
                        <View>
                            <Text style={[styles.altrac,{fontFamily:"JosefinSans-SemiBold"}]}><Text style={styles.list}>-</Text>Maryam Remix++</Text>
                            <Text style={[styles.altrac,{fontFamily:"JosefinSans-SemiBold"}]}><Text style={styles.list}>-</Text>Rabil Gamuwa</Text>
                            <Text style={[styles.altrac,{fontFamily:"JosefinSans-SemiBold"}]}><Text style={styles.list}>-</Text>Rabil Harazimi</Text>
                            <Text style={[styles.altrac,{fontFamily:"JosefinSans-SemiBold"}]}><Text style={styles.list}>-</Text>Rabil Remix++ Ruhi</Text>
                            <Text style={[styles.altrac,{fontFamily:"JosefinSans-SemiBold"}]}><Text style={styles.list}>-</Text>Zakiyyu ft Rabil</Text>
                        </View>
                    </View>
                </View>
                <View style={{padding:5}}>
                <Image style={styles.comLogo} source={require('../assets/ARKS.png')}/>
                    <View>
                        <View><Text style={{
                            fontSize:18,
                            fontFamily:"Lato-Regular"
                        }}>Contact Arks</Text></View>
                        <View style style={styles.contactDet}>
                            <MaterialCommunityIcons name="email-send-outline" size={24} color="black" />
                            <Text style={{paddingLeft:10, fontFamily:"RobotoCondensed-Regular", color:"rgb(0,0,20)"}}>arks.support@gmail.com</Text></View>
                        <View style style={styles.contactDet}>
                        <FontAwesome5 name="headphones-alt" size={20} color="black" />
                            <Text style={{paddingLeft:10, fontFamily:"RobotoCondensed-Regular", color:"rgb(0,0,20)"}}>+2347011911909</Text>
                        </View>
                        <View style={styles.contactDet}>
                        <FontAwesome5 name="headphones-alt" size={20} color="black" />
                            <Text style={{paddingLeft:10, fontFamily:"RobotoCondensed-Regular", color:"rgb(0,0,20)"}}>+2349032509094</Text>
                        </View>
                    </View> 
                </View>

            </View>
            <TouchableWithoutFeedback onPress={()=> (setShowModel(!showModel))}>
                <View style={styles.fadedBg}></View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}


export default AboutModal;

const styles = StyleSheet.create({
    modalContainer:{
        height:SCREEN_HEIGHT/1.1,
        width:"100%",
        backgroundColor:"rgba(250,250,255,0.95)",
        padding:2,
        position:"absolute",
        bottom:0,
        left:0,
    },
    contentWraper:{
        position:"absolute",
        bottom:0,
        left:0,
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        backgroundColor:"rgba(237,246,249,0.98)",
        height:SCREEN_HEIGHT/1.1,
        padding:5,
        justifyContent:"center"
    },
    alDet:{
        padding:10,
    },
    alhead:{
        fontSize:20,
        paddingBottom:5,
        alignSelf:"center"
    },
    alname:{
        alignSelf:"center",
        fontSize:18,
        color:"rgb(0,0,20)",
        marginBottom:5
    },
    list:{
        color:"#006600"
    },
    altrac:{
        fontSize:16,
        marginBottom:5

    },
    imgs:{
        height:150,
        width:150,
        alignSelf:"center",
        marginVertical:15
    },
    desc:{
        fontSize:15,
    },
    comLogo:{
        height:100,
        width:100,
        alignSelf:"center",
        marginVertical:10
    },
    contactDet:{
        flexDirection:"row",
        alignItems:"center",
        padding:2
        
    },
    fadedBg:{
        position:"absolute",
        bottom:0,
        top:0,
        left:0,
        right:0,
        height:SCREEN_HEIGHT,
        backgroundColor:"rgba(0,0,0,0.3)"
        
    }
})