import React from 'react';
import {View, StyleSheet,Text,Image,TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const CategoryItem = ({info}) => {
    const navigation = useNavigation();
    
    return (
        <View>
            <TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={()=>navigation.navigate(info?.path,{name:info?.name,returnPath:info?.returnPath})} style={{marginBottom:20}}>
                {/* <View style={styles.titleOfDiv}>
                   
                    <Text style={styles.titleOfCat}>{info?.name}</Text>
                </View> */}
                
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#00b1fd','#00eefd']} style={styles.CategoryDiv}>
                    <View style={styles.imageDiv}>
                        <Image style={styles.frontImage} source={{uri:"https://cdn.dribbble.com/users/4214751/screenshots/10503785/website_vec_2-01_4x.png"}} />
                    </View>
                    <View style={{paddingHorizontal:10,width:'50%'}}>
                        <Text style={{color:'yellow', fontWeight:'bold',fontSize:30}}>Free</Text>
                        <Text style={{fontSize:17}}>click to learn</Text>
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
    frontImage:{
        width:130,
        height:95,
    },
    imageDiv:{
        backgroundColor:'white',
        borderRadius:10,
        padding:5,
        shadowColor:'black',
        elevation:4,
        width:'50%'
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

export default CategoryItem;
