// import axios from "axios"; 
// import EventEmitter from "./EventEmitter"; 
// import { fireAlert, fireAlert2 } from "../utils/Alert";
// import DataService from "../utils/dataService"; 



// class HttpService {
//   private dataService: DataService;
//   private token: string | null;
//   private config: any;
//   private baseUrl: string;

//   constructor() {
//     this.dataService = new DataService(); // Initialize DataService
//     this.token = this.dataService.getToken(); // Get the token from DataService
//     this.config = {
//       headers: { Authorization: `Bearer ${this.token}` }
//     };
//     this.baseUrl = `${process.env.REACT_APP_API}/`;
//   }
    
//     get(url: string) {
//      const endpoint = this.baseUrl + url;
//             return new Promise(async (resolve, reject) => { 
//             try { 
//             const data:any = await axios.get(endpoint, this.config)  
//             resolve(data);
//             }
//             catch (e) { 
//             this.handleError(e);
//             reject (e);
//             } 
//       });
//     }

//     search(url: string, params:Record<string,any>) {
//         const endpoint = this.baseUrl + url + this.objectToQueryString(params);
//         return new Promise((resolve, reject) => { 		 
//             axios.get(endpoint, this.config)
//                .then((data) => { 
//                resolve(data);
//                 })
// 			    .catch((e) => {  
// 				 this.handleError(e);
//                  reject (e);												
//            });
//         });
//     }

//     delete(url: string) {
//         const endpoint = this.baseUrl + url;
//         return new Promise((resolve, reject) => {
            
//             axios.delete(endpoint, this.config)
//                 .then((data) => { 
//                     resolve(data);
//                 })
//                 .catch((e) => { 
//              this.handleError(e); 
//              reject (e);
//            });
//         });
//     }

//     post(url: string, data: any) {
//         const endpoint = this.baseUrl + url;
//         return new Promise((resolve, reject) => { 
//             axios.post(endpoint, data, this.config)
//                 .then((data) => { 
//                     resolve(data);
//                 })
// 					.catch((e) => {  
//          this.handleError(e);
//              reject (e);
//               });
//         });
//     }

//     uploadFile(url: string, data: Record<string, any>, files: Record<string, any> , fileName:string = '') {
//         //@ts-ignore
//         this.config.headers["content-type"] = "multipart/form-data";  
//         const formData = new FormData();  
//         for (let key in files) {
//             if (fileName) {
//                 formData.append(fileName, files[key]);
//             } else {
//                 formData.append(key, files[key]);
//            } 
//          }
//         for (let key in data) {
//             formData.append(key, data[key]);
//          }
//         const endpoint = this.baseUrl + url;
//         return new Promise((resolve, reject) => { 
//             axios.post(endpoint, formData, this.config)
//                 .then((data) => { 
//                     resolve(data);
//                 })
// 					.catch((e) => {  
//             this.handleError(e);
//                reject (e);
//                 });
//         });
//     }

//     put(url: string, data: any) {
//         const endpoint = this.baseUrl + url;
//         return new Promise((resolve, reject) => { 
//             axios.put(endpoint, data, this.config)
//                 .then((data) => { 
//                     resolve(data);
//                 })
//                 .catch((e) => { 
//                     this.handleError(e); 
//                      reject (e);
//                 });
//         });
//     }

//     patch(url: string, data: any = {}) {
//         const endpoint = this.baseUrl + url;
//         return new Promise((resolve, reject) => { 
//             axios.patch(endpoint, data, this.config)
//                 .then((data) => { 
//                     resolve(data);
//                 })
//                 .catch((e) => { 
//                     console.log('error', e );
//                     this.handleError(e);
//                      reject (e);
//                 });
//         });
//     }

//     objectToQueryString(obj:Record <string, any>) {
//         let str = [];
//         for (let key in obj)
//           if (obj.hasOwnProperty(key)) {
//             str.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
//           }
//         const query = "?" + str.join("&");
//         return query;
//     }
 
//     // Set token method
//     setToken(token: string | null) {
//     this.token = token;
//     this.config.headers.Authorization = `Bearer ${this.token}`;
//    }

//     // Get token method
//     getToken() {
//     return this.token;
//     }

//     handleError(e:any ) { 
   
//         if (e.response.status === 401 && e.response.statusText === "Unauthorized") { 
//             fireAlert2("Authentication Error",e.response.data.message, "error" , "/" ,'');   
//             // window.location.replace("/login");
//             this.dataService.clearData();  
//         }
      
//         else if (e.response.data.message === "Unable to complete request") {   
             
//         }
//         else if (e.response.status === 403 && e.response.data.error_code === 24) {   
//              fireAlert2(e.response.data.message, "You will be redirected!", "warning", "/update-password",''); 
//         }
//         else if (e.response.data.message === "Request failed with status code 500" ? false : e.response.data.message) { 
//                 fireAlert("Error", e.response.data.message, "error");
            
//         }
//     }

//     // stopSpinner() {
//     //     EventEmitter.emit('loading', {loading:false});
//     // }

//     // startSpinner() {
//     //     EventEmitter.emit('loading', {loading:true});
//     // }
// }

// export default new HttpService();



import axios from "axios";
import { fireAlert, fireAlert2 } from "../utils/Alert";
import DataService from "../utils/dataService";
 


interface HeadersConfig {
  [key: string]: string; // This allows any string key to be used to access values
}

const dataService = new DataService();
const createHttpService = () => {
    const token = dataService.getToken(); 
  const baseUrl = `${process.env.REACT_APP_API}/`;

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
 

  const get = async (url: string) => {
    const endpoint = baseUrl + url;
    try {
      const data = await axios.get(endpoint, config);
      return data;
    } catch (e) {
      handleError(e);
      throw e;
    }
  };

  const search = async (url: string, params: any) => {
    const endpoint = baseUrl + url + objectToQueryString(params);
    try {
      const data = await axios.get(endpoint, config);
      return data;
    } catch (e) {
      handleError(e);
      throw e;
    }
  };

  const deleteRequest = async (url: string) => {
    const endpoint = baseUrl + url;
    try {
      const data = await axios.delete(endpoint, config);
      return data;
    } catch (e) {
      handleError(e);
      throw e;
    }
  };

  const post = async (url: string, data: any) => {
    const endpoint = baseUrl + url;
    try {
      const responseData = await axios.post(endpoint, data, config);
      return responseData;
    } catch (e) {
      handleError(e);
      throw e;
    }
  };

  const put = async (url: string, data: any) => {
    const endpoint = baseUrl + url;
    try {
      const responseData = await axios.put(endpoint, data, config);
      return responseData;
    } catch (e) {
      handleError(e);
      throw e;
    }
  };

  const patch = async (url: string, data = {}) => {
    const endpoint = baseUrl + url;
    try {
      const responseData = await axios.patch(endpoint, data, config);
      return responseData;
    } catch (e) {
      handleError(e);
      throw e;
    }
  };

 

const uploadFile = (url: string, data: Record<string, any>, files: Record<string, any>, fileName: string = '') => {
  const headers: HeadersConfig = {
    ...config.headers, // Preserve existing headers
    "content-type": "multipart/form-data",
  };

  const formData = new FormData();
  for (let key in files) {
    if (fileName) {
      formData.append(fileName, files[key]);
    } else {
      formData.append(key, files[key]);
    }
  }
  for (let key in data) {
    formData.append(key, data[key]);
  }
  const endpoint = baseUrl + url;

  return new Promise((resolve, reject) => {
    axios
      .post(endpoint, formData, { headers }) // Pass headers using the 'headers' property
      .then((data) => {
        resolve(data);
      })
      .catch((e) => {
        handleError(e);
        reject(e);
      });
  });
};

   const handleError = (e: any) => {
    if (e.response.status === 401 && e.response.statusText === "Unauthorized") {
      fireAlert2("Authentication Error", e.response.data.message, "error", "/", "");
      // window.location.replace("/login");
      dataService.clearData();
    } else if (e.response.data.message === "Unable to complete request") {
      // Handle error message
    } else if (e.response.status === 403 && e.response.data.error_code === 24) {
      fireAlert2(e.response.data.message, "You will be redirected!", "warning", "/update-password", "");
    } else if (e.response.data.message === "Request failed with status code 500" ? false : e.response.data.message) {
      fireAlert("Error", e.response.data.message, "error");
    }
  };

 const objectToQueryString = (obj: { [key: string]: string | number | boolean }) => {
  let str = [];
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
    }
  }
  const query = "?" + str.join("&");
  return query;
 };
    
 const setToken = (newToken: string | null) => {
  config.headers.Authorization = newToken ? `Bearer ${newToken}` : '';
};

    return { 
    setToken,
    get,
    search,
    deleteRequest,
    post,
    put,
    patch,
    uploadFile 
  };
};

export default createHttpService ;