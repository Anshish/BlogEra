import React from 'react'
import {Editor} from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form'
import configure from '../configure/configure'

function RTE({name,control,label,defaultValue=''}) {
  return (
    <div className='w-full '>
        {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

        <div className='border-2 border-rose-800 rounded-xl'>
        <Controller 
            name={name || 'content'}
            control={control}  // control field is given by parent component who will take it's ref
            render={({field:{onChange}})=>(
                <Editor
                apiKey={configure.apiKey}
                    initialValue={defaultValue}
                    init={{
                        initialValue:defaultValue,
                        height: 500,
                        menubar: true,
                        plugins: [
                            "image",
                            "advlist",
                            "autolink",
                            "lists",
                            "link",
                            "image",
                            "charmap",
                            "preview",
                            "anchor",
                            "searchreplace",
                            "visualblocks",
                            "code",
                            "fullscreen",
                            "insertdatetime",
                            "media",
                            "table",
                            "code",
                            "help",
                            "wordcount",
                            "anchor",
                        ],
                        toolbar:
                        'undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help',
                        content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:20px; background-color: #e9d3c0; border-width: 2px; border-color: #e9d3c0; }"

                    }}
                    onEditorChange={onChange}
                />
            )}
        />
        </div>
        
    </div>
  )
}

export default RTE