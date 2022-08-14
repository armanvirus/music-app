import React, { useState, useEffect } from 'react'
import {View,ImageBackground, Button, Image, TextInput, StyleSheet, TouchableOpacity, ScrollView, FlatList,Text} from 'react-native';
import {AntDesign, MaterialCommunityIcons} from "@expo/vector-icons";
const Home = ()=>{
    const [slideUP, setSlideUP] = useState(true);
    const audis = [
        {
            name:"RABEEL 1",
            title:"Son Annabi cikin Zuciya"
        },
        {
            name:"RABEEL 2",
            title:"Annabi fiyayyen halitta"
        },
        {
            name:"RABEEL 3",
            title:"Annabi sha yabo abun ambato"
        },
        {
            name:"RABEEL 4",
            title:"Imamul Mursalina"
        },
        {
            name:"RABEEL 5",
            title:"Son Annabi cikin Zuciya"
        }
    ];

    
    
    return(
        <View style={styles.homeContainer}>
        <ImageBackground source={require('../assets/wizad.jpg')} 
                  resizeMode="cover">
            <View style={{zIndex:2,
                height:"95%",
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
                            <Text style={styles.audioName}>Microsoft Windows</Text>
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
                            <TouchableOpacity >
                                <AntDesign name="stepbackward" color="#f2f2f2" size={25}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.ctrlBtn}>
                            <AntDesign name="caretright" size={28}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
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
            <View style={styles.audioList}>
                <View style={styles.drawaCt}>
                    <TouchableOpacity style={styles.drawerBtn}></TouchableOpacity>
                </View>
            </View>

        </View>
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
        height:"75%",
        paddingHorizontal:30,
        paddingBottom:20,
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
    audioList:{
        backgroundColor:"rgb(0,0,10)",
        paddingHorizontal:30,
        paddingBottom:32,
        paddingTop:15,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        transform:[{translateY:-50}],
        width:"100%",
        zIndex:3
    
        
    },
    drawaCt:{
        width:"100%",
        flexDirection:"row",
        justifyContent:"center",
        marginBottom:16
    },
    drawerBtn:{
        backgroundColor:"#f2f2f2",
        width:80,
        height:6,
        borderRadius:3
    }
    
})
export default Home;