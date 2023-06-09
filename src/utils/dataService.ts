import CryptoJS from 'crypto-js';
 
class DataService {

    private token_key = "erp-sYUDugysad-sdkjhsadkrjyteyugd--dskghjksdh" 
	static setToken: any;
    
    setToken(token:string) {
        // Encrypt
        const hashed_token = CryptoJS.AES.encrypt(token,`${process.env.REACT_APP_ENCRIPTION_SECRET_KEY}`).toString();
        localStorage.setItem(this.token_key, hashed_token);
    }
    
    getToken() {
        const token:string =  localStorage.getItem(this.token_key) || ""
        // Decrypt
        const bytes  = CryptoJS.AES.decrypt(token, `${process.env.REACT_APP_ENCRIPTION_SECRET_KEY}`);
        var originalToken= bytes.toString(CryptoJS.enc.Utf8);
        return originalToken
    }

    getData(key: string) {
        const item = localStorage.getItem(key) || ""
        let data = item ? JSON.parse(item) : null;
        return data;
    }

    setData(key: string, data: any) {
        const dataString = JSON.stringify(data)
        localStorage.setItem(key, dataString);
    }

    clearData() { 
        localStorage.removeItem(this.token_key);
        localStorage.removeItem(`${process.env.REACT_APP_ERP_USER_INFO}`);
    }
  }

export default DataService;
