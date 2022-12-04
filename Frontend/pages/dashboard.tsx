import { useTheme } from 'next-themes';
import React, {useState} from 'react';


const Dashboard: React.FC = () => {
  const theme = useTheme().systemTheme

  return <>
  <div className={`flex flex-wrap h-screen bg-gray-100 ${theme==='dark' ? 'bg-zinc-900':'bg-gray-100 overflow-hidden'}`}>
    <div className={`bg-red-500 w-full h-16 px-4 rounded-b-lg ${theme==='dark' ? 'shadow-red-500/50 shadow-lg':''}`}>
      {/* {header} */}
      <div className={`br-1 p-2 text-2xl bg-gray-300 rounded-lg hover:bg-gray-500 w-16 h-full float-right`}>
        <div className='p-2 px-4 bg-red-600 h-full w-full rounded-full'>
          H
        </div>
      </div>
    </div>
    <div className='w-full h-full bg-transparent px-4'>
      {/* <div className={`float-right h-14 w-60 bg-red-300 p-2 ${theme==='dark'? 'bg-black shadow-red-500/50 shadow-lg':''} rounded-lg`}>
          <button className='h-full w-full border-2 border-current p-2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 float-left">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            <p className='px-8 mx-2'>Logout</p>
          </button>
      </div> */}
      <div className='w-full h-full p-4'>
        
      </div>
    </div>

  </div>
         </>
}

export default Dashboard