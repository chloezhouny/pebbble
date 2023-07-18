type Props = {
	type?: string;
	title: string;
	state: string;
	placeholder: string;
	isTextArea?: boolean;
	setState: (value: string) => void;
}

function FormField({type, title, state, placeholder, isTextArea, setState} : Props) {
	return (
		<div className="flexStart flex-col w-full gap-4">
			{isTextArea? (
				<textarea 
				placeholder={placeholder}
				value={state}
				required
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