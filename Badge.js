import React,{useEffect} from 'react';
import {View, StyleSheet,Image,Text, ScrollView} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft,faCheck,faTimes, faChevronRight } from '@fortawesome/free-solid-svg-icons/'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons';


const Badge = ({state}) => {
    useEffect(() => {
      
    }, []);
    return (
        <ScrollView>
            <View style={styles.emptybadgeDiv}>
                <View style={styles.noBadges}>
                    <View style={styles.noBadgesImage}>
                        <Image style={styles.bagEmptyImage} source={{uri:"https://robotechvalley.com/app/badge.jpeg"}} />
                    </View>
                    <Text style={{textAlign:'center',color:'black',fontWeight:'bold',fontSize:30}}>{state?.user?.points}</Text>
                    <View style={styles.badgetik}>
                        <Text style={{textAlign:'center',fontSize:17, paddingRight:6}}>My Earned Points</Text>
                        <FontAwesomeIcon icon={ faCheckCircle } color={'green'} size={16} />
                    </View>
                    
                </View>
            </View>

            <View style={styles.badesRom}>
                <Text style={{color:'gray',fontWeight:'bold',fontSize:18}}>Test Completed</Text>
                <View style={styles.badgesShowsDiv}>
                    <View style={styles.singleBadge}>
                        <View style={styles.tikmark}>
                            {
                                state?.user?.points>=100?
                                <FontAwesomeIcon icon={ faCheckCircle } color={'green'} size={16} />:
                                <FontAwesomeIcon icon={ faTimesCircle } color={'red'} size={16} />
                            }
                            
                        </View>
                        <View style={{...styles.noBadgesImage, opacity:state?.user?.points>=100?1:0.4}}>
                            <Image style={styles.badgeIcon} source={{uri:"https://robotechvalley.com/app/tiger.png"}} />
                        </View>
                        <Text style={{textAlign:'center',color:'black',fontWeight:'bold',fontSize:15}}>Go Tiger</Text>
                        <Text style={{textAlign:'center',fontSize:14}}>100 Points</Text>
                    </View>
                    <View style={styles.singleBadge}>
                        <View style={styles.tikmark}>
                            {
                                state?.user?.points>=500?
                                <FontAwesomeIcon icon={ faCheckCircle } color={'green'} size={16} />:
                                <FontAwesomeIcon icon={ faTimesCircle } color={'red'} size={16} />
                            }
                            
                        </View>
                        <View style={{...styles.noBadgesImage, opacity:state?.user?.points>=100?1:0.4}}>
                            <Image style={styles.badgeIcon} source={{uri:"https://robotechvalley.com/app/tiger.png"}} />
                        </View>
                        <Text style={{textAlign:'center',color:'black',fontWeight:'bold',fontSize:15}}>Tiger-ii</Text>
                        <Text style={{textAlign:'center',fontSize:14}}>500 Points</Text>
                    </View>
                    <View style={styles.singleBadge}>
                        <View style={styles.tikmark}>
                            {
                                state?.user?.points>=500?
                                <FontAwesomeIcon icon={ faCheckCircle } color={'green'} size={16} />:
                                <FontAwesomeIcon icon={ faTimesCircle } color={'red'} size={16} />
                            }
                            
                        </View>
                        <View style={{...styles.noBadgesImage, opacity:state?.user?.points>=100?1:0.4}}>
                            <Image style={styles.badgeIcon} source={{uri:"https://robotechvalley.com/app/tiger.png"}} />
                        </View>
                        <Text style={{textAlign:'center',color:'black',fontWeight:'bold',fontSize:15}}>Tiger Top</Text>
                        <Text style={{textAlign:'center',fontSize:14}}>1000 Points</Text>
                    </View>
                </View>
            </View>

            <View style={styles.badesRom}>
                <Text style={{color:'gray',fontWeight:'bold',fontSize:18}}>Mile Folok</Text>
                <View style={styles.badgesShowsDiv}>
                    <View style={styles.singleBadge}>
                        <View style={styles.noBadgesImage}>
                            <Image style={styles.badgeIcon} source={{uri:"https://robotechvalley.com/app/mile.png"}} />
                        </View>
                        <Text style={{textAlign:'center',color:'black',fontWeight:'bold',fontSize:15}}>Beginner</Text>
                        <Text style={{textAlign:'center',fontSize:14}}>250 Points</Text>
                    </View>
                    <View style={styles.singleBadge}>
                        <View style={styles.noBadgesImage}>
                            <Image style={styles.badgeIcon} source={{uri:"https://robotechvalley.com/app/mile.png"}} />
                        </View>
                        <Text style={{textAlign:'center',color:'black',fontWeight:'bold',fontSize:15}}>Intermediate</Text>
                        <Text style={{textAlign:'center',fontSize:14}}>500 Points</Text>
                    </View>
                    <View style={styles.singleBadge}>
                        <View style={styles.noBadgesImage}>
                            <Image style={styles.badgeIcon} source={{uri:"https://robotechvalley.com/app/mile.png"}} />
                        </View>
                        <Text style={{textAlign:'center',color:'black',fontWeight:'bold',fontSize:15}}>Advanched</Text>
                        <Text style={{textAlign:'center',fontSize:14}}>1000 Points</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    noBadges:{
        backgroundColor:'white',
        shadowColor:'gray',
        elevation:4,
        width:'80%',
        padding:15,
        marginTop:30,
        overflow:'hidden',
        paddingTop:20,
        paddingVertical:30,
        borderRadius:18,
    },
    emptybadgeDiv:{
        display:'flex',
        justifyContent:'center',
        flexDirection:'row'
    },
    badgetik:{
        display:'flex',
        justifyContent:'center',
        flexDirection:'row',
        alignItems:'center'
    },
    bagEmptyImage:{
        height:100,
        width:100,
    },
    noBadgesImage:{
        display:'flex',
        justifyContent:'center',
        flexDirection:'row',
    },
    badesRom:{
        padding:15
    },
    badgesShowsDiv:{
        display:'flex',
        justifyContent:'center',
        flexDirection:'row',
       
        marginTop:20
    },
    singleBadge:{
        backgroundColor:'white',
        width:115,
        padding:10,
        paddingVertical:20,
        borderRadius:10,
        margin:4
    },
    badgeIcon:{
        width:70,
        height:70,

    },
    tikmark:{
        position:'absolute',
        top:10,
        right:10,
    }
})

export default Badge;
