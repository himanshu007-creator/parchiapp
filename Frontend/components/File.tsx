import { useTheme } from "next-themes"
import Image from "next/image"
import { useState } from "react"

interface FileProps{
    file:string
}
const FileRC:React.FC<FileProps> = ({file}:FileProps)=>{
    const [lfile,setlFile] = useState('')

    const theme = useTheme().systemTheme
    return(
        <>
        {
            lfile ?
            <>
            <div className="absolute w-screen h-screen bg-transparent backdrop-blur">
            <div className="lg:m-16 lg:p-20 p-5 bg-pink h-full">
                <p className="bg-gray-300 w-full h-full">
                    <p onClick={()=>{setlFile('')}} className="absolute float-right relative right-[10px] top-2 bg-gray-800 hover:bg-red-700 border-2 p-3 px-4 rounded-full text-white font-bold">X</p>
                    <p>{file}</p>
                </p>
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