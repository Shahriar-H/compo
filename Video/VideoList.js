import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image,StyleSheet, Alert, } from 'react-native';

import { Pressable,Button,Divider, AppBar, IconButton, TextInput   } from "@react-native-material/core";

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VideoList = ({data:playlist,refreshData}) => {
  const API_KEY = 'AIzaSyAwfejwj7Zelv0ueKJgQ3eF92xwpVi2-Mw';
  const PLAYLIST_ID = 'PLJQuiFAnzuB-0V766Fw7o85U2yrb6ptQ-';
  const navigation = useNavigation()
  const [videos, setVideos] = useState([]);
  const [firstVideo, setfirstVideo] = useState('');
  const [autoplayFalse, setautopalyFalse] = useState(true);
  const [seeAllVideos, setseeAllVideos] = useState(false);
  
  

  useEffect(() => {
    // console.log(data?.link);
    fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=25&playlistId=${PLAYLIST_ID}&key=${API_KEY}`)
      .then(response => response.json())
      .then((data) =>{
        setfirstVideo(data?.items[0]?.snippet)
        // console.log(data.items[0]?.snippet);
        setVideos(data?.items)
      })
      .catch(error => console.error(error));
  }, []);

 



  

  return (
  <View>
        {/* <Video id={firstVideo}/> */}
        <Pressable  onLongPress={()=>showAlert("Are sure to delete?",PLAYLIST_ID)} onPress={()=>navigation.push("Videos",{playlistId:PLAYLIST_ID})}>
            <VideoCard
                key={PLAYLIST_ID}
                vid={'https://youtube.com/playlist?list='+PLAYLIST_ID}
                thumbnailUrl={firstVideo?.thumbnails?.default?.url || "https://t4.ftcdn.net/jpg/05/17/53/57/240_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg"}
                title={firstVideo?.title}
                channelTitle={firstVideo?.channelTitle}
                publishedAt={firstVideo?.publishedAt}
            />
        </Pressable>
        
        <Divider style={{ marginTop:5 }} leadingInset={16} />

        
        
       
        
    </View>
  );
};

const styles = StyleSheet.create({
    listOfVideo:{
        display:'flex',
        flexDirection:'row',
        paddingBottom:10,
        borderBottomColor:'rgba(0,0,0,0.2)',
        borderBottomWidth:1,
        marginBottom:10,
        alignItems:'center'
        
    },
    
})

export default VideoList;
