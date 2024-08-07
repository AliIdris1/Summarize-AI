// @ts-nocheck
"use client"
import React, { useEffect, useState } from 'react'
import {linkIcon , copy, loader, tick} from '../assets'
import Image from 'next/image'
import {useLazyGetSummaryQuery} from '../services/article'






type Props = {}

const Demo = (props: Props) => {
  const [article, setarticle] = useState({
    url:"",
    summary:""
  })

  const [allArticle, setallArticle] = useState([])

  const [copied, setcopied] = useState("")

  const [getSummary , { error , isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articleFromLocalStorage= JSON.parse(
      localStorage.getItem('articles')
    )

    if(articleFromLocalStorage) {
      setallArticle(articleFromLocalStorage)
    }
  }, [])
  

  const handleSubmit = async (e:any) => {
    e.preventDefault()
    const { data } = await getSummary({ articleUrl: article.url })

    if(data?.summary) {
      const newArticle = { ...article , summary: data.summary}

      const updatedallArticle:any = [newArticle , ...allArticle]
      setarticle(newArticle)
      setallArticle(updatedallArticle)

      localStorage.setItem('articles', JSON.stringify(updatedallArticle))
    }

  }

  const handlecopy = (copyUrl) => {
    setcopied(copyUrl)
    navigator.clipboard.writeText(copyUrl)

    setTimeout(() => setcopied(copyUrl), 3000);
  }

  return (
    <section className='mt-16 w-full max-w-xl'>
      <div className='flex flex-col w-full gap-2'>
        <form className='relative flex items-center justify-center' onSubmit={handleSubmit}>
        <Image src={linkIcon} alt='link_icon' className='absolute left-0 ml-3 my-2 w-5 '/>
        <input type="url" placeholder='Enter a URL' value={article.url} required onChange={e => setarticle({...article, url: e.target.value})} className='url_input peer'/>
        <button type='submit' className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700'>
        ↵
        </button>
        </form>
        <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
          {allArticle.map((item , index) => (
            <div key={`link-${index}`}
            onClick={() => {setarticle(item)}}
            className='p-3 flex justify-start items-center flex-row bg-white border border-gray-200 gap-3 rounded-lg cursor-pointer'
            >
              <div onClick={() => handlecopy(item.url)} className='w-7 h-7 rounded-full bg-white/10 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur flex justify-center items-center cursor-pointer'>
                <Image src={copied === item.url ? tick : copy} alt="copy" className='w-[40%] h-[40%] object-contain'/>
              </div>
              <p className='flex-1 text-blue-700 font-medium text-sm truncate'>{item.url}</p>
            </div>
          ))}
        </div>
      </div>


      <div className='my-10 max-w-full flex justify-center items-center'>
        {isFetching ? (
          <Image src={loader} alt='loader' className='w-20 h-20 object-contain'/>
        ): error ? (
          <p className='font-bold text-black text-center'>Well, that wasn't supposed to happen... 
          <br />
          <span className='text-gray-700'>{error.data?.error}</span>
          </p>
          
        ) : (
          article.summary && (
            <div className='flex flex-col gap-3'>
              <h2 className='font-bold text-gray-600 text-xl'>
                Article <span className='font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent'>Summary</span>
              </h2>
              <div className='rounded-xl border border-gray-200 bg-white/20 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur p-4'>
              <p className='text-sm text-gray-700'>{article.summary}</p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  )
}

export default Demo