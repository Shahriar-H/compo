import React,{useEffect,useState} from 'react';
import {View, StyleSheet,ScrollView,Text,TouchableOpacity,Image, RefreshControl,Dimensions } from 'react-native';
import Header from './small_componants/Header';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserCircle,fa1,fa9,faH,faRocket, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons/'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { APIURL, getData,PHOTOURL } from './lib/ApiCred';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
const Index = ({state, dispatch}) => {
    const [refreshing, setRefreshing] = useState(false);
    const [subjects, setsubjects] = useState([]);
    const [courses, setcourses] = useState([]);
    const [freeCourses, setfreeCourses] = useState([]);
    const [RecordedCourse, setRecordedCourse] = useState([]);
    const [LiveCourse, setLiveCourse] = useState([]);
    const [isLoadding, setisLoadding] = useState(false);
    const [isLoaddingCourse, setisLoaddingCourse] = useState(false);
    const iconArray = ['book.jpeg','sumition.jpeg','react.jpeg']
    const navigation = useNavigation();
    const isFocust = useIsFocused()
    const [isSubjectset, setisSubjectset] = useState(null);
    const {width} = Dimensions.get("screen")
    

    const fetchData = ()=>{
        setisLoadding(true)
        setisLoaddingCourse(true)
        fetch(APIURL+'/subjects')
        .then((res)=>res.json())
        .then((result)=>{
            setsubjects(result?.result)
           
            setisLoadding(false)
         
        })
        fetch(APIURL+'/course/'+state?.user?.category,{
            method:"POST",
            headers:{
                "Content-Type" : "application/json",
                "Authorization":state?.token
            },
            body:JSON.stringify({class:parseInt(state?.user?.class), division:state?.user?.division})
        })
        .then((res)=>res.json())
        .then((result)=>{
            setcourses(result?.result)

            const freeC=[]
            const recorededC=[]
            const LiveC=[]
            result?.result?.map((course)=>{
                if(course?.course_type?.indexOf('Free')!==-1){
                    freeC.push(course)
                }
                if(course?.course_type?.indexOf('Recorded')!==-1){
                    recorededC.push(course)
                }
                if(course?.course_type?.indexOf('Live')!==-1){
                    LiveC.push(course)
                }
            })
            setfreeCourses(freeC)
            setRecordedCourse(recorededC)
            setLiveCourse(LiveC)
            setisLoaddingCourse(false)
           
        })
    }

    const PeacefetchData = ()=>{
       
        
        fetch(APIURL+'/subjects')
        .then((res)=>res.json())
        .then((result)=>{
            setsubjects(result?.result)
           
            
         
        })
        fetch(APIURL+'/course/'+state?.user?.category,{
            method:"POST",
            headers:{
                "Content-Type" : "application/json",
                "Authorization":state?.token
            },
            body:JSON.stringify({class:parseInt(state?.user?.class), division:state?.user?.division})
        })
        .then((res)=>res.json())
        .then((result)=>{
            setcourses(result?.result)

            const freeC=[]
            const recorededC=[]
            const LiveC=[]
            result?.result?.map((course)=>{
                if(course?.course_type?.indexOf('Free')!==-1){
                    freeC.push(course)
                }
                if(course?.course_type?.indexOf('Recorded')!==-1){
                    recorededC.push(course)
                }
                if(course?.course_type?.indexOf('Live')!==-1){
                    LiveC.push(course)
                }
            })
            setfreeCourses(freeC)
            setRecordedCourse(recorededC)
            setLiveCourse(LiveC)
           
           
        })
    }

    useEffect(() => {
        fetchData()
    }, []);

    

    useEffect(() => {
  
        PeacefetchData()
    }, [isFocust]);

    const handleRefresh = () => {
        setRefreshing(true);
        // fetch new data here
        setisSubjectset(null)
        fetchData()
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
    };
    if(isLoadding || isLoaddingCourse){
        return <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />} style={{backgroundColor:'white', height:'100%'}}>
            <Header state={state} dispatch={dispatch}/>
            <View style={{padding:0, margin:0}}>
                        <View delayPressIn={0} delayPressOut={0} style={{...styles.videoBox1}}>
                            <Image resizeMode='stretch' style={{height:300, width:'100%'}} source={require("./Images/videoskal.gif")} />
                        </View>
                        <View delayPressIn={0} delayPressOut={0} style={{...styles.videoBox1}}>
                            <Image resizeMode='stretch' style={{height:300, width:'100%'}} source={require("./Images/videoskal.gif")} />
                        </View>
                        <View delayPressIn={0} delayPressOut={0} style={{...styles.videoBox1}}>
                            <Image resizeMode='stretch' style={{height:300, width:'100%'}} source={require("./Images/videoskal.gif")} />
                        </View>
                        
                        
                </View>
        </ScrollView>
    }

    if(freeCourses?.length===0 && RecordedCourse?.length===0 && LiveCourse?.length===0){
        PeacefetchData()
        return <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
            <Header state={state} dispatch={dispatch}/>
            <View style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <View>
                    <Image style={{height:300, width:300}} source={{uri:"https://cdn.dribbble.com/users/683081/screenshots/2728654/exfuse_app_main_nocontent.png"}}/>
                    <Text style={{textAlign:'center', color:'black'}}>Failed to load the content</Text>
                    <Text style={{textAlign:'center', color:'#00b1fd'}}>Swipe Down to Reload</Text>
                    
                </View>
                
            </View>
            
        </ScrollView>
    }

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
            {/* Header */}
            <Header state={state} dispatch={dispatch}/>
            {/* Feature content 1 */}
            {/* <View style={{height:40}}>

            </View> */}
            {!isLoadding&&
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryContainer}>
                {
                    subjects && Array?.isArray(subjects) && subjects?.map((subject,index)=>{
                        const randomNumber = Math.floor(Math.random() * 3);
                        if(subject?.class==state?.user?.class && subject?.division===state?.user?.division){
                        return <TouchableOpacity key={index} delayPressIn={0} delayPressOut={0} style={styles.catBox} onPress={()=>setisSubjectset((prev)=>subject?.name===prev?null:subject?.name)}>
                            <Image style={styles.Sidephoto} source={{uri:"https://robotechvalley.com/app/"+iconArray[randomNumber]}} />
                            <Text style={styles.textOfClass}>{subject?.name}</Text>
                            {subject?.name===isSubjectset&& <FontAwesomeIcon icon={ faTimes } color={'red'} size={20} />}
                        </TouchableOpacity>
                        }
                    })
                }
               
            </ScrollView>
            }
            

            {/*Free Features here kFUi3ikZFvk */}
            {freeCourses?.length!==0&&
            <View>
                <View style={{height:7}}></View>
                <View style={styles.headerPortion}>
                    <Text style={styles.mainTitle}>Free Courses</Text>
                    <TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={()=>navigation.navigate("Paidcourse",{name:'Free Courses',returnPath:'Main', status:'Free'})}>
                        <Text style={styles.more}>More</Text>
                        
                    </TouchableOpacity>  
                </View>
                {
                <View style={{width:width, backgroundColor:'white'}}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{...styles.feature1}}>
                        {//'Videoplay',{videoId:course?.playlist}
                            freeCourses && Array?.isArray(freeCourses) && freeCourses?.map((course, index)=>{
                                if(isSubjectset){
                                    if(isSubjectset===course?.subject){
                                        return <TouchableOpacity key={index} delayPressIn={0} delayPressOut={0} onPress={()=>navigation.navigate('Webview',{courseId:course?.id})} style={styles.videoBox}>
                                            <Image style={styles.CoverImage} source={{uri:PHOTOURL+course?.cover_photo}} />
                                            <Text style={styles.titlename}>{course?.title?.substr(0,22)}...</Text>
                                            <Text style={{color:'#00b1fd', fontWeight:'bold'}}>৳ {course?.price==0?'Free':course?.price}</Text>
                                        </TouchableOpacity>
                                    }else{
                                        <Text style={{color:'#00b1fd', fontWeight:'bold'}}>Not found</Text>
                                    }
                                }else{
                                    return <TouchableOpacity key={index} delayPressIn={0} delayPressOut={0} onPress={()=>navigation.navigate('Webview',{courseId:course?.id})} style={styles.videoBox}>
                                    <Image style={styles.CoverImage} source={{uri:PHOTOURL+course?.cover_photo}} />
                                    <Text style={styles.titlename}>{course?.title?.substr(0,22)}...</Text>
                                    <Text style={{color:'#00b1fd', fontWeight:'bold'}}>৳ {course?.price==0?'Free':course?.price}</Text>
                                    </TouchableOpacity>
                                }
                            })
                        }
                </ScrollView>
                </View>
                }
            </View>
            }

            {RecordedCourse?.length!==0&&
            <View>
                <View style={{height:10}}></View>
                <View style={styles.headerPortion}>
                    <Text style={styles.mainTitle}>Recorded Courses</Text>
                    <TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={()=>navigation.navigate("Paidcourse",{name:'Recorder Courses',returnPath:'Main', status:'Recorded'})}>
                        <Text style={styles.more}>More</Text>
                        
                    </TouchableOpacity>  
                </View>

                {/* Features here kFUi3ikZFvk */}
                
                {
                <View style={{width:width, backgroundColor:'white'}}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.feature1}>
                        {
                            RecordedCourse && Array?.isArray(RecordedCourse) && RecordedCourse?.map((course, index)=>{
                                if(isSubjectset){
                                    if(isSubjectset===course?.subject){
                                        return <TouchableOpacity key={index} delayPressIn={0} delayPressOut={0} onPress={()=>navigation.navigate('Webview',{courseId:course?.id})} style={styles.videoBox}>
                                            <Image style={styles.CoverImage} source={{uri:PHOTOURL+course?.cover_photo}} />
                                            <Text style={styles.titlename}>{course?.title?.substr(0,22)}..</Text>
                                            <Text style={{color:'#00b1fd', fontWeight:'bold'}}>৳ {course?.price==0?'Free':course?.price}</Text>
                                        </TouchableOpacity>
                                    }
                                }else{
                                    return <TouchableOpacity key={index} delayPressIn={0} delayPressOut={0} onPress={()=>navigation.navigate('Webview',{courseId:course?.id})} style={styles.videoBox}>
                                    <Image style={styles.CoverImage} source={{uri:PHOTOURL+course?.cover_photo}} />
                                    <Text style={styles.titlename}>{course?.title?.substr(0,22)}...</Text>
                                    <Text style={{color:'#00b1fd', fontWeight:'bold'}}>৳ {course?.price==0?'Free':course?.price}</Text>
                                    </TouchableOpacity>
                                }
                            })
                        }
                </ScrollView>
                </View>
                }
            </View>
            }

            {LiveCourse?.length!==0&&
            <View>
                <View style={{height:10}}></View>
                <View style={styles.headerPortion}>
                    <Text style={styles.mainTitle}>Live Courses</Text>
                    <TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={()=>navigation.navigate("Paidcourse",{name:'Live Courses',returnPath:'Main', status:'Live'})}>
                        <Text style={styles.more}>More</Text>
                        
                    </TouchableOpacity>  
                </View>

                {/* Features here kFUi3ikZFvk */}
                
                {<View style={{width:width, backgroundColor:'white'}}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.feature1}>
                        {
                            LiveCourse && Array?.isArray(LiveCourse) && LiveCourse?.map((course, index)=>{
                                if(isSubjectset){
                                    if(isSubjectset===course?.subject){
                                        return <TouchableOpacity key={index} delayPressIn={0} delayPressOut={0} onPress={()=>navigation.navigate('Webview',{courseId:course?.id})} style={styles.videoBox}>
                                            <Image style={styles.CoverImage} source={{uri:PHOTOURL+course?.cover_photo}} />
                                            <Text style={styles.titlename}>{course?.title?.substr(0,22)}...</Text>
                                            <Text style={{color:'#00b1fd', fontWeight:'bold'}}>৳ {course?.price==0?'Free':course?.price}</Text>
                                        </TouchableOpacity>
                                    }
                                }else{
                                    return <TouchableOpacity key={index} delayPressIn={0} delayPressOut={0} onPress={()=>navigation.navigate('Webview',{courseId:course?.id})} style={styles.videoBox}>
                                    <Image style={styles.CoverImage} source={{uri:PHOTOURL+course?.cover_photo}} />
                                    <Text style={styles.titlename}>{course?.title.substr(0,22)}...</Text>
                                    <Text style={{color:'#00b1fd', fontWeight:'bold'}}>৳ {course?.price==0?'Free':course?.price}</Text>
                                    </TouchableOpacity>
                                }
                            })
                        }
                </ScrollView>
                </View>
                }
            </View>
            }



            {/* <View style={{height:10}}>

            </View> */}
            

           



           
           



            {/* Popular 4 Category */}

            
            
            {/* <View style={{height:20}}></View> */}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    feature1:{
        backgroundColor:'white',
        padding:10,
        height:190,
        shadowColor:'gray',
        elevation:2,
        display:'flex',
        flexDirection:'row',
        // width:'100%',
        paddingLeft:15,
        paddingTop:0
    },
    headerPortion:{
        marginTop:0,
        paddingHorizontal:16,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'white',
        paddingTop:20,
        paddingLeft:25,
        paddingBottom:0
    },
    more:{
        fontSize:15,
        color:'#00b1fd',
        fontWeight:'bold',
       
        paddingRight:0
    },
    mainTitle:{
        fontSize:18,
        fontWeight:600,
        color:'rgba(0,0,0,0.8)',
        
    },
    CoverImage:{
        width:200,
        height:120,
        borderRadius:6,
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)'
    },
    titlename:{
        fontSize:15,
        fontWeight:600,
        marginTop:10,
        color:'rgba(0,0,0,0.7)',
        marginBottom:0
    },
    videoBox:{
        padding:10,
        miWidth:220,
        paddingBottom:20
    },
    catBox:{
        height:60,
        minWidth:85,
        backgroundColor:'#fff',
        borderRadius:4,
        shadowColor:'gray',
        elevation:2,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        margin:5,
        paddingHorizontal:15,
        flexDirection:'row'
    },
    categoryContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:7
    },
    videoBox1:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        
    },
    textOfClass:{
        textAlign:'center',
        marginTop:5,
        color:'#00b7fe',
        fontWeight:'bold'
    },
    Sidephoto:{
        height:40,
        width:40,
        marginRight:5
    },
    imageSkatch:{
        height:40,
        width:40,
        borderRadius:100,
        backgroundColor:'rgba(0,0,0,0.1)'
    },
    TextSkatch:{
        height:40,
        width:100,
        borderRadius:3,
        backgroundColor:'rgba(0,0,0,0.1)',
        marginLeft:5
    }
})

export default Index;
