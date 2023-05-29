import React,{useState,useEffect,memo} from 'react';
import {View, StyleSheet,Image,TouchableOpacity,Text,Input, TextInput,  ActivityIndicator, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AppIntroSlider from 'react-native-app-intro-slider';
import { APIURL, getData } from './lib/ApiCred';
import moment from 'moment';
import Toast from "react-native-toast-message"

const Forgotphone = ({state, dispatch}) => {
    const [isClickonvisiblebutton, setisClickonvisiblebutton] = useState(false);
    const [phoneNumber, setphoneNumber] = useState('');
    const [phoneIsValid, setphoneIsValid] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const [isNumberExist, setisNumberExist] = useState(false);
    // console.log(state);
    const navigation = useNavigation();
    
    
    const loginPress = ()=>{
        if(phoneNumber!==null){
            
            if(phoneNumber?.length===11){
               
                setisLoading(true)
                const min = 100000;
                const max = 999999;
                const otp = Math.floor(Math.random() * (max - min + 1)) + min;
                const currentTimestamp = moment().valueOf();
               
                fetch(APIURL+"/otp_forgot",{
                    method:'POST',
                    headers:{
                        "Content-Type" : "application/json",
                    },
                    body:JSON.stringify({
                        otp:otp.toString(),
                        user:phoneNumber,
                        created_at: currentTimestamp
                    })
                })
                .then((res)=>res.json())
                .then((result)=>{
                    if(result?.status==='200'){
                        
                        
                    
                        dispatch({type:'creating',payload:{
                            phone:phoneNumber,
                            password:null, 
                            isphoneVareified:false, 
                            name:null, 
                            email:null,
                            category:null, 
                            class:null, 
                            division:null
                        } })
                        setisLoading(false)
                        Toast.show({
                            type: 'error',
                            text1: 'Message',
                            text2: "OTP Sent"
                        });
                        navigation.navigate('Forgotpassword')             
                    }else{
                        setisLoading(false)
                        Toast.show({
                            type: 'error',
                            text1: 'Message',
                            text2: "Number not Found"
                        });
                    }
                })
                .catch((error)=>{
                    setisLoading(false)
                    Toast.show({
                        type: 'error',
                        text1: 'Message',
                        text2: "Network Issue"
                    });
                })
                
                
            }else{
                
                Toast.show({
                    type: 'error',
                    text1: 'Message',
                    text2: "Invalid Phone Number"
                });
            }
        }
        
    }
    const loginPressForvisibale = ()=>{
        setisClickonvisiblebutton(true)
    }
    

      useEffect(() => {
        Math.floor(Date.now())
        if(phoneNumber!==''){
            setphoneIsValid(true)
        }else{
            setphoneIsValid(false)
        }
      }, [phoneNumber]);


     
    return (
        <ScrollView style={styles.mainContainer}>
            
            <View style={styles.loginPart}>
                {<View style={{width:'85%'}}>
                    <Text style={{color:'rgba(0,0,0,0.8)'}}>Mobile Number:</Text>
                    <TextInput onChangeText={(v)=>setphoneNumber(v)} value={phoneNumber} keyboardType="number-pad" style={styles.loginInput} placeholder={"01xxx-xxxxxx"} placeholderTextColor={'black'} />
                    {!isLoading?<TouchableOpacity disabled={!phoneIsValid} delayPressIn={0} delayPressOut={0} onPress={loginPress} style={[styles.buttonLogin,styles.buttonRegistration]}>
                        <Text style={{textAlign:"center",color:'white',fontSize:18}}>Continue</Text>
                    </TouchableOpacity> :
                    <TouchableOpacity disabled={true} delayPressIn={0} delayPressOut={0} style={[styles.buttonLogin,styles.buttonRegistration]}>
                        <ActivityIndicator size={27} color="#fff" />
                    </TouchableOpacity> }

                </View>}
                
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    mainContainer:{
        
        height:'100%'
        
    },
    gradiantView:{
        height:"100%",
        backgroundColor:"#00b9fe",
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        
    },
    frontImage:{
        height:250,
        width:300,

    },
    loginPart:{
        height:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        paddingTop:80,
    },
    buttonLogin:{
        paddingVertical:10,
        width:330,
        backgroundColor:'#00b1fd',
        marginBottom:10,
        borderRadius:10
    },
    buttonRegistration:{
        backgroundColor:'#00b1fd',
        width:100
    },
    buttonRegistrationOneTime:{

    },
    loginInput:{
        borderWidth:1,
        marginBottom:15,
        borderRadius:10,
        paddingVertical:7,
        paddingLeft:15,
        width:'100%',
        color:'rgba(0,0,0,0.8)',
        fontSize:17,
        backgroundColor:'#fff'
    },
    imageDivi:{
        backgroundColor:'#eeeff3',
        borderRadius:18,
        shadowColor:'black',
        elevation:5,
        marginBottom:20
    },
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        zIndex:99999
      },
      image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 0,
        marginBottom: 10,
        textAlign:'center',
        paddingHorizontal:20,
        color:'white'
      },
      
})

export default memo(Forgotphone);
