import React, {useState} from 'react';
import Image from 'next/image'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { GetServerSideProps } from 'next';
import { GetStaticProps } from 'next';
import { NextRequest, NextResponse } from 'next/server';

export const DemoComponent: React.FC = () => {
  const [token, setToken] = useState('')
  useState(async()=>{
    Cookies.set('act', 'TOKEN HERE')
    const Tk =  Cookies.get('act') || ''
    console.log(">> TK:  ", Tk)
    setToken(Tk)
  })
  const Token = Cookies.get('act')
  console.log(">>> TOKEN: ",token )
  const [value, setValue] = useState(0);
  const { asPath } = useRouter();
  const origin =
  typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';

const baseURL = `${origin}${asPath}`;
const imgURL = baseURL.replace('3000','8080')
  return <>
    <span>{value}</span>
    <Image src={`http://parchiapp-backend.vercel.app/view/parchi-secure-american_psycho.jpg?q=${token}`} alt="" height={500} width={800}/>
   </>
}