import axios from 'axios';
import React, { useEffect, useState } from 'react'


function WithApiProgress(WrappedComponent,path) {


  const [pendingApiCall,setPendingApiCall] = useState(false);

  useEffect(()=>{
    axios.interceptors.request.use(request => {
        updateApiCall(request.url,true)
        return request;
    });

    axios.interceptors.response.use(
        response => {
            updateApiCall(response.config.url,false)
            return response;
        },
        error => {
            updateApiCall(error.config.url,false)
            throw error;
        }
    );
  })

  const updateApiCall = (url,state) => {
    if(url === path){
      setPendingApiCall(state)
    }
  }

  return (
    <WrappedComponent pendingApiCall={pendingApiCall}/>
  )
}

export default WithApiProgress