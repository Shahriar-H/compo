import React from 'react';
import {View, StyleSheet,Text,TouchableOpacity,Image, Dimensions} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faRotateForward, faRotateBackward,faVideo,faPlayCircle, faPauseCircle } from '@fortawesome/free-solid-svg-icons/'

const VideoItem = ({iswatched,serialno,video,nextvideo, state, dispatch}) => {
    const {width, height} = Dimensions.get('window')
    const nextvideoidset = (id, details,serialno)=>{
        dispatch({type:'Video', payload:id})
        nextvideo(id,details, serialno+1)
    }
    return (
        <View>
            <TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={()=>nextvideoidset(video?.snippet?.resourceId?.videoId,video?.snippet,serialno)} style={styles.singleListOfVideo}>
                
                <View style={{...styles.coverTitleIDv}}>
                    <Image style={{...styles.CoverImage,width:90}} source={{uri:video?.snippet?.thumbnails?.default?.url}} />
                    <View style={{...styles.titleDetails,width:width-140}}>
                        <Text style={{...styles.titleCSS,color:video?.snippet?.resourceId?.videoId===state?.initialVideo?'#e66042':'black'}}>{serialno+1}. {video?.snippet?.title} {iswatched&&"✔"}</Text>
                        {/* <Text>10:12 Minute</Text> */}
                    </View>
                </View>
                {/* <View>
                    {video?.snippet?.resourceId?.videoId===state?.initialVideo&&
                    <FontAwesomeIcon icon={ faPauseCircle } color={'#00b7fe'} size={20} />
                    }
                </View> */}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    singleListOfVideo:{
        display:'flex',
        flexDirection:'row',
        backgroundColor:'rgba(255,255,255,1)',
        paddingVertical:15,
        paddingHorizontal:15,
        borderBottomColor:'rgba(0,0,0,0.1)',
        borderBottomWidth:1,
        borderRadius:5,
        shadowColor:'rgba(0,0,0,0.1)',
        elevation:5,
        marginBottom:10,
        justifyContent:'space-between'
    },
    titleDetails:{
        paddingLeft:15
    },
    titleCSS:{
        fontSize:14,
        fontWeight:'bold',
        color:'rgba(0,0,0,0.7)',
    },
    CoverImage:{
        height:60,
        borderRadius:5
    },
    coverTitleIDv:{
        display:'flex',
        
        flexDirection:'row'
    }
})

export default VideoItem;
