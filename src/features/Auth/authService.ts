import axios from 'axios'
 
 
 
  
// // Login user 
// const login = async ( ) => { 
//    	// @ts-ignore
// 	const userInfo: string = JSON.parse(localStorage.getItem("user"))
//   return userInfo
// }
  
 
const login = async (values: any) => { 
			  const requestOptions = { 
          headers: { "Content-Type": "application/json" }, 
           body: JSON.stringify(values),
    };
	 
 const {data} = await axios.post(`${process.env.REACT_APP_API}/auth/login`,values,requestOptions)
  // const data =  await fetch(`${process.env.REACT_APP_API}/auth/login`,requestOptions)
   console.log('fetch',data)
  return data 
}

// Logout
// export const logout = () => {
//   AsyncStorage.removeItem('user')
// }
 
 
 

const authService = { 
  login,  
}

export default authService
