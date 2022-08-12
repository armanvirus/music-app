import React, { useState, useEffect } from 'react'
import {View,ImageBackground, Button, Image, TextInput, StyleSheet, TouchableOpacity, ScrollView, FlatList,Text} from 'react-native';
import {AntDesign, MaterialCommunityIcons} from "@expo/vector-icons";
const Home = ()=>{
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

    const [slideUP, setSlideUP] = useState(true);
    
    return(
        <View style={styles.homeContainer}>
        <ImageBackground source={require('../assets/mic')} 
                  resizeMode="cover">
            <View style={{zIndex:2, backgroundColor:"rgba(26,26,26,.95)"}}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.menu}><AntDesign name="menufold"
                     size={22}
                     /></TouchableOpacity>
                </View>
                <View style={styles.details}>
                    <Image style={styles.rotator} source={require('../assets/wizad.jpg')}/>
                    <View style={styles.detail}>
                        <View style={{
                            display:"flex",
                            alignItems:"center",
                            marginBottom:"2.5rem", 
                            justifyContent:"center"}}>
                            <Text style={styles.audioName}>Microsoft Windows</Text>
                            <Text style={styles.artist}>Sayyadi Rabil</Text>
                        </View>
                        <View style={{
                            width:"85%",
                            marginTop:15
                        }}>
                            <View style={styles.progress}></View>
                            <View style={{
                                display:"flex",
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
                                <MaterialCommunityIcons name="shuffle-disabled" color="#f2f2f2" size={18}/>
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <AntDesign name="stepbackward" color="#f2f2f2" size={18}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.ctrlBtn}>
                            <AntDesign name="caretright" size={25}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                            <AntDesign name="stepforward" color="#f2f2f2" size={18}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <MaterialCommunityIcons name="repeat" color="#f2f2f2" size={18}/>
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
            {/* <View style={styles.searchContainer}>
            <TextInput style={styles.search} placeholder="Search here..."/>
            <AntDesign name="search1" size={20}/>
            </View> */}
            {/* <View style={styles.listHead}>
                <MaterialCommunityIcons name="playlist-music" size={30} color="#f2f2f2"/>
                <Text style={{
                    color:"#f2f2f2",
                    fontFamily:"poppins",
                    fontWeight:500,
                    fontSize:18,
                }}>Play Lists</Text>
            </View> */}
                {/* <FlatList 
                data={audis}
                keyExtractor= {audi => audi.name}
                renderItem={({item})=>{
                   return(<TouchableOpacity style={styles.music}>
                        <View style={styles.musicInfo}>
                        <View>
                           <Image style={styles.musicIcon} source={require('../assets/team.jpg')}/>
                       </View>
                            <View>
                                <Text style={styles.musicName}>{item.name}</Text>
                                <Text style={styles.musicTitle}>{item.title}</Text>   
                            </View> 
                        </View>
                        <Text style={styles.musicDuration}>3:30</Text>
                    </TouchableOpacity>)
                }}/> */}
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    homeContainer:{
        backgroundColor:"rgb(239, 241, 248)",
        height:"100vh",
        width:"100%",
        // padding:30
    },
    header:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-end",
        alignItems:"center",
        marginBottom:"1rem",
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
        height:35,
        width:35,
        borderRadius:"50%",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        padding:10,
        backgroundColor:"rgba(255,255,255,0.8)"
    },
    details:{
        // height:"50vh",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        paddingHorizontal:30,
        paddingBottom:20,
        color:"white",
        transform:[{translateY:-30}]

    },
    rotator:{
        height:150,
        width:150,
        marginVertical:'1rem',
        borderRadius:"50%"
    },
    detail:{
        // height:"80vh",
        width:"100%",
        justifyContent:"center",
        alignItems:"center",
        alignSelf:"flex-start"
    },
    audioName:{
        fontWeight:500,
        fontFamily:"poppins",
        marginBottom:5,
        color:"#ffffff",
        fontSize:18
    },
    artist:{
        fontWeight:400,
        fontFamily:"poppins",
        color:"#f2f2f2",
        fontSize:12 
    },
    controls:{
        width:"70%",
        paddingHorizontal:20,
        paddingTop:5,
        paddingBottom:30,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center"
    },
    ctrlBtn:{
        backgroundColor:"#f2f2f2",
        padding:5,
        borderRadius:"50%"
    },
    progress:{
        height:2,
        width:"100%",
        backgroundColor:"#f3f3f3",
        borderRadius:3
    },
    
})
export default Home;