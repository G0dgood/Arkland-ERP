import CryptoJS from 'crypto-js';

// function setItem(key: string, value: string) {
//   localStorage.setItem(key, value);
// }

// function getItem(key: string) {
//   const val = localStorage.getItem(key);
//   if (val !== null && val.length > 0) {
//     return val;
//   }
//   return null;
// }

// function removeItem(key: string) {
//   localStorage.removeItem(key);
// }

// function clearLocalStorage() {
//   localStorage.clear();
// }

// // eslint-disable-next-line
// export default {
//   set: setItem,
//   remove: removeItem,
//   get: getItem,
//   clear: clearLocalStorage,
// };


class DataService {

    private token_key = "erp-sYUDugysad-sdkjhsadkrjyteyugd--dskghjksdh" 
    
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
        let data = JSON.parse(item);
        return data;
    }

    setData(key: string, data: any) {
        const dataString = JSON.stringify(data)
        localStorage.setItem(key, dataString);
    }
  }

export default DataService;
