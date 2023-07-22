import Image from "next/image"
import Link from "next/link"

import { getCurrentUser } from "@/lib/session"
import { getProjectDetails } from "@/lib/actions"
import Modal from "@/components/Modal"
import ProjectActions from "@/components/ProjectActions"
import RelatedProjects from "@/components/RelatedProjects"
import { ProjectInterface } from "@/common.types"

const Project = async ({ params: { id } }: { params: { id: string } }) => {
    const session = await getCurrentUser()
    const result = await getProjectDetails(id) as { project?: ProjectInterface}

    if (!result?.project) return (
        <p className="no-result-text">Failed to fetch project info</p>
    )

    const projectDetails = result?.project

    const renderLink = () => `/profile/${projectDetails?.createdBy?.id}`

    return (
        <Modal>
            <section className="flexBetween gap-y-8 max-w-4xl mt-32 lg:mt-5 max-xs:flex-col w-full">
                <div className="flex-1 flex items-start gap-5 w-full max-xs:flex-col">
                    <Link href={renderLink()}>
                        <Image
                            src={projectDetails?.createdBy?.avatarUrl}
                            width={50}
                            height={50}
                            alt="profile"
                            className="rounded-full"
                        />
                    </Link>

                    <div className="flex-1 flexStart flex-col gap-1">
                        <p className="self-start text-lg font-semibold">
                            {projectDetails?.title}
                        </p>
                        <div className="user-info">
                            <Link href={renderLink()}>
                                {projectDetails?.createdBy?.name}
                            </Link>
                            <Image src="/dot.svg" width={4} height={4} alt="dot" />
                            <Link href={`/?category=${projectDetails.category}`} className="text-primary-pink font-semibold"> 
                                {projectDetails?.category}
                            </Link>
                        </div>
                    </div>
                </div>

            </section>


            <section className="mt-14">
                <Image
                    src={`${projectDetails?.image}`}
                    className="object-contain rounded-lg"
                    width={1064}
                    height={798}
                    alt="poster"
                />
            </section>

            <section className="flexStart mt-16 w-full">
                <p className=" text-xl font-normal max-w-5xl">
                    {`${projectDetails?.description} Check it out↘`}                  
                <Link href={projectDetails?.liveSiteUrl} target="_blank" rel="noreferrer" className="text-primary-pink">
                   <span className="underline">HERE</span> 
                </Link>
                </p>

            </section>

            {session?.user?.email === projectDetails?.createdBy?.email && (
                    <section className="flex justify-center items-center gap-8 mt-28 p-6 bg-light-white rounded-lg text-gray-100">
                        <ProjectActions projectId={projectDetails?.id} />
                    </section>
             )}
      
            <section className="flexCenter w-full gap-8 mt-20">
                <span className="w-full h-0.5 bg-light-white-200" />
                <Link href={renderLink()} className="min-w-[82px] h-[82px]">
                    <Image
                        src={projectDetails?.createdBy?.avatarUrl}
                        className="rounded-full"
                        width={82}
                        height={82}
                        alt="profile image"
                    />
                </Link>
                <span className="w-full h-0.5 bg-light-white-200" />
            </section>

            <RelatedProjects userId={projectDetails?.createdBy?.id} projectId={projectDetails?.id} />
        </Modal>
    )
}

export default Project