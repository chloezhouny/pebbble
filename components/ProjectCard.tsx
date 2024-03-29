"use client";

import {useState, useEffect} from 'react'
import Link from 'next/link';
import Image from 'next/image'

type Props = {
	id: string;
	image: string;
	title: string;
	name: string;
	avatarUrl: string;
	userId: string;
}

function ProjectCard({id, image, title, name, avatarUrl, userId}: Props) {
	 const [randomLikes, setRandomLikes] = useState(0);
    const [randomViews, setRandomViews] = useState('');

    useEffect(() => {
        setRandomLikes(Math.floor(Math.random() * 10000))
        setRandomViews(String((Math.floor(Math.random() * 10000) / 1000).toFixed(1) + 'k'))
    }, []);


	return (
		<div className="flexCenter flex-col rounded-lg drop-shadow-card">
			<Link href={`/project/${id}`} className="flex-center group relative w-full h-full">
				<Image 
				src={image}
				width={344}
				height={258}
				className="w-full h-full object-contain rounded-lg"
				alt="Project image"
				/>
				<div className="hidden group-hover:flex profile_card-title">
					<p className="w-full px-1">{title}</p>
				</div>
			</Link>
			<div className="flexBetween w-full px-2 mt-2 font-semibold text-sm">
				<Link href={`/profile/${userId}`}>
					<div className="flexCenter gap-2">
						<Image 
						src={avatarUrl}
						width={24}
						height={24}
						className="rounded-full"
						alt="avatar"
						/>
						<p>{name}</p>
					</div>
				</Link>
				<div className="flexCenter gap-3">
					<div className="flexCenter gap-2">
						<Image src="/heart.svg" 
						width={13}
						height={12}
						alt="likes"
						/>
						<p className="text-xs text-gray">{randomLikes}</p>
					</div>
					<div className="flexCenter gap-2">
						<Image src="/eye.svg" 
						width={13}
						height={12}
						alt="views"
						/>
						<p className="text-xs text-gray">{randomViews}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProjectCard