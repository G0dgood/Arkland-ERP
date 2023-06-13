import axios from "axios"; 
import EventEmitter from "./EventEmitter"; 
import { fireAlert } from "../utils/Alert";
import DataService from "../utils/dataService";


class HttpService {
  dataService = new DataService()  
  private  token:any;
  private  config;
  private  baseUrl = `${process.env.REACT_APP_API}/`
    constructor() {
         this.token = this.dataService.getToken()
        this.config = {
            headers: { Authorization: `Bearer ${this.token}` }
        };
      }
    
    get(url: string) {
     const endpoint = this.baseUrl + url;
            return new Promise(async (resolve, reject) => { 
            try { 
            const data:any = await axios.get(endpoint, this.config)  
            resolve(data);
            }
            catch (e) { 
            this.handleError(e);
            reject (e);
            } 
      });
    }

    search(url: string, params:Record<string,any>) {
        const endpoint = this.baseUrl + url + this.objectToQueryString(params);
        return new Promise((resolve, reject) => { 		 
            axios.get(endpoint, this.config)
                .then((data) => { 
                    resolve(data);
                })
			    .catch((e) => {  
				 this.handleError(e);
                 reject (e);												
                });
        });
    }

    delete(url: string) {
        const endpoint = this.baseUrl + url;
        return new Promise((resolve, reject) => {
            
            axios.delete(endpoint, this.config)
                .then((data) => { 
                    resolve(data);
                })
                .catch((e) => { 
                    this.handleError(e); 
                     reject (e);
                });
        });
    }

    post(url: string, data: any) {
        const endpoint = this.baseUrl + url;
        return new Promise((resolve, reject) => { 
            axios.post(endpoint, data, this.config)
                .then((data) => { 
                    resolve(data);
                })
					.catch((e) => {  
                        this.handleError(e);
                         reject (e);
                });
        });
    }

    uploadFile(url: string, data: Record<string, any>, files: Record<string, any>) {
        //@ts-ignore
        this.config.headers["content-type"] = "multipart/form-data";  
        const formData = new FormData();  
        for (let key in files) {
            formData.append(key, files[key]);
         }
        const endpoint = this.baseUrl + url;
        return new Promise((resolve, reject) => { 
            axios.post(endpoint, formData, this.config)
                .then((data) => { 
                    resolve(data);
                })
					.catch((e) => {  
                        this.handleError(e);
                         reject (e);
                });
        });
    }

    put(url: string, data: any) {
        const endpoint = this.baseUrl + url;
        return new Promise((resolve, reject) => { 
            axios.put(endpoint, data, this.config)
                .then((data) => { 
                    resolve(data);
                })
                .catch((e) => { 
                    this.handleError(e); 
                     reject (e);
                });
        });
    }

    patch(url: string, data: any = {}) {
        const endpoint = this.baseUrl + url;
        return new Promise((resolve, reject) => { 
            axios.patch(endpoint, data, this.config)
                .then((data) => { 
                    resolve(data);
                })
                .catch((e) => { 
                    console.log('error', e );
                    this.handleError(e);
                     reject (e);
                });
        });
    }

    objectToQueryString(obj:Record <string, any>) {
        let str = [];
        for (let key in obj)
          if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
          }
        const query = "?" + str.join("&");
        return query;
    }

    handleError(e:any ) { 
       
        if (e.response.status === 401) { 
            fireAlert("Authentication error",e.response.data.message, "error");   
            window.location.replace("/login");
            this.dataService.clearData();
        }

        
         fireAlert("Error", e.response.data.message, "error");
        // else {
        //     if (e.response.data.message === "Request failed with status code 500" ? false : e.response.data.message) { 
        //         fireAlert("Error", e.response.data.message, "error");
        //     }
        // }
    }

    stopSpinner() {
        EventEmitter.emit('loading', {loading:false});
    }

    startSpinner() {
        EventEmitter.emit('loading', {loading:true});
    }
}

export default new HttpService();

 