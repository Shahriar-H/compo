import React,{useState, useEffect} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser,faPhone, faLock, faSlash } from '@fortawesome/free-solid-svg-icons/'
import { Text } from 'react-native-animatable';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { APIURL, getData, saveData } from './lib/ApiCred';
import { useNavigation } from '@react-navigation/native';
import Toast from "react-native-toast-message"

const Loginpage = ({state,dispatch}) => {
    const navigation = useNavigation()
    const [phone, setPhone] = useState(null);
    const [password, setpassword] = useState(null);
    const [showpassword, setshowpassword] = useState(false);
    const [showLoginbtn, setshowLoginbtn] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const [message, setmessage] = useState(null);

    useEffect(() => {
       
        if(phone===''){
            setPhone(null)
        }
        if(password===''){
            setpassword(null)
        }
        if(phone && password){
            setshowLoginbtn(true)
        }else{
            setshowLoginbtn(false)
        }
       
        const data = getData('user');
       
        // if(data!==null){//if true user logged in
        //     navigation.navigate('Main')
        // }
        
    }, [phone,password]);

    const loginHandle = ()=>{
        setisLoading(true)
        fetch(APIURL+'/login',{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({phone,password})
        })
        .then((res)=> res.json())
        .then((result)=>{
            setisLoading(false)
            if(result?.result!==null){

                saveData('user',JSON.stringify(result?.result))
                dispatch({type:'login', payload:result?.result[0]})
                dispatch({type:'Token', payload:result?.token})
                // navigation.navigate('Main')
            }
            setmessage(result?.message)
            Toast.show({
                type: 'error',
                text1: 'Message',
                text2: result?.message
            });
           
        })
        .catch(error => {
            setisLoading(false)
            Toast.show({
                type: 'error',
                text1: 'Message',
                text2: "Network error"
            });
            console.error(error)
        });
    }


    return (
        <ScrollView style={styles.loginContainerView}>
        <View style={{height:100}}></View>
        <View style={styles.loginContainer}>

            <View style={styles.loginPart}>
                <View style={styles.LogoImageDiv}>
                    <Image resizeMode='contain' style={styles.LogoImage} source={require("./Images/logo.jpeg")} />
                </View>
                <Text style={{textAlign:'center',color:'red'}}>{message&&message}</Text>
                <View style={{position:'relative', overflow:'hidden'}}>
                    <TextInput keyboardType='number-pad' onChangeText={(v)=>setPhone(v)} style={styles.inputF} placeholder='Phone Number' placeholderTextColor={'black'} />
                    <View style={styles.phoneIcon}>
                        <FontAwesomeIcon style={styles.iconCont} icon={ faPhone } color={'gray'} size={20} />
                    </View>
                </View>
                <View style={{position:'relative', overflow:'hidden'}}>
                    <TextInput onChangeText={(v)=>setpassword(v)} style={styles.inputF} placeholder='Password' placeholderTextColor={'black'} secureTextEntry={!showpassword} />
                    <View style={styles.phoneIcon}>
                        <FontAwesomeIcon style={styles.iconCont} icon={ faLock } color={'gray'} size={20} />
                    </View>
                    <TouchableOpacity onPress={()=>setshowpassword((prev)=>!prev)} style={styles.phoneIconEye}>
                        <FontAwesomeIcon style={styles.iconCont} icon={ faEye } color={'gray'} size={20} />
                    </TouchableOpacity>
                    {!showpassword&&<TouchableOpacity onPress={()=>setshowpassword((prev)=>!prev)} style={styles.phoneIconEye}>
                        <FontAwesomeIcon style={styles.iconCont} icon={ faSlash } color={'gray'} size={20} />
                    </TouchableOpacity>}
                </View>

                <View>
                    {!isLoading?<TouchableOpacity disabled={!showLoginbtn} onPress={loginHandle} style={styles.loginBtn}>
                        <Text style={{textAlign:'center', fontSize:20, color:'white'}}>Login</Text>
                    </TouchableOpacity>:
                    <View style={styles.loginBtn}>
                        <ActivityIndicator size={27} color="#fff" />
                    </View>
                    }

                    <View style={{marginTop:50}}>
                        <TouchableOpacity onPress={()=>navigation.navigate("Forgotphone")}>
                            <Text style={{textAlign:'center',textDecorationLine:'underline'}}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
               
            </View>
        </View>
        
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    loginContainer:{
        padding:16,
        height:'84%',
        width:'100%',
        backgroundColor:'#00b9fe',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    loginContainerView:{
        height:'100%',
        width:'100%',
        backgroundColor:'#00b9fe',
    },
    loginPart:{
        padding:15,
        width:'100%',
        // backgroundColor:'white',
        borderRadius:10
    },
    inputF:{
        backgroundColor:'white',
        marginVertical:10,
        borderRadius:10,
        paddingLeft:40,
        color:'black'
    },
    phoneIcon:{
        position:'absolute',
        height:'100%',
        width:40,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',


    },
    loginBtn:{
        marginTop:10,
        backgroundColor:'#e66042',
        paddingVertical:10,
        borderRadius:10
    },
    LogoImage:{
        height:100,
        width:100,
        borderRadius:10,
        marginBottom:20
    },
    LogoImageDiv:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    phoneIconEye:{
        position:'absolute',
        height:'100%',
        width:40,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        right:0
    }
})

export default Loginpage;
