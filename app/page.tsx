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
		endcursor=null
	}
	const data = await fetchAllProjects(category, endcursor) as ProjectSearch;
	console.log(data);
	const projectsToDisplay = data?.projectSearch?.edges || [];
	if (projectsToDisplay.length === 0) {
		return (
			<section className="flexStart flex-col paddings">
					<Categories />
				<p className="no-result-text text-center">No projects found, go create some first</p>
			</section>
		)
	}

	const pagination = data?.projectSearch?.pageInfo;

	return (
		<section className="flex-start flex-col paddings mt-10 lg:-mt-1">
		<Categories />
			{/*<section className="projects-grid xl:px-2">
				{projectsToDisplay.map(({node} : {node: ProjectInterface}) => (
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
			</section>*/}
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