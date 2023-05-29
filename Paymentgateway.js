import React, {useEffect, useState} from 'react';
import { View,TouchableOpacity,StyleSheet, Text, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import Headercourse from './small_componants/Headercourse';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faCircleCheck } from '@fortawesome/free-solid-svg-icons/'
import { APIURL } from './lib/ApiCred';
import Toast from "react-native-toast-message"

const Paymentgateway = ({state}) => {
  
  const routes = useRoute()
  const {name, email, amount,userid, enrollid,phone,courseInfo} = routes?.params;
  const [course, setcourse] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [isEnrolling, setisEnrolling] = useState(false);
  const [isEnrolled, setisEnrolled] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    // console.log(routes?.params);
  }, []);
  const url = `https://robotechvalley.com/app/pages/payment/index.php?userid=${userid}&enrollid=${enrollid}&name=${name}&email=${email}&amount=${amount}&phone=${phone}`;
  
  

  

  


  const thewebapageisLoading=()=>{
    return <View style={{height:'100%', display:'flex', justifyContent:'center'}}>
        <ActivityIndicator color={'black'} size={30}/>
    </View>
  }

  if(isLoading){
    return <View style={{flex:1, height:'100%'}}>
        <ActivityIndicator color={'black'} size={30}/>
    </View>
  }
  return (
    <View style={{ flex: 1 }}>
       <View style={styles.DivTitle}>
            <TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={()=>navigation.navigate('Checkout',{returnPath:'Webview',courseInfo:courseInfo})}>
                <FontAwesomeIcon icon={ faArrowLeft } color={'gray'} size={25} />
            </TouchableOpacity>
            <Text style={styles.leaderTitle}>{"Checkout"}</Text>
        </View>
        <WebView source={{ uri: url }} onLoad={thewebapageisLoading} onMessage={(event) => {
        if (event.nativeEvent.data === 'paymentSuccess') {
        // Navigate back to the main app screen
        // Implement the navigation logic according to your app's structure
            navigation.navigate("MycoursList")
        }else{
            navigation.navigate("Main")
        }
    }} />
        
        
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
    },
    DivTitle:{
        textAlign:'center',
        
        marginBottom:5,
        backgroundColor:'white',
        paddingVertical:10,
        borderRadius:10,
        shadowColor:'grey',
        elevation:3,
        paddingHorizontal:10,
        display:'flex',
        
        flexDirection:'row',

    },
    leaderTitle:{
        textAlign:'center',
        width:"85%",
        color:'black',
        fontWeight:'bold',
        fontSize:19,
    }
})

export default Paymentgateway;