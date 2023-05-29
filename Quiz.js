import React,{useState, useEffect, useRef} from 'react';
import {View, StyleSheet,TouchableOpacity,Text, Button,Animated, Easing, ActivityIndicator,  ScrollView, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft,faCheck,faTimes, faChevronRight } from '@fortawesome/free-solid-svg-icons/'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import * as Animatable from "react-native-animatable";
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { APIURL } from './lib/ApiCred';
import Toast from "react-native-toast-message"


const Quiz = ({state,dispatch}) => {
    const [isPlaying, setisPlaying] = useState(true);
    const [isLoading, setisLoading] = useState(false);
    const [isModalOpen, setisModalOpen] = useState(false);
    const animatableRef = React.createRef();
    const [questionNo, setquestionNo] = useState(0);
    const [selectedoption, setselectedoption] = useState(null);
    const [isSlected, setisSlected] = useState(false);
    const [isTimesUp, setisTimesUp] = useState(false);
    const [score, setscore] = useState(0);
    const [quizs, setquizs] = useState(null);
    const Focused = useIsFocused()
    const naviageion = useNavigation()
    const [fullQuizobgj, setfullQuizobgj] = useState([]);
    const [isloadingUpdate, setisloadingUpdate] = useState(false);
    const [resetkey, setresetkey] = useState(0);
    const route = useRoute();
    const { courseId } = route?.params;
    const [status500, setstatus500] = useState(true);
   

    const fetchQuiz = ()=>{
        setisLoading(true)
        setselectedoption(null)
        setscore(0)
        setisSlected(false)
        setquestionNo(0)
        setisTimesUp(false)
        setisPlaying(true)
        setresetkey(Math.random())
        fetch(APIURL+"/quiz/"+courseId,{
            method:'POST',
            headers:{
                "Content-Type" : "application/json",
                "Authorization":state?.token
            }
        })
        .then((res)=> res?.json())
        .then((quiz)=>{
            console.log(quiz?.status);
            setstatus500(false)
            setresetkey(0)
            
            setfullQuizobgj(quiz?.result[0])
            setquizs(JSON.parse(quiz?.result[0]?.questions))
        })
        .catch((err)=>{
            setstatus500(true)
        })
        .finally(()=>setisLoading(false))
    }

    useEffect(() => {
        fetchQuiz()
     
    }, [Focused]);
    
    
    const playandPus = ()=>{
      
        setisPlaying(true)
        setisSlected(false)
        setquestionNo((prev)=>prev+1)
        setresetkey((prev)=>prev+1)
        setisTimesUp(false)
    }
    const openModal = ()=>{
        animatableRef.current.animate('bounceIn');
        setisModalOpen((prev)=>!prev)
        setisloadingUpdate(true)
        const addNewUserintoParti = fullQuizobgj?.participants;
        
        const allparticipent = JSON.parse(fullQuizobgj?.participants)
        allparticipent?.push(state?.user?.id)
        allparticipent?.push(0)
        // console.log(typeof fullQuizobgj?.participants);
        // console.log( allparticipent);
        const data = {
            ...fullQuizobgj,
            participants:JSON.stringify(allparticipent)
        }

        fetch(APIURL+"/user_finish_quiz_update/"+fullQuizobgj?.id,{
            method:'POST',
            headers:{
                "Content-Type" : "application/json",
                "Authorization":state?.token
            },
            body: JSON.stringify(data)
        })
        .then((res)=> res?.json())
        .then((quiz)=>{
            console.log(quiz);
            if(quiz?.status!==200){
                return Toast.show({
                    type: 'error',
                    text1: 'Message',
                    text2: "Update failed"
                });
            }
            fetch(APIURL+"/quiz_result",{
                method:'POST',
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization":state?.token
                },
                body: JSON.stringify({
                    result:score,
                    userid:state?.user?.id,
                    courseid:courseId
                })
            })
            .then((res)=> res?.json())
            .then((quiz)=>{
                // console.log(quiz);
                const updatepoint = {
                    ...state?.user,
                    points:state?.user?.points+score
                }
                fetch(APIURL+"/update_user",{
                    method:'POST',
                    headers:{
                        "Content-Type" : "application/json",
                        "Authorization":state?.token
                    },
                    body: JSON.stringify(updatepoint)
                })
                .then((res)=> res?.json())
                .then((quiz)=>{
                    // console.log(quiz);
                    dispatch({type:'login', payload:updatepoint})
                    Toast.show({
                        type: 'error',
                        text1: 'Message',
                        text2: "Updated"
                    });
                    
                })
                .catch((err)=> console.log('err3'+err))

                
            })
            .catch((err)=> console.log('err2'+err))
            
        })
        .catch((err)=> console.log("1"+err))
        .finally(()=>setisloadingUpdate(false))

    }
    const CloasModal = ()=>{
        animatableRef.current.animate('bounceOut')
        setTimeout(() => {
            setisModalOpen((prev)=>!prev)
            naviageion.navigate("MycoursList")
        }, 1000);
        
    }

    const cancelQuiz = ()=>{
        Alert.alert(
            'Cancel',
            'Are you sure to stop quiz?',
            [
              {
                text: 'OK',
                onPress: () => naviageion.navigate("MycoursList"),
                style: 'default',
              },
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
            ],
            { cancelable: false }
          );
        
    }

    const selectoptionfun = (index)=>{
        setselectedoption(index)
        setisSlected(true)
        setisTimesUp(true)
        setisPlaying(false)
        quizs?.questions[questionNo]?.correctIndex===index&&setscore((prev)=>prev+1)
    }
    if(isLoading && !quizs) return <View style={{height:'100%', display:'flex', justifyContent:'center'}}>
        <ActivityIndicator color={'black'} size={25} />
    </View>
    if(status500) return <View style={{height:'100%', display:'flex', justifyContent:'center'}}>

    <TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={()=>naviageion.navigate("Main")}>
        <Text style={{textAlign:'center',color:'black'}}>No Quiz Found(Some thing went wrong)</Text>
        <Text style={{textAlign:'center',color:'blue'}}>Go Back</Text>
        
    </TouchableOpacity>
    </View>
    return (
        <ScrollView style={{position:'relative'}}>
            <View style={{...styles.modalDiv,display:isModalOpen?'flex':'none'}}>
            <Animatable.View 
            style={styles.modal} 
            animation="wobble"
            duration={1000}
            delay={100}
            ref={animatableRef} 
            iterationCount={1} 
            direction="alternate"
            >
                {!isloadingUpdate?<View >
                    <Text style={{textAlign:'center'}}>Your Score</Text>
                    <Text style={{textAlign:'center',fontSize:50,color:'black',fontWeight:'bold'}}
                    >{score}</Text>
                    <Text style={{textAlign:'center',marginBottom:20,color:'black'}}>out of {quizs?.questions?.length}</Text>
                    <Button onPress={CloasModal} title="OK">Ok</Button>
                </View>:<ActivityIndicator color={'black'} size={25} />

                }
            </Animatable.View>
            </View>
        <View style={styles.conaytner}>
            
            <View style={styles.backSubCon}>
                <TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={cancelQuiz}>
                    <FontAwesomeIcon icon={ faTimes } color={'black'} size={25} />
                </TouchableOpacity>
                <View>
                    <Text style={{fontSize:20,fontWeight:'bold',color:'black'}}>{questionNo+1}/{quizs?.questions?.length}</Text>
                </View>
                
            </View>

            <View style={styles.countDown}>
                <Text style={{paddingRight:20,color:'gray'}}>Time</Text>
                <CountdownCircleTimer
                    isPlaying={isPlaying} 
                    onComplete={() => {
                        // do your stuff here
                        setisTimesUp(true)
                    }}  
                    duration={15}
                    size={90}
                    key={resetkey}
                    strokeWidth={7}
                    colors={['#00b1fd', '#F7B801', '#A30000', '#A30000']}
                    colorsTime={[7, 5, 2, 0]}
                >
                    {({ remainingTime }) => {
                        const minutes = Math.floor(remainingTime / 60)
                        const seconds = remainingTime % 60
                        return <Text style={{fontSize:25,color:'black'}}>{seconds}s</Text>
                        
                    }
                    }
                </CountdownCircleTimer>
                <Text style={{paddingLeft:20, color:'gray'}}>Remaining</Text>
            </View>

         
            <View style={styles.questionDiv}>
                <Text style={styles.questionTitle}>
                    Q. {quizs?.questions[questionNo]?.question}
                </Text>
            </View>

            

          
            <View>
               
                {quizs && quizs?.questions[questionNo]?.answers && Array.isArray(quizs?.questions[questionNo]?.answers) && quizs?.questions[questionNo]?.answers?.map((options,index)=>{
                return <TouchableOpacity disabled={isTimesUp || isSlected} onPress={()=>selectoptionfun(index)} key={index} style={styles.anser1}>
                    <View style={styles.questionNumberCon}>
                        <Text style={styles.questionNumber}>{index+1}.</Text>
                    </View>
                    <Text style={styles.anserOptionTitle}>{options}</Text>
                    <View style={styles.checkRight}>
                        {isSlected&&selectedoption===quizs?.questions[questionNo]?.correctIndex&&selectedoption===index?
                        <FontAwesomeIcon icon={ faCheck } color={'rgba(38, 194, 129,1)'} size={30} />:isSlected&&selectedoption===index?
                        <FontAwesomeIcon icon={ faTimes } color={'red'} size={30} />:isSlected&&index===quizs?.questions[questionNo]?.correctIndex&&
                        <FontAwesomeIcon icon={ faCheck } color={'rgba(38, 194, 129,1)'} size={30} />
                        }
                        
                    </View>
                </TouchableOpacity>
                })}
                

                
            </View>

            <View style={{...styles.backSubCon,marginTop:30}}>
                <TouchableOpacity delayPressIn={0} delayPressOut={0}>
                    
                </TouchableOpacity>
                {(isSlected || isTimesUp) && quizs?.questions?.length!==(questionNo+1)?
                <TouchableOpacity onPress={playandPus} delayPressIn={0} delayPressOut={0} style={{...styles.IconBtn,backgroundColor:'#4ec820',width:90,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'white',fontSize:18, textAlign:'center'}}>Next</Text>
                    <FontAwesomeIcon icon={ faChevronRight } color={'white'} size={14} />
                </TouchableOpacity>:(isSlected || isTimesUp)&&
                <TouchableOpacity onPress={openModal} delayPressIn={0} delayPressOut={0} style={{...styles.IconBtn,backgroundColor:'#e66042',width:100,display:'flex', justifyContent:'center'}}>
                    <Text style={{color:'white',fontSize:18, textAlign:'center'}}>Submit</Text>
                </TouchableOpacity>
                }
            </View>
            
        </View>
        <View style={{height:80}}></View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    conaytner:{
        padding:20,
        
    },
    IconBtn:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        backgroundColor:'white',
        padding:10,
        minWidth:50,
        borderRadius:20,
        alignItems:'center'
    },
    backSubCon:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:30,
        alignItems:'center'
    },
    questionDiv:{
        padding:10,
        width:"100%",
        backgroundColor:'white',
        shadowColor:'black',
        elevation:3,
        borderRadius:10,
        minHeight:100,
        marginBottom:20
    },
    questionTitle:{
        fontSize:20,
        color:'black'
    },
    anser1:{
        padding:14,
        backgroundColor:'white',
        borderRadius:7,
        display:'flex',
        flexDirection:'row',
        marginBottom:10,
        position:'relative',
        minHeight:50,
        overflow:'hidden',
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)'
    },
    questionNumber:{
        fontSize:19,
        color:'black',
        fontWeight:'bold',
        paddingRight:10
    },
    anserOptionTitle:{
        fontSize:18,
        color:'black'
    },
    checkRight:{
        position:'absolute',
        // backgroundColor:'rgba(38, 194, 129,0.5)',
        width:'100%',
        height:"210%",
        top:0,
        right:10,
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center'
    },
    countDown:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        paddingBottom:30,
        flexDirection:'row'
    },
    modalDiv:{
        height:'100%',
        width:'100%',
        backgroundColor:'rgba(0,0,0,0.5)',
        position:'absolute',
        bottom:0,
        right:0,
        zIndex:9999,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    modal:{
        width:'90%',
        minHeight:200,
        backgroundColor:'white',
        borderRadius:7,
        padding:15
    }
    
})

export default Quiz;
