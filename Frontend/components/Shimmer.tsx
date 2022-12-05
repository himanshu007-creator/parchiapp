const Shimmer:React.FC = ()=>{
    return (
        <div className='p-2 lg:px-4 lg: py-2 my-3 w-full mb-8 h-28 bg-red-200 rounded-lg flex'>
        <p className='h-24 w-[300px] border-2 animate-pulse bg-blue-200 rounded-lg'></p>
        <div className='w-[230px] lg:w-full h-full flex flex-wrap px-2 py-1'>
          <div className='w-full h-10'>
            <p className='animate-pulse bg-cyan-200 w-48 h-10 rounded-full'></p>
          </div>
          <p className='animate-pulse bg-green-400 w-64 lg:w-96 h-10 rounded-full'></p>
        </div>
      </div>
    )
}

export default Shimmer