import { prisma } from "@/lib/prisma"

export const getImages = async () =>{
    try{
        const result  = await prisma.uplod.findMany({
            orderBy:{createdAt: "desc"}
        })
        return result
    }catch(error){
        throw new Error("failde to fecth data")
    }
}

export const getImageById = async (id:string) =>{
    try{
        const result  = await prisma.uplod.findUnique({
            where: {id}
        })
        return result
    }catch(error){
        throw new Error("failde to fecth data")
    }
}