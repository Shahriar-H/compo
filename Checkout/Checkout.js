import React,{useState,useEffect} from 'react';
import {View, StyleSheet,ScrollView,Image,Text,TouchableOpacity, Dimensions} from 'react-native';
import Headercourse from '../small_componants/Headercourse';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faCircleCheck } from '@fortawesome/free-solid-svg-icons/'
import { useNavigation, useRoute } from '@react-navigation/native';

const Checkout = ({state}) => {
    const [isCheckMethodBkash, setisCheckMethodBkash] = useState(true);
    const {width} = Dimensions.get('screen')
    const route = useRoute();
    const {returnPath,courseInfo} = route.params;
    const navigation = useNavigation()
    useEffect(() => {
    //   console.log(courseInfo?.id);
    }, [courseInfo?.enrollid]);

    const paynowfunc = ()=>{
        navigation.navigate('Paymentgetway',{
            name:state?.user?.name,
            email:state?.user?.email,
            amount:courseInfo?.price,
            userid:state?.user?.id,
            enrollid:courseInfo?.enrollid,
            phone:state?.user?.phone,
            courseInfo
        })
    }
    return (
        <ScrollView style={styles.container}>
            <View style={styles.DivTitle}>
                <TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={()=>navigation.navigate('Webview',{courseId:courseInfo?.id})}>
                    <FontAwesomeIcon icon={ faArrowLeft } color={'gray'} size={25} />
                </TouchableOpacity>
                <Text style={styles.leaderTitle}>{"Checkout"}</Text>
            </View>
            <View style={styles.ProgressBr}>
                <FontAwesomeIcon icon={ faCircleCheck } color={'#02f026'} size={20} />
                <View style={styles.barLine}>
                    <View style={{width:"50%",height:'100%',backgroundColor:'#02f026'}}></View>
                </View>
                <FontAwesomeIcon icon={ faCircleCheck } color={'gray'} size={20} />
            </View>
            <View style={styles.Imagecontainer}>
                <Image resizeMode='cover' style={styles.CoverImage} source={{uri:"https://robotechvalley.com/app/card.png"}} />
            </View>
            <Text style={{fontSize:28,color:'indigo',fontWeight:'bold',textAlign:'center'}}>৳{courseInfo?.price}</Text>
            <Text style={{textAlign:'center',marginBottom:20}}>Click on Continue for next step</Text>
            {/* <View>
                <TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={()=>setisCheckMethodBkash(true)} style={styles.paymentOption}>
                    <View style={styles.logoNameFlex}>
                        <View style={{borderColor:'gray', borderWidth:2, borderRadius:20, height:20, width:20,marginRight:10,backgroundColor:isCheckMethodBkash?"#02f026":"white"}}></View>
                        <Text style={{fontSize:20}}>Bkash</Text>
                    </View>
                    <Image resizeMode='contain' style={styles.BkashImage} source={{uri:"https://robotechvalley.com/app/BKash.png"}} />
                </TouchableOpacity>
                <TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={()=>setisCheckMethodBkash(false)} style={styles.paymentOption}>
                    <View style={styles.logoNameFlex}>
                        <View style={{borderColor:'gray', borderWidth:2, borderRadius:20, height:20, width:20,marginRight:10,backgroundColor:!isCheckMethodBkash?"#02f026":"white"}}></View>
                        <Text style={{fontSize:20}}>Others Method</Text>
                    </View>
                    <Image resizeMode='contain' style={styles.BkashImage} source={{uri:"https://robotechvalley.com/app/payment.png"}} />
                </TouchableOpacity>
            </View> */}

            

            {courseInfo?.enrollid&&<TouchableOpacity onPress={paynowfunc} delayPressIn={0} delayPressOut={0} style={styles.paymentOption1}>       
                <Text style={{fontSize:20,color:'white',textAlign:'center'}}>Continue</Text> 
            </TouchableOpacity>}

            <View style={{height:50}}></View>
            <View style={{display:'flex',justifyContent:'center', alignItems:'center', width:'100%'}}>
                <Image resizeMode='contain' style={{...styles.CoverImagePayment,width:width-50}} source={{uri:"https://robotechvalley.com/app/payments.png"}} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        padding:15,
        backgroundColor:'white'
    },
    CoverImage:{
        height:150,
        width:250
    },
    Imagecontainer:{
        display:'flex',
        justifyContent:'center',
        width:"100%",
        flexDirection:'row'
    },
    BkashImage:{
        height:50,
        width:100
    },
    paymentOption:{
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'white',
        shadowColor:'gray',
        elevation:6,
        padding:10,
        margin:10,
        borderRadius:18
    },
    logoNameFlex:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    },
    barLine:{
        height:4,
        backgroundColor:'gray',
        width:"80%",
        borderRadius:2
    },
    ProgressBr:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        width:"100%",
        justifyContent:'center',
        marginBottom:30,
        marginTop:20
    },
    paymentOption1:{
        marginTop:20,
        backgroundColor:'indigo',
        padding:10,
        borderRadius:10,
        marginHorizontal:10
    },
    cardOfCOurse:{
        padding:10,
        backgroundColor:'rgba(0,0,0,0.1)',
        margin:15,
        borderRadius:10,
    },
    CoverImagePayment:{
      
        height:100
    },
    DivTitle:{
        textAlign:'center',
        
        marginBottom:15,
        backgroundColor:'white',
        paddingVertical:10,
        shadowColor:'grey',
        elevation:3,
        paddingHorizontal:10,
        display:'flex',
        
        flexDirection:'row',

    },
    leaderTitle:{
        textAlign:'center',
        width:"85%",
        color:'black',
        fontWeight:'bold',
        fontSize:19,
    }
    
})

export default Checkout;
