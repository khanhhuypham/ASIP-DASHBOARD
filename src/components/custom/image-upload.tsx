import React, { useEffect, useState } from 'react';
import ImageUploading, { ImageListType } from "react-images-uploading";
import { ButtonCustom } from './button-custom';
import { IcCamera, IcCloseSwitchButton } from '../icons/icon-group';
import { ErrorsType, ImageType, ImageUploadingPropsType, ResolutionType } from 'react-images-uploading/dist/typings';

import ic_image_default from "../../assets/icons/ic_image_default.svg";
import ImageDefault from "../../assets/images/image-default.png"
import { Media } from '../../models/media/media';
import { Button } from 'antd';


export interface ImageUploadingProps {
    multiple?: boolean;
    maxNumber?: number;
    acceptType?: Array<string>;
    maxFileSize?: number;
    resolutionWidth?: number;
    resolutionHeight?: number;
    resolutionType?: ResolutionType;
    onError?: (errors: ErrorsType, files?: ImageListType) => void;
    dataURLKey?: string;
    inputProps?: React.HTMLProps<HTMLInputElement>;
    allowNonImageType?: boolean;
}
export const ImageUpload = (
    { onUploadImage, images, props }:
    {
        onUploadImage: ((agr0: ImageType[]) => void),
        images?: Media[],
        props?: ImageUploadingProps
    }
) => {
    const [data, setData] = useState<ImageType[]>([]);
    const [witdth, setWitdth] = useState<number>(0);

    const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        console.log(imageList, addUpdateIndex);
        onUploadImage(imageList)
        setData(imageList as never[]);
    };


    useEffect(() => {
        if (images) {
         
            setData(images.map((image) => {
                return { dataURL:process.env.REACT_APP_IMAGE_URL + image.url }
            }))

        }

    }, [images])

    useEffect(() => {

        const handleResize = () => {
            const imageContainer = document.getElementById("image-container") as HTMLElement;

            if (imageContainer) {
                setWitdth(imageContainer.offsetWidth / 3)
            }

        };
        handleResize();

    }, [])

    const RenderImageView = (
        { imageList, onImageUpdate, onImageRemove, onImageUpload }:
        {
            imageList: ImageType[],
            onImageUpdate: ((index: number) => void),
            onImageRemove: ((index: number) => void),
            onImageUpload: (() => void)
        }
    ) => {
     
        return (
            <div className='flex h-full w-full gap-3'>
        
                <div className="flex gap-3 h-full overflow-x-scroll">
                    {data.map((image, index) => (
                        <div key={index} className="relative">
                            <button
                                type="button"
                                className="bg-[#71717a] dark:bg-dark dark:text-white-dark rounded-full p-0.5 absolute top-1 right-1"
                                title="Clear Image"
                                onClick={() => onImageRemove(index)}
                            >
                                <IcCloseSwitchButton className="w-3 h-3" />
                            </button>
                            <button
                                className="h-full block"
                                style={{ width: witdth }}
                                onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    onImageUpdate(index)
                                }}
                            >
                                <img
                                    src={image.dataURL}
                                    alt={`Image ${index + 1}`}
                                    className="rounded-md object-fill w-full h-full"
                                    onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                        console.log(event.currentTarget.src)
                                        event.currentTarget.onerror = null; // prevents looping if image onError also fails
                                        event.currentTarget.src = ic_image_default;
                                    }}
                                />
                            </button>
                        </div>
                    ))}
                </div>
             

                <div style={{ width: witdth }} className='flex-none'>
                    <RenderImageDragView onImageUpload={onImageUpload} />
                </div>

            </div>
        );
    };

    const RenderImageDragView = ({ onImageUpload }: { onImageUpload: (() => void) }) => {

        return (
            <div className="h-full relative border-[1px] border-dashed border-blue-500 rounded-xl cursor-pointer hover:border-red-600 transition duration-300 overflow-hidden">
                <label htmlFor="fileInput" className="flex items-center justify-center text-blue-500 bg-blue-100 mb-0 h-full">
                    <div className='flex flex-col items-center'>
                        <img src={ImageDefault} alt="Upload Icon" width={40} height={40} />
                        <div className='flex items-center gap-2'>
                            <i className="fa-solid fa-upload"></i>
                            <span className='text-base'>Tải ảnh lên</span>
                        </div>
                    </div>
                </label>

                <Button
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onClick={onImageUpload}
                />

            </div>
        )
    }


    return (

        <ImageUploading
            multiple={props?.multiple ?? false}
            value={data}
            onChange={onChange}
            maxNumber={props?.maxNumber ?? 2}
        >{({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps
        }) => (
            <section
                className="rounded-lg bg-white dark:bg-[#121e32] h-full"
                style={isDragging ? { borderColor: "red" } : undefined}
                {...dragProps}
                id="image-container"
            >
                {
                    // imageList.length > 0
                    // ? <RenderImageView imageList={imageList} onImageUpdate={onImageUpdate} onImageRemove={onImageRemove} onImageUpload={onImageUpload} />
                    // : <RenderImageDragView onImageUpload={onImageUpload} />

                    <RenderImageView imageList={imageList} onImageUpdate={onImageUpdate} onImageRemove={onImageRemove} onImageUpload={onImageUpload} />

                }
            </section>
        )}
        </ImageUploading>

    )


}