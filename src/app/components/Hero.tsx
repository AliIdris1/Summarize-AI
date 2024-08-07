
import Image from 'next/image'
import React from 'react'
import logo from '../assets/logo.svg'
import Link from 'next/link'

type Props = {}

const Hero = (props: Props) => {
return (
    <header className='w-full flex justify-center items-center flex-col '>
        <nav className='flex justify-between items-center w-full mb-10 pt-3'>
            <Image src={logo} alt='logo' className='w-28 object-contain' />
            <Link href={"https://github.com/AliIdris1"}>
            <button type='button' className='bg-black rounded-full text-white px-5 py-1.5 border border-black transition-all hover:bg-white hover:text-black '>GitHub</button>
            </Link>
        </nav>
        <h1 className='text-black font-extrabold text-center mt-5 leading-[1.15] sm:text-6xl text-5xl'>
            Summarize Articles with <br className='maxmd:hidden'/>
            <span className='orange_gradient'>OpenAI GPT-4</span>
        </h1>
        <h2 className='mt-5 textlg text-center text-gray-600 max-w-2xl sm:text-xl'>Simplify your reading with Summize, an open-source article summarizer

        that transforms lengthy articles into clear and concise summaries</h2>
    </header>
)
}

export default Hero