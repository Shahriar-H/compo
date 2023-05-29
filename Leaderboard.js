import React,{useState, useEffect} from 'react';
import {View, StyleSheet,Text,TouchableOpacity,Image,ScrollView} from 'react-native';
import Headercourse from './small_componants/Headercourse';
import { APIURL, IMAGEURL } from './lib/ApiCred';
import { useIsFocused } from '@react-navigation/native';

const Leaderboard = ({state}) => {
    const [isMonthselected, setisMonthselected] = useState(true);
    const [leaders, setleaders] = useState([]);
    const [isLoadding, setisLoadding] = useState(false);
    const [loggeduserinfo, setloggeduserinfo] = useState();
    const [only202data, setonly202data] = useState([]);
    const Focused = useIsFocused()

    const fetchLeader = ()=>{
        setisLoadding(true)
        fetch(APIURL+"/users")
        .then((res)=> res?.json())
        .then((leader)=>{
           
            setleaders(leader?.result)
            const newArray =[];
            leader?.result&& Array.isArray(leader?.result) && leader?.result?.map((leader,index)=>{
                if(index<20){
                    newArray.push(leader)
                }
                if(leader?.id===state?.user?.id){
                    setloggeduserinfo(index+1)
                    return 0;
                }

                

            })
            setonly202data(newArray)
           
        })
        .catch((err)=> console.log(err))
        .finally(()=>{
            setisLoadding(false)
        })
    }
    useEffect(() => {
        fetchLeader()
    }, [Focused]);
    if(isLoadding){
        return <ScrollView style={{backgroundColor:'white', height:'100%'}}>
            
            <View style={{padding:0, margin:0}}>
                <View delayPressIn={0} delayPressOut={0} style={{...styles.videoBox1}}>
                    <Image resizeMode='stretch' style={{height:200, width:'100%'}} source={require("./Images/sk2.gif")} />
                </View>
                <View delayPressIn={0} delayPressOut={0} style={{...styles.videoBox1}}>
                    <Image resizeMode='stretch' style={{height:200, width:'100%'}} source={require("./Images/sk2.gif")} />
                </View>
                <View delayPressIn={0} delayPressOut={0} style={{...styles.videoBox1}}>
                    <Image resizeMode='stretch' style={{height:200, width:'100%'}} source={require("./Images/sk2.gif")} />
                </View>
                <View delayPressIn={0} delayPressOut={0} style={{...styles.videoBox1}}>
                    <Image resizeMode='stretch' style={{height:200, width:'100%'}} source={require("./Images/sk2.gif")} />
                </View>
                <View delayPressIn={0} delayPressOut={0} style={{...styles.videoBox1}}>
                    <Image resizeMode='stretch' style={{height:200, width:'100%'}} source={require("./Images/sk2.gif")} />
                </View>
                <View delayPressIn={0} delayPressOut={0} style={{...styles.videoBox1}}>
                    <Image resizeMode='stretch' style={{height:200, width:'100%'}} source={require("./Images/sk2.gif")} />
                </View>
                <View delayPressIn={0} delayPressOut={0} style={{...styles.videoBox1}}>
                    <Image resizeMode='stretch' style={{height:200, width:'100%'}} source={require("./Images/sk2.gif")} />
                </View>
            </View>
        </ScrollView>
    }
    return (
        <ScrollView style={styles.leaderContainer1}>

            <View style={{marginBottom:5}}>
                <Headercourse title={`Leader Board`} routename={'Profile'} />
            </View>
          
           
            <View style={styles.leaderContainer}>
                {/* mypostion */}
                <Text style={{marginTop:5, color:'rgba(0,0,0,0.6)'}}>My Possition</Text>
                <View style={styles.leaderInfo}>
                    <Image style={styles.leaderphoto} source={{uri:state?.user?.photo?IMAGEURL+state?.user?.photo:"https://robotechvalley.com/app/leader.png"}} />
                    <View>
                        <Text style={styles.leadername}>{state?.user?.name}</Text>
                        <View style={styles.pointsDiv}>
                            <Text>Class {state?.user?.class}</Text>
                            <Text style={styles.positionColor}>Possition: {loggeduserinfo}</Text>
                            <Text>Point: {state?.user?.points}</Text>
                        </View>
                    </View>
                </View>

                <Text style={{marginTop:15, color:'rgba(0,0,0,0.6)'}}>Best Performance</Text>
                <View>

                    {only202data&& Array.isArray(only202data) && only202data?.map((leader,index)=>{
                        
                        return <View key={index} style={styles.leaderInfo}>
                            <Image style={styles.leaderphoto} source={{uri:leader?.photo?IMAGEURL+leader?.photo:"https://robotechvalley.com/app/leader.png"}} />
                            <View>
                                <Text style={styles.leadername}>{leader?.name}</Text>
                                <View style={styles.pointsDiv}>
                                    <Text>Class {leader?.class}</Text>
                                    <Text style={styles.positionColor}>Possition: {index+1}</Text>
                                    <Text>Point: {leader?.points}</Text>
                                </View>
                            </View>
                        </View>
                    })}
                    
                </View>
                <View style={{height:50}}></View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    leaderContainer:{
        padding:15,
    },
    leaderTitle:{
        textAlign:'center',
        color:'black',
        fontWeight:'bold',
        fontSize:19,
        marginBottom:15
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
        marginRight:15,
        borderRadius:100,
        borderWidth:3,
        borderColor:'rgba(0,0,0,0.3)'
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
        justifyContent:'space-between',
        width:'80%'
    },
    leadername:{
        color:'black',
        fontWeight:'bold',
        fontSize:17,
        marginBottom:5
    },
    positionColor:{
        color:'#fe00fd'
    }

})

export default Leaderboard;
