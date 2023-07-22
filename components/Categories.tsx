'use client'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import { categoryFilters } from '@/constants'
const Categories = () => {
	const router = useRouter();
	const pathName = usePathname();
	const searchParams = useSearchParams();
	const category = searchParams.get('category') || 'Discover';

	const handleTags = (filter:string) => {
		router.push(`${pathName}?category=${filter}`)
	}
	return (
		<div className="flexCenter w-full lg:w-2/3 gap-5 flex-wrap mx-auto">
			<ul className='flex gap-2 overflow-auto categories'>
			<button
					key='Discover'
					type="button"
					onClick={() => handleTags('Discover')}
					className={`${category === 'Discover' ? 
					'bg-light-white-600 font-medium' : 
					'font-normal text-black'} 
					px-4 py-2 rounded-lg text-sm capitalize whitespace-nowrap hover:text-gray-70`}
					>
					Discover	
					</button>
				{categoryFilters.map((tag) => (
					<button
					key={tag}
					type="button"
					onClick={() => handleTags(tag)}
					className={`${category === tag ? 
					'bg-light-white-600 font-medium' : 
					'font-normal text-black'} 
					px-4 py-2 rounded-lg text-sm capitalize whitespace-nowrap 
					hover:text-gray-70`}
					>
					{tag}	
					</button>
				))}
			</ul>
		</div>
	)
}

export default Categories