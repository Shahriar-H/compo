import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{useReducer} from 'react';

// Define the initial state
// export const initialState = {user:null};

// // Define the reducer function
// export function reducer(state, action) {
//   switch (action.type) {
//     case 'login':
//       return { ...state,user: action?.payload };
//     case 'logout':
//       return { user: null };
//     default:
//       console.log("hello1");
//       throw new Error();
//   }
// }




export const APIURL = "https://iotaquaculture.com/api";
export const IMAGEURL = "https://iotaquaculture.com/uploads/";
export const PHOTOURL = "https://robotechvalley.com/app/admin/admin/images/";




// Save data to AsyncStorage
export const saveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log('Data saved successfully');
  } catch (error) {
    console.log('Error saving data: ', error);
  }
};

// Retrieve data from AsyncStorage
export const getData = async (key) => {
 
  try {
    
    const value = await AsyncStorage.getItem('user');
    if (value !== null) {
      // console.log('Retrieved value: ', value);
        Promise.resolve(value)?.then((result)=>{
         
          try {
              if(result){
                  const data = JSON.parse(result)
                  
                  console.log(data[0]);
                
                  
              }
            
          } catch (error) {
              console.log(error);
          }
      })
      
    }
  
   
  } catch (error) {
    console.log('Error retrieving data: ', error);
  }
};

//logout function
export const logout = async (key)=>{
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.log('Error retrieving data: ', error);
  }
}









