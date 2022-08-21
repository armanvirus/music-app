
import {Dimensions,StyleSheet,View, TouchableOpacity,FlatList,Image,Text} from 'react-native';
import {GestureDetector,Gesture} from 'react-native-gesture-handler';
import Animated,{useAnimatedStyle,useSharedValue} from 'react-native-reanimated';
const {height:SCREEN_HEIGHT} = Dimensions.get('window');
import {AudiosObj} from './AudiosObj';


const BottomSheet = (props)=>{
    // console.log(AudiosObj().forEach((el)=> console.log(el.name)))
    // console.log(props)
    const handlePlay = (index)=>{
        props.setI(index)
    }
    const translateY = useSharedValue(0);
    const context = useSharedValue({y:0})
    const gesture = Gesture.Pan()
    .onStart(()=>{
        context.value = {y:translateY.value}
    })
    .onUpdate((event)=>{
        translateY.value = event.translationY + context.value.y
        translateY.value = Math.max(translateY.value, (-SCREEN_HEIGHT + (SCREEN_HEIGHT/4)));
        // console.log(translateY.value)
    });
    const rBottomSheetStyle = useAnimatedStyle(()=>{
        return{
            transform:translateY.value > -35 ?
            [{translateY:0}] : [{translateY:translateY.value}]
        }
            
    });
    return(
        <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.bottomSheet,rBottomSheetStyle]}>
        <View style={styles.audioList}>
                <View style={styles.drawaCt}>
                    <TouchableOpacity style={styles.drawerBtn}></TouchableOpacity>
                </View>

                <FlatList 
                data={AudiosObj}
                keyExtractor= {audi => audi.name}
                renderItem={({item,index})=>{
                   return( <TouchableOpacity
                            onPress={()=> handlePlay(index)} 
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
        </Animated.View>
        </GestureDetector>
    ) 
}

const styles = StyleSheet.create({
    bottomSheet:{
        height:SCREEN_HEIGHT - (SCREEN_HEIGHT/5) ,
        width:"100%",
        position:"absolute",
        top:SCREEN_HEIGHT/1.2,
        backgroundColor:"rgb(0,0,10)",
        zIndex:3,
        borderRadius:25,
        
        
    },
    audioList:{
        backgroundColor:"rgb(0,0,10)",
        // paddingHorizontal:30,
        paddingBottom:32,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        // transform:[{translateY:-50}],
        width:"100%",
        // margingBottom:SCREEN_HEIGHT/2
        
        
    
        
    },
    drawaCt:{
        width:"100%",
        flexDirection:"row",
        justifyContent:"center",
        marginBottom:16,
        backgroundColor:'red',
        paddingVertical:10,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
    },
    drawerBtn:{
        backgroundColor:"#f2f2f2",
        width:80,
        height:6,
        borderRadius:3
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
export default BottomSheet;