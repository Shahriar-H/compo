import React,{useEffect,useState} from 'react';
import {View, StyleSheet,Text,ScrollView,TouchableOpacity,Image,   RefreshControl, Alert} from 'react-native';
import {ProgressBar} from '@react-native-community/progress-bar-android';
import LinearGradient from 'react-native-linear-gradient';
import ProgressCircle from 'react-native-progress-circle'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft,faStar } from '@fortawesome/free-solid-svg-icons/'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { APIURL, PHOTOURL } from '../lib/ApiCred';
import Headercourse from '../small_componants/Headercourse';
import Toast from "react-native-toast-message"

const Courses = ({state}) => {
    const navigation = useNavigation();
    const isfocused = useIsFocused()
    const [mycourses, setmycourses] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [isRefreshing, setisRefreshing] = useState(false);

    

    const fetchAllCourse = ()=>{
        setisLoading(true)
        fetch(APIURL+'/mycourses/'+state?.user?.id)
        .then((res)=>res.json())
        .then((result)=>{
            
            setmycourses(result?.result)
          
            
          
        })
        .catch((err)=>{
            Toast.show({
                type: 'error',
                text1: 'Message',
                text2: "Error Found"
            });
            console.log(err);
        })
        .finally(()=>{
            setisLoading(false)
        })
    }

    const refreshhandle = ()=>{
        setisRefreshing(true)
        fetchAllCourse()
        setTimeout(() => {
            setisRefreshing(false)
        }, 2000);
    }

    useEffect(() => {
        fetchAllCourse()
        
    }, [isfocused]);

    if(isLoading){
        return  <>
        <View delayPressIn={0} delayPressOut={0} style={{...styles.videoBox1}}>
            <Image resizeMode='stretch' style={{height:300, width:'100%'}} source={require("../Images/videoskal.gif")} />
        </View>
        <View delayPressIn={0} delayPressOut={0} style={{...styles.videoBox1}}>
            <Image resizeMode='stretch' style={{height:300, width:'100%'}} source={require("../Images/videoskal.gif")} />
        </View>
        <View delayPressIn={0} delayPressOut={0} style={{...styles.videoBox1}}>
            <Image resizeMode='stretch' style={{height:300, width:'100%'}} source={require("../Images/videoskal.gif")} />
        </View>
    </>
    }

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refreshhandle}/>}>
            <View>
                <Headercourse title={'My Courses'} routename={'Profile'} />
            </View>
            <View style={styles.outerMargin}>
                {/* <TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={()=>navigation.navigate("Profile")}>
                    <FontAwesomeIcon icon={ faArrowLeft } color={'gray'} size={20} />
                </TouchableOpacity> */}
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#fff','#fff']} style={styles.YourProgress}>

                <View style={{width:'100%'}}>
                        <Text style={styles.numberOfcourse}>{mycourses?String(mycourses?.length)?.padStart('2','0'):0}</Text>
                        <Text style={styles.PurchagedtextTitle}>You Enrolled Courses</Text>
                </View>

                {/* <ProgressCircle
                        percent={60}
                        radius={50}
                        borderWidth={8}
                        color="#00b1fd"
                        shadowColor="#999"
                        bgColor="#fff"
                    >
                        <Text style={{ fontSize: 15 }}>{'60%'}</Text>
                        <Text style={{ fontSize: 12 }}>Completed</Text>
                    </ProgressCircle> */}

                </LinearGradient>
                
                <View style={styles.buttonsOfControl}>
                    {/* <TouchableOpacity delayPressIn={0} delayPressOut={0} style={styles.completedBtn}>
                        <Text style={{textAlign:'center'}}>Completed</Text>
                    </TouchableOpacity> */}
                    <Text style={styles.textTitle}>My Courses</Text>
                    {/* <TouchableOpacity delayPressIn={0} delayPressOut={0} style={[styles.completedBtn,styles.selected]}>
                        <Text style={{textAlign:'center',fontSize:18}}>See all</Text>
                    </TouchableOpacity> */}
                </View>
                <View style={{height:40}}></View>



                {/* My courses */}
                {
                    mycourses && Array?.isArray(mycourses) && mycourses?.map((course,index)=>{
                    if(course?.playlist!=='0'){
                    return <View key={index} style={styles.cardContainer}>
                        <TouchableOpacity delayPressIn={0} delayPressOut={0} style={styles.courseCard} onPress={()=>navigation.navigate('Videoplay',{videoId:course?.playlist,userId:course?.userid, courseId:course?.courseid})}>
                            <View style={styles.cardPhoto}>
                                <Image resizeMode='cover' style={styles.imageCover} source={{uri:PHOTOURL+course?.cover_photo}} />
                            
                                <View style={styles.infoBase}>
                                    <Text style={styles.subname}>{course?.title}</Text>
                                    <View style={styles.star}>
                                        <FontAwesomeIcon icon={ faStar } color={'#ebc14e'} size={12} />
                                        <FontAwesomeIcon icon={ faStar } color={'#ebc14e'} size={12} />
                                        <FontAwesomeIcon icon={ faStar } color={'#ebc14e'} size={12} />
                                        <FontAwesomeIcon icon={ faStar } color={'#ebc14e'} size={12} />
                                        <FontAwesomeIcon icon={ faStar } color={'gray'} size={12} />
                                    </View>
                                    <ProgressBar
                                        styleAttr="Horizontal"
                                        indeterminate={false}
                                        progress={JSON.parse(course?.no_of_class_done)?.length/course?.total_class}
                                        color={'#00b1fd'}
                                    />
                                    <View style={styles.indicator}>
                                        <Text style={{fontSize:13,color:'gray'}}>{JSON.parse(course?.no_of_class_done)?.length}/{course?.total_class} Classes </Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>






                        
                        

                        
                    </View>
                    }else{
                        return <View key={index} style={styles.cardContainer}>
                        <TouchableOpacity delayPressIn={0} delayPressOut={0} style={styles.courseCard} onPress={()=>Alert.alert("This is not recorded Course")}>
                            <View style={styles.cardPhoto}>
                                <Image resizeMode='cover' style={styles.imageCover} source={{uri:PHOTOURL+course?.cover_photo}} />
                            
                                <View style={styles.infoBase}>
                                    <Text style={styles.subname}>{course?.title}</Text>
                                    <View style={styles.star}>
                                        <FontAwesomeIcon icon={ faStar } color={'#ebc14e'} size={12} />
                                        <FontAwesomeIcon icon={ faStar } color={'#ebc14e'} size={12} />
                                        <FontAwesomeIcon icon={ faStar } color={'#ebc14e'} size={12} />
                                        <FontAwesomeIcon icon={ faStar } color={'#ebc14e'} size={12} />
                                        <FontAwesomeIcon icon={ faStar } color={'gray'} size={12} />
                                    </View>
                                    <ProgressBar
                                        styleAttr="Horizontal"
                                        indeterminate={false}
                                        progress={JSON.parse(course?.no_of_class_done)?.length/course?.total_class}
                                        color={'#00b1fd'}
                                    />
                                    <View style={styles.indicator}>
                                        <Text style={{fontSize:13,color:'gray'}}>{JSON.parse(course?.no_of_class_done)?.length}/{course?.total_class} Classes </Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>






                        
                        

                        
                        </View>
                    }

                })
                }
                {
                    !mycourses&&<Text style={{textAlign:'center'}}>No Course Found</Text>
                }

                <View style={{height:40}}></View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    indicator:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    infoBase:{
        paddingLeft:5,
    },
    star:{
        display:'flex',
        flexDirection:'row',
    },
    subname:{
        color:'black',
        fontSize:17,
        fontWeight:'bold',
        
        paddingTop:5,

    },
    cardContainer:{
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row',
        marginTop:-10,
        flexWrap:'wrap',
       
    },
    cardPhoto:{
        backgroundColor:'white',
        padding:15,
        borderRadius:10,
        shadowColor:'black',
        elevation:3,
        
    },
    imageCover:{
        height:200,
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.1)',
        borderRadius:10
    },
    outerMargin:{
        padding:20
    },
    textTitle:{
        fontSize:20,
        paddingLeft:7,
        marginTop:10,
        color:'gray'
    },
    YourProgress:{
        padding:15,
        backgroundColor:'white',
        shadowColor:'gray',
        borderRadius:10,
        minHeight:100,
        marginBottom:10,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.1)'
    },
    numberOfcourse:{
        color:'black',
        fontSize:60,
        fontWeight:'800', 
        textAlign:'center'
    },
    completedBtn:{
        backgroundColor:'white',
        width:"35%",
        padding:5,
        borderRadius:20,
        paddingVertical:5,

    },
    buttonsOfControl:{
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row',
        marginTop:10,
        alignItems:'center',
    },
    selected:{
        backgroundColor:'rgba(0,0,0,0.1)',
        fontSize:20
    },
    courseCard:{
        width:'100%',
        marginBottom:25,
        
    },
    PurchagedtextTitle:{
        textAlign:'center',
        color:'gray'
    }
})

export default Courses;
