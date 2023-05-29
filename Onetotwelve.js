import { useNavigation } from '@react-navigation/native';
import React,{useState} from 'react';
import {View, StyleSheet,Text,TouchableOpacity,Image,ScrollView} from 'react-native';
import Headercourse from './small_componants/Headercourse';

const Onetotweleve = () => {
    const [isMonthselected, setisMonthselected] = useState(true);
    const navigation = useNavigation()
    return (
        <ScrollView style={styles.leaderContainer}>
            <Headercourse title="1-12 Class" routename="Mysylebus" />
            
            {/* <View style={styles.timeMonthYear}>
                <TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={()=>setisMonthselected(true)} style={[styles.month,isMonthselected&&styles.bgofTimeRang]}>
                    <Text style={styles.timeTitle}>Monthly</Text>
                </TouchableOpacity>
                <TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={()=>setisMonthselected(false)} style={[styles.month,!isMonthselected&&styles.bgofTimeRang]}>
                    <Text style={styles.timeTitle}>Yearly</Text>
                </TouchableOpacity>
            </View> */}

            {/* mypostion */}
            <Text style={{marginTop:10}}></Text>
            <TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={()=>navigation.navigate("Classone")} style={styles.leaderInfo}>
                <Image style={styles.leaderphoto} source={{uri:"https://robotechvalley.com/app/sumition.jpeg"}} />
                <View>
                    <Text style={styles.leadername}>Class 01</Text>
                </View>
            </TouchableOpacity>
            {/* <Text style={{marginTop:15}}>Best Performance</Text> */}
            <View>
                <TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={()=>navigation.navigate("Class2")}  style={styles.leaderInfo}>
                    <Image style={styles.leaderphoto} source={{uri:"https://robotechvalley.com/app/book.jpeg"}} />
                    <View>
                        <Text style={styles.leadername}>Class 02</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={()=>navigation.navigate("Class3")}  style={styles.leaderInfo}>
                    <Image style={styles.leaderphoto} source={{uri:"https://robotechvalley.com/app/sumition.jpeg"}} />
                    <View>
                        <Text style={styles.leadername}>Class 03</Text>
                     
                    </View>
                </TouchableOpacity>
                <TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={()=>navigation.navigate("Class4")}  style={styles.leaderInfo}>
                    <Image style={styles.leaderphoto} source={{uri:"https://robotechvalley.com/app/tube.jpeg"}} />
                    <View>
                        <Text style={styles.leadername}>Class 04</Text>
                        
                    </View>
                </TouchableOpacity>
                <TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={()=>navigation.navigate("Class5")}  style={styles.leaderInfo}>
                    <Image style={styles.leaderphoto} source={{uri:"https://robotechvalley.com/app/react.jpeg"}} />
                    <View>
                        <Text style={styles.leadername}>Class 05</Text>
                        
                    </View>
                </TouchableOpacity>
                <TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={()=>navigation.navigate("Class6")}  style={styles.leaderInfo}>
                    <Image style={styles.leaderphoto} source={{uri:"https://robotechvalley.com/app/sumition.jpeg"}} />
                    <View>
                        <Text style={styles.leadername}>Class 06</Text>
                        
                    </View>
                </TouchableOpacity>
                <TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={()=>navigation.navigate("Class7")}  style={styles.leaderInfo}>
                    <Image style={styles.leaderphoto} source={{uri:"https://robotechvalley.com/app/book.jpeg"}} />
                    <View>
                        <Text style={styles.leadername}>Class 07</Text>
                        
                    </View>
                </TouchableOpacity>
                <TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={()=>navigation.navigate("Class8")}  style={styles.leaderInfo}>
                    <Image style={styles.leaderphoto} source={{uri:"https://robotechvalley.com/app/react.jpeg"}} />
                    <View>
                        <Text style={styles.leadername}>Class 08</Text>
                        
                    </View>
                </TouchableOpacity>
                <TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={()=>navigation.navigate("Class9")}  style={styles.leaderInfo}>
                    <Image style={styles.leaderphoto} source={{uri:"https://robotechvalley.com/app/book.jpeg"}} />
                    <View>
                        <Text style={styles.leadername}>Class 09</Text>
                        
                    </View>
                </TouchableOpacity>
                <TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={()=>navigation.navigate("Class10")}  style={styles.leaderInfo}>
                    <Image style={styles.leaderphoto} source={{uri:"https://robotechvalley.com/app/sumition.jpeg"}} />
                    <View>
                        <Text style={styles.leadername}>Class 10</Text>
                        
                    </View>
                </TouchableOpacity>
                <TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={()=>navigation.navigate("Class11")}  style={styles.leaderInfo}>
                    <Image style={styles.leaderphoto} source={{uri:"https://robotechvalley.com/app/tube.jpeg"}} />
                    <View>
                        <Text style={styles.leadername}>Class 11</Text>
                        
                    </View>
                </TouchableOpacity>
                <TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={()=>navigation.navigate("Class12")}  style={styles.leaderInfo}>
                    <Image style={styles.leaderphoto} source={{uri:"https://robotechvalley.com/app/book.jpeg"}} />
                    <View>
                        <Text style={styles.leadername}>Class 12</Text>
                        
                    </View>
                </TouchableOpacity>
                
            </View>
            <View style={{height:50}}></View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    leaderContainer:{
        padding:20,

    },
    leaderTitle:{
        textAlign:'center',
        color:'black',
        fontWeight:'bold',
        fontSize:19,
        marginBottom:15,
        backgroundColor:'white',
        paddingVertical:10,
        borderRadius:10,
        shadowColor:'black',
        elevation:3
    },
    timeMonthYear:{
        backgroundColor:'white',
        height:45,
        width:"100%",
        shadowColor:'gray',
        elevation:3,
        borderRadius:8,
        overflow:'hidden',
        display:'flex',
        flexDirection:'row'
    },
    month:{
        height:'100%',
        width:'50%',
        borderRadius:8,
        display:'flex',
        justifyContent:'center',

    },
    timeTitle:{
        textAlign:'center',
        color:'black',
        fontWeight:'bold',
        fontSize:16,
    },
    bgofTimeRang:{
        backgroundColor:'#fe00fd',
    },
    leaderphoto:{
        height:60,
        width:60,
        marginRight:15
    },
    leaderInfo:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'white',
        padding:10,
        borderRadius:10,
        shadowColor:'gray',
        elevation:3,
        marginTop:10,
        marginBottom:10
    },
    pointsDiv:{
        display:'flex',
        flexDirection:'row',
        
    },
    leadername:{
        color:'black',
        fontWeight:'bold',
        fontSize:20,
        marginBottom:5
    },
    positionColor:{
        backgroundColor:'#fe00fd',
        marginLeft:10,
        paddingHorizontal:10,
        color:'white',
        borderRadius:5,
        paddingVertical:1,
        fontSize:12
    }

})

export default Onetotweleve;
