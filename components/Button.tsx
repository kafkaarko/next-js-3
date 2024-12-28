"use client";
import { useFormStatus } from "react-dom";
import { clsx } from "clsx";
import React from "react";
import Link from "next/link";
import { deleteImage } from "@/lib/action";
// untuk membuat useFormStatus kita harus membuat itu menjadi child seperti di line 50
export const SubmitButton = ({label}:{label:string}) => {
  const { pending } = useFormStatus();
  return (
    <div className="mb-4  pt-5 ">
      <button
        type="submit"
        className={clsx(
          "bg-blue-700 text-white w-full font-medium  py-2.5 px-6 text-base rounded-sm hover:bg-blue-500",
          {
            "opacity-50 cursor-progress": pending,
          }
        )}
        disabled={pending}
      >
        {label === 'upload' ? (
            <>
            {pending ? "updloading..." : "uplod"}
            </>
        ) : (
            <>
            {pending ? "upddating..." : "update"}
            </>
        )}
      </button>
    </div>
  );
};  



export  const EditButton = ({id}:{id:string}) => {
    return(
        <Link href={`edit/${id}`} className="bg-gray-400 py-3 text-sm rounded-bl-md w-full hover:bg-gray-100 text-center" >Edit</Link>
    )
}

export  const DeleteButton = ({id}:{id:string}) => {
    const deleteImageWithId = deleteImage.bind(null,id)
    return(
       <form action={deleteImageWithId} className="bg-gray-400 py-3 text-sm rounded-br-md w-full hover:bg-gray-100 text-center">
        <DeleteBtn/>
       </form>
    )
}
const DeleteBtn = () =>{
    const {pending} = useFormStatus()
    return(
        <button type="submit" disabled={pending}>{pending ? 'Deleting...' : 'delete'}</button>

    )
}