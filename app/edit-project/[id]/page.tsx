import {redirect} from 'next/navigation'

import Modal from '@/components/Modal'
import ProjectForm from '@/components/ProjectForm'

import {getProjectDetails} from '@/lib/actions'
import {ProjectInterface} from '@/common.types'
import {getCurrentUser} from '@/lib/session';

const EditProject = async ({params: {id}}: {params: {id: string}}) => {
	const session = await getCurrentUser();
	if(!session?.user) redirect('/');

	const result = await getProjectDetails(id) as {
		project?: ProjectInterface
	}
	return (
		<Modal>
			<ProjectForm type="edit" session={session} project={result?.project}/>
		</Modal>
	)
}

export default EditProject