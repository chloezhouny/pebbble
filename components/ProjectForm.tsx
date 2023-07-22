'use client'
import {useState, ChangeEvent} from 'react'
import Image from 'next/image'
import {useRouter} from 'next/navigation'

import {SessionInterface, ProjectInterface} from '@/common.types'
import {createNewProject, updateProject, fetchToken} from '@/lib/actions'
import { categoryFilters } from '@/constants'

import FormField from './FormField'
import CustomMenu from './CustomMenu'
import Button from './Button'


type Props = {
	type: string;
	session: SessionInterface;
	project?: ProjectInterface;
}

const ProjectForm = ({type, session, project}: Props) => {
	const router = useRouter();
	const handleFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		const {token} = await fetchToken();

		try{
			if (type === 'create') {
				await createNewProject(form, session?.user?.id, token)
				router.push('/')
			}
			if (type === 'edit') {
				await updateProject(form, project?.id as string, token)
				router.push('/')
			}
		}catch(error) {
			console.log(error)
		}finally{
			setIsSubmitting(false);
		}

	}
	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const file = e.target.files?.[0];
		if (!file) return;
		if (!file.type.includes('image')) {
			return alert('Please upload an image file')
		}
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			const result = reader.result as string;
			handleStateChange('image', result)
		}
	}
	
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [form, setForm] = useState({
		title: project?.title || '',
		description: project?.description || '',
		image: project?.image || '',
		liveSiteUrl: project?.liveSiteUrl || '',
		githubUrl: project?.githubUrl || '',
		category: project?.category || '',
	}) 
	const handleStateChange = (fieldName: string, value: string) => {
		setForm((prevState) => ({ ...prevState, [fieldName]: value}))
	}
	return (
		<form 
		onSubmit = {handleFormSubmit}
		className='flexStart form'
		>
		<FormField 
			title="Title"
			state={form.title}
			placeholder="Give me a name"
			setState={(value) => handleStateChange('title', value)}
			/>
			<div className="flexCenter form_image-container">		
				<label htmlFor="image"
				className='flexCenter flex-col gap-4 form_image-label'>
					<Image src='/picture-placeholder.png'
						className="flexCenter pt-5"
						alt="image placeholder"
						width={80}
						height={100}
					/>
					{!form.image && (
					<>
						<p className="text-base">Drag and Drop an image, or <span className="text-primary-pink">Browse</span></p>
						<p className="text-sm text-gray-70">Minimum 1600px width recommended. Max 10MB each (20MB for videos)</p>
						<div className="flex justify-between lg:gap-28 flex-col lg:flex-row text-sm text-gray-70 mt-8">
							<ul className="list-disc text-left leading-7">
								<li>High resolution images (png, jpg, gif)</li>
								<li>Animated gifs</li>
							</ul>
							<ul className="list-disc text-left leading-7">
								<li>Videos (mp4)</li>
								<li>Only upload media you own the rights to</li>
							</ul>
						</div>
					</>
					)}
				</label>
				<input id="image" type="file" accept="image/*"
				required={type === 'create' ? true : false}
				className="form_image-input"
				onChange={handleImageChange}
				/>
				{form.image && (
					<Image 
					src={form?.image}
					className="p-5 object-contain z-20"
					alt="Project image"
					fill
					/>
				)}
			</div>
			
			<FormField 
			title="Description"
			isTextArea
			state={form.description}
			placeholder="Write what went into this design or add any details you'd like to mention."
			setState={(value) => handleStateChange('description', value)}
			marginTop='mt-20'
			/>
			<FormField 
			type="url"
			title="Website URL"
			state={form.liveSiteUrl}
			placeholder="Website URL"
			setState={(value) => handleStateChange('liveSiteUrl', value)}
			marginTop='mt-16'
			/>
			<FormField 
			type="url"
			title="Github URL"
			state={form.githubUrl}
			placeholder="Github URL"
			setState={(value) => handleStateChange('githubUrl', value)}
			marginTop='mt-2'
			/>

			<CustomMenu 
			title='Tag'
			state={form.category}
			filters={categoryFilters}
			setState={(value) => handleStateChange('category', value)}		
			/>
			
			<div className="flexEnd w-full mt-16 md:w-4/5">
				<Button title={isSubmitting ? `${type === "create" ? "Publishing" : "Updating"}` : `${type === "create" ? "Publish now" : "Update"}`} type="submit" width='max-md:w-full' isSubmitting={isSubmitting} />
			</div>
		</form>
	)
}

export default ProjectForm