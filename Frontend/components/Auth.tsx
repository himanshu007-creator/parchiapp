import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import Dialogue from "./Dialogue"
import * as ls from "local-storage";
import Router from "next/router";
import Cookies from 'js-cookie'

interface AuthProps{
    mode: string
}

export const Auth: React.FC<AuthProps> = (props:AuthProps)=>{
    const [username,setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [role,setRole] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [errorVisible, setErrorVisible] = useState(false)
    const [msgclr,setMsgClr] = useState('')
    const [mode, setMode] = useState('Login')
    const theme = useTheme().systemTheme

    const isFormValid = mode ==='Login'? username!=='' && password!=='' : username!=='' && password!=='' && role !==''
    const submitMode = mode ==='Login'? 'login':'register'

    const submit = (mode:string)=>{
        var body:string;
        var fetchUrl:string;
        if(mode ==='login'){
             body = JSON.stringify({username: username,password:password})
             fetchUrl = 'https://parchiapp-backend.vercel.app/api/auth/login'
        }
        else{
            body = JSON.stringify({username: username,password:password,role:role})
            fetchUrl = 'https://parchiapp-backend.vercel.app/api/auth/register'
        }
       if(isFormValid){ 
        setLoading(true)
        const handleFetchData = () => {
            fetch(fetchUrl,{ 
                method: 'POST', 
                headers: new Headers({
                    'Content-Type': 'application/json',
                }),
                body: body
            })
            .then(data=>data.json())
            .then((data)=>{
                if(mode === 'login'){
                    ls.set('parchiUserLoggedIn',true);
                    ls.set('parchiUserName',username)
                    ls.set('parchiUserRole',data.role)
                    Cookies.set('ParchiToken', data.accesstoken)
                    setUsername('')
                    setPassword('')
                    if(data==="Wrong credentials"){
                        setMsgClr('red')
                        messageHandler('Wrong credentials')
                    }
                    else{
                        setMsgClr('green')
                        messageHandler('Logged in Successfully')
                        setTimeout(()=>{
                            Router.push('/dashboard')
                    },1200)
                    }
            } 
                else{
                    if(data.details ==="user already exist"){
                        setUsername('')
                        messageHandler("User Already Exists")
                        setMsgClr('red')
                    }
                    else{
                    setUsername('')
                    setPassword('')
                    setRole('')
                    setMsgClr('green')
                    messageHandler('Registration Successful')
                    setMode('Login')
                    }
                }
            })
            .catch(()=>{
                setMsgClr('red')
                messageHandler('Some Error Occured')
            })
               
            .finally(()=>{
                setLoading(false)
        })}
        handleFetchData()
       }
       else{
        
       }
    }

    useEffect(()=>{
        setMode(props.mode)
    },[])

    const Messages = {
        userExists:{
            message:'Username already exists',
            color:'red'
        },
        userCreated:{
            message:'User created! >> Login',
            color:'green'
        }
    }

    const messageHandler = (msgId:string)=>{
        setError(msgId)
        setErrorVisible(true)
        const timeId = setTimeout(() => {
            setErrorVisible(false)
            setError('')
          }, 3000)
      
          return () => {
            clearTimeout(timeId)
          }
    }

    const pageMode = {
        Login:{
            heading:'Login to your account',
            buttontext:'Login',
            additionalOption:'Sign Up?',
            additionaloptionLink:"Signup",
        },
        Signup:{
            heading:'Signup for new account',
            buttontext:'Create',
            additionalOption:'Already have an account?',
            additionaloptionLink:"Login",
        }
    }

    const selectedmode = mode==='Login'?  pageMode.Login :  pageMode.Signup

    // {Messages.userExists.message}
    return (
        <>
        <Dialogue show={loading}/>
        <div className={`flex items-center justify-center h-screen bg-gray-100 ${theme==='dark' ? 'bg-zinc-900':'bg-gray-100'}`}>
    <div className={`pr-8 pl-8 pb-8 pt-4 py-6 mt-2 text-left  rounded-xl  ${theme==='dark' ? 'bg-transparent border-4 border-red-400 shadow-red-200':'bg-white'} shadow-lg`}>
        <p className={`w-full h-6 items-center justify-center text-center font-medium mb-2 bg-${msgclr}-400 rounded-lg ${errorVisible?'':'invisible'}`}>{error}</p> 
        <h3 className="text-2xl font-bold text-center">{selectedmode.heading}</h3>
        <form action="">
            <div className="mt-4">
                <div>
                    <label className="block" >Username</label>
                            <input value={username} onChange={(e)=>{setUsername(e.target.value.trim())}} type="text" placeholder="username"
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"/>
                </div>
                <div className="mt-4">
                    <label className="block">Password</label>
                            <input type="password" placeholder="Password" value={password} onKeyDown={(e)=>{if(e.keyCode === 32)return false}} onChange={(e)=>{setPassword(e.target.value.trim().replace(/\s+/g, ''))}}
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"/>
                </div>
                {mode==='Signup'?
                // @ts-ignore-line
                 <div className="flex flex-wrap mt-4 "  value={role} onChange={(e)=>{setRole(e.target.value)}} value={role}>
                 <div className="flex items-center mr-4 cursor-pointer">
                     <input id="red-radio"  type="radio" value="Doctor" name="colored-radio" className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                     <label htmlFor="red-radio" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Doctor</label>
                 </div>
                 <div className="flex items-center mr-4  cursor-pointer">
                     <input id="green-radio" type="radio" value="Patient" name="colored-radio" className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                     <label htmlFor="green-radio" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Patient</label>
                 </div>
             </div>
                : 
                <></>
                
                }
                <div className="flex items-baseline justify-between">
                    <p onClick={()=>submit(submitMode)} className="px-6 py-2 mt-4 text-white bg-red-400 rounded-lg hover:bg-red-600">{selectedmode.buttontext}</p>
                    <p onClick={()=>{setMode(selectedmode.additionaloptionLink)}}className="text-xs text-red-400 hover:underline">{selectedmode.additionalOption}</p>
                </div>
            </div>
        </form>
    </div>
    {/* <span className={`relative top-44 rounded-full -left-80 z-10 p-1 text-[10px] leading-none text-black whitespace-no-wrap bg-gray-300 shadow-lg ${errorVisible ?'':'invisible' }`}>Some fields in form are missing</span> */}

</div>
</>
    )
}