import Image from 'next/image';

import {ProjectInterface} from '@/common.types'
import {fetchAllProjects} from '@/lib/actions';
import ProjectCard from '@/components/ProjectCard';
import Categories from '@/components/Categories';
import LoadMore from '@/components/LoadMore';


type SearchParams = {
   category?: string | null;
   endcursor?: string | null;
}

type Props = {
	searchParams: SearchParams
}

export const dynamic = 'force-dynamic'
export const dynamicParams = true;
export const revalidate = 0;


type ProjectSearch = {
	projectSearch: {
		edges: {node: ProjectInterface}[];
		pageInfo: {
			hasPreviousPage: boolean;
			hasNextPage: boolean;
			startCursor: string;
			endCursor: string;
		}
	}
}
const Home = async ({ searchParams: {category, endcursor}}: Props) => {
	if (!category) {
		category = 'Discover'
	}
	if (!endcursor) {
		endcursor=undefined
	}
	const data = await fetchAllProjects(category, endcursor) as ProjectSearch;
	console.log(data);
	const projectsToDisplay = data?.projectSearch?.edges || [];
	if (projectsToDisplay.length === 0) {
		return (
			<section className="flexStart flex-col paddings">
					<Categories />
				<div className="no-result-text text-center flex-col flexCenter">
					<Image className='mt-14' src={'/no-result.jpeg'} width={250} height={220} alt='no-result'/>
					<p className="mt-2">No projects :(</p>
				   <p className="text-gray-70 text-sm">{`It looks like no one has uploaded any ${category} shots yet. Create your own first!`}</p>
			    </div>
			  
			</section>
		)
	}

	const pagination = data?.projectSearch?.pageInfo;

	return (
		<section className="flex-start flex-col paddings mt-10 lg:-mt-1">
		<Categories />
			<LoadMore 
			startCursor={pagination.startCursor}
			endCursor={pagination.endCursor}
			hasPreviousPage={pagination.hasPreviousPage}
			hasNextPage={pagination.hasNextPage}
			projects={projectsToDisplay}
			/>

		</section>
	)
}

export default Home;