import Dialogue from '@/components/Dialogue';
import FileOptions from '@/components/HoverOptions';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Shimmer from '@/components/Shimmer';
import * as ls from "local-storage";
import Cookies from 'js-cookie'
import Router from 'next/router';
import loggedInStatus from '@/utils/loggedin';
import FileRC from '@/components/File';
import { setInterval } from 'timers';
import Upload from '@/components/Upload';
import SIdeNav from '@/components/SideNav';
import SideNav from '@/components/SideNav';



const Dashboard: React.FC = () => {
  const theme = useTheme().systemTheme
  const [sidenav,setSidenav] = useState(false)
  const [docs, setDocs] = useState([])
  const [acDocs,setacDocs] = useState([])
  const [username,setUsername] = useState('')
  const [role,setRole] = useState('')
  const [upload, setUpload] = useState(false)
  const [filePOV,setFilePOV] = useState('')
  const [fileRef,setFileRef] = useState('')
  const [files,setFiles] = useState<any>([])
  const [Token,setToken] = useState('')
  const [logout, setLogoutVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [shimmers, setShimmers] = useState(false)
  const Shimmers = new Array(6).fill(<Shimmer/>)

  const handleFetchData = () => {
    setShimmers(true)
    fetch('https://parchiapp-backend.vercel.app/user/files',{ 
        method: 'get', 
        headers: new Headers({
            'token': `Bearer ${Token}`
        }),
    })
    .then(data=>  data.json()
    )
    .then((data) => {
      setFiles(data)
    })
    .finally(()=>{
      setLoading(false)
      setShimmers(false)
    })
  }

  useEffect(()=>{
    console.log(">>> FREF: ",fileRef, filePOV)
  },[fileRef,filePOV])
  useEffect(()=>{
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
		if(!loggedInStatus()){
			Router.push("/")
		}
    else{
      const cookies = Cookies.get()
      if(ls.get('parchiUserName')){
        setUsername(ls.get('parchiUserName'))
        setRole(ls.get('parchiUserRole'))
      }
      setToken(cookies.ParchiToken)
      getFiles()
    }
    
	},[Token])

  useEffect(()=>{
    if(Token!==''){
      fetch('https://parchiapp-backend.vercel.app/user/doctors',{ 
        method: 'get', 
        headers: new Headers({
            'token': `Bearer ${Token}`
        }),
    })
    .then(data=>  data.json()
    )
    .then((data) => {
      setDocs(data)
    })
    }
 
  },[Token])



  const getFiles=()=>{
    setLoading(true)
      if(Token !==''){
        handleFetchData()
      }
  }
  useEffect(()=>{
    getFiles()
  },[Token])



  useEffect(()=>{
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  },[])


  const logoutSubmit = ()=>{
    setLoading(true)
    ls.clear()
    Cookies.remove('ParchiToken')
    setTimeout(()=>{
      Router.push('/')
    },1200)
  }

  return <>
    <div className={`${loading? 'pointer-events-none':''} flex flex-wrap h-screen bg-gray-100  ${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-100 overflow-hidden'}`}>
      <div onClick={()=>setSidenav(false)} className={`bg-red-500 w-full h-16 px-4 rounded-b-lg ${theme === 'dark' ? 'shadow-red-500/50 shadow-lg' : ''}`}>
        <div className={`float-left lg:ml-6 mt-2 w-4/6 h-4/6 bg-gradient-to-r ${theme === 'dark'?'from-gray-700':'from-violet-700'} to-green-300 animate-pulsate rounded-lg`}>
          <p className="font-bold py-2 px-8 mb-2 text-2xl font-abril-fatface">
            ParchiApp
          </p>
        </div>
        <div onMouseEnter={() => { console.log("HOVER") }} onClickCapture={() => { setLogoutVisible(!logout) }} onMouseLeave={() => { setTimeout(() => { setLogoutVisible(false) }, 2500) }} className={`group br-1 p-2 text-2xl bg-gray-300 rounded-lg  hover:bg-gray-500 w-16 h-full float-right`}>
          <div className='p-2 px-4 bg-red-600 h-full w-full rounded-full'>
            <p className='visible group-hover:invisible '>{username.toUpperCase().charAt(0)}</p>
            <p className='invisible group-hover:visible relative -left-1.5 -top-8 '>⚙️</p>
          </div>
        </div>
      </div>
      <div className='w-full h-full bg-transparent lg:px-4'>
      {
          logout ?
            <div onClick={logoutSubmit} className={`transition ease-in-out absolute  h-14 w-60 bg-red-300 p-2 ${theme === 'dark' ? 'bg-black shadow-red-500/50 shadow-lg' : ''} rounded-lg right-2 z-50`}>
              <button className='h-full w-full border-2 border-current p-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 float-left">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
                <p className='px-8 mx-2'>Logout</p>
              </button>
            </div>
            :
            <></>
        }
        <div className={`w-full h-full  lg:p-8 ${theme !== 'dark' ?'bg-gray-200':'bg-transparent backdrop-blur'} p-3`}>
          <button onClick={() => setUpload(true)} className={`lg:mb-4 w-2/6 lg:w-1/6 h-8 lg:h-6 lg:h-12 border-2  border-black float-right rounded-lg lg:px-8 lg:py-2 px-2 lg:mx-2 relative font-bold right-4  text-black ${theme !== 'dark' ?'bg-cyan-600 hover:bg-cyan-300':'bg-cyan-400  hover:bg-cyan-300'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 float-left">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <p>Add new</p>
          </button>

          <div className='mt-10 px-4  border-2 border-black bg-gray-900 h-full w-full pb-20 overflow-x-hidden overflow-y-scroll no-scrollbar'>
            {
              shimmers ?
              Shimmers
              :
              files.length ===0 ?
              <div className={`backdrop-blur h-5/6 relative top-16 flex justify-center items-center bg-gray-800 text-white`}>
                <div className='flex flex-col'>
                <Image src="/img/not_found.gif" height={250} width={200} priority/>
                <p className={`relative top-4 font-bold text-xl font-mono p-4`}>Nothing here, add some ;)</p>
                </div>
              </div>
              :
              files.map((i: any) => {
                i.doc = i.doc.replace('https','http')
                return (
                  // eslint-disable-next-line react/jsx-key
                  <FileOptions
                    resource={i}
                    enabled={role==='Patient'}
                    show={files.indexOf(i)===0}
                    file={i.doc}
                    lf={setLoading}
                    setF= {setFilePOV}
                    Tok={Token}
                    sideNv={setSidenav}
                    setAcDocs={setacDocs}
                    setRefFile={setFileRef}
                    >
                      
                    <div className={`lg:px-4 lg: py-2 w-full h-28 ${theme !== 'dark' ?'bg-red-200':'bg-black'} rounded-lg flex`}>
                      <Image src={i.doc.includes('.pdf')?"/img/pdf.png":"/img/pic.png"} alt='' className='h-24 w-48 border-2 fixed ' width={100} height={48} />
                      <div className='w-full h-full flex flex-wrap px-4'>
                        <p className='font-bold font-sans w-24 truncate '>{i.doc.split('.')[0].split('secure-')[1]}</p>
                        <div className='font-medium w-full h-8'>
                          <p className={`float-left w-32 p-1  rounded-xl ${i.accessHolders.length===1? 'bg-red-700':'bg-blue-400'} p-1`}>
                          {
                        i.accessHolders.length===0? 'Private':`Shared with: ${i.accessHolders.length}`}
                          </p>
                          </div>
                      </div>
                    </div>
                  </FileOptions>
                )
                
              })
              
            }
            <FileRC file={filePOV} Tok={Token}/>
            <Dialogue show={loading} />
            <Upload Tok={Token} show={upload} ldng={setLoading}/>
          </div>          
        </div>
      </div>     
        <SideNav show={sidenav} setShow={setSidenav} docs={docs} acDocs={acDocs} Tok={Token} Doc={fileRef} ldng={setLoading}/>
    </div>
  </>
}

export default Dashboard