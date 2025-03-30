import React, { useEffect, useState } from 'react';
import ImageDefault from "../../assets/images/image-default.png";
import { Media } from '../../models/media/media';
import { ImageType } from 'react-images-uploading';
import ic_user_default from "../../assets/icons/ic_user_default.svg";


const SingleImageUpload = ({ image,onChange }: { image?:Media,onChange: (file: ImageType) => void }) => {
    const [data, setData] = useState<ImageType | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            onChange({file:file})
            setData({dataURL:URL.createObjectURL(file) })
        }
    };

     useEffect(() => {
        
            if (image) {
                setData({dataURL:process.env.REACT_APP_IMAGE_URL + image.url })
            }


        }, [image])

    return (
        <div className="h-full relative border-[1px] border-dashed border-blue-500 bg-blue-100 rounded-xl cursor-pointer hover:border-red-600 transition duration-300 overflow-hidden flex flex-col items-center justify-center">
        

                {
                    data
                    ? (
                           
                        <img
                            src={data.dataURL}
                            alt="Image"
                            className="rounded-md object-fill w-full h-full"
                            onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                console.log(event.currentTarget.src)
                                event.currentTarget.onerror = null; // prevents looping if image onError also fails
                                event.currentTarget.src = ic_user_default;
                            }}
                        />
                   
                        )
                    : (
                        <>  
                            <img 
                                src={ImageDefault} 
                                alt="Upload Preview" 
                                width={80} 
                                height={80} 
                                className="mb-2 rounded-md"
                            />
                            <div className='flex items-center gap-2 text-blue-500'>
                                <i className="fa-solid fa-upload"></i>
                                <span className='text-base'>Tải ảnh lên</span>
                            </div>
                        </>
                    )
                }
              
    
            <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
        </div>
    );
};

export default SingleImageUpload;



