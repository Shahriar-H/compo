import React, {useEffect, useState} from 'react';
import { View,TouchableOpacity,StyleSheet, Text, ActivityIndicator,   Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import Headercourse from './small_componants/Headercourse';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { APIURL } from './lib/ApiCred';
import Toast from "react-native-toast-message"

const WebViewCom = ({state}) => {

  const routes = useRoute()
  const courseId = routes?.params?.courseId;
  const [course, setcourse] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [isEnrolling, setisEnrolling] = useState(false);
  const [isEnrolled, setisEnrolled] = useState(false);
  const [isPageisLoading, setisPageisLoading] = useState(false);
  const [isTimesUpok, setisTimesUpok] = useState(false);
 
  const navigation = useNavigation();
  const focused = useIsFocused()
  
  
  useEffect(() => {
    
    setisLoading(true)
    setisEnrolled(false)
    console.log(state?.user?.id);
    fetch(APIURL+"/singlecourse/"+courseId)
    .then((res)=>res.json())
    .then((result)=>{
        if(result?.status===500){
           return Toast.show({
            type: 'error',
            text1: 'Message',
            text2: "Error Found"
        });
        }
        //checkenroll
        fetch(APIURL+"/checkenroll/"+parseInt(courseId)+"/"+parseInt(state?.user?.id))
        .then((res)=>res.json())
        .then((enroll)=>{
            // console.log(enroll?.result[0]?.payment_status);
            if(enroll?.status===200 && enroll?.result[0]?.payment_status==='paid'){
                setisEnrolled(true)
            }
           
        })
        setcourse(result?.result[0])
       
    })
    .finally(()=>{
        setTimeout(() => {
            setisEnrolling(false)
            setisLoading(false)
        }, 2000);
        
        
    })
  
  }, [courseId,focused]);

  const enrollHndle = ()=>{
    
    setisEnrolling(true)
    const data = {
        userid:state?.user?.id,
        courseid:course?.id,
        course_type:course?.course_type,
        amount:course?.price,
        payment_method:'No',
        payment_status:"paid",
        order_id :Date.now(),

    }
    fetch(APIURL+"/enroll",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(data)

    })
    .then((res)=>res.json())
    .then((result)=>{
        if(result?.status===500){
            return Toast.show({
                type: 'error',
                text1: 'Message',
                text2: "Enrollment Failed"
            });
        }
        setisEnrolled(true)
        Toast.show({
            type: 'success',
            text1: 'Message',
            text2: "Enrolled"
        });

    })
    .finally(()=>{
        setisEnrolling(false)
    })
  }

  const paidenrollHndle = ()=>{
    
    setisEnrolling(true)
    const data = {
        userid:state?.user?.id,
        courseid:course?.id,
        course_type:course?.course_type,
        amount:course?.price,
        payment_method:'No',
        payment_status:"unpaid",
        order_id :Date.now(),

    }
    fetch(APIURL+"/enroll",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(data)

    })
    .then((res)=>res.json())
    .then((result)=>{
        // console.log(result?.result);
        if(result?.status===500){
            return Toast.show({
                type: 'error',
                text1: 'Message',
                text2: "Proccess Failed"
            });
        }
        setisEnrolled(true)
       
        navigation.navigate("Checkout",{returnPath:"Webview",courseInfo:{
            ...course,
            enrollid:result?.result?.insertId
        }})

    })
    .finally(()=>{
        setisEnrolling(false)
    })
  }



 



  if(isLoading){
    return <>
    <View>
        <Headercourse title={`Course Details`} routename={'Main'} />
    </View> 
    <View style={{height:'100%', display:'flex', justifyContent:'center'}}>

        <ActivityIndicator color={'black'} size={30}/>
    </View>
    </>
  }
  return (
    <View style={{ flex: 1 }}>
       <View>
            <Headercourse title={`Course Details`} routename={'Main'} />
        </View> 
        <WebView source={{ uri:"https://robotechvalley.com/app/pages/index.php?id="+courseId}} />
        {
            course?.price!==0 && !isEnrolled && !isLoading?
            (<TouchableOpacity disabled={isEnrolling} onPress={paidenrollHndle} delayPressIn={0} delayPressOut={0} style={styles.enrollBtn}>
                
                <Text style={styles.butnTxt}>{!isEnrolling?'ENROLL NOW ৳'+course?.price:<ActivityIndicator size={25}/>}</Text>
            </TouchableOpacity>)
            :!isEnrolled&&!isLoading&&
            <TouchableOpacity disabled={isEnrolling} delayPressIn={0} delayPressOut={0} onPress={enrollHndle} style={styles.enrollBtn}>
                <Text style={styles.butnTxt}>{!isEnrolling?'ENROLL NOW (FREE)':<ActivityIndicator size={25}/>}</Text>
            </TouchableOpacity>
        }
        {
            isEnrolled&&!isLoading&&course?.playlist!=='0'&&
            <TouchableOpacity onPress={()=>navigation.navigate('Videoplay',{videoId:course?.playlist,userId:state?.user?.id, courseId:course?.id})} disabled={isEnrolling} delayPressIn={0} delayPressOut={0} style={styles.enrollBtn}>
                <Text style={styles.butnTxt}>SEE VIDEOS</Text>
            </TouchableOpacity>
        }
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        paddingVertical:20,
        paddingHorizontal:16
    },
    Imagecontainer:{
        padding:15,
        backgroundColor:'white',
        borderRadius:13,
        shadowColor:'gray',
        elevation:3,
        minHeight:180,
        marginVertical:10,
        marginHorizontal:5
    },
    CoverImage:{
        width:'100%',
        height:180,
        borderRadius:8
    },
    CourseTitle:{
        fontSize:18,
        color:"rgba(0,0,0,0.8)",
        fontWeight:'bold',
        marginVertical:10,

    },
    enrollBtn:{
        
        padding:15,
        backgroundColor:'#00b1fd',
        borderTopLeftRadius:6,
        borderTopRightRadius:6

    },
    butnTxt:{
        color:'white',
        textAlign:'center',
        fontWeight:'bold'
    }
})

export default WebViewCom;