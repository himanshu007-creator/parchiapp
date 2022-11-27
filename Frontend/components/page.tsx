import Head from 'next/head'
import { DemoComponent } from './DemoComponent'

interface Props {
	title?: string
	children?: React.ReactNode
}

const Page = ({ title, children }: Props) => (
	<>
		{title ? (
			<Head>
				<title>ParchiApp | {title}</title>
			</Head>
		) : null}

		{/* <Appbar /> */}

		<main
			/**
			 * Padding top = `appbar` height
			 * Padding bottom = `bottom-nav` height
			 */
			className='mx-auto max-w-screen-md pt-20 pb-16 px-safe sm:pb-0'
		>
			<div className='p-6'>{children}</div>
			<h1>MONOREPO Setup Successful</h1>
			<DemoComponent/>
		</main>

		{/* <BottomNav /> */}
	</>
)

export default Page
