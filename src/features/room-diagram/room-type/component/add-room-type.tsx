import React, { useEffect, useState } from 'react';
import * as Yup from "yup";
import { useFormik } from 'formik';
import { InputCustom } from '../../../../components/custom/field/input-custom';
import IconPeople from '../../../../components/icons/icon-people';
import IconKidFace from '../../../../components/icons/icon-kid-face';
import { QuantityButtonGroup } from '../../../../components/custom/quantity-button-group';
import { RoomType } from '../../../../models/room-type/room-type';
import { convertToMoneyFormat } from '../../../../utils/string-utils';
import { ImageUpload } from '../../../../components/custom/image-upload';
import { ImageType } from 'react-images-uploading';

import { uploadService } from '../../../../services/upload-service/upload-service';
import { message } from 'antd';
import { roomTypeService } from '../../../../services/room-type/room-type-service';
import { roomService } from '../../../../services/room/room-service';
import { Room } from '../../../../models/room/room';
import { DebounceSelect, OptionType } from '../../../../components/custom/field/debounce-select';





export const AddRoomType = ({ data, onComplete }: {
    data: RoomType;
    onComplete?: () => void
}) => {

    const [files, setFiles] = useState<FileList>()


    const formik = useFormik({
        initialValues: new RoomType(),
        validationSchema: Yup.object({
            name: Yup.string()
                .min(2, "Độ dài tối thiểu 2 ký tự")
                .max(50, "Độ dài tối đa 50 ký tự")
                .required("Tên hạng không được bỏ trống"),

        }),
        onSubmit: (values) => {
        
            if (files) {
                uploadImage(files)
            } else {
                data.id > 0
                    ? update(formik.values)
                    : create(formik.values)

            }
        },
    });


    const uploadImage = (files: FileList) => {
        uploadService.Upload(files,`${data.id}-room_type`).then((res) => {
            if (res.status == 201) {

                data.id > 0
                ? update({...formik.values,images:res.data})
                : create({...formik.values,images:res.data})

            } else {
                message.error(res.message)
            }
        })
    }

    const update = (data: RoomType) => {
        roomTypeService.Update(data).then((res) => {
            if (res.status == 200) {
                onComplete && onComplete()
            } else {
                message.error(res.message)
            }
        })
    }


    const create = (data: RoomType) => {
        roomTypeService.Create(data).then((res) => {
            if (res.status == 200) {
                onComplete && onComplete()
            } else {
                message.error(res.message)
            }
        })
    }


    async function getRoom(search_key?: string): Promise<OptionType[]> {
      
        // try {
        //     const res = await roomService.List();
    
        //     if (res.status === 200) {
              
        //         return res.data.map((room: Room) => ({
        //             label: room.name,
        //             value: room.id.toString(),
        //         }));
        //     } else {
        //         // Handle non-200 status codes
        //         message.error(res.message || "Failed to fetch rooms");
        //         return [];
        //     }
        // } catch (error) {
        //     // Handle unexpected errors (e.g., network issues)
        //     console.error("Error fetching rooms:", error);
        //     message.error("An unexpected error occurred while fetching rooms");
        //     return [];
        // }

        return [];
    }


    const generateRandomCode = (): string => {
        // Generate a random 3-digit number between 100 and 999
        const randomNumber = Math.floor(Math.random() * 900) + 100;
        // Combine the prefix with the random number
        return `KH00${randomNumber}`;
    };



    useEffect(() => {

        if (data.id == 0) {
            formik.resetForm()
            formik.setFieldValue("code", generateRandomCode())
        } else {
            formik.setValues(data)
            console.log(convertToMoneyFormat(data.price))
        }
        getRoom()
    }, [data])


    return (
        <div className="space-y-6 ">
            <h3 className='text-2xl font-semibold'>Thêm hạng phòng</h3>

            <form className='space-y-4' onSubmit={formik.handleSubmit}>
                <div className='h-[170px]'>

                    <ImageUpload
                        props={{ multiple: true, maxNumber: 20 }}
                        images={formik.values.images}
                        onUploadImage={(images: ImageType[]) => {

                           

                            const dataTransfer = new DataTransfer();


                            images.map((image) => image.file).forEach((file) => {

                                if (file) {
                                    dataTransfer.items.add(file)
                                }
                            });

                            console.log(dataTransfer.files)
                            // setFileUpload(dataTransfer.files)
                            setFiles(dataTransfer.files)


                        }}
                    />
                </div>

                <InputCustom
                    label="Mã hạng phòng"
                    name="code"
                    value={formik.values.code}
                    error={formik.errors.code}
                    onChange={(value) => {
                        formik.setFieldValue("code", value)
                    }}
                    required
                    disabled={true}
                />

                <InputCustom
                    label="Tên hạng"
                    name="name"
                    value={formik.values.name}
                    error={formik.errors.name}
                    onChange={(value) => {
                        formik.setFieldValue("name", value)
                    }}
                    required
                />

                <InputCustom
                    label="Giá phòng"
                    name="price"
                    type='number'
                    value={convertToMoneyFormat(formik.values.price)}
                    error={formik.errors.price}
                    onChange={(value) => {
                        console.log(value)
                        formik.setFieldValue("price", value)
                        // formik.setFieldValue("price", convertMoneyStrToNumber(value))
                    }}
                    required
                />



                <DebounceSelect
                    className="w-full h-[42px]"
                    mode="multiple"
                    showSearch={true}
                    value={
                        formik.values.room?.map((room) => ({label:room.name, value:room.id.toString()})) || []
                    }
                    placeholder="Số lượng phòng"
                    fetchOptions={getRoom}
                    onChange={(value) => {
                        
                        formik.setFieldValue("room", value.map((item) => new Room({id:Number(item.value),name:item.label})))
                    }}
        
                />

              

                <InputCustom
                    label="mô tả"
                    name="description"
                    value={formik.values.description}
                    error={formik.errors.description}
                    onChange={(value) => {
                        formik.setFieldValue("description", value)
                    }}
                    required
                />


                <div className="space-y-3">
                    <p className="font-medium text-base">Sức chứa tiêu chuẩn</p>
                    <div className="flex justify-between ">
                        <div className="flex items-center gap-2">
                            <IconPeople />
                            <span>Người lớn</span>
                            <QuantityButtonGroup quantity={1} onChange={(quantity) => console.log(quantity)} />
                        </div>
                        <div className="flex items-center gap-2">
                            <IconKidFace />
                            <span>Trẻ em</span>
                            <QuantityButtonGroup quantity={1} onChange={(quantity) => console.log(quantity)} />
                        </div>
                    </div>
                </div>


                <div className="space-y-3">
                    <p className="font-medium text-base">Sức chứa tối đa</p>
                    <div className="flex justify-between ">
                        <div className="flex items-center gap-2">
                            <IconPeople />
                            <span>Người lớn</span>
                            <QuantityButtonGroup quantity={1} onChange={(quantity) => console.log(quantity)} />
                        </div>
                        <div className="flex items-center gap-2">
                            <IconKidFace />
                            <span>Trẻ em</span>
                            <QuantityButtonGroup quantity={1} onChange={(quantity) => console.log(quantity)} />
                        </div>
                    </div>
                </div>


                <div className='flex justify-end'>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                        Thêm hạng phòng
                    </button>
                </div>


            </form >

        </div >
    )
};




