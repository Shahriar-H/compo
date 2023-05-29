import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet,TouchableOpacity,Text,Image,ScrollView} from 'react-native';

const Revision = () => {
    const navigation = useNavigation()
    return (
       
        <ScrollView contentContainerStyle={styles.feature1}>
            
            <TouchableOpacity onPress={()=>navigation.navigate('Videoplay',{videoId:"wc-JggM26nA"})} delayPressIn={0} delayPressOut={0} style={styles.videoBox}>
                <Image resizeMode='contain' style={styles.CoverImage} source={{uri:"https://www.seracourse.com/wp-content/uploads/2021/12/Varsityadmission.jpg"}} />
                <Text style={styles.titlename}>Bangla 1st Paper</Text>
            </TouchableOpacity>
            <TouchableOpacity delayPressIn={0} delayPressOut={0} style={styles.videoBox}>
                <Image resizeMode='contain' style={styles.CoverImage} source={{uri:"https://static-cse.canva.com/blob/1009313/1600w-bb5wBljIAZk.jpg"}} />
                <Text style={styles.titlename}>Bangla 1st Paper</Text>
            </TouchableOpacity>
            <TouchableOpacity delayPressIn={0} delayPressOut={0} style={styles.videoBox}>
                <Image resizeMode='contain' style={styles.CoverImage} source={{uri:"https://www.seracourse.com/wp-content/uploads/2021/12/Varsityadmission.jpg"}} />
                <Text style={styles.titlename}>Bangla 1st Paper</Text>
            </TouchableOpacity>
            <TouchableOpacity delayPressIn={0} delayPressOut={0} style={styles.videoBox}>
                <Image resizeMode='contain' style={styles.CoverImage} source={{uri:"https://www.seracourse.com/wp-content/uploads/2021/12/Varsityadmission.jpg"}} />
                <Text style={styles.titlename}>Bangla 1st Paper</Text>
            </TouchableOpacity>
            <TouchableOpacity delayPressIn={0} delayPressOut={0} style={styles.videoBox}>
                <Image resizeMode='contain' style={styles.CoverImage} source={{uri:"https://static-cse.canva.com/blob/1009313/1600w-bb5wBljIAZk.jpg"}} />
                <Text style={styles.titlename}>Bangla 1st Paper</Text>
            </TouchableOpacity>
            <TouchableOpacity delayPressIn={0} delayPressOut={0} style={styles.videoBox}>
                <Image resizeMode='contain' style={styles.CoverImage} source={{uri:"https://www.seracourse.com/wp-content/uploads/2021/12/Varsityadmission.jpg"}} />
                <Text style={styles.titlename}>Bangla 1st Paper</Text>
            </TouchableOpacity>
            
        </ScrollView>
        
    );
}

const styles = StyleSheet.create({
    feature1:{
        backgroundColor:'white',
        padding:10,
        height:'100%',
        shadowColor:'gray',
        elevation:2,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        flexWrap:'wrap'
    },
    videoBox:{
        padding:5,
        width:'49%',
        
        marginBottom:10
    },
    CoverImage:{
        width:'100%',
        height:120,
        borderWidth:1,
        borderColor:'gray',
    },
    titlename:{
        fontSize:16,
        fontWeight:600,

    },
})

export default Revision;
