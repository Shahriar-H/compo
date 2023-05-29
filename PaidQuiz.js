import { useNavigation } from '@react-navigation/native';
import React,{useEffect, useState} from 'react';
import {View, StyleSheet, Image, Text,Pressable,ScrollView} from 'react-native';
import Headercourse from './small_componants/Headercourse';
import { APIURL } from './lib/ApiCred';

const PaidQuiz = ({state}) => {
    const navigation = useNavigation()
    const [allresult, setallresult] = useState([]);
    useEffect(() => {
        fetch(APIURL+"/quiz_result_of_user/"+state?.user?.id)
        .then((res)=>res.json())
        .then((result)=>{
            setallresult(result?.result)
            console.log(result);
        })
    }, []);
    return (
        <ScrollView>
            <View>
                <Headercourse title={`My Quiz History`} routename={'Category'} />
            </View>
            <View style={{padding:15}}>
                <View style={styles.blueView}>
                    <Image resizeMode='cover' style={styles.absolutImag} source={{uri:"https://robotechvalley.com/app/revision.png"}} />
                    <View>
                        <Text style={{fontSize:30,fontWeight:700,color:'white'}}>{state?.user?.name} !</Text>
                        <Text style={{color:'white'}}>What do you learn today?</Text>
                    </View>
                </View>

                <View style={{padding:5}}>
                    <Text style={{marginBottom:10, }}>My Scores in Quiz</Text>
                    {allresult&&Array.isArray(allresult)&&allresult?.map((result,index)=>{
                    return <Pressable key={index} style={styles.paidQuiz}>
                        <View style={styles.paidQuizInnerDiv}>
                            <Image resizeMode='cover' style={styles.coverImag} source={{uri:"https://robotechvalley.com/app/sumition.jpeg"}} />
                            <View>
                                <Text style={{fontSize:15,color:'black',fontWeight:700}}>You Earned From Quiz</Text>
                            
                            </View>
                        </View>
                        <View style={styles.marks}>
                            <Text style={{color:'white', fontSize:20}}>{result?.result}</Text>
                            <Text style={{fontSize:10,color:'white'}}>Score</Text>
                        </View>
                    </Pressable>
                })}
                    

                
                </View>
                <View style={{height:30}}></View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    blueView:{
        backgroundColor:'#5055d2',
        height:230,
        borderRadius:30,
       
        display:'flex',
        justifyContent:'center',
        padding:15,
        marginBottom:20
    },
    absolutImag:{
        height:150,
        width:150,
        position:'absolute',
        right:20,
        top:40

    },
    coverImag:{
        height:70,
        width:70,
        marginRight:10
    },
    paidQuiz:{
        backgroundColor:'white',
        borderRadius:10,
        padding:10,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:10,
        shadowColor:'gray',
        elevation:3
    },
    paidQuizInnerDiv:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    marks:{
        height:65,
        width:65,
        backgroundColor:'#7072e0',
        borderRadius:100,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }
})

export default PaidQuiz;
