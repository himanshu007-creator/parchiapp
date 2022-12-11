import Image from "next/image"
import Router from "next/router"
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, useState, useEffect } from "react"
interface props{
    setShow:any
    show:boolean
    docs:any
    acDocs: any
    Tok:any
    Doc: string
    ldng: any
    stpv:any
    user:string
}
const SideNav:React.FC<props> = ({show,setShow,docs,acDocs, Tok,Doc,ldng,user,stpv}:props)=>{
  const accessHolders = docs.filter((doc: {
    username: string 
    id: any 
})=>{return acDocs.includes(doc.id) && doc.username !== user})
  const restAllDocs = docs.filter((doc: {
    username: string ,id: any 
})=>{return !acDocs.includes(doc.id) && doc.username !== user})
  const fetchUrl = 'https://parchiapp-backend.vercel.app/user/tgldocacc'


    const hideShit = ()=>{
      setShow(false)
      stpv('')
    }

    const changeAccess = (id:string,mode:string)=>{
        const body = {
            doc:Doc,
            doctor:id,
            action:mode
        }
        ldng(true)
        fetch(fetchUrl,{ 
            method: 'POST', 
            headers: new Headers({
              'Content-Type': 'application/json',
                'token': `Bearer ${Tok}`
            }),
            body: JSON.stringify(body)
        })
        .then(data=>data.json())
        .finally(()=>{
          ldng(false)
          Router.reload()
        })
    }

    return (
        <>
        {
            show && docs.length!==0 ? 
            <>
             <div onClick={hideShit} className=" duration-300 transition ease-in-out delay-150 w-full h-full bg-transparent  z-30 left-0 absolute backdrop-blur-sm"> </div>
        <div className="duration-300 transition ease-in-out delay-150 w-60 h-full shadow-md bg-white absolute right-0 z-30" id="sidenavSecExample">
  <div className="pt-4 pb-2 px-6">
    <a href="#!">
      <div className="flex items-center">
        <div className="shrink-0">
          <Image src="/img/security.png" className="rounded-full w-10" alt="Avatar" height={42} width={42}/>
        </div>
        <div className="grow ml-3">
          <p className="text-sm font-semibold text-blue-600">Manage Access</p>
        </div>
      </div>
    </a>
  </div>
  <ul className="relative px-1">
    <li className="relative">
      <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" className="w-3 h-3 mr-3" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="currentColor" d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path>
        </svg>
        <span>Non-collapsible link</span>
      </a>
    </li>
   </ul>
   <ul className="relative px-1 border-2">
   {
    accessHolders.map((i: { id: string; username: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined })=>(
                <li onClick={()=>changeAccess(i.id,'delete')} className="relative bg-green-200" data-mdb-yoyo={i.id}>
                    <p  className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"  data-mdb-ripple="true" data-mdb-ripple-color="primary">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" className="w-3 h-3 mr-3" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="currentColor" d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path>
                        </svg>
                        <span>{i.username}</span>
                    </p>
                </li>
        )
    )
   }
   </ul>
   <ul className="relative px-1" ></ul>
   <ul className="relative px-1 border-2">
   {
    restAllDocs.map((i: { _id: string | undefined; username: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined })=>(
                // @ts-ignore
                <li onClick={()=>changeAccess(i.id,'add')} className="relative bg-red-200" data-mdb-yoyo={i.id}>
                    <p className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"  data-mdb-ripple="true" data-mdb-ripple-color="primary">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" className="w-3 h-3 mr-3" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="currentColor" d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path>
                        </svg>
                        <span>{i.username}</span>
                    </p>
                </li>
        )
    )
   }
   </ul>


   
   
</div>
            </>
            :
            <></>
        }
        </>
       
        
    )
}

export default SideNav