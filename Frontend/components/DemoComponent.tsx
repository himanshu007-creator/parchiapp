import React, {useState} from 'react';
import Image from 'next/image'
import { useRouter } from 'next/router'

export const DemoComponent: React.FC = () => {
  // value is the current value;
  // setValue is an updater function;
  // We can also pass an initial value 
  // into useState as an argument.
  const [value, setValue] = useState(0);
  const { asPath } = useRouter();
  const origin =
  typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';

const baseURL = `${origin}${asPath}`;
const ImgURL = baseURL.replace('8080','3000')
  return <>
    <span>{value}</span>
    <Image src={`${ImgURL}view/parchi-secure-22.FAL.png`} alt="" height={500} width={500}/>

   </>
}