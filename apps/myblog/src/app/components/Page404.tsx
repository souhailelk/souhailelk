import React from 'react'
import {
    useLocation,
  } from "react-router-dom";
  
function Page404() {
    let location = useLocation();
  
    return (
      <div>
        <div className="h-screen w-screen  flex justify-center content-center flex-wrap">
          <div className="font-sans  text-6xl">404 Not found</div>
          <div className="font-sans text-center  w-screen text-3xl">No match for <span className="font-black">'{location.pathname}'</span></div>
          <a className="w-screen bottom-3  text-center font-sans text-xl" href="/">GO HOME ?</a>
        </div>
      </div>
    );
  }
export default Page404;  