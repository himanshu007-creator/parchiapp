import { useTheme } from "next-themes"
import Image from "next/image"
import Router from "next/router"
import { useEffect, useState } from "react"

interface FileProps{
    Tok:string
    show:boolean
    ldng:any
}
const Upload:React.FC<FileProps> = ({Tok,show,ldng}:FileProps)=>{
    const [visible, setVisible] = useState(true)
    const [cancel,setCancel] = useState(true)
    const [file, setFile] = useState<any>()
    useEffect(()=>{
            document.addEventListener('contextmenu', (e) => {
              e.preventDefault();
            });
        return()=>{
            if(Tok!==''){
                // setVisible(true)
            }
        } 
    },[])

    const onCancel = ()=>{
        Router.reload()
        setVisible(false)
    }

    const uploadFIle = () => {
        setCancel(false)
        ldng(true)
        var data = new FormData()
        data.append('file', file)
        fetch('https://parchiapp-backend.vercel.app/file/upload',{ 
            method: 'POST', 
            headers: new Headers({
                'token': `Bearer ${Tok}`
            }),
            body: data
        })
        .then(data=>  data.json()
        )
        .finally(()=>{
            ldng(false)
            Router.reload()
        })
      }

    // const closeFile = ()=>{
    //     setVisible(false)
    //     Router.reload()
    // }

    // const theme = useTheme().systemTheme
    // const [visible,setVisible] = useState(true)
    // // "https://parchiapp-backend.vercel.app/view/${file}?q=${Tok}"
    // const fetchURL = `https://parchiapp-backend.vercel.app/view/${file}?q=${Tok}`
    return(
        <>
        {
            visible && show?
            <div className="absolute w-[100%] h-[100%] top-0 left-0 bg-transparent backdrop-blur-lg z-20">
                <div className="lg:m-16 lg:p-20 p-5  h-full top-2">
                <div className="w-full md:w-96 md:max-w-full mx-auto">
                <div  className="bg-gray-300 w-full h-full ">

            <div className=" mt-48 p-6 border border-gray-300 sm:rounded-md">
                <label className="block mb-6">
                    <span className="text-gray-700">[Pdf / jpeg / jpg / png]</span>
                    <input
                        // @ts-expect-error
                        onChange={(e)=>{setFile(e.target.files[0]); console.log(e.target.files[0])}}
                        required
                        name="photo"
                        type="file"
                        accept="image/png, image/gif, image/jpeg, application/pdf"
                        className="
                        block
                        w-full
                        mt-1
                        focus:border-indigo-300
                        focus:ring
                        focus:ring-indigo-200
                        focus:ring-opacity-50
                        text-black  
                        font-bold
                    "
                    />
                </label>
                <div className="mb-6">
                    <button
                        onClick={uploadFIle}
                        type="submit"
                        className={`
                        h-10
                        px-5
                        text-indigo-100
                        bg-indigo-800
                        rounded-lg
                        transition-colors
                        duration-150
                        focus:shadow-outline
                        hover:bg-indigo-500
                        ${file? 'bg-green-500':''}
                        `}
                    >
                        Upload
                    </button>
                    {
                        cancel?
                        <button
                        type="submit"
                        className="
                        ml-4
                        h-10
                        px-5
                        text-indigo-100
                        bg-red-800
                        hover:bg-red-500
                        rounded-lg
                        transition-colors
                        duration-150
                        focus:shadow-outline
                        hover:bg-indigo-800
                        "
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    :
                    <></>
                    }
                    
                </div>
                <div>
                    <div className="mt-2 text-gray-700 text-right text-xs">
                        ParchiApp- Backend <b>Live <span className="animate-ping absolute inline-flex h-1 w-1 rounded-full bg-red-700 "></span></b>
                    </div>
                </div>
            </div>
        </div>
</div>
                </div>
        </div>

            :
            <></>

        }
        
        </>
        
       
    )
    }

export default Upload