import Page from '@/components/page'
import Image from "next/image"
// 
const Index = ({data}:any) => (
	<Page>
			<h1>MONOREPO Setup Successful</h1>
			<Image src="http://localhost:3000/view/parchi-secure-22.FAL.png" alt="" height={500} width={500}/>
	</Page>
)

export default Index
