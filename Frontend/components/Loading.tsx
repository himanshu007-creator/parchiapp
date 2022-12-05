import { useTheme } from "next-themes"
import Image from "next/image"
const Loading:React.FC = ()=>{
    const theme = useTheme().systemTheme
    return(
        <>
            <div  className={`absolute top-[30%] items-center justify-center  lg:left-[40%] lg:top-80 left-[6%] top-36 inset-x-42  pr-8 pl-8 pb-8 pt-4 py-6 mt-2 text-left  flex items-center justify-center  rounded-xl bg-transparent backdrop-blur-sm ${theme==='dark' ? ' border-4 border-red-400 shadow-red-200':''} shadow-lg w-80 h-80`}>
            <Image src="/img/loading.svg" alt="me" width="80" height="80" />           
            </div>

        </>
    )
}

export default Loading