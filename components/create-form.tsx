'use client'
import React from 'react'
import { UplodImage } from '@/lib/action'
import { useFormState } from 'react-dom'
import { SubmitButton } from './Button'


const CreateForm = () => {
    const [state,fromAction] = useFormState(UplodImage,null)


  return (
    <form action={fromAction}>
        <div className='mb-4  pt-2 '>
                <input type="text" name="title" id="" className='oy-2 px-2 rounded-sm border border-gray-400 w-full' placeholder='Title......'/>
                <div aria-live='polite' aria-atomic="true">
                    <p className='text-red-600 mt-2 text-sm'>{state?.error?.title}</p>
                </div>
        </div>
        <div className='mb-4  pt-2 '>
                <input type="file" name="image" className='file:py-2 file:px-4 file:mr-4 file:rounded-sm file:border-0 file:bg-gray-300 hover:file:bg-gray-400 file:cursor-pointer border border-gray-500 w-full ' />
                <div aria-live='polite' aria-atomic="true">
                    <p className='text-red-600 mt-2 text-sm'>{state?.error?.image}</p>
                </div>
        </div>
        <SubmitButton label="upload"/>
    </form>
  )
}

export default CreateForm
