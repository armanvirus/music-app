import {View,ImageBackground, Button, Image, TextInput, StyleSheet, TouchableOpacity, ScrollView, FlatList,Text} from 'react-native';
import {AntDesign, MaterialCommunityIcons} from "@expo/vector-icons";
import {AudiosObj } from '../componets/AudiosObj';
function AudioList({navigation}){
    const musicPressHandler = (musicMusic) =>{
          navigation.push('Home',{index:musicMusic})
    }
    return(
        <View style={styles.audioList}>
                {/* <View style={styles.drawaCt}>
                    <TouchableOpacity style={styles.drawerBtn}></TouchableOpacity>
                </View> */}
            <View style={styles.searchContainer}>
            <TextInput style={styles.search} placeholder="Search here..."/>
            <AntDesign name="search1" size={20}/>
            </View>
            <View style={styles.listHead}>
                <MaterialCommunityIcons name="playlist-music" size={40} color="#f2f2f2"/>
                <Text style={{
                    color:"#f2f2f2",
                    // fontFamily:"poppins",
                    // fontWeight:500,
                    fontSize:20,
                    marginLeft:5
                }}>Play Lists</Text>
            </View>
                <FlatList 
                data={AudiosObj}
                keyExtractor= {audi => audi.name}
                renderItem={({item,index})=>{
                   return(<TouchableOpacity
                            onPress={()=>musicPressHandler(index)} 
                            style={styles.music}>
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
                }}/>
            </View>
    )
}

const styles = StyleSheet.create({
    audioList:{
        backgroundColor:"rgb(0,0,10)",
        paddingHorizontal:5,
        paddingBottom:32,
        paddingTop:15,
        // borderTopLeftRadius:20,
        // borderTopRightRadius:20,
        // transform:[{translateY:-40}],
        width:"100%",
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
    },
    searchContainer:{
        backgroundColor:"#dce1eb",
        color: "#222",
        width:"98%",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginTop:20,
        alignSelf:"center",
//   borderRadius: 15 0 0 15;
        paddingHorizontal:15,
        paddingVertical:5,
        marginHorizontal:10,
        shadowColor:"rgba(132,139,200,0.60)",
        shadowOffset:{width:0, height:0},
        shadowRadius:8,
        borderRadius:5
    },
    search:{
        backgroundColor:"transparent",
        // width: "100%",
        // outlineStyle:"none",
        // border: "none",
    },
    listHead:{
        paddingVertical:15,
        color:"#f2f2f2",
        flexDirection:"row",
        alignItems:"center",
        gap:10
    },
    music:{
        paddingRight:20,
        paddingLeft:5,
        paddingVertical:10,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        backgroundColor:"rgba(38,38,38,1)",
        marginVertical:1,
        // borderRadius:5
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
export default AudioList;