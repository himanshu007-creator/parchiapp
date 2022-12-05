import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import Loading from "./Loading"

interface AuthProps{
    mode: string
}

export const Auth: React.FC<AuthProps> = (props:AuthProps)=>{
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role,setRole] = useState('')
    const [error, setError] = useState()
    const [errorVisible, setErrorVisible] = useState(true)
    const [mode, setMode] = useState('Login')
    const theme = useTheme().systemTheme
    
    useEffect(()=>{
        console.log("CHANGED MODE: ",mode)
    },[mode])

    useEffect(()=>{
        setMode(props.mode)
    },[])

    const errorMessages = {
        userExists:{
            message:'Username already exists',
            color:'red'
        },
        userCreated:{
            message:'User created! >> Login',
            color:'green'
        }
    }

    const pageMode = {
        Login:{
            heading:'Login to your account',
            buttontext:'Login',
            additionalOption:'Sign Up?',
            additionaloptionLink:"Signup"

        },
        Signup:{
            heading:'Signup for new account',
            buttontext:'Create',
            additionalOption:'Already have an account?',
            additionaloptionLink:"Login"
        }
    }

    const selectedmode = mode==='Login'?  pageMode.Login :  pageMode.Signup

    useEffect(() => {
        const timeId = setTimeout(() => {
          // After 3 seconds set the show value to false
          setErrorVisible(false)
        }, 3000)
    
        return () => {
          clearTimeout(timeId)
        }
      }, []);

    return (
        <>
        
        <div className={`flex items-center justify-center h-screen bg-gray-100 ${theme==='dark' ? 'bg-zinc-900':'bg-gray-100'}`}>
    <div className={`pr-8 pl-8 pb-8 pt-4 py-6 mt-2 text-left  rounded-xl  ${theme==='dark' ? 'bg-transparent border-4 border-red-400 shadow-red-200':'bg-white'} shadow-lg`}>
        <p className={`w-full h-6 items-center justify-center text-center font-medium mb-2 bg-${errorMessages.userExists.color}-200`}>{errorMessages.userExists.message}</p>
        <h3 className="text-2xl font-bold text-center">{selectedmode.heading}</h3>
        <form action="">
            <div className="mt-4">
                <div>
                    <label className="block" >Email</label>
                            <input type="text" placeholder="Email"
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"/>
                </div>
                <div className="mt-4">
                    <label className="block">Password</label>
                            <input type="password" placeholder="Password"
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"/>
                </div>
                {mode==='Signup'?
                 <div className="flex flex-wrap mt-4 "  onChange={(e)=>{console.log((e.target as HTMLInputElement).value)}}>
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
                    <button className="px-6 py-2 mt-4 text-white bg-red-400 rounded-lg hover:bg-red-600">{selectedmode.buttontext}</button>
                    <p onClick={()=>{setMode(selectedmode.additionaloptionLink); console.log(">>> HEY:", mode)}}className="text-xs text-red-400 hover:underline">{selectedmode.additionalOption}</p>
                    <a href="/dashboard">Dashboard</a>
                </div>
            </div>
        </form>
    </div>
    {/* FORM ERROR <span className={`relative top-44 rounded-full -left-80 z-10 p-1 text-[10px] leading-none text-black whitespace-no-wrap bg-gray-300 shadow-lg ${errorVisible ?'':'invisible' }`}>Some fields in form are missing</span> */}

</div>
</>
    )
}