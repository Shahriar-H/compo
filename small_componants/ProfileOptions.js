import React from 'react';
import {View, StyleSheet,Text, TouchableOpacity} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBolt,faBookBookmark,faFlagCheckered,faMagic,faUserCircle } from '@fortawesome/free-solid-svg-icons/'
import { useNavigation, useRoute } from '@react-navigation/native';
import { logout } from '../lib/ApiCred';

const ProfileOptions = ({state,dispatch}) => {
    const navigation = useNavigation()
    const logoutFun = ()=>{
        logout('user')
        dispatch({type:'logout'})
        
    }
    return (
        <View style={styles.optionContainer}>
            {/* <TouchableOpacity delayPressIn={0} delayPressOut={0} style={styles.options}>
                <FontAwesomeIcon icon={ faBolt } color={'#14e5f7'} size={30} />
                <Text style={styles.optionsTitle}>Admission Information</Text>
            </TouchableOpacity> */}
            <TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={()=>navigation.navigate("Mysylebus")} style={styles.options}>
                <FontAwesomeIcon icon={ faFlagCheckered } color={'#00b1fd'} size={30} />
                <Text style={styles.optionsTitle}>My Syllabus</Text>
            </TouchableOpacity>
            <TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={()=>navigation.navigate('Account')} style={styles.options}>
                <FontAwesomeIcon icon={ faUserCircle } color={'#00b1fd'} size={30} />
                <Text style={styles.optionsTitle}>My Information</Text>
            </TouchableOpacity>
            <TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={()=>navigation.navigate('MycoursList')} style={styles.options}>
                <FontAwesomeIcon icon={ faBookBookmark } color={'#00b1fd'} size={30} />
                <Text style={styles.optionsTitle}>My Courses</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={()=>navigation.navigate('Account')} style={styles.options}>
                <FontAwesomeIcon icon={ faMagic } color={'#14e5f7'} size={30} />
                <Text style={styles.optionsTitle}>Other Options</Text>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={logoutFun} delayPressIn={0} delayPressOut={0} style={{...styles.options,justifyContent:'center',backgroundColor:'#00b1fd',marginTop:50,opacity:0.8}}>
                {/* <FontAwesomeIcon icon={ faBolt } color={'#fbce00'} size={30} /> */}
                <Text style={{textAlign:'center',paddingLeft:0,fontSize:20,color:'white'}}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    optionContainer:{
        marginTop:30,
        paddingHorizontal:20
    },
    options:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.1)',
        backgroundColor:'white',
        paddingHorizontal:10,
        paddingVertical:10,
        borderRadius:10,
        marginBottom:15

    },
    optionsTitle:{
        fontSize:20,
        paddingLeft:20,
        color:'rgba(0,0,0,0.5)',

    }
})

export default ProfileOptions;
