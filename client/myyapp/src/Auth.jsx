import { createContext,useContext,useEffect,useState } from "react";
import one from './assets/one.jpg'

export const auth=createContext();


export const AuthProvider=({children})=>{
    const [curruser,setcurruser]=useState(JSON.parse(localStorage.getItem("user"))|| null);
    const login =()=>{
       setcurruser({id:1,name:"Shiny",profile:one});
    }

useEffect(()=>{
      if(curruser){
            localStorage.setItem("user",JSON.stringify(curruser));

      }

},[curruser]);

return(
    <auth.Provider value={{curruser,login}}>
        {children}
    </auth.Provider>
);
};