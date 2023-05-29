import React, {useEffect, useState, useReducer} from 'react';
import {View, StyleSheet, Text,Image, TouchableOpacity, StatusBar} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronDown, faUserCircle} from '@fortawesome/free-solid-svg-icons/';
import LinearGradient from 'react-native-linear-gradient';
import {IMAGEURL, getData} from '../lib/ApiCred';
import {useNavigation} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';


const Header = ({state, dispatch}) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [isLoading, setisLoading] = useState(true);
  const [photo, setphoto] = useState(IMAGEURL+state?.user?.photo);
  const [userInfo, setuserInfo] = useState({});

  
  const loadImage = ()=>{
    setphoto(IMAGEURL+state?.user?.photo)
  }
  const getLoggeduser = () => {
    // try {

    // } catch (error) {
    //   console.error(error);
    // }
    if (!state?.user) {
    } else {
      setuserInfo(state?.user);
    }
  };
  useEffect(() => {
    if (!state?.user) {
    } else {
      setuserInfo(state?.user);
    }
    console.log(state?.user);
    // getLoggeduser()
    setphoto(IMAGEURL+state?.user?.photo)
  }, [isFocused]);

  // return unsubscribe;

  // }, );

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#fff', '#fff']}
      style={styles.headerDiv}>
        <StatusBar
            animated={true}
            backgroundColor="#fff"
        />
        <TouchableOpacity onProgress={loadImage}>
        {
            state?.user?.photo?<Image style={{height:55, width:55, borderRadius:100, borderWidth:4, borderColor:'#00b1fb'}} source={{uri:photo}} onLoadEnd={() => setisLoading(false)} />: <FontAwesomeIcon icon={faUserCircle} color={'gray'} size={55} />
        }
      </TouchableOpacity>
      {userInfo === null ? (
        <Text>Loading</Text>
      ) : (
        <View style={styles.namingContainer}>
          <TouchableOpacity onPress={()=>navigation.navigate("Account")} style={{display:'flex', flexDirection:'row'}}>
            <Text style={{...styles.nameofUser, marginRight:3}}>{userInfo?.name}</Text>
            <FontAwesomeIcon icon={faChevronDown} color={'rgba(0,0,0,0.7)'} size={19} />
          </TouchableOpacity>
          <Text style={styles.statusOfuser}>
            {userInfo?.category === 'Class 1-12' &&
            parseInt(userInfo?.class) > 8 && parseInt(userInfo?.class) < 11
              ? 'Class 9-10' + ' - ' + userInfo?.division
              : userInfo?.category === 'Class 1-12' &&
                parseInt(userInfo?.class)===11?"HSC - "+userInfo?.division:userInfo?.category === 'Class 1-12' && 'Class ' + userInfo?.class}
            {userInfo?.category === 'Admission' ||
            userInfo?.category === 'Job Preparation' ||
            userInfo?.category === 'Skill Course'
              ? userInfo?.category
              : ''}
          </Text>
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  headerDiv: {
    padding: 5,
    height: 70,
    backgroundColor: '#00b1fd',
    shadowColor: 'black',
    elevation: 3,
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingTop:0
  },
  nameofUser: {
    fontSize: 18,
    fontWeight: 600,
    color: 'rgba(0,0,0,0.8)',
  },
  namingContainer: {
    marginLeft: 15,
  },
  statusOfuser: {
    color:'rgba(0,0,0,0.8)',
  },
});

export default Header;
