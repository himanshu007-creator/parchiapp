import Dialogue from '@/components/Dialogue';
import FileOptions from '@/components/HoverOptions';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Shimmer from '@/components/Shimmer';
import * as ls from "local-storage";
import Cookies from 'js-cookie'
import Router from 'next/router';


const Dashboard: React.FC = () => {
  const theme = useTheme().systemTheme
  const [logout, setLogoutVisible] = useState(false)
  const [loading, setLoading] = useState(true)
  const Shimmers = new Array(6).fill(<Shimmer/>)

  useEffect(()=>{
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  },[])

  const logoutSubmit = ()=>{
    ls.clear()
    Cookies.remove('ParchiToken')
    setTimeout(()=>{
      Router.push('/')
    },1200)
  }

  return <>
    <div className={`${loading? 'pointer-events-none':''} flex flex-wrap h-screen bg-gray-100  ${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-100 overflow-hidden'}`}>
      <div className={`bg-red-500 w-full h-16 px-4 rounded-b-lg ${theme === 'dark' ? 'shadow-red-500/50 shadow-lg' : ''}`}>
        <div className={`float-left lg:ml-6 mt-2 w-4/6 h-4/6 bg-gradient-to-r ${theme === 'dark'?'from-gray-700':'from-violet-700'} to-green-300 animate-pulsate rounded-lg`}>
          <p className="font-bold py-2 px-8 mb-2 text-2xl font-abril-fatface">
            ParchiApp
          </p>
        </div>
        <div onMouseEnter={() => { console.log("HOVER") }} onClickCapture={() => { setLogoutVisible(!logout) }} onMouseLeave={() => { setTimeout(() => { setLogoutVisible(false) }, 2500) }} className={`group br-1 p-2 text-2xl bg-gray-300 rounded-lg  hover:bg-gray-500 w-16 h-full float-right`}>
          <div className='p-2 px-4 bg-red-600 h-full w-full rounded-full'>
            <p className='visible group-hover:invisible '>H</p>
            <p className='invisible group-hover:visible relative -left-1.5 -top-8 '>⚙️</p>
          </div>
        </div>
      </div>
      <div className='w-full h-full bg-transparent lg:px-4'>
      {
          logout ?
            <div onClick={()=>logoutSubmit} className={`transition ease-in-out absolute  h-14 w-60 bg-red-300 p-2 ${theme === 'dark' ? 'bg-black shadow-red-500/50 shadow-lg' : ''} rounded-lg right-2 z-50`}>
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
        <div className='w-full h-full  lg:p-8 bg-green-100 p-3'>
          <button onClick={() => { console.log("hey") }} className='lg:mb-4 w-2/6 lg:w-1/6 h-8 lg:h-6 lg:h-12 border-2  border-black float-right rounded-lg lg:px-8 lg:py-2 px-2 lg:mx-2 relative right-4 bg-cyan-500'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 float-left">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <p className='text-sm lg:text-xl py-1.5 lg:py-0 font-medium'>Add file</p>
          </button>

          <div className='mt-10 px-4  border-2 border-black bg-gray-900 h-full w-full overflow-x-hidden overflow-y-scroll no-scrollbar'>
            {
              loading ?
              Shimmers
              :
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <FileOptions
                    show={i === 1}
                    >
                    <div className={`p-2 lg:px-4 lg: py-2 my-3 w-full h-28 ${theme !== 'dark' ?'bg-red-200':'bg-black'} rounded-lg flex`}>
                      <Image src="/img/musk.jpeg" alt='' className='h-24 w-48 border-2 fixed ' width={100} height={48} />
                      <div className='w-full h-full flex flex-wrap px-4'>
                        <p className='font-bold font-sans w-full'>AAAAAA</p>
                        <p className='font-medium'>Access Holders: Elon Musk</p>
                      </div>
                    </div>
                  </FileOptions>
                )
              })
            }
                      <Dialogue show={true}/>

          </div>
          
        </div>
      </div>

    </div>
  </>
}

export default Dashboard