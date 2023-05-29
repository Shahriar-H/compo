import React,{useState,useEffect} from 'react';
import {View, StyleSheet,Image,TouchableOpacity,Text,TextInput,   ActivityIndicator,Alert, NativeSyntheticEvent, StatusBar} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { APIURL } from './lib/ApiCred';
import { useIsFocused } from '@react-navigation/native';
import {
    getHash,
    startOtpListener,
    useOtpVerify,
  } from 'react-native-otp-verify';
import Toast from "react-native-toast-message"




const Home = ({state, dispatch}) => {
    const { hash, otp, message, timeoutError, stopListener, startListener } = useOtpVerify({numberOfDigits: 6});
    const Focused = useIsFocused()
    const navigation = useNavigation();
    const [isTimesUp, setisTimesUp] = useState(false);
    const [timeinSec, settimeinSec] = useState(60);
    const [opthere, setopthere] = useState('');
    const [isLoading, setisLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);


    useEffect(() => {
        getHash().then(hash => {
          // use this hash in the message.
          console.log('App hash:', hash);
        }).catch(console.log);
      
        startOtpListener(message => {
          // extract the otp using regex e.g. the below regex extracts 4 digit otp from message
          const otpRegex = /(\d{6})/g;
         const extractedOtp = (otpRegex.exec(message) || [])[1] || '';
          setopthere(extractedOtp);
        });
      
    }, []);
   

    const loginPress = ()=>{
        // navigation.navigate('Account')
        setisLoading(true)
        fetch(APIURL+"/check_otp/"+opthere,{
            method:'POST',
            headers:{
                "Content-Type" : "application/json",
            },
            body:''
        })
        .then((res)=>res.json())
        .then((result)=>{
            console.log(result);
            if(result?.status==='404'){
                setisLoading(false)
                return Toast.show({
                    type: 'error',
                    text1: 'Message',
                    text2: "Wrong OTP"
                });
            }else if(result?.status==='204'){
                setisLoading(false)
                return Toast.show({
                    type: 'error',
                    text1: 'Message',
                    text2: "OTP Expired"
                });
            }
            dispatch({type:'creating',payload:{
                ...state?.registering,
                isphoneVareified:true,
            } })
            setisLoading(false)
            Toast.show({
                type: 'error',
                text1: 'Message',
                text2: "Success"
            });
            navigation.navigate('Account')
        })
        .catch((error)=>{
            setisLoading(false)
            Toast.show({
                type: 'error',
                text1: 'Message',
                text2: "Network Issues"
            });
        })
    }
    useEffect(() => {
        const timer = setTimeout(() => {
          if (timeLeft > 0) {
            setTimeLeft(timeLeft - 1);
          }else{
            clearTimeout(timer)
            setisTimesUp(true)
          }
        }, 1000);
        return () => clearTimeout(timer);
    }, [timeLeft,Focused]);

    useEffect(() => {
        setTimeLeft(60);
        setisTimesUp(false)
    }, [Focused]);

    const changeNumber = ()=>{
        navigation.navigate('Phonenumber')
    }

    useEffect(() => {
       
        // return () => {
        //    if(isTimesUp){
        //     clearTimeout(timer)
        //    }
        // };
    }, []);
    
    return (
        <View style={styles.mainContainer}>
            
            <View style={styles.loginPart}>
                <View>
                    <Text>Please Enter OTP:</Text>
                    <TextInput value={opthere} onChangeText={(v)=>setopthere(v)} keyboardType="number-pad" style={styles.loginInput} placeholder={"456857"} />
                    {!isLoading?<TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={loginPress} style={[styles.buttonLogin,styles.buttonRegistration]}>
                        <Text style={{textAlign:"center",color:'white',fontSize:18}}>Next</Text>
                    </TouchableOpacity>:
                    <TouchableOpacity delayPressIn={0} delayPressOut={0}  style={[styles.buttonLogin,styles.buttonRegistration]}>
                        <ActivityIndicator size={27} color="#fff" />
                    </TouchableOpacity>
                    }
                    <View style={styles.resednCode}>
                        <TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={changeNumber}>
                            <Text style={{color:'blue'}}>Change Number</Text>
                        </TouchableOpacity>
                        {
                       isTimesUp?
                        <TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={changeNumber}>
                            <Text style={{color:'red'}}>Resend Code</Text>
                        </TouchableOpacity>:<Text style={{color:'black'}}>Resend in {timeLeft}s</Text>
                        }
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer:{
        height:'100%'
        
    },
    box: {
        width: 300,
        height: 55,
        marginVertical: 20,
        borderColor: 'red',
        borderWidth: 1,
        backgroundColor:'#fff'
      },
    loginPart:{
        marginTop:50,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        
    },
    buttonLogin:{
        paddingVertical:10,
        width:350,
        backgroundColor:'#00b9fe',
        marginBottom:10,
        borderRadius:10
    },
    buttonRegistration:{
        backgroundColor:'#00b9fe'
    },
    loginInput:{
        borderWidth:1,
        marginBottom:15,
        borderRadius:10,
        paddingVertical:7,
        paddingLeft:15,
        color:'rgba(0,0,0,0.8)',
        fontSize:17,
        backgroundColor:'#fff'
    },
    resednCode:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    }
})

export default Home;
