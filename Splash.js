import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet,StatusBar } from 'react-native';
import Auth from './small_componants/Auth';
import { APIURL } from './lib/ApiCred';


const SplashScreen = ({state, dispatch}) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 to month since it is zero-based
  const day = String(currentDate.getDate()).padStart(2, '0');

  const fullDate = `${year}-${month}-${day}`;
  const [isDataFatched, setisDataFatched] = useState(false);
  const [statusbarcolor, setstatusbarcolor] = useState('#00b1fd');
  useEffect(() => {
    fetch(APIURL+"/visitors/"+fullDate,{
      method:'POST',
      headers:{
          "Content-Type" : "application/json",
          "Authorization":state?.token
      },
    })
    .then((res)=>res.json())
    .then((result)=>{
      // console.log(result);
    })
  }, []);
  const userLoggedinFun = (isLogged)=>{
    setisDataFatched(isLogged)
  }

  useEffect(() => {
    
    return () => {
      <StatusBar
            animated={true}
            backgroundColor={'#fff'}
        />
    };
  }, []);


  return (
    <View style={styles.container}>
        <StatusBar
            animated={true}
            backgroundColor={statusbarcolor}
        />
        {/* titles.jpeg */}
        <View style={styles.holderImage}>
            <Image resizeMode='cover' source={require("./Images/splash.gif")} style={styles.logo} />
        </View>
        <View style={styles.holderTitle}>
            <Image resizeMode='contain' source={require("./Images/logo.jpeg")} style={styles.titleImg} />
            <Auth state={state} dispatch={dispatch} loggedinfun = {userLoggedinFun}/>
        </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeef1',
    alignItems: 'center',
    backgroundColor:'white'
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  holderImage:{
    height:'60%',
    width:'100%'
  },
  holderTitle:{
    height:'40%',
    width:'100%',
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
  titleImg:{
    height:180,
    width:"100%"
  }
});

export default SplashScreen;
