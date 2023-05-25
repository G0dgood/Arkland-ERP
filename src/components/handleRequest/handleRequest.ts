import Cookies from 'js-cookie';



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
export  const handleRequestPost = ( setData:any, setMessage:any, setisError:any, setisSuccess:any, setisLoading:any, url:any   ) => { 
    setisLoading(true);
    fetch(url, {
      method: "POST",  
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

 