import { Auth } from '@/components/Auth'
import loggedInStatus from '@/utils/loggedin'
import  Router  from 'next/router'
import { useEffect } from 'react'


const Index = () => {
	useEffect(()=>{
		if(loggedInStatus()){
			Router.push("/dashboard")
		}
	},[])
	return(
		<>
		    <Auth mode="Login"/>
		</>
	)
	
	}

export default Index
