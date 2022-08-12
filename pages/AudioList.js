import {View,ImageBackground, Button, Image, TextInput, StyleSheet, TouchableOpacity, ScrollView, FlatList,Text} from 'react-native';
import {AntDesign, MaterialCommunityIcons} from "@expo/vector-icons";
function AudioList(){
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
        <View style={styles.audioList}>
                <View style={styles.drawaCt}>
                    <TouchableOpacity style={styles.drawerBtn}></TouchableOpacity>
                </View>
            <View style={styles.searchContainer}>
            <TextInput style={styles.search} placeholder="Search here..."/>
            <AntDesign name="search1" size={20}/>
            </View>
            <View style={styles.listHead}>
                <MaterialCommunityIcons name="playlist-music" size={30} color="#f2f2f2"/>
                <Text style={{
                    color:"#f2f2f2",
                    fontFamily:"poppins",
                    fontWeight:500,
                    fontSize:18,
                }}>Play Lists</Text>
            </View>
                <FlatList 
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
                }}/>
            </View>
    )
}

const styles = StyleSheet.create({
    audioList:{
        backgroundColor:"rgb(0,0,10)",
        paddingHorizontal:30,
        paddingBottom:"2rem",
        paddingTop:15,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        transform:[{translateY:-40}],
        width:"100%",
        position: slideUP ? "fixed" : "static",
        top:15
    },
    drawaCt:{
        width:"100%",
        flexDirection:"row",
        justifyContent:"center",
        marginBottom:"1rem"
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
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginTop:20,
//   borderRadius: 15 0 0 15;
        paddingHorizontal:15,
        paddingVertical:5,
        shadowColor:"rgba(132,139,200,0.60)",
        shadowOffset:{width:0, height:0},
        shadowRadius:"0.4rem",
        borderRadius:10
    },
    search:{
        backgroundColor:"transparent",
        // width: "100%",
        outlineStyle:"none",
        border: "none",
    },
    listHead:{
        paddingVertical:15,
        color:"#f2f2f2",
        fontFamily:"poppins",
        fontWeight:500,
        fontSize:18,
        paddingHorizontal:10,
        flexDirection:"row",
        gap:10
    },
    music:{
        paddingHorizontal:20,
        paddingVertical:10,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        backgroundColor:"rgba(26,26,26,.3)",
        marginVertical:3,
        borderRadius:5
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
        fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
        color:"#f3f3f3",
        fontSize:16,
        fontWeight:400,
    },
    musicTitle:{
        fontSize:12,
        color:"#f4f4f4",
        fontFamily:"montserrat",
        marginTop:3
    },
    musicDuration:{
        color:"#ffffff",
        fontFamily:"poppins",
        fontWeight:500
    }
})
export default AudioList;