import React from 'react';
import {View, StyleSheet,Text,TouchableOpacity,ScrollView,Image, StatusBar} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserCircle,fa1,fa9,faH,faRocket,faList,faRecordVinyl,faVideoCamera } from '@fortawesome/free-solid-svg-icons/'
import LinearGradient from 'react-native-linear-gradient';
import CategoryItem from './small_componants/CategoryItem';
import { useNavigation } from '@react-navigation/native';
import Headercourse from './small_componants/Headercourse';
import CategoryItemPaid from './small_componants/CategoryItemPaid';
import CategoryItemLive from './small_componants/CategoryItemLive';
import Share from 'react-native-share';
import Header from './small_componants/Header';


const Category = ({state, dispatch}) => {
    const navigation = useNavigation()
    const shareContent = {
        title: 'i1class App',
        message: 'Check out this awesome app!',
        url: 'https://www.example.com',
      };
    
      const handleShare = async () => {
        try {
          const options = {
            title: shareContent.title,
            message: shareContent.message,
            url: shareContent.url,
          };
    
          await Share.open(options);
        } catch (error) {
            if (error.message !== 'User did not share') {
                // Handle cancel share action
                console.error('Error sharing:', error);
            } 
        }
      };
    return (
        <ScrollView style={styles.mainContainer}>
            <Header state={state} dispatch={dispatch}/>
            {/* <View>
                <Headercourse title={`Category`} routename={'Main'} />
            </View> */}
            <View style={{height:20}}></View>
            <View style={{paddingHorizontal:15}}>

            <TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={()=>navigation.navigate("MyQuizPaid")} style={styles.catImageDiv}>
                <Image resizeMode='contain' style={styles.catBg} source={{uri:"https://robotechvalley.com/app/quiz.jpeg"}} />
            </TouchableOpacity>

            {/* <Text style={styles.catHeader}>Revise and Be exam ready</Text> */}
            {/* <TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={()=>navigation.navigate("Revision")}>
                <Image resizeMode='contain' style={styles.catBg} source={{uri:"https://robotechvalley.com/app/revision.jpeg"}} />
            </TouchableOpacity> */}

            {/* <Text style={styles.catHeader}>Contact us</Text> */}
            <TouchableOpacity style={styles.catImageDiv} delayPressIn={0} delayPressOut={0} onPress={()=>navigation.navigate("Contactus")}>
                <Image resizeMode='contain' style={styles.catBg} source={{uri:"https://robotechvalley.com/app/helpdesk.jpeg"}} />
            </TouchableOpacity>
            
            {/* <Text style={styles.catHeader}>Share the app</Text> */}
            <TouchableOpacity style={styles.catImageDiv} delayPressIn={0} delayPressOut={0} onPress={()=>handleShare()}>
                <Image resizeMode='contain' style={styles.catBg} source={{uri:"https://robotechvalley.com/app/share.jpeg"}} />
            </TouchableOpacity>

            <View style={{height:50}}></View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    mainContainer:{
        paddingTop:0,
    },
    catBg:{
        height:130,
        width:"100%",
        borderRadius:10,
        marginBottom:20,
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.1)'
    },
    catHeader:{
        color:'black',
        fontSize:19,
        marginVertical:10
    },
    catImageDiv:{
        shadowColor:'gray',
        elevation:3,
        marginBottom:20
    },
    catBg:{
        minHeight:130,
        width:"100%",
        borderRadius:10
    }
   
})

export default Category;
