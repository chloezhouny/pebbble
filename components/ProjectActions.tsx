'use client'
import {useState} from 'react'
import {useRouter} from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {fetchToken, deleteProject} from '@/lib/actions'



const  ProjectActions = ({projectId}: {projectId: string}) => {
	const [isDeleting, setIsDeleting] = useState(false);
	const router = useRouter();

	const handleDeleteProject = async () => {
		setIsDeleting(true);
		const {token} = await fetchToken();
		try{
			await deleteProject(projectId, token)
			router.push('/')
		} catch(error){
			console.log(error)
		} finally {
			setIsDeleting(false)
		}
	}
	return (
		<>
			<Link 
			className="flexCenter text-sm"
			href={`/edit-project/${projectId}`}>
				Edit shot details
			</Link>
			<button
			className={'flexCenter text-sm'}
			onClick={handleDeleteProject}>
				Delete		
			</button>
		</>
	)
}

export default ProjectActions