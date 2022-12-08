import { useTheme } from "next-themes"
import Image from "next/image"
import Router from "next/router"
import { useEffect, useState } from "react"

interface FileProps{
    file:string
    Tok:string
}
const FileRC:React.FC<FileProps> = ({file,Tok}:FileProps)=>{
    const [lfile,setlFile] = useState('')
    useEffect(()=>{
            document.addEventListener('contextmenu', (e) => {
              e.preventDefault();
            });
        setlFile(file)
        return()=>{
            setVisible(true)
        } 
    },[])

    const closeFile = ()=>{
        setVisible(false)
        Router.reload()
    }

    const theme = useTheme().systemTheme
    const [visible,setVisible] = useState(true)
    // "https://parchiapp-backend.vercel.app/view/${file}?q=${Tok}"
    const fetchURL = `https://parchiapp-backend.vercel.app/view/${file}?q=${Tok}`
    return(
        <>
        {
             file && visible ?
            <>
            <div className="absolute w-[100%] h-[100%] top-0 left-0 bg-transparent backdrop-blur-lg z-20">
                <div className="lg:m-16 lg:p-20 p-5  h-full top-2">
                    <div  className="bg-gray-300 w-full h-full top-2">
                        <p className="w-4/6 h-10 float-left m-4 font-bold text-2xl align-center justify-center relative left-[10%] text-center">{file.split('.')[0]}</p>
                        <p onClick={closeFile} className="absolute float-right relative right-[10px] top-2 bg-gray-800 hover:bg-red-700 border-2 p-3 px-4 rounded-full text-white font-bold">X</p>
                        {
                            file.includes('.pdf')
                            ?
                            <>
                            <iframe width="100%" height="700px" src={fetchURL+'#toolbar=0&navpanes=0&scrollbar=0'} onMouseDown={()=>false} id="pdf_content" onContextMenu={()=>false} >
                                    <p>IPDF's aint loyal to mobile devices yet bruv</p>
                                </iframe>
                            
                            {/* <embed src={fetchURL+'#toolbar=0&navpanes=0&scrollbar=0'} type="application/pdf" width="100%" height="700px" onMouseDown={()=>alert('not allowed')} id="OBG" /> */}
                            </>
                            :
                            <>
                            
                            <Image src={fetchURL} alt='' width={1800} height={800} className="relative lg:pt-0 p-6 top-[40px]" />
                            </>
                            
                        }
                                    
                    </div>
                </div>
           </div>
            </>
        :
        <></>
        }
        </> 
    )
}

export default FileRC