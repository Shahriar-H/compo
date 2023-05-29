import React from 'react';
import {View, StyleSheet,Image,Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


const Sharewith = () => {
    return (
        <View style={{position:'relative'}}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#00b1fd','#00eefd']} style={styles.GradientDiv}></LinearGradient>
            <View style={styles.whitePart}>
                <View style={styles.logoDiv}>
                    <Image resizeMode='contain' style={styles.LogoImage} source={{uri:"https://robotechvalley.com/app/logo.jpeg"}} />
                </View>
                <View>
                    <Text style={{textAlign:'center', color:'black',fontSize:20}}>Share the app to your friend</Text>
                    <View style={styles.logoDiv}>
                        <Image resizeMode='contain' style={styles.LogoImage} source={{uri:"https://thedailyguardian.com/wp-content/uploads/2022/09/popular-social-media-icons_248162-157.jpg"}} />
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
        borderTopRightRadius:20
    },
    logoDiv:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center'

    },
    LogoImage:{
        height:200,
        width:200
    }
})

export default Sharewith;
