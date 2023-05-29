import React from 'react';
import {View, StyleSheet,Text,TouchableOpacity} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser,faArrowLeft } from '@fortawesome/free-solid-svg-icons/'
import { useNavigation } from '@react-navigation/native';


const Headercourse = ({title,routename}) => {
    const navigation = useNavigation();
    return (
        <View style={styles.DivTitle}>
            <TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={()=>navigation.navigate(`${routename}`)}>
                <FontAwesomeIcon icon={ faArrowLeft } color={'gray'} size={25} />
            </TouchableOpacity>
            <Text style={styles.leaderTitle}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    DivTitle:{
        textAlign:'center',
        
        marginBottom:5,
        backgroundColor:'white',
        paddingVertical:10,
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

export default Headercourse;
