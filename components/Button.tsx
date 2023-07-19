import {MouseEventHandler} from 'react'
import Image from 'next/image'
type Props = {
	title: string;
	leftIcon?:string | null;
	rightIcon?:string | null;
	handleClick?: MouseEventHandler;
	isSubmitting?: boolean;
	type?: 'button' | 'submit';
	bgColor?: string;
	textColor?: string;
}
function Button({title, type, leftIcon, rightIcon, bgColor, textColor, isSubmitting, handleClick}: Props) {
	return (
		<button
		type={type || 'button'}
		disabled={isSubmitting}
		className={`flexCenter gap-3 px-4 py-3
		${textColor || 'text-white'}
		${bgColor || 'bg-primary-pink'}
		${isSubmitting && 'bg-opacity-25'}
		hover:bg-opacity-50
		rounded-lg text-sm font-semibold max-md:w-full
		`}
		onClick={handleClick}		
		>
		   {leftIcon && <Image src={leftIcon} width={14} height={14} alt="left" />}
		   {title}
		   {rightIcon && <Image src={rightIcon} width={14} height={14} alt="right" />}
		</button>
	)
}

export default Button