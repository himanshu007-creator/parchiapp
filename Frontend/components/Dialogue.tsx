import { useTheme } from "next-themes"
import Image from "next/image"

interface DialogueProps{
    show: boolean
    message?: string
}
const Dialogue:React.FC<DialogueProps> = ({show,message}: DialogueProps)=>{
    const theme = useTheme().systemTheme
    return(
        <>
        {
            show ?
            <div  className={`absolute top-[29%] items-center justify-center lg:left-[42%] lg:top-80 left-[8%] top-70 inset-x-42  pr-8 pl-8 pb-8 pt-4 py-6 mt-2 text-left  flex items-center justify-center  rounded-xl backdrop-blur-2xl ${theme==='dark' ? ' border-4 border-red-400 shadow-red-200':''} shadow-lg w-80 h-80 z-40`}>
            {
                message?
                <p className='font-bold text-black font-2xl'>Message</p>:
                <Image src="/img/loading.svg" alt="me" width="80" height="80" />           
            }
            </div>:
            <></>

        }
        
        </>
    )
}

export default Dialogue