import axios from 'axios'
 
 
 
  
// Login user 
const login = async ( ) => { 
   	// @ts-ignore
	const userInfo: string = JSON.parse(localStorage.getItem("user"))
  return userInfo
}
  

// Logout
// export const logout = () => {
//   AsyncStorage.removeItem('user')
// }
 
 
 

const authService = { 
  login,  
}

export default authService
