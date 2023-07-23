import { ProjectInterface, UserProfile } from '@/common.types'
import Image from 'next/image'
import Link from 'next/link'

import Button from "./Button";
import ProjectCard from './ProjectCard';


type Props = {
    user: UserProfile;
}
const ProfilePage = ({ user }: Props) => (
    <section className='flexCenter flex-col max-w-10xl w-full mx-auto lg:px-20 px-8 pt-8 pb-14'>
        <section className="flexStart max-md:flex-col flex-nowrap gap-10 md:gap-8 w-full">
        {user?.projects?.edges?.length > 0 ? (
                <Image
                    src={user?.projects?.edges[0]?.node?.image}
                    alt="project image"
                    width={739}
                    height={554}
                    className='self-start rounded-none object-contain order-1 md:order-2'

                />
            ) : (
                <Image
                    src="/profile-post.png"
                    width={739}
                    height={554}
                    alt="project image"
                    className='self-start rounded-none order-1 md:order-2'
                />
            )}
            <div className='flex items-start flex-col w-full order-2 md:order-1'>
                <Image src={user?.avatarUrl} width={85} height={85} className="rounded-full" alt="user image" />
                <p className="lg:text-3xl text-lg font-bold lg:mt-6 mt-3">{user?.name}</p>
                <p className="lg:text-5xl text-3xl font-extrabold lg:mt-3 mt-1 max-w-md">Available for your projects 👋</p>  
                <div className="flex lg:mt-8 mt-6 gap-5 w-full flex-wrap">
                     <Link href={`mailto:${user?.email}`}>
                        <Button 
                        title="Hire Me"  
                        bgColor='bg-black'
                        py='py-4'
                        />
                    </Link>
                    <Link href={`mailto:${user?.email}`}>
                    <Button 
                        title="Follow" 
                        bgColor="bg-white" 
                        textColor="text-black" 
                        border="border-2"
                        borderColor='border-black'
                        hover="hover:bg-light-white-300"
        
                    />
                    </Link>
                   
                </div>
            </div>           
       </section>

       <section className="flexStart flex-col mt-20 w-full">
           <p className="w-full text-left text-md font-semibold">
               Recent Work
               <span className="text-gray-60 ml-2">{user?.projects?.edges?.length}</span>
           </p>
           
           <div className="profile_projects w-full">
                {user?.projects?.edges?.reverse().map(
                    ({ node }: { node: ProjectInterface }) => (
                        <div className="flexCenter profile_project-card drop-shadow-card">
                            <Link href={`/project/${node?.id}`} className="flexCenter group relative w-full h-full">
                                <Image src={node?.image} width={414} height={314} className="w-full h-full object-cover rounded-lg" alt="project image" />
                                <div className="hidden group-hover:flex related_project-card_title">
                                    <p className="w-full">{node?.title}</p>
                                </div>
                            </Link>
                        </div>
                    )
                )}
            </div>
       </section>
   </section>
)

export default ProfilePage