import React,{useEffect,useState} from 'react';
import {View, StyleSheet,Text,ScrollView,TouchableOpacity,   ActivityIndicator, Image, RefreshControl, StatusBar } from 'react-native';
import {useNavigation} from "@react-navigation/native"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser,faArrowRight,faStar, faGraduationCap,faIdBadge,faSign } from '@fortawesome/free-solid-svg-icons/'
// import ProfileOptions from './small_componants/ProfileOptions';
import LinearGradient from 'react-native-linear-gradient';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import {launchImageLibrary} from 'react-native-image-picker';
import { APIURL, IMAGEURL, saveData } from './lib/ApiCred';
import moment from 'moment';
import Header from './small_componants/Header';
import Toast from "react-native-toast-message"


const Profile = ({state, dispatch}) => {
    const [isLoading, setisLoading] = useState(false);
    const [isLoading2, setisLoading2] = useState(true);
    
    const [refreshing, setRefreshing] = useState(false);
    const [photo, setphoto] = useState(IMAGEURL+state?.user?.photo);
    const navigation = useNavigation();
    const [ProfileComponenet, setProfileComponenet] = useState(null);
    const [statusbarcolor, setstatusbarcolor] = useState('#00eefd');
    const loadOption = async ()=>{
        const {default:ProfileOptions} = await import("./small_componants/ProfileOptions")
        setProfileComponenet(<ProfileOptions state={state} dispatch = {dispatch}/>)

    }

    const handleRefresh = () => {
        setRefreshing(true);
        // fetch new data here
        setphoto(IMAGEURL+state?.user?.photo)
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
      };

    //form Data
    const uploadFile = async (fileUri) => {
        setisLoading(true)
        setisLoading2(true)
        const currentTimestamp = moment().valueOf();
        const formData = new FormData();
        formData.append('image', {
          uri: fileUri,
          type: 'image/jpeg',
          name: currentTimestamp+'.jpg'
        });
        
        fetch(APIURL+'/upload/'+state?.user?.id, {
          method: 'POST',
          body: formData
        })
        .then((res)=>res.json())
        .then((result)=>{
            // console.log(result);
            Toast.show({
                type: 'success',
                text1: 'Message',
                text2: result?.message
            });
            dispatch({type:'login', payload:{...state?.user, photo:currentTimestamp+'.jpg'}})
            saveData("user", JSON.stringify([{...state?.user, photo:currentTimestamp+'.jpg'}]))
            setphoto(IMAGEURL+currentTimestamp+'.jpg')
            setisLoading(false)
            setisLoading2(false)
        })
        .catch((err)=>{
            console.log(err)
            setisLoading(false)
            setisLoading2(false)
        });
        
        // const result = await response.json();
        // console.log(result);
      }
    //image picker
    const pickImage = () => {
        launchImageLibrary({mediaType:'photo'}, (response) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else {
            // Handle selected image
            const uri = response.uri;
            const fileName = response.fileName;
            const fileSize = response.fileSize;
            const fileType = response.type;
            // if((response?.assets[0]?.fileSize/1024)>300){
            
            // }
            // console.log(response?.assets[0]?.fileSize/1024);
            uploadFile(response?.assets[0]?.uri)
            // console.log(response?.assets[0]?.uri);
            // console.log(response?.assets[0]);
            // ...
          }
        });
      };
      

    useEffect(() => {
        loadOption()
        
    }, []);
    useEffect(() => {
        setstatusbarcolor('#00eefd');
        return () => {
            setstatusbarcolor('#fff');
        };
    }, [statusbarcolor]);
    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
            <Header state={state} dispatch={dispatch}/>
            <View style={styles.points}>
                <FontAwesomeIcon icon={ faStar } color={'#fbce00'} size={15} />
                <Text style={{fontWeight:700,color:'white'}}> {state?.user?.points}</Text>
            </View>
            <LinearGradient start={{x: 1, y: 0}} end={{x: 1, y: 1}} colors={['#00eefd', '#00b1fd']} style={styles.bgBlue}>
                {/* <View style={styles.profileDiv}>
                    <View style={styles.profileIcon}>
                        <FontAwesomeIcon icon={ faUser } color={'gray'} size={40} />
                    </View>
                </View>
                <View>
                    <Text style={styles.name}>Shahriar Hussain</Text>
                    <Text style={styles.title}>Class 10 - Science</Text>
                </View> */}
            </LinearGradient>
            <View style={styles.redDivContainer}>
                
                <View style={styles.bgRed}>
                    <View>
                        <View style={styles.profileDiv}>
                            <View style={styles.profileIconDiv}>
                            <View style={styles.profileIcon}>
                            {
                                state?.user?.photo?<Image style={{height:100, width:100, borderRadius:100}} source={{uri:photo}} onLoadEnd={() => setisLoading2(false)} />: <FontAwesomeIcon icon={ faUser } color={'gray'} size={40} />
                            }
                               
                                {!isLoading || isLoading2?<TouchableOpacity onPress={pickImage} style={styles.imageDiv}>
                                    
                                    <FontAwesomeIcon icon={ faImage } color={'white'} size={20} />
                                </TouchableOpacity>:
                                <View style={styles.imageDiv}>
                                    <ActivityIndicator size={24} color="#fff" />
                                </View>

                                }
                            </View>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.name}>{state?.user?.name}</Text>
                            {/* <Text style={styles.title}>{state?.user?.category === 'Class 1-12' &&
                                parseInt(state?.user?.class) > 8
                                ? 'Class ' + state?.user?.class + '- ' + state?.user?.division
                                : state?.user?.category === 'Class 1-12' &&
                                    'Class ' + state?.user?.class}
                                {state?.user?.category === 'Admission' ||
                                state?.user?.category === 'Job Preparation' ||
                                state?.user?.category === 'Skill Course'
                                ? state?.user?.category
                                : ''}
                            </Text> */}
                            <Text style={styles.title}>
                                {state?.user?.category === 'Class 1-12' &&
                                parseInt(state?.user?.class) > 8 && parseInt(state?.user?.class) < 11
                                ? 'Class 9-10' + ' - ' + state?.user?.division
                                : state?.user?.category === 'Class 1-12' &&
                                    parseInt(state?.user?.class)===11?"HSC - "+state?.user?.division:state?.user?.category === 'Class 1-12' && 'Class ' + state?.user?.class}
                                {state?.user?.category === 'Admission' ||
                                state?.user?.category === 'Job Preparation' ||
                                state?.user?.category === 'Skill Course'
                                ? state?.user?.category
                                : ''}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.boxContainer}>
                        
                        <TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={()=>navigation.navigate("Leader")} style={styles.box}>
                            <View style={styles.iconCont}>
                                <FontAwesomeIcon style={styles.leadericon} icon={ faGraduationCap } color={'#00b1fd'} size={55} />
                            </View>
                            <Text style={styles.boxTitle}>Leader Board</Text>
                        </TouchableOpacity>
                        <TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={()=>navigation.navigate("Badge")} style={styles.box}>
                            <View style={styles.iconCont}>
                                <FontAwesomeIcon style={styles.leadericon} icon={ faSign } color={'#00b1fd'} size={55} />
                            </View>
                            <Text style={styles.boxTitle}>Badges</Text>
                        </TouchableOpacity>
                        
                    </View>

                    {/* <ProfileOptions /> */}
                    {ProfileComponenet}

                    <Text style={{textAlign:'center', color:'rgba(0,0,0,0.5)'}}>Version - 0.1.12</Text>
                </View>
            </View>

            
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    bgBlue:{
        height:300,
        width:'100%',
        backgroundColor:'#00e3fe',
        paddingTop:30
    },
    bgRed:{
        minHeight:400,
        width:'100%',
        backgroundColor:'#e7edef',
        marginTop:-140,
        borderRadius:4,
        shadowColor:'grey',
        elevation:3,
        padding:15,
        shadowColor:'black',
        elevation:100,
        borderTopRightRadius:50,
        borderTopLeftRadius:50,
        
    },
    redDivContainer:{
        
    },
    profileDiv:{
        display:'flex',
        alignItems:'center',
        marginBottom:15,
        
    },
    profileIcon:{
        height:100,
        width:100,
        backgroundColor:'#e66042',
        borderRadius:100,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        margin:'auto',
        overflow:'hidden',
        position:'relative'
    },
    profileIconDiv:{
        borderWidth:1,
        borderColor:'gray',
        height:130,
        width:130,
        marginTop:-70,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:100,
        backgroundColor:'rgba(231, 199, 232, 0.6)',
        shadowColor:'grey',
        shadowOffset:1,
        elevation:10
    },
    name:{
        textAlign:'center',
        fontSize:25,
        fontWeight:700,
        color:'rgba(0,0,0,0.8)',
    },
    title:{
        textAlign:'center',
        fontSize:15,
        fontWeight:400,
        color:'rgba(0,0,0,0.8)',
    },
    points:{
        position:'absolute',
        zIndex:9999,
        right:0,
        margin:10,
        backgroundColor:'#e66042',
        paddingVertical:5,
        paddingHorizontal:10,
        borderRadius:40,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',

    },
    boxContainer:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-evenly',
        alignItems:'center',
        marginTop:20,
       
    },
    box:{
        height:100,
        width:150,
        borderRadius:20,
        borderWidth:1,
        backgroundColor:'white',
        borderColor:'rgba(0,0,0,0.1)'
        
    },
    boxTitle:{
        color:'grey',
        textAlign:'center'
    },
    leadericon:{
        textAlign:'center'
    },
    iconCont:{
        display:'flex',
        alignItems:'center',
        paddingVertical:5,

    },
    rank:{
        color:'black',
        fontSize:30,
        fontWeight:'bold',
        marginTop:10
    },
    imageDiv:{
        height:40,
        width:'100%',
        backgroundColor:'rgba(0,0,0,0.3)',
        position:'absolute',
        bottom:0,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }
})

export default Profile;
