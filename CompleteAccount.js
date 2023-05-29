import React,{useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView,Text,TextInput,TouchableOpacity, ActivityIndicator} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser,faArrowRight, faSlash } from '@fortawesome/free-solid-svg-icons/'
import {useIsFocused, useNavigation} from "@react-navigation/native"
import { Picker } from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';
import { APIURL, saveData } from './lib/ApiCred';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import Toast from 'react-native-toast-message'


const CompleteAccount = ({state, dispatch}) => {
    const [classname, setclassname] = useState(state?.user?.class ||'1');
    const [division, setdivision] = useState(state?.user?.division || 'Science');
    const [selectSegment, setselectSegment] = useState(state?.user?.category || 'Class 1-12');
    const [name, setname] = useState(state?.user?.name ||'');
    const [points, setpoints] = useState(state?.user?.points ||0);
    const [email, setemail] = useState(state?.user?.email || '');
    const [phone, setphone] = useState(state?.registering?.phone || state?.user?.phone || '');
    const [category, setcategory] = useState(state?.user?.category || '');
    const [password, setpassword] = useState(state?.user?.password || '');
    const [confirmpass, setconfirmpass] = useState(state?.user?.password || '');
    const [address, setaddress] = useState(state?.user?.address || '');
    const [photo, setphoto] = useState(state?.user?.photo || null);
    const [isLoading, setisLoading] = useState(false);
    const [allFiledFilled, setallFiledFilled] = useState(false);
    const [ispasswordMached, setispasswordMached] = useState(false);
    const [isUpdateNeed, setisUpdateNeed] = useState(state?.user?.id? true : false);
    const focused = useIsFocused()
    const [showPassword, setshowPassword] = useState(false);

    useEffect(() => {
        setisUpdateNeed(state?.user?.id? true : false)
    }, []);

    const navigation = useNavigation();
    // console.log(state);
    const hadleSubmit = async ()=>{
        setisLoading(true)
        if(!allFiledFilled){
            setisLoading(false)
            return Toast.show({
                type: 'success',
                text1: 'Message',
                text2: 'Empty input fount'
            });
        }
        if(!ispasswordMached){
            setisLoading(false)
            return Toast.show({
                type: 'success',
                text1: 'Message',
                text2: 'Empty input fount'
            });
        }
        const currentTimestamp = moment().valueOf();
        const data = {
            phone,
            password, 
            isphoneVareified:true, 
            name, 
            email, 
            class:classname, 
            division,
            address,
            category:selectSegment,
            created_at:currentTimestamp,
            photo
        }
        try {
            //create new user
                fetch(APIURL+"/adduser",{
                    method:'POST',
                    headers:{
                        "Content-Type" : "application/json"
                    },
                    body:JSON.stringify(data)
                })
                .then((res)=>res.json())
                .then((result)=>{
                    if(result?.status===500){
                        setisLoading(false)
                        // console.log(result?.error);
                        return Toast.show({
                            type: 'success',
                            text1: 'Message',
                            text2: result?.message
                        });
                    }
                    dispatch({type:'login', payload:{...data,id:result?.result?.insertId}})
                    dispatch({type:'creating', payload:null})
                    dispatch({type:'Token', payload:result?.token})
                    saveData('user',JSON.stringify([{...data,id:result?.result?.insertId}]))
                    Toast.show({
                        type: 'success',
                        text1: 'Message',
                        text2: result?.message
                    });
                    setisLoading(false)
                    navigation.navigate('Profile');
                })
                .catch((err)=>{
                    console.log(err);
                    setisLoading(false)
                    Toast.show({
                        type: 'success',
                        text1: 'Message',
                        text2: 'Network Error'
                    });
                })
            
        } catch (error) {
            console.log(error);
        }
        
        
        
        
    }

    const hadleUpdate = async ()=>{
        setisLoading(true)
        if(!allFiledFilled){
            setisLoading(false)
            return Toast.show({
                type: 'error',
                text1: 'Message',
                text2: 'Empty Input Found'
            });
        }
        if(!ispasswordMached){
            setisLoading(false)
            return Toast.show({
                type: 'error',
                text1: 'Message',
                text2: 'Password Not Matched'
            });
        }
        const currentTimestamp = moment().valueOf();
        const data = {
            phone,
            password, 
            isphoneVareified:true, 
            name, 
            email, 
            class:classname, 
            division,
            address,
            category:selectSegment,
            created_at:currentTimestamp,
            photo,
            points
        }
        try {
           // update  a user
                fetch(APIURL+"/update_user",{
                    method:'POST',
                    headers:{
                        "Content-Type" : "application/json",
                        "Authorization":state?.token
                    },
                    body:JSON.stringify(data)
                })
                .then((res)=>res.json())
                .then((result)=>{
                    if(result?.status===500){
                        setisLoading(false)
                        console.log(result?.error);
                        return Toast.show({
                            type: 'success',
                            text1: 'Message',
                            text2: result?.message
                        });
                    }
                
                    Toast.show({
                        type: 'success',
                        text1: 'Message',
                        text2: result?.message
                    });
                    dispatch({type:'login', payload:{...data,id:state?.user?.id}})
                    dispatch({type:'Token', payload:result?.token})
                    saveData('user',JSON.stringify([{...data,id:state?.user?.id}]))
                    console.log(result?.error);
                    setisLoading(false)
                    // navigation.navigate('Profile');
                
                })
                .catch((err)=>{
                    console.log(err);
                    setisLoading(false)
                    Toast.show({
                        type: 'success',
                        text1: 'Message',
                        text2: "Network Error"
                    });
                })
                .finally(async ()=>{
                    try {
                        await AsyncStorage.setItem('user', JSON.stringify([data]));
                        console.log('Data saved successfully');
                    } catch (error) {
                        console.log('Error saving data: ', error);
                    }
                })
            
        } catch (error) {
            console.log(error);
        }
        
        
        
        
    }
    useEffect(() => {
        setisUpdateNeed(state?.user?.id? true : false)
    }, [focused]);

    useEffect(() => {
       
        console.log(state);
        if(name!=='' && email !=='' && password !=='' && confirmpass!=='' && address!=='' && phone !==''){
            if(password===confirmpass){
                
                setispasswordMached(true)
            }else{
                
                setispasswordMached(false)
            }
            setallFiledFilled(true)
            
        }else{
           
            setallFiledFilled(false)
        }
    
    }, [name, email, phone, address, password, confirmpass, category]);
    return (
        <ScrollView>
            <LinearGradient colors={['rgb(27, 163, 156)', '#00b1fd']} style={styles.registrationForm}>
                
                <View style={styles.profileDiv}>
                    <View style={styles.profileIcon}>
                        <FontAwesomeIcon icon={ faUser } color={'gray'} size={40} />
                    </View>
                </View>

                <Text style={{color:'white',fontSize:25,textAlign:'center',marginBottom:30,textTransform:'uppercase',fontWeight:300}}>Complete 
                    <Text style={{color:'white',fontSize:26, fontWeight:700}}> Account</Text>
                </Text>

                <View style={{...styles.formStyle,marginBottom:20}}>
                    <Text style={styles.labeltext}>Your Name:</Text>
                    <TextInput value={name} onChangeText={(v)=>setname(v)} textContentType='name' style={styles.inputFiled} placeholder={'Enter your Name'} />
                    <Text style={styles.labeltext}>Your Email:</Text>
                    <TextInput value={email} onChangeText={(v)=>setemail(v)} textContentType='emailAddress' style={styles.inputFiled} placeholder={'Enter your Email'} placeholderTextColor={'rgba(0,0,0,0.5)'} />

                    <Text style={styles.labeltext}>Your Phone No.:</Text>
                    <TextInput disabled={true} value={phone} textContentType='emailAddress' style={styles.inputFiled} placeholder={'Enter your Phone number'} placeholderTextColor={'rgba(0,0,0,0.5)'} />

                    {/* Select Cat */}
                    <Text style={styles.labeltext}>Select:</Text>
                    <View style={styles.picker}>
                        <Picker
                            selectedValue={selectSegment}
                            style={{color:'black',fontSize:18,height:50,borderBottomColor:'gray'}}
                            onValueChange={(itemValue, itemIndex) =>
                                setselectSegment(itemValue)
                            }>
                            <Picker.Item label="Class 1-12" value="Class 1-12" />
                            <Picker.Item label="Job Preparation" value="Job Preparation" />
                            <Picker.Item label="Admission" value="Admission" />
                            <Picker.Item label="Skill Course" value="Skill Course" />
                          
                        </Picker>
                    </View>
                    {selectSegment=== "Class 1-12"&&<><Text style={styles.labeltext}>Class:</Text>
                    <View style={styles.picker}>
                        <Picker
                            selectedValue={classname}
                            style={{color:'black',fontSize:18,height:50,borderBottomColor:'gray'}}
                            onValueChange={(itemValue, itemIndex) =>
                            setclassname(itemValue)
                            }>
                            <Picker.Item label="Class 1" value="1" />
                            <Picker.Item label="Class 2" value="2" />
                            <Picker.Item label="Class 3" value="3" />
                            <Picker.Item label="Class 4" value="4" />
                            <Picker.Item label="Class 5" value="5" />
                            <Picker.Item label="Class 6" value="6" />
                            <Picker.Item label="Class 7" value="7" />
                            <Picker.Item label="Class 8" value="8" />
                            <Picker.Item label="Class 9-10" value="9" />
                            <Picker.Item label="HSC" value="11" />
                           
                        </Picker>
                    </View></>
                    }
                    {classname>8&&selectSegment=== "Class 1-12"&&
                    <>
                    <Text style={styles.labeltext}>Division:</Text>
                    <View style={styles.picker}>
                        <Picker
                            selectedValue={division}
                            style={{color:'black',fontSize:18,height:50,borderBottomColor:'gray'}}
                            onValueChange={(itemValue, itemIndex) =>
                            setdivision(itemValue)
                            }>
                            <Picker.Item label="Science" value="Science" />
                            <Picker.Item label="Humanities" value="Humanities" />
                            <Picker.Item label="Commerce" value="Commerce" />
                        </Picker>
                    </View>
                    </>
                    }
                    <Text style={styles.labeltext}>Your Address:</Text>
                    <TextInput value={address} onChangeText={(v)=>setaddress(v)} textContentType='addressCity' style={styles.inputFiled} placeholder={'Enter your address'} placeholderTextColor={'rgba(0,0,0,0.5)'} />

                    <Text style={styles.labeltext}>New Password:</Text>
                    <View style={{position:'relative'}}>
                        <TextInput value={password} onChangeText={(v)=>setpassword(v)} textContentType='password' style={{...styles.inputFiled,borderBottomWidth:2, borderColor:!ispasswordMached?'red':'green'}} secureTextEntry={!showPassword} placeholder={'Enter a new password'} placeholderTextColor={'rgba(0,0,0,0.5)'} />
                        <TouchableOpacity onPress={()=>setshowPassword((prev)=>!prev)} style={styles.phoneIconEye}>
                            <FontAwesomeIcon style={styles.iconCont} icon={ faEye } color={'gray'} size={20} />
                        </TouchableOpacity>
                        {!showPassword&&<TouchableOpacity onPress={()=>setshowPassword((prev)=>!prev)} style={styles.phoneIconEye}>
                            <FontAwesomeIcon style={styles.iconCont} icon={ faSlash } color={'gray'} size={20} />
                        </TouchableOpacity>}
                    </View>
                    <Text style={styles.labeltext}>Confirm Password:</Text>
                    <TextInput value={confirmpass} onChangeText={(v)=>setconfirmpass(v)} textContentType='password' secureTextEntry={!showPassword} style={{...styles.inputFiled,borderBottomWidth:2, borderBottomColor:!ispasswordMached?'red':'green'}}  placeholder={'Enter your password again'} placeholderTextColor={'rgba(0,0,0,0.5)'} />
                </View>
                {!state?.user?.id?
                <View style={styles.submitButton}>
                    {!isLoading?<TouchableOpacity  delayPressIn={0} delayPressOut={0} style={styles.sButton} onPress={hadleSubmit}>
                        <Text style={{color:'white',paddingRight:10}}>Continue</Text>
                        <FontAwesomeIcon icon={ faArrowRight } color={'white'} size={15} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity disabled={true} delayPressIn={0} delayPressOut={0} style={styles.sButton}>
                        <ActivityIndicator size={27} color="#fff" />
                    </TouchableOpacity>}
                </View>:
                <View style={styles.submitButton}>
                    {!isLoading?<TouchableOpacity  delayPressIn={0} delayPressOut={0} style={styles.sButton} onPress={hadleUpdate}>
                        <Text style={{color:'white',paddingRight:10}}>Update</Text>
                        <FontAwesomeIcon icon={ faArrowRight } color={'white'} size={15} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity disabled={true} delayPressIn={0} delayPressOut={0} style={styles.sButton}>
                        <ActivityIndicator size={27} color="#fff" />
                    </TouchableOpacity>}
                </View>
                }
            </LinearGradient>
            {/* <ActivityIndicator size={27} color="#fff" /> */}
            <View style={{height:50}}></View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    registrationForm:{
        backgroundColor:'rgb(27, 163, 156)',
        width:'100%',
        padding:10
    },
    profileDiv:{
        display:'flex',
        alignItems:'center',
        marginBottom:15
    },
    profileIcon:{
        height:80,
        width:80,
        backgroundColor:'white',
        borderRadius:100,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        margin:'auto'
    },
    inputFiled:{
        width:'100%',
        borderBottomWidth:1,
        borderColor:'gray',
        // borderRadius:50,
        paddingHorizontal:5,
        color:'white',
        marginVertical:5,
        paddingVertical:10,
        fontSize:18,
        color:'black'
    },
    picker:{
        borderBottomWidth:1,
        borderColor:'gray',
        // borderRadius:50,
        
    },
    submitButton:{
        textAlign:'center',
        marginVertical:20,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    sButton:{
        backgroundColor:'#e66042',
        paddingVertical:15,
        paddingHorizontal:50,
        borderRadius:50,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'

    },
    formStyle:{
        backgroundColor:'white',
        paddingHorizontal:20,
        paddingVertical:20,
        borderRadius:10,
        marginHorizontal:0,
    },
    labeltext:{
       marginTop:10,
       marginLeft:10,
       color:'rgba(0,0,0,0.7)'
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

export default CompleteAccount;
