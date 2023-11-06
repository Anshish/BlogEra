import React,{useCallback} from 'react'
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {Button,Input,Select,RTE} from '../index'
import appwriteService from '../../appwrite/config'

function PostForm({post}) {
    // watch is used to keep watch on any change in component
    // setValue and getValues is used to set and get values from component
    // control is used to take ref of child component
    const {register,handleSubmit,watch,setValue,control,getValues}=useForm({
        defaultValues:{
            title:post?.title || '',
            slug:post?.slug || '',
            content:post?.content || '',
            status:post?.status || 'active'
        }
    })

    const navigate=useNavigate()
    const userData=useSelector((state)=>state.auth.userData)

    // we will check first whether user is uploading a post or just updating it
    const submit=async(data)=>{  // data here is received when form is submitted
        // if post is there then it means that we are updating it
        console.log('post',post);
        if(post){
            // if there is image in data then it means that we want upload new image else no image
            const file=data.image[0]?appwriteService.uploadFile(data.image[0]):null

            // if we get response back after executing above step then we will delete the previous image
            if(file){
                appwriteService.deleteFile(post.image)
            }

            // here we will update the post
            const dbPost=await appwriteService.updatePost(
                post.$id,{
                    ...data,
                    image:file?file.$id:undefined
                }
            )

            // navigate to updated post
            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
        }else{
            // else create post
            const file=await appwriteService.uploadFile(data.image[0])
            if(file){
                const fileId=file.$id
                data.image=fileId
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.userData.$id });
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    // this will replace space with '-'
    const slugTransform= useCallback(value=>{
        if(value && typeof(value)==='string'){
            return value
                // .trim()
                // .toLowerCase()
                // .replace(/^[a-zA-z\d\s]+/g,'-')
                // .replace(/\s/g,'-')
                .trim()
                .toLowerCase()
                .replace(/\s+/g, '-') // Replace all spaces with a single hyphen
                .replace(/[^a-z\d-]/g, '') // Remove any characters that are not letters, digits, or hyphens
                .replace(/-+/g, '-'); 
        }else{
            return ''
        }
    },[])

    React.useEffect(()=>{
        const subscription=watch((value,{name})=>{
            if(name==='title'){
                setValue('slug',slugTransform(value.title,{shouldValidate:true}))
            }
        })

        return ()=>{
            subscription.unsubscribe()
        }
    },[watch,slugTransform,setValue])
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4 bg-[#e9d3c0] "
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4 bg-[#e9d3c0]"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Image :"
                    type="file"
                    className="mb-4 bg-[#e9d3c0]"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.image)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4 bg-[#e9d3c0]"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-[#4e4e50] hover:bg-[#3d3d3e]" : 'bg-blue-600 hover:bg-blue-800'} className="w-full rounded-xl">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
  )
}

export default PostForm