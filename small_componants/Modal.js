import React,{useState} from 'react';
import {View, StyleSheet} from 'react-native';
import * as Animatable from "react-native-animatable";
import {TouchableOpacity,Text, Button,Animated, Easing } from 'react-native';

const Modal = () => {
    const [isModalOpen, setisModalOpen] = useState(false);
    const animatableRef = React.createRef();
    const playandPus = ()=>{
        setisPlaying((pre)=>!pre)
    }
    const openModal = ()=>{
        animatableRef.current.animate('wobble')
        setisModalOpen((prev)=>!prev)
    }
    const CloasModal = ()=>{
        animatableRef.current.animate('bounceOut')
        setTimeout(() => {
            setisModalOpen((prev)=>!prev)
        }, 1000);
        
    }
    return (
        <View style={{position:'relative'}}>
           
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
                    <View >
                        <Text style={{textAlign:'center'}}>Your Score</Text>
                        <Text style={{textAlign:'center',fontSize:50,color:'black',fontWeight:'bold'}}
                        >20</Text>
                        <Text style={{textAlign:'center',marginBottom:20}}>out of 25</Text>
                        <Button onPress={CloasModal} title="OK">Ok</Button>
                    </View>
                </Animatable.View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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

export default Modal;
