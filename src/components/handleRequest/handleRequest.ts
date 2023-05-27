import Cookies from 'js-cookie';
import { useState } from 'react';



const token = Cookies.get("token");
	
export  const handleRequestPatch  = ( inputs:any, setMessage:any, setisError:any, setisSuccess:any, setisLoading:any, url:any ,setReset:any, ) => { 
    setisLoading(true);
    fetch(url, {
      method: "PATCH", 
      headers: {
							"Content-Type": "application/json", 
        Authorization: `Bearer ${token}`,
					},  
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.success === false) {
									setMessage(data?.message); 
									 setisError(true);
										setTimeout(() => {
										  setisError(false);
									}, 5000);
        
								} else {
									setReset(true)
									setisSuccess(true); 
									setTimeout(() => {
										setisSuccess(false); 
										setReset(false)
									}, 5000);
        }
        setisLoading(false);
      })
      .catch((error) => {
        setisLoading(false);
      });
}


export  const handleRequestGet = ( setData:any, setMessage:any, setisError:any, setisSuccess:any, setisLoading:any, url:any   ) => { 
    setisLoading(true);
    fetch(url, {
      method: "GET",  
      headers: {
							"Content-Type": "application/json", 
        Authorization: `Bearer ${token}`,
					},  
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.success === false) {
									setMessage(data?.message); 
									 setisError(true);
										setTimeout(() => {
										  setisError(false);
									}, 5000);
        
								} else {
									setData(data?.data?.data)
									setisSuccess(true); 
									setTimeout(() => {
											setisSuccess(false); 
									}, 5000);
        }
        setisLoading(false);
      })
      .catch((error) => {
        setisLoading(false);
      });
}

export const handleRequestPost = (setData: any, setMessage: any, setisError: any, setisSuccess: any, setisLoading: any, url: any, file: any, setProgress: any) => { 
	  const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file?.name);
	console.log("file",formData)
    setisLoading(true);
    fetch(url, {
					method: "POST",  
					body:  formData,
				 
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "form-data"
					},
										// @ts-ignore 
          onUploadProgress: (file: { loaded: number; total: number; }) => {
            setProgress(Math.round((100 * file.loaded) / file.total));
          }, 
						
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.success === false) {
									setMessage(data?.message); 
									 setisError(true);
										setTimeout(() => {
										  setisError(false);
									}, 5000);
        
								} else {
									setData(data?.data?.data)
									setisSuccess(true); 
									setTimeout(() => {
											setisSuccess(false); 
									}, 5000);
        }
        setisLoading(false);
      })
      .catch((error) => {
        setisLoading(false);
      });
}



   //  headers: {
					// 		"Content-Type": "application/json", 
					// 		  onUploadProgress: (jsonData:any) => {
     //        setProgress(Math.round((100 * jsonData.loaded) / jsonData.total));
     //      },
					// 		Authorization: `Bearer ${token}`,
								
					// }, 