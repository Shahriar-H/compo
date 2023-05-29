import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useReducer, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Toast from "react-native-toast-message"

import { Text } from 'react-native-animatable';
import { APIURL } from '../lib/ApiCred';

const Auth = ({state, dispatch, loggedinfun}) => {
    const [isLoading, setisLoading] = useState(false);
    
    

     
    return (
        <View>
            <Text style={{textAlign:'center'}}>{"Loading..."}</Text>
        </View>
    );
}

const styles = StyleSheet.create({})

export default Auth;
