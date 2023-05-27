import axios from "axios";
import Cookies from "js-cookie";
// import dataService from "./DataService";
import EventEmitter from "./EventEmitter";
import {useNavigate} from "react-router-dom"
import { fireAlert } from "../utils/Alert";
import { handle_logout } from "../utils/auth-util";
 
 

class HttpService {
	 private  token:any;
  private  config;
  private  baseUrl = 	`${process.env.REACT_APP_API}/`
    constructor() {
         this.token = Cookies.get("token");
        this.config = {
            headers: { Authorization: `Bearer ${this.token}` }
        };
      }
    
    get(url: string) {
     const endpoint = this.baseUrl + url;
					return new Promise(async (resolve, reject) => { 
						try { 
				   const data = await axios.get(endpoint, this.config)  
								resolve(data);
						}
						catch (e) { 
									this.handleError(e);
						} 
      });
    }

    search(url: string, params: Record<string, any>) {
        const endpoint = this.baseUrl + url + this.objectToQueryString(params);
        return new Promise((resolve, reject) => { 		 
            axios.get(endpoint, this.config)
                .then((data) => { 
                    resolve(data);
                })
													.catch((e) => {  
																	this.handleError(e);
																	
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
                });
        });
    }

    patch(url: string, data: any) {
        const endpoint = this.baseUrl + url;
        return new Promise((resolve, reject) => {
            
            axios.patch(endpoint, data, this.config)
                .then((data) => {
                   
                    resolve(data);
                })
                .catch((e) => { 
                    this.handleError(e);
                });
        });
    }

    objectToQueryString(obj:any) {
        let str = [];
        for (let key in obj)
          if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
          }
        const query = "?" + str.join("&");
        return query;
    }

    handleError(e:any ) { 
       fireAlert(  e.response.data.message, "error");
							if (e.response.status === 401) {
												handle_logout();
							}
				}

    stopSpinner() {
        EventEmitter.emit('loading', {loading:false});
    }

    startSpinner() {
        EventEmitter.emit('loading', {loading:true});
    }
}

export default new HttpService();