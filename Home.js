import React,{useState,useEffect,memo} from 'react';
import {View, StyleSheet,Image,TouchableOpacity,Text,Input, TextInput, ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AppIntroSlider from 'react-native-app-intro-slider';
import { APIURL, getData } from './lib/ApiCred';

const Home = () => {
    const [isClickonvisiblebutton, setisClickonvisiblebutton] = useState(false);
    const [isLoadingImage, setisLoadingImage] = useState(true);
    const navigation = useNavigation();
    const loginPress = ()=>{
        setTimeout(() => {
            setisClickonvisiblebutton(false)
            navigation.navigate('Login')
        }, 200);
        
    }
    const loginPressForvisibale = ()=>{
        setisClickonvisiblebutton(true)
    }
    const slides = [
        {
          key: 1,
          title: 'দৈনিক লাইভ ক্লাসে অংশ নিয়ে বজায় রাখুন রুটিন মাফিক পড়াশোনা',
          text: 'Description.\nSay something cool',
          image: "https://robotechvalley.com/app/bg01.png",
          backgroundColor1: '#00eefd',
          backgroundColor2: '#00b1fd',
        },
        {
          key: 2,
          title: 'আই ওয়ান ক্লাসের সাথে হয়ে উঠুন আরো দক্ষ',
          text: 'Other cool stuff',
          image: "https://robotechvalley.com/app/bg2.png",
          backgroundColor1: 'rgba(198, 0, 206, 0.8)',
          backgroundColor2: 'rgba(198, 0, 206, 1)',
        },
        {
          key: 3,
          title: 'কুইজের মাধ্যমে নিজেদের দক্ষতা যাচাই করুন আই ওয়ান ক্লাসে।',
          text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
          image: "https://robotechvalley.com/app/bg3.png",
          backgroundColor1: 'rgb(25, 53, 234)',
          backgroundColor2: 'rgb(55, 153, 234)',
        }
      ];

      useEffect(() => {
        
        return () => {
            setisClickonvisiblebutton(false)
        };
      }, []);


      const _renderItem = ({ item }) => {
        return (
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[item?.backgroundColor1, item?.backgroundColor2]} style={styles.gradiantView}>
                <View style={styles.imageDivi}>
                    <Image onLoadEnd={() => setisLoadingImage(false)} resizeMode='contain' style={styles.frontImage} source={{uri:item?.image}} />
                    {isLoadingImage&&<ActivityIndicator size={24} color="#fff" />}
                </View>
                <Text style={styles.title}>{item?.title}</Text>
          </LinearGradient>
        );
      }
      const _onDone = () => {
        console.log("done"); 
      }
    return (
        <View style={styles.mainContainer}>
            
            <AppIntroSlider 
                renderItem={_renderItem} 
                data={slides} 
                onDone={_onDone}
                showNextButton={false}
                showDoneButton={false}
                />
            <View style={styles.loginPart}>
                
                {<View>
                    <TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={()=>navigation.navigate('Loginpage')} style={[styles.buttonLogin,styles.buttonRegistrationOneTime]}>
                        <Text style={{textAlign:"center",color:'white',fontSize:18}}>Login</Text>
                    </TouchableOpacity> 

                    <TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={()=>navigation.navigate('Phonenumber')} style={[styles.buttonLogin,styles.buttonRegistrationOneTime]}>
                        <Text style={{textAlign:"center",color:'white',fontSize:18}}>Create account</Text>
                    </TouchableOpacity> 

                </View>}
            </View>
        </View>
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
        height:'35%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    buttonLogin:{
        paddingVertical:10,
        width:330,
        backgroundColor:'#00b9fe',
        marginBottom:10,
        borderRadius:10
    },
    buttonRegistration:{
        backgroundColor:'#f500fb',
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
        width:330,
    },
    imageDivi:{
        borderRadius:18,
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

export default memo(Home);
