import React, {useEffect, useState} from 'react';
import { View,TouchableOpacity,StyleSheet, Text, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import Headercourse from './small_componants/Headercourse';
import { useNavigation, useRoute } from '@react-navigation/native';
import { APIURL } from './lib/ApiCred';
import Toast from "react-native-toast-message"

const Mysylebus = ({state}) => {
 
  const [course, setcourse] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  
  
  useEffect(() => {
    setisLoading(true)
    
    
    
        fetch(APIURL+"/syllabus/"+state?.user?.category+"/"+state?.user?.class)
        .then((res)=>res.json())
        .then((enroll)=>{
           
            if(enroll?.status===200){
                setcourse(enroll?.result[0])
                return 0;
            }

            Toast.show({
                type: 'error',
                text1: 'Message',
                text2: enroll?.message
            });
        })
        .finally(()=>{
            setisLoading(false)
        })
       
       
  
    
  
  }, []);

  



  if(isLoading){
    return <View style={{flex:1, height:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator color={'black'} size={30}/>
    </View>
  }
  return (
    <View style={{ flex: 1 }}>
       <View>
            <Headercourse title={`My Syllabus`} routename={'Main'} />
        </View> 
        <WebView source={{ uri: course?.link }} />
        
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

export default Mysylebus;