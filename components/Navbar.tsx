import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import AuthProviders from '@/components/AuthProviders'
import {NavLinks} from '@/constants';
import { getCurrentUser} from '@/lib/session'
import {signOut} from 'next-auth/react'

import ProfileMenu from './ProfileMenu'
import Button from './Button'

const Navbar = async () => {
	const session = await getCurrentUser();
	return (
		<nav className="flexBetween navbar">
			<div className="flex-1 flexStart gap-10">
				<Link href="/">
					<Image 
					src='/logo.png'
					width={115}
					height={43}
					alt="Pebbble"
					/>
				</Link>	
				<ul className="xl:flex hidden text-sm font-medium gap-7">
					{NavLinks.map((link) => (
						<Link href={link.href} className="hover:text-gray" key={link.key}>
							{link.text}
						</Link>
					))}
				</ul>		
			</div>
			<div className="flexCenter gap-4">
				{session?.user ? (
				<>
					<Link href="/create-project" className='hidden xl:inline-block'>
					 <Button 
                        title="Share Work"  
                        bgColor='bg-black'
                        py="py-4"
                        />
					</Link>
					<ProfileMenu session={session}/>
				
			    </>
				) : (
				<AuthProviders />
				)}
			</div>
		</nav>
	)
}


export default Navbar