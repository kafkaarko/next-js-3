'use server';
import { z} from 'zod';
import { put , del } from '@vercel/blob';
import {prisma} from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getImageById } from '@/lib/data';

const uplodSchema = z.object({
    title: z.string().min(1),
    image: z
        .instanceof(File)
        .refine((file) => file.size > 0, {message: 'Image is required'})
        .refine((file) => file.size === 0 || file.type.startsWith('image/'),  {message: 'only image file is allowed'})
        .refine((file) => file.size < 10000000, {message: 'Image size must be less than 10mb'}),
});

const EditSchema = z.object({
    title: z.string().min(1),
    image: z
        .instanceof(File)
        .refine((file) => file.size === 0 || file.type.startsWith('image/'),  {message: 'only image file is allowed'})
        .refine((file) => file.size < 10000000, {message: 'Image size must be less than 10mb'})
        .optional()
});

export const UplodImage = async (preveState: unknown, formData: FormData) => {
    const validated = uplodSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if(!validated.success){
        return{
            error: validated.error.flatten().fieldErrors
        }
    }

    const {title , image} = validated.data;
    const {url} = await put(image.name, image ,{
        access: 'public',
        multipart: true,
    });

    try {
        await prisma.uplod.create({
            data:{
                title,
                image: url,
            }
        })
    } catch (error) {
        return {massege: 'failed to uplod'}
    }

    revalidatePath('/');
    redirect('/');
}
//update image
export const UpdateImage = async (id:string, preveState: unknown, formData: FormData) => {
    const validated = EditSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if(!validated.success){
        return{
            error: validated.error.flatten().fieldErrors
        }
    }

    const data = await getImageById(id);
    if(!data) return {message: "not data found"}

    const {title , image} = validated.data;
    let imagePath;
    if(!image || image.size === 0){
        imagePath = data.image
    }else{
        await del(data.image);  
        const {url} = await put(image.name, image ,{
            access: 'public',
            multipart: true,
        });
        imagePath = url;
    }

    try {
        await prisma.uplod.update({
            data:{
                title,
                image: imagePath,
            },
            where: {id}
        })
    } catch (error) {
        return {massege: 'failed to update'}
    }

    revalidatePath('/');
    redirect('/');
}
//delete image
export const deleteImage = async (id:string) =>{
    const data = await getImageById(id);
    if(!data) return {message: "not data found"}
     
    await del(data.image);
    try {
        await prisma.uplod.delete({
            where: {id} 
        })
    } catch (error) {
        return {message: "failed to delete"}    
    }

    revalidatePath('/');    
}