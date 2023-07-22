'use client'
import {useState, useEffect} from 'react'
import {ProjectInterface} from '@/common.types';
import ProjectCard from '@/components/ProjectCard';

type Props = {
	data: Array<ProjectInterface>
}

const ProjectCards = ({data} : Props) => {
    const currentParams = new URLSearchParams(window.location.search)
	const [projectsToDisplay, setProjectsToDisplay] = useState([])
	useEffect(() => {
		
		//@ts-ignore
		if (currentParams.size <= 1) {
			setProjectsToDisplay([...data])
		}
		setProjectsToDisplay((prevState) => [...prevState, ...data])
		console.log(projectsToDisplay)
	}, [data]);

	return (
					<>
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
			  </>
	)
}

export default ProjectCards