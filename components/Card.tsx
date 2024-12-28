import Image from "next/image"
import { DeleteButton, EditButton } from "@/components/Button"
import type { Uplod } from "@prisma/client"

const Card = ({data}:{data:Uplod}) => {
  return (
    <div className='max-w-sm border border-gray-400 rounded-md shadow'>
      <div className='relative aspect-video'>
        <Image src={data.image} alt={data.title} fill priority  sizes="(max-width:768px) 100vw,(max-witdh:1200px) 50vw,33vw" className="rounded-t-md object-cover"/>
      </div>
      <div className="p-5">
        <h1 className="text-2xl font-blod text-gray-800 truncate">{data.title}</h1>
      </div>
      <div className="flex items-center justify-between">
        <EditButton id={data.id}/>
        <DeleteButton id={data.id}/>
      </div>
    </div>
  )
}

export default Card
