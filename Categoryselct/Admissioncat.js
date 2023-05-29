import React from 'react';
import {View, StyleSheet,Text,TouchableOpacity,ScrollView,Image} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { useNavigation } from '@react-navigation/native';
import CategoryItem from '../small_componants/CategoryItem';
import CategoryItemPaid from '../small_componants/CategoryItemPaid';
import CategoryItemLive from '../small_componants/CategoryItemLive';


const Admissioncat = () => {
    const navigation = useNavigation()
    return (
        <ScrollView style={styles.mainContainer}>

            <View style={{height:20}}></View>
            <CategoryItem info={{name:"Admiddion Course",path:"Paidcourse",returnPath:"Admissioncat",status:'free'}}/> 
            <CategoryItemPaid info={{name:"Paid Admission Courses",path:"Paidcourse",returnPath:"Admissioncat"}}/>
            <CategoryItemLive info={{name:"Live Live Course",path:"Paidcourse",returnPath:"Admissioncat"}}/>
            {/* <TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={()=>navigation.navigate("Quiz")}>
                <Image resizeMode='cover' style={styles.catBg} source={{uri:"https://robotechvalley.com/app/quiz.png"}} />
            </TouchableOpacity> */}

            <View style={{height:50}}></View>
            
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    mainContainer:{
        paddingVertical:20,
        paddingHorizontal:30
    },
    catBg:{
        height:130,
        width:"100%",
        borderRadius:10
    }
   
})

export default Admissioncat;
