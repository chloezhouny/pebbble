'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import {UserProfile, ProjectInterface} from '@/common.types';
import {getUserProjects} from '@/lib/actions'

type Props = {
	userId: string;
	projectId: string;

}
// const RelatedProjects = async ({userId, projectId}:Props) => {
// 	const result = await getUserProjects(userId) as {user?: UserProfile}
// 	const filteredProjects = result?.user?.projects?.edges?.filter(
// 		({node}:{node: ProjectInterface}) => node?.id !== projectId)

//     if (!filteredProjects) return null;
//     if (filteredProjects.length === 0) return null;
const RelatedProjects: React.FC<Props> = ({ userId, projectId }) => {
  const [filteredProjects, setFilteredProjects] = useState<ProjectInterface[]>([]);
  const [user, setUser] = useState<UserProfile | undefined>();;
  useEffect(() => {
    const fetchProjects = async () => {
      const result = await getUserProjects(userId) as { user?: UserProfile };
      const projects = result?.user?.projects?.edges?.map(edge => edge.node);
      if (projects) {
      	setUser(result?.user);
        const filteredProjects = projects.filter(project => project.id !== projectId);
        setFilteredProjects(filteredProjects);
      }
    };
    fetchProjects();
  }, [userId, projectId]);

	return (
		<section className="flex flex-col mt-32 w-full">
			<div className='flexBetween'>
				<p className='text-base font-bold'>More by {user?.name}</p>
				<Link href={`/profile/${user?.id}`}
				className="text-primary-pink text-base"
				>
					View profile
				</Link>
			</div>
			<div className="related_projects-grid">
                {filteredProjects?.map((project: ProjectInterface) => (
                    <div className="flexCenter related_project-card drop-shadow-card">
                    <Link href={`/project/${project?.id}`} className="flexCenter group relative w-full h-full">
                        <Image src={project?.image} width={414} height={314} className="w-full h-full object-cover rounded-lg" alt="project image" />
                        <div className="hidden group-hover:flex related_project-card_title">
                            <p className="w-full">{project?.title}</p>
                        </div>
                    </Link>
                    </div>
                ))}
            </div>
		</section>
	)
}

export default RelatedProjects