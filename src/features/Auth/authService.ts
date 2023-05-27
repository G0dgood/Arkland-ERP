import axios from 'axios'
import Cookies from 'js-cookie';
import storage from '../../utils/dataService';
  
// // Login user 
// const login = async ( ) => { 
//    	// @ts-ignore
// 	const userInfo: string = JSON.parse(localStorage.getItem("user"))
//   return userInfo
// }
  
 
const login = async (values: any) => { 
	 var CryptoJS = require("crypto-js");
	 
  const response: any = await axios.post(`${process.env.REACT_APP_API}/auth/login`, values) 
  // console.log('response', response)
  //  const isJson = response.headers
  //         .get("content-type")
  //         ?.includes("application/json");
  //       const data = isJson && (await response.json());
  //      console.log('data', data)
  
 
         // set token in axios header
          // axios.defaults.headers.common["authorization"] = response.data.token;
      //encrypt token using AES
      // const key = CryptoJS.lib.WordArray.random(16);
      // const encryptedToken = CryptoJS.AES.encrypt(data.token, key).toString();
      // // set encrypted token in HttpOnly cookie
      // document.cookie = `token=${encryptedToken}; HttpOnly; secure; SameSite=Strict`;
      // // store encryption key in local storage
      // localStorage.setItem("encryptionKey", key.toString());
  //     const isJson = response?.headers?.get("content-type")?.includes("application/json");
  // const data = isJson && (response);
  
 
  // const vvv = axios.defaults.headers.common['Authorization'] = data.token
  //  console.log('vvv',  data.token )
  //        // set token in cookie
          Cookies.set("token", response.data.token);
 
  //         Cookies.set("response", response);
  //         storage.set("user", JSON.stringify( response )); 

   if (response.data.token) {
     const vvv = axios.defaults.headers.common['Authorization'] = response.data.token;
    //  console.log('vvv', vvv) 
     } 
  
  
  return response 
}

// Logout
// export const logout = () => {
//   AsyncStorage.removeItem('user')
// }
 
 
 

const authService = { 
  login,  
}

export default authService
