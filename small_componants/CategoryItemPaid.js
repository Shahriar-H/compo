import React from 'react';
import {View, StyleSheet,Text,Image,TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const CategoryItemPaid = ({info}) => {
    const navigation = useNavigation();
    
    return (
        <View>
            <TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={()=>navigation.navigate(info?.path,{name:info?.name,returnPath:info?.returnPath})} style={{marginBottom:20}}>
                {/* <View style={styles.titleOfDiv}>
                   
                    <Text style={styles.titleOfCat}>{info?.name}</Text>
                </View> */}
                
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#00b1fd','#00eefd']} style={styles.CategoryDiv}>
                    <View style={{paddingHorizontal:10,width:'50%'}}>
                        <Text style={{fontSize:14}}>Watch Our</Text>
                        <Text style={{color:'white', fontWeight:'bold',fontSize:25}}>Premium</Text>
                        <Text style={{fontSize:17}}>Course</Text>
                        
                    </View>
                    <View style={styles.mainImageDiv}>
                        <View style={{...styles.imageDiv,justifyContent:'flex-end'}}>
                            <Image style={styles.frontImage} source={{uri:"https://robotechvalley.com/app/paid.png"}} />
                        </View>
                    </View>
                    
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    mainTitle:{
        fontSize:20,
        fontWeight:'bold',
        marginLeft:10
    },
    CoverImage:{
        width:200,
        height:120
    },
    titlename:{
        fontSize:20,
        fontWeight:600,

    },
    videoBox:{
        padding:10
    },
    catBox:{
        height:80,
        width:85,
        backgroundColor:'#00b7fe',
        borderRadius:4,
        shadowColor:'gray',
        elevation:2,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        margin:5
    },
    categoryContainer:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-evenly',
        
    },
    textOfClass:{
        textAlign:'center',
        marginTop:5
    },
    headerPortion:{
        marginBottom:10,
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    },
    CategoryDiv:{
        padding:10,
        paddingHorizontal:25,
        borderRadius:19,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        
        overflow:'hidden'
    },
    mainImageDiv:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        width:'50%',
    },
    frontImage:{
        width:130,
        height:95,
    },
    imageDiv:{
        backgroundColor:'white',
        borderRadius:10,
        padding:5,
        shadowColor:'black',
        elevation:4
    },
    titleOfCat:{
        paddingBottom:5,
        fontSize:20,
        fontWeight:'bold',
        paddingLeft:10,
        color:'rgba(0,0,0,0.7)'
    },
    catContainer:{
        marginTop:15
    },
    titleOfDiv:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    }
})

export default CategoryItemPaid;
