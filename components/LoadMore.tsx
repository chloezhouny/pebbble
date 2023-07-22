'use client'
import {useState,useEffect} from 'react';
import {IoIosArrowRoundUp} from 'react-icons/io';
import {useRouter} from 'next/navigation';
import {ProjectInterface} from '@/common.types'

import Button from './Button';
import ProjectCard from '@/components/ProjectCard';

const NUMBERPERLOAD = 12;

type Props = {
	startCursor:string;
    endCursor:string;
	hasPreviousPage:boolean;
	hasNextPage:boolean;
	projects:{node: ProjectInterface}[]
}
const LoadMore = ({startCursor, endCursor, hasPreviousPage, hasNextPage, projects} : Props) => {
	const router = useRouter();
	const [currentIndex, setCurrentIndex] = useState(NUMBERPERLOAD-1)
	const [offset, setOffset] = useState(0);
	const handleNavigation = (type: string) => {
		if (currentIndex + NUMBERPERLOAD < 100 && type === 'next') {
			setCurrentIndex((prevIndex: number) => prevIndex + NUMBERPERLOAD)
		} else {
			const currentParams = new URLSearchParams(window.location.search)
			 if (type === "prev") {
           		 currentParams.delete("endcursor");
           		 currentParams.set("startcursor", startCursor);
         	}
			if (type === "next") {
				currentParams.delete("startcursor");
				currentParams.set('endcursor', endCursor)
			}
			const newSearchParams = currentParams.toString();
			const newPathName = `${window.location.pathname}?${newSearchParams}`
			router.push(newPathName)
		}
		
	}
	const handleScroll = () => {
    	const position = window.pageYOffset;
    	setOffset(position);
	};  
	const handleToTop = () => {
		 window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
	}
	useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
	return (
		<>
		<section className="projects-grid xl:px-2">
				{projects.slice(0, currentIndex + 1).map(({node} : {node: ProjectInterface}) => (
					<ProjectCard 
					key={node?.id}
					id={node?.id}
					image={node?.image}
					title={node?.title}
					name={node?.createdBy?.name}
					avatarUrl={node?.createdBy?.avatarUrl}
					userId={node?.createdBy?.id}
					/>
				))}
			</section>
		<div className="w-full flexCenter gap-5 mt-8">
		    {hasPreviousPage && currentIndex >= projects.length - 1 && (
                <Button 
                title="<< Back" 
				bgColor="bg-light-white-300"
				textColor="text-black"
                handleClick={() => handleNavigation('prev')} 
                bgOpacity='bg-opacity-50'
				hover="hover:bg-opacity-100"
                />
            )}
            {(hasNextPage || currentIndex <= projects.length - 1) && (
				<Button 
				title="Load more work" 
				px="px-16"
				bgColor="bg-light-white-300"
				textColor="text-black"
				handleClick={() => handleNavigation('next')}
				bgOpacity='bg-opacity-50'
				hover="hover:bg-opacity-100"
				/>
				)
			}
			{
				offset > 50 && (
				<div className='fixed bottom-[10%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        			<IoIosArrowRoundUp onClick={handleToTop} size={30} />
      			</div>
				)
			}	
		</div>
		</>
	)
}

export default LoadMore