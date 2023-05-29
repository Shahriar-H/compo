import React, { useState, useCallback, useRef,useEffect } from "react";
import { Button, View, Alert,StyleSheet, TouchableOpacity,  ScrollView,Text,Image,ActivityIndicator, Dimensions, RefreshControl } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faRotateForward, faRotateBackward,faVideo,faPlayCircle, faPauseCircle,faChevronLeft } from '@fortawesome/free-solid-svg-icons/'
import VideoItem from "./small_componants/VideoItem";
import Headercourse from "./small_componants/Headercourse";
import { APIURL } from "./lib/ApiCred";
import Modal from "./small_componants/Modal";


export default function Videoplay({state, dispatch}) {
  const navigation = useNavigation();
  const [playing, setPlaying] = useState(true);
  const [onErroris, setonErroris] = useState('');
  const [IsReady, setIsReady] = useState(false);
  const route = useRoute();
  const { videoId, userId, courseId } = route?.params;
  const playerRef = useRef(null);
  const [preDefined100, setpreDefined100] = useState(true);
  const [playListVideoId, setplayListVideoId] = useState(videoId);
  const [description, setdescription] = useState("");
  const [isRefreshing, setisRefreshing] = useState(false);
  const [numberOfVideo, setnumberOfVideo] = useState(null);
  

  //   if(!videoId){
  //     videoId = "kFUi3ikZFvk";
  //   }
  
  const API_KEY = 'AIzaSyAwfejwj7Zelv0ueKJgQ3eF92xwpVi2-Mw';
  const PLAYLIST_ID = videoId;

  const [videos, setVideos] = useState([]);
  const [firstVideo, setfirstVideo] = useState('');
  const [autoplayFalse, setautopalyFalse] = useState(true);
  const [seeAllVideos, setseeAllVideos] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [watchedId, setwatchedId] = useState([]);
  const focused = useIsFocused()
  const [isUserParticipatethis, setisUserParticipatethis] = useState(false);

  const refreshhandle = ()=>{
    setisRefreshing(true)
    fetchYTData()
    setTimeout(() => {
      setisRefreshing(false)
    }, 2000);
  }

  

  const fetchYTData = ()=>{
    setisLoading(true)
    fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${videoId}&key=${API_KEY}`)
      .then(response => response.json())
      .then((data) =>{
        setplayListVideoId(data?.items[0]?.snippet?.resourceId?.videoId)
        // console.log(data.items[0]);
        setfirstVideo(data?.items[0]?.snippet)
        setVideos(data?.items)
        
      })
      .catch(error => console.error(error))
      .finally(()=>{
        setisLoading(false)
      })
      
  }
  useEffect(() => {

    fetchYTData()
  }, []);

  useEffect(() => {
  
  }, [numberOfVideo]);
  
  useEffect(() => {
    setisLoading(true)
    setisUserParticipatethis(false)
    fetch(APIURL+'/checkenroll/'+courseId+"/"+userId)
    .then((res)=>res?.json())
    .then((result)=>{
      setwatchedId(JSON.parse(result?.result[0]?.no_of_class_done))
     
    })
    .catch((err)=>{
      console.log(err);
    })
    
    fetch(APIURL+'/quiz_checkuser/'+userId+"/"+courseId)
    .then((res)=>res?.json())
    .then((result)=>{
      // console.log(result?.status);
      if(result?.status===200){
        setisUserParticipatethis(true)
      }
      
    })
    .catch((err)=>{
      console.log(err);
    })
    .finally(()=>setisLoading(false))


    refreshhandle()
  }, [focused]);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
     
      watchedUpdate()
      setPlaying(false);
    }
  }, [numberOfVideo]);



  const nexVideo = (vid,details, videoNo)=>{
    console.log("videoNo"+videoNo);
    setnumberOfVideo(videoNo)
    setplayListVideoId(vid)
    setfirstVideo(details)
    setPlaying(true);
  }

  const watchedUpdate = ()=>{
    console.log("shaki: "+numberOfVideo);
    const newWachedArray = [...watchedId]
    console.log("number of vido:"+ numberOfVideo);
    if(!newWachedArray?.includes(numberOfVideo) && numberOfVideo){
        newWachedArray.push(numberOfVideo)
      
        fetch(APIURL+'/updatewatch/'+userId+"/"+courseId,{
          method:"POST",
          headers:{
            "Content-Type" : "application/json"
          },
          body:JSON.stringify(newWachedArray)
        })
        .then((res)=>res?.json())
        .then((result)=>{
        
          setwatchedId(newWachedArray)
         
          
        })
        .catch((err)=>{
          console.log(err);
        })
    }else{
      console.log("already watched");
    }
    
  
  
}

 

  

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const thePlayerIsReady = () => {
        setIsReady(true);
    };
  const onErrorHappen = () => {
        setonErroris(true);
    };

   

   const {width, height} = Dimensions.get('screen')

  return (
    <View style={{flex:1, position:'relative'}}>
        {/* <View style={styles.headerBack}>
          <FontAwesomeIcon icon={ faChevronLeft } color={'black'} size={20} />
        </View> */}
        <View>
            <Headercourse title={`Video`} routename={'Main'} />
        </View>
        {!IsReady&&
    
          <ActivityIndicator size="large" color="#0000ff" />

        }
        <View style={styles.container}>
            {videoId?
            <YoutubePlayer
                height={240}
                play={playing}
                ref={playerRef}
                videoId={playListVideoId}
                onChangeState={onStateChange}
                onReady={thePlayerIsReady}
                onError={(e)=>onErrorHappen}
                style={styles.youtubePlayer}
                color={'#00b7fe'}
               
            />:<YoutubePlayer
                height={240}
                play={playing}
                ref={playerRef}
                videoId="kFUi3ikZFvk"
                onChangeState={onStateChange}
                onReady={thePlayerIsReady}
                onError={(e)=>onErrorHappen}
                style={styles.youtubePlayer}
                color={'#00b7fe'}
            
            />
            }
            
        </View>
        
        
        <ScrollView refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refreshhandle} />} style={{...styles.scrollMainDiv}}>
          <TouchableOpacity onPress={()=>setpreDefined100((pre)=>!pre)} style={styles.descriptionPortion}>
                <Text style={styles.textDescrioTitle}>{firstVideo?.title}</Text>
                <View>
                  <Text style={styles.textDescrio}>
                 
                    {firstVideo?.description?.substring(0,preDefined100?100:10000000000)}
                    {
                      preDefined100?<Text style={{...styles.textDescrio,color:'black'}}>.... more</Text>:<><Text style={{...styles.textDescrio,color:'black'}}> see less</Text></>
                    }
                  </Text>
                  
                  
                </View>
          </TouchableOpacity>
            {/* Video 1 category wised */}
            <View style={{...styles.titleCSSDiv,marginBottom:10}}>
              <Text style={{...styles.titleCSS}}>Next Videos</Text>
              <Text onPress={watchedUpdate} style={{...styles.titleCSS}}></Text>
            </View>

            {/* VideoList from here */}
            {
              videos&&Array.isArray(videos)&&videos?.map((video,index)=>{
                return <VideoItem key={index} iswatched={watchedId?.includes(index+1)} serialno={index} video={video} nextvideo={nexVideo} state={state} dispatch={dispatch}/>
              })
            }
            
           
            
            <View style={{padding:10,height:100}}>
                <Text style={{textAlign:'center'}}>No More Videos</Text>
            </View>
        </ScrollView>
        {!isLoading && !isUserParticipatethis?<View style={styles.bottomBar}>
            <TouchableOpacity disabled={isLoading || !IsReady} delayPressIn={0} delayPressOut={0} onPress={()=>{
              setPlaying(false)
              navigation.navigate("Quiz",{courseId:courseId})
              
            }}>
              <Text style={{textAlign:'center',fontWeight:'bold',fontSize:15,color:'white'}}>Start Quiz</Text>
              <Text style={{textAlign:'center',fontSize:10}}>*Terms & condition applied</Text>
            </TouchableOpacity>
        </View>:!isLoading&&
        <View style={{...styles.bottomBar, backgroundColor:'gray'}}>
            <TouchableOpacity disabled={true} delayPressIn={0} delayPressOut={0}>
              <Text style={{textAlign:'center',fontWeight:'bold',fontSize:15,color:'white'}}>Already Participated</Text>
              <Text style={{textAlign:'center',fontSize:10}}>*Terms & condition applied</Text>
            </TouchableOpacity>
        </View>
        }
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
    
    
     
      overflow:'hidden',
      padding:0,
    
     
      
    },
    youtubePlayer: {
      alignSelf: 'stretch',
      borderRadius:5,
      borderColor:'green',
      borderWidth:3
    },
    skipContainer:{
        display:'flex',
        flexDirection:'row',
        marginBottom:5
    },
    skipButton:{
        backgroundColor:'#00b7fe',
        marginHorizontal:5,
        padding:5,
        borderRadius:4,

    },
    scrollMainDiv:{
      
        marginTop:0,
        padding:15,
        paddingTop:0,
    },
    bottomBar:{
      padding:0,
      width:'100%',
      backgroundColor:'rgb(46, 204, 113)',
      position:'absolute',
      bottom:0,
      borderTopRadius:10,
      paddingVertical:5,
      borderTopLeftRadius:10,
      borderTopRightRadius:10,
      height:50
      
    },
    headerBack:{
      backgroundColor:'white'
    },
    titleCSSDiv:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center'
    },
    descriptionPortion:{
      paddingVertical:10,
      marginBottom:30
    },
    textDescrio:{
      fontSize:15,
      textAlign:'justify',
      color:'rgba(0,0,0,0.6)',
      lineHeight:23,
      fontWeight:400
    },
    textDescrioTitle:{
      fontSize:20,
      fontWeight:600,
      marginBottom:10,
      color:'rgba(0,0,0,0.8)',
    }
    
  });