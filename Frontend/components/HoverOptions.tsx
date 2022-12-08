import { url } from "inspector"
import React, { useEffect, useState } from "react"
import FileRC from "../components/File"
import Cookies from 'js-cookie'
import loggedInStatus from "@/utils/loggedin"
import Router from "next/router"

interface Shortcutoptions {
    show: Boolean
    children: any
    file: string
    Tok:string
    lf:any
    setF:any
}


const FileOptions = ({ children, show,file ,Tok,lf,setF}:Shortcutoptions) => {
    const [Token,setToken] = useState('')

    useEffect(()=>{
        // document.addEventListener('contextmenu', (e) => {
        //   e.preventDefault();
        // });
            if(!loggedInStatus()){
                Router.push("/")
            }
        else{
          const cookies = Cookies.get()
          setToken(cookies.ParchiToken)
        }
        },[Token])
    
    const fileName = file
    const showEnabled = show
    const fetchUrl = 'https://parchiapp-backend.vercel.app/file/delete/'+fileName+'?q='+Tok
    const detete = ()=>{
        lf(true)
        fetch(fetchUrl,{ 
            method: 'get', 
            headers: new Headers({
                'token': `Bearer ${Token}`
            }),
        })
        .then(data=>lf(false))
        .then(()=>  Router.reload())
    }
    const setFile = ()=>{
        setF(file);
    }
    return (
        <div className="group">
            <div className={`${showEnabled ? 'visible' : 'invisible'} group-hover:visible w-30 h-12 relative top-10 float-right -left-2 text-black z-10 pt-4 flex gap-4 top-2`}>
                    <button onClick={function(e) {console.log("YO")}}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className=" w-6 h-6 cursor-pointer fill-green-600 text-medium">
                            <path fillRule="evenodd" d="M15.75 1.5a6.75 6.75 0 00-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 00-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 00.75-.75v-1.5h1.5A.75.75 0 009 19.5V18h1.5a.75.75 0 00.53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1015.75 1.5zm0 3a.75.75 0 000 1.5A2.25 2.25 0 0118 8.25a.75.75 0 001.5 0 3.75 3.75 0 00-3.75-3.75z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button onClick={setFile}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 cursor-pointer fill-blue-500">
                            <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                            <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button onClick={detete}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer text-red-800 font-large">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
            </div>
            {children}
        </div>
    )

}
export default FileOptions