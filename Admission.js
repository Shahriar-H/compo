import React,{useState} from 'react';
import {View, StyleSheet,Text,TouchableOpacity,Image,ScrollView} from 'react-native';
import Headercourse from './small_componants/Headercourse';

const Admission = () => {
    const [isMonthselected, setisMonthselected] = useState(true);
    return (
        <ScrollView style={styles.leaderContainer}>
            <Headercourse title="Admission Course" routename="Mysylebus" />
            
            {/* <View style={styles.timeMonthYear}>
                <TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={()=>setisMonthselected(true)} style={[styles.month,isMonthselected&&styles.bgofTimeRang]}>
                    <Text style={styles.timeTitle}>Monthly</Text>
                </TouchableOpacity>
                <TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={()=>setisMonthselected(false)} style={[styles.month,!isMonthselected&&styles.bgofTimeRang]}>
                    <Text style={styles.timeTitle}>Yearly</Text>
                </TouchableOpacity>
            </View> */}

            {/* mypostion */}
            <Text style={{marginTop:10}}>Chapters</Text>
            <View style={styles.leaderInfo}>
                <Image style={styles.leaderphoto} source={{uri:"https://robotechvalley.com/app/sumition.jpeg"}} />
                <View>
                    <Text style={styles.leadername}>Subject Name</Text>
                    <View style={styles.pointsDiv}>
                        <Text>Chapter</Text>
                        <Text style={styles.positionColor}>01</Text>
                        
                    </View>
                </View>
            </View>
            {/* <Text style={{marginTop:15}}>Best Performance</Text> */}
            <View style={{marginTop:30}}>
                <View style={styles.leaderInfo}>
                    <Image style={styles.leaderphoto} source={{uri:"https://robotechvalley.com/app/book.jpeg"}} />
                    <View>
                        <Text style={styles.leadername}>Subject title 1</Text>
                        <View style={styles.pointsDiv}>
                            <Text>Chapter</Text>
                            <Text style={styles.positionColor}>01</Text>
                            
                        </View>
                    </View>
                </View>
                <View style={styles.leaderInfo}>
                    <Image style={styles.leaderphoto} source={{uri:"https://robotechvalley.com/app/sumition.jpeg"}} />
                    <View>
                        <Text style={styles.leadername}>Subject title 2</Text>
                        <View style={styles.pointsDiv}>
                            <Text>Chapter</Text>
                            <Text style={styles.positionColor}>201</Text>
                          
                        </View>
                    </View>
                </View>
                <View style={styles.leaderInfo}>
                    <Image style={styles.leaderphoto} source={{uri:"https://robotechvalley.com/app/leader.png"}} />
                    <View>
                        <Text style={styles.leadername}>Subject title 3</Text>
                        <View style={styles.pointsDiv}>
                            <Text>Chapter</Text>
                            <Text style={styles.positionColor}>111</Text>
                            
                        </View>
                    </View>
                </View>
                <View style={styles.leaderInfo}>
                    <Image style={styles.leaderphoto} source={{uri:"https://robotechvalley.com/app/react.jpeg"}} />
                    <View>
                        <Text style={styles.leadername}>Subject title 4</Text>
                        <View style={styles.pointsDiv}>
                            <Text>Chapter</Text>
                            <Text style={styles.positionColor}>301</Text>
                           
                        </View>
                    </View>
                </View>
                <View style={styles.leaderInfo}>
                    <Image style={styles.leaderphoto} source={{uri:"https://robotechvalley.com/app/leader.png"}} />
                    <View>
                        <Text style={styles.leadername}>Subject title 5</Text>
                        <View style={styles.pointsDiv}>
                            <Text>Chapter</Text>
                            <Text style={styles.positionColor}>101</Text>
                            
                        </View>
                    </View>
                </View>
                
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
        marginTop:10
    },
    pointsDiv:{
        display:'flex',
        flexDirection:'row',
        
    },
    leadername:{
        color:'black',
        fontWeight:'bold',
        fontSize:17,
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

export default Admission;
