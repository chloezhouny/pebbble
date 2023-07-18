'use client'
import {useState, ChangeEvent} from 'react'
import Image from 'next/image'
import {useRouter} from 'next/navigation'

import {SessionInterface} from '@/common.types'
import {createNewProject, fetchToken} from '@/lib/actions'
import { categoryFilters } from '@/constants'

import FormField from './FormField'
import CustomMenu from './CustomMenu'
import Button from './Button'


type Props = {
	type: string;
	session: SessionInterface;
}

const ProjectForm = ({type, session}: Props) => {
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
		title: '',
		description: '',
		image: '',
		liveSiteUrl: '',
		githubUrl: '',
		category: '',
	}) 
	const handleStateChange = (fieldName: string, value: string) => {
		setForm((prevState) => ({ ...prevState, [fieldName]: value}))
	}
	return (
		<form 
		onSubmit = {handleFormSubmit}
		className="flexStart form"
		>
		<FormField 
			title="Title"
			state={form.title}
			placeholder="Give me a name"
			setState={(value) => handleStateChange('title', value)}
			/>
			<div className="flexStart form_image-container">
				<label htmlFor="image"
				className="flexCenter form_image-label">
					{!form.image && 'Choose a image for your project'}
				</label>
				<input id="image" type="file" accept="image/*"
				required={type === 'create' ? true : false}
				className="form_image-input"
				onChange={handleImageChange}
				/>
				{form.image && (
					<Image 
					src={form?.image}
					className="sm:p-10 object-contain z-20"
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
			/>
			<FormField 
			type="url"
			title="Website URL"
			state={form.liveSiteUrl}
			placeholder="Website URL"
			setState={(value) => handleStateChange('liveSiteUrl', value)}
			/>
			<FormField 
			type="url"
			title="Github URL"
			state={form.githubUrl}
			placeholder="Github URL"
			setState={(value) => handleStateChange('githubUrl', value)}
			/>

			<CustomMenu 
			title='Tag'
			state={form.category}
			filters={categoryFilters}
			setState={(value) => handleStateChange('category', value)}
			/>
			
			<div className="flexStart w-full">
				<Button title={isSubmitting ? `${type === "create" ? "Publishing" : "Updating"}` : `${type === "create" ? "Publish now" : "Update"}`} type="submit" isSubmitting={isSubmitting} />
			</div>
		</form>
	)
}

export default ProjectForm