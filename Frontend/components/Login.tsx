export const Login: React.FC = ()=>{

    return (
        <>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Login to your account</h3>
        <form action="">
            <div className="mt-4">
                <div>
                    <label className="block" >Email</label>
                            <input type="text" placeholder="Email"
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"/>
                </div>
                <div className="mt-4">
                    <label className="block">Password</label>
                            <input type="password" placeholder="Password"
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"/>
                </div>
                <div className="flex items-baseline justify-between">
                    <button className="px-6 py-2 mt-4 text-white bg-red-400 rounded-lg hover:bg-red-600">Login</button>
                    <a href="#" className="text-xs text-red-400 hover:underline">Sign Up?</a>
                </div>
            </div>
        </form>
    </div>
</div>
</>
    )
}