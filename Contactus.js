import React from 'react';
import {View, StyleSheet,Image,Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


const Contactus = () => {
    return (
        <View style={{position:'relative'}}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#00b1fd','#00eefd']} style={styles.GradientDiv}></LinearGradient>
            <View style={styles.whitePart}>
                <View style={styles.logoDiv}>
                    <Image resizeMode='contain' style={styles.LogoImage} source={{uri:"https://robotechvalley.com/app/logo.jpeg"}} />
                </View>
                <View>
                    <Text style={{textAlign:'left', color:'black',fontSize:25, paddingBottom:10}}>Contact us:</Text>
                    <Text style={{textAlign:'left', color:'gray',fontSize:20, paddingBottom:10}}>📧 info@i1class.com</Text>
                    <Text style={{textAlign:'left', color:'gray',fontSize:20, paddingBottom:10}}>☎ +880 1625******</Text>
                    <Text style={{textAlign:'left', color:'gray',fontSize:20, paddingBottom:10}}>🌎 Address: House: # Road: #, Dhaka, Bangladesh</Text>
                  


                </View>
                <View>
                    <Text style={{textAlign:'center', color:'black',fontSize:20}}>or Call Now...</Text>
                    <View style={styles.logoDiv}>
                        <Image resizeMode='contain' style={styles.LogoImage} source={{uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png"}} />
                </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    GradientDiv:{
        height:"100%",
        width:"100%"
    },
    whitePart:{
        height:500,
        width:'100%',
        backgroundColor:'white',
        marginTop:-200,
        zIndex:999,
        position:'absolute',
        bottom:0,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        padding:15
    },
    logoDiv:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center'

    },
    LogoImage:{
        height:70,
        width:70
    }
})

export default Contactus;
