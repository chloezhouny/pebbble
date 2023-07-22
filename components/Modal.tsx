'use client'
import {useCallback, useRef, ReactNode} from 'react'
import {useRouter} from 'next/navigation'
import Image from 'next/image';

import Button from './Button'

function Modal({children}: {children: ReactNode}) {
	const overlay = useRef<HTMLDivElement>(null);
	const wrapper = useRef<HTMLDivElement>(null)
	const router = useRouter();
	const onDismiss = useCallback(() => {
		router.push('/');
	}, [router]);

	const handleClick= useCallback((e: React.MouseEvent) => {
		if (e.target === overlay.current && onDismiss) {
			onDismiss();
		}
	}, [onDismiss, overlay]);

	
	return (
		<div ref={overlay} className='modal' onClick={handleClick}>			
			<div ref={wrapper} className="modal_wrapper">
			<Button
			 title="Cancel" 
             bgColor="bg-white" 
             textColor="text-black" 
              border="border"
              borderColor='border-light-white-200'
              hover='hover:bg-light-white-300'
			  handleClick={onDismiss} 
			  px='px-4'
			  py='py-2'
			  position='absolute top-20 lg:top-6 left-6'
			/>
				{children}
			</div>
		</div>
	)
}

export default Modal