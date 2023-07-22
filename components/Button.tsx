import {MouseEventHandler} from 'react'
import Image from 'next/image'
type Props = {
	title: string;
	px?: string;
	py?: string;
	leftIcon?:string | null;
	rightIcon?:string | null;
	handleClick?: MouseEventHandler;
	isSubmitting?: boolean;
	type?: 'button' | 'submit';
	fontSize?:string;
	border?:string;
	bgColor?: string;
	borderColor?:string;
	bgOpacity?:string;
	hover?:string;
	textColor?: string;
	position?:string;
	width?:string;
}
function Button({title, type, px, py, fontSize, borderColor, border, width, position, leftIcon, rightIcon, bgColor,bgOpacity, hover,  textColor, isSubmitting, handleClick}: Props) {
	return (
		<button
		type={type || 'button'}
		disabled={isSubmitting}
		className={`flexCenter gap-3 py-3
		${px || 'px-4'}
		${py || 'py-3'}
		${textColor || 'text-white'}
		${position}
		${border} 
		${borderColor} 
		${bgColor || 'bg-primary-pink'}
		${bgOpacity || 'bg-opacity-100'}
		${isSubmitting ? 'bg-opacity-25' : ''}
		${hover || 'hover:bg-opacity-50'}	
		${fontSize || 'text-sm'}
		${width}
		rounded-lg font-semibold
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