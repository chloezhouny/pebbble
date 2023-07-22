'use client'
import { useRef, useState, useEffect } from "react";


type Props = {
	type?: string;
	title: string;
	state: string;
	placeholder: string;
	isTextArea?: boolean;
	marginTop?: string;
	setState: (value: string) => void;
}

function FormField({type, title, state, placeholder, isTextArea, setState, marginTop} : Props) {
  	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	  if (isTextArea) {

	  	 useEffect(() => {
    		if (textAreaRef.current) {
      			textAreaRef.current.style.height = "0px";
      		const scrollHeight = textAreaRef.current.scrollHeight;
      		textAreaRef.current.style.height = scrollHeight + "px";
    	}
  	   }, [textAreaRef, state]);
	  }
	 
	return (
		<div className={`flexCenter flex-col w-full md:w-4/5 ${marginTop}`}>
			{isTextArea? (
				<textarea 
				placeholder={placeholder}
				value={state}
				required
				ref={textAreaRef}
				rows={1}
				className='form_field-input'
				onChange={(e) => setState(e.target.value)}
				/>
			) : (
			<input
			type={type || 'text'}
			placeholder={placeholder}
				value={state}
				required
				className={title === 'Title' ? 'form_field-title-input' : 'form_field-input'}
				onChange={(e) => setState(e.target.value)}

			 />
			)}
		</div>
	)
}

export default FormField