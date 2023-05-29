import { useNavigation, useRoute } from '@react-navigation/native';
import React,{ useState,useEffect} from 'react';
import {View, StyleSheet,Image,Text,TouchableOpacity,ScrollView, RefreshControl, StatusBar} from 'react-native';
import Headercourse from '../small_componants/Headercourse';
import { APIURL, PHOTOURL } from '../lib/ApiCred';


const PaidcourseList = ({state}) => {
    const navigation = useNavigation();
    const route = useRoute();
    const [refreshing, setRefreshing] = useState(false);
    const { name,returnPath,status } = route?.params;
    const [freeCourses, setfreeCourses] = useState([]);
    const [isLoadding, setisLoadding] = useState(false);
    const fetchData = ()=>{
        setisLoadding(true)
        fetch(APIURL+'/course/'+state?.user?.category,{
            method:"POST",
            headers:{
                "Content-Type" : "application/json",
                "Authorization":state?.token
            },
        })
        .then((res)=>res.json())
        .then((result)=>{
            
            const freeC=[]
            result?.result?.map((course)=>{
                if(course?.course_type?.indexOf(status)!==-1){
                    freeC.push(course)
                }
                
            })
            setfreeCourses(freeC)
          
            setisLoadding(false)
           
        })
    }

    const handleRefresh = () => {
        setRefreshing(true);
        // fetch new data here
        fetchData()
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
    };

    useEffect(() => {
        fetchData()
    }, []);
    useEffect(() => {
        fetchData()
    }, [status]);
    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />} style={styles.container}>
            
            <View>
                <Headercourse title={`${name}`} routename={returnPath} />
            </View>
            <View style={styles.containerInner}>
                {isLoadding?
                <View style={styles.coursecontainer}>
                    <View style={{...styles.Imagecontainer1, minHeight:250, overflow:'hidden'}}>
                        <Image resizeMode='cover' style={{...styles.CoverImage, height:250, width:'100%'}} source={require("../Images/videoskal.gif")} />
                    </View>
                    <View style={{...styles.Imagecontainer1, minHeight:250, overflow:'hidden'}}>
                        <Image resizeMode='cover' style={{...styles.CoverImage, height:250}} source={require("../Images/videoskal.gif")} />
                    </View>
                    <View style={{...styles.Imagecontainer1, minHeight:250, overflow:'hidden'}}>
                        <Image resizeMode='cover' style={{...styles.CoverImage, height:250}} source={require("../Images/videoskal.gif")} />
                    </View>
                    <View style={{...styles.Imagecontainer1, minHeight:250, overflow:'hidden'}}>
                        <Image resizeMode='cover' style={{...styles.CoverImage, height:250}} source={require("../Images/videoskal.gif")} />
                    </View>
                    <View style={{...styles.Imagecontainer1, minHeight:250, overflow:'hidden'}}>
                        <Image resizeMode='cover' style={{...styles.CoverImage, height:250}} source={require("../Images/videoskal.gif")} />
                    </View>
                    <View style={{...styles.Imagecontainer1, minHeight:250, overflow:'hidden'}}>
                        <Image resizeMode='cover' style={{...styles.CoverImage, height:250}} source={require("../Images/videoskal.gif")} />
                    </View>
                </View>:
                <View style={styles.coursecontainer}>
                    {freeCourses && Array.isArray(freeCourses) && freeCourses?.map((course,i)=>{

                        return <View key={i} style={styles.Imagecontainer}>
                        <Image resizeMode='contain' style={styles.CoverImage} source={{uri:PHOTOURL+course?.cover_photo}} />

                        <View style={{paddingBottom:10}}>
                            <Text style={styles.CourseTitle}>{course?.title}</Text>
                            <Text style={styles.colorGray}>Total Class: 22</Text>

                            <Text style={styles.colorGray}>Enrolled: {course?.enroll}</Text>
                            {/* <Text style={{color:'green',fontSize:15,fontWeight:'bold'}}>{course?.price==0?"Free":"৳"+course?.price}</Text> */}
                        </View>
                        {
                            // <TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={()=>navigation.navigate("Checkout",{returnPath,courseInfo:{
                            //     name:"Web Design and Development",
                            //     price:12000
                            // }})} style={styles.enrollBtn}>
                            //     <Text style={styles.butnTxt}>Click Here To Enroll</Text>
                            // </TouchableOpacity>
                            <View style={styles.checkOutCon}>
                                <Text style={{color:'#00b1fb',fontSize:16,fontWeight:'bold'}}>{course?.price==0?"Free":"৳"+course?.price}</Text>
                                <TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={()=>navigation.navigate("Webview",{courseId:course?.id})} style={styles.enrollBtn}>
                                    <Text style={styles.butnTxt}>Enroll Now</Text>
                                </TouchableOpacity>
                            </View>
                        }
                        </View>
                    })
                    }
                </View>
                }
                

                
                <View style={{height:50}}></View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
       paddingBottom:20
    },
    containerInner:{
        paddingHorizontal:15
    },
    coursecontainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        flexWrap:'wrap'
    },
    Imagecontainer:{
        padding:15,
        backgroundColor:'white',
        borderRadius:13,
        shadowColor:'gray',
        elevation:3,
        minHeight:270,
        width:'48%',
        position:'relative',
        borderWidth:1,
        borderColor:'#00b1fa',
        marginVertical:5
    },
    CoverImage:{
        width:80,
        height:80,
        borderRadius:8
    },
    CourseTitle:{
        fontSize:14,
        color:"rgba(0,0,0,0.7)",
        fontWeight:600,
        marginVertical:10,

    },
    enrollBtn:{
        padding:5,
        backgroundColor:'black',
        borderRadius:6,

    },
    butnTxt:{
        color:'white',
        textAlign:'center',
        fontSize:13
    },
    checkOutCon:{
        paddingTop:10,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        position:'absolute',
        bottom:10,
        width:'100%',
        left:20

    },
    colorGray:{
        color:'rgba(0,0,0,0.5)'
    },
    Imagecontainer1:{
        padding:15,
        backgroundColor:'white',
        borderRadius:13,
        shadowColor:'gray',
        elevation:3,
        minHeight:270,
        width:'48%',
        position:'relative',
        marginVertical:5
    },
})

export default PaidcourseList;
