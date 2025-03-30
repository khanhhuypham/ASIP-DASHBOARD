import { useFormik } from "formik";
import { Guest } from "../../../../../models/booking/guest";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import ImageUploadView from "../../../../../components/custom/single-image-upload";
import { InputCustom } from "../../../../../components/custom/field/input-custom";
import { CalendarFieldCustom } from "../../../../../components/custom/field/calendar-custom";
import { Room } from "../../../../../models/room/room";
import { TextAreaCustom } from "../../../../../components/custom/field/text-area-custom";
import SelectFieldCustom from "../../../../../components/custom/field/select-field-custom";
import { RoomType } from "../../../../../models/room-type/room-type";
import { Area } from "../../../../../models/area/area";
import { areaService } from "../../../../../services/area/area-service";
import { message } from "antd";
import { roomTypeService } from "../../../../../services/room-type/room-type-service";
import { ImageUpload } from "../../../../../components/custom/image-upload";
import { ImageType } from "react-images-uploading";
import { uploadService } from "../../../../../services/upload-service/upload-service";
import { roomService } from "../../../../../services/room/room-service";

export const AddRoom = ({ data,onComplete }: { data: Room, onComplete?: () => void }) => {
    const [files, setFiles] = useState<FileList>()
    const [roomType, setRoomType] = useState<RoomType[]>([])
    const [area, setArea] = useState<Area[]>([])

    const formik = useFormik({
        initialValues: new Room(),
        validationSchema: Yup.object({
            name: Yup.string()
                .min(2, "Độ dài tối thiểu 2 ký tự")
                .max(50, "Độ dài tối đa 50 ký tự")
                .required("Tên phòng/số phòng không được bỏ trống"),

        }),
        onSubmit: (values) => {

            if (files) {
                uploadImage(files)
            } else {
                data.id > 0
                    ? update(values)
                    : create(values)

            }
        },
    });

    const generateRandomCode = (): string => {
        // Generate a random 3-digit number between 100 and 999
        const randomNumber = Math.floor(Math.random() * 900) + 100;
        // Combine the prefix with the random number
        return `KH00${randomNumber}`;
    };

    const getArea = () => {
        areaService.List().then((res) => {
            if (res.status == 200) {
                setArea(res.data);
            } else {
                message.error(res.message)
            }
        })
    }

    const getRoomType = () => {
        roomTypeService.List().then((res) => {
            if (res.status == 200) {
                setRoomType(res.data);
            } else {
                message.error(res.message)
            }
        })
    }

    const uploadImage = (files: FileList) => {
        uploadService.Upload(files, `${data.id}-room_type`).then((res) => {
            if (res.status == 201) {

                data.id > 0
                    ? update({ ...formik.values, images: res.data })
                    : create({ ...formik.values, images: res.data })

            } else {
                message.error(res.message)
            }
        })
    }

    const update = (data: Room) => {
        roomService.Update(data).then((res) => {
            if (res.status == 200) {
                onComplete && onComplete()
            } else {
                message.error(res.message)
            }
        })
    }


    const create = (data: Room) => {
        roomService.Create(data).then((res) => {
            if (res.status == 201) {
                onComplete && onComplete()
            } else {
                message.error(res.message)
            }
        })
    }


    useEffect(() => {


        if (data.id == 0) {
            formik.resetForm()
            formik.setFieldValue("code", generateRandomCode())
        } else {
            formik.setValues(data)
        }

        getArea()
        getRoomType()

    }, [data])




    return (
        <div className="space-y-6 ">
            <h3 className='text-2xl font-semibold'>Thêm hạng phòng</h3>

            <form className='space-y-4' onSubmit={formik.handleSubmit}>
                {/* <div className='w-[170px] h-[170px]'>
                    <ImageUploadView onFileSelected={function (file: File): void {
                        throw new Error('Function not implemented.');
                    }} />
                </div> */}

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
                    label="Tên/Số phòng"
                    name="name"
                    value={formik.values.name}
                    error={formik.errors.name}
                    onChange={(value) => {
                        formik.setFieldValue("name", value)
                    }}
                    required
                />


                <SelectFieldCustom
                    label="Hạng phòng"
                    name="room_type"
                    options={roomType.map((type) => ({ label: type.name, value: type.id }))}
                    selectedOptions={formik.values.room_type.id > 0 ? [formik.values.room_type.id] : []}
                    required
                    onChange={(value) => {
                        const selectedArea = roomType.find((type) => type.id == Number(value))
                        if (selectedArea) {
                            console.log(selectedArea)
                            formik.setFieldValue("room_type", selectedArea)
                        }

                    }}
                />



                <InputCustom
                    label="Giá phòng"
                    name="price"
                    // value={formik.values.email}
                    // error={formik.errors.email}
                    onChange={(value) => {
                        formik.setFieldValue("", value)
                    }}
                    required
                />

                <CalendarFieldCustom
                    label="Ngày bắt đầu hoạt động"
                    name=""
                    // value={formik.values.DOB}
                    // error={formik.errors.DOB}
                    required
                    onChange={(value) => {
                        formik.setFieldValue("", value)
                    }}
                />

                <SelectFieldCustom
                    label="Chọn khu vực"
                    name="area"
                    options={area.map((a) => ({ label: a.name, value: a.id }))}
                    selectedOptions={formik.values.area.id > 0 ? [formik.values.area.id] : []}
                    required
                    onChange={(value) => {
                        const selectedArea = area.find((a) => a.id == Number(value))

                        if (selectedArea) {
                            console.log(selectedArea)
                            formik.setFieldValue("area", selectedArea)
                        }

                    }}
                />


                <TextAreaCustom
                    label="mô tả"
                    name="description"
                    value={formik.values.description}
                    error={formik.errors.description}
                    onChange={(value) => {
                        formik.setFieldValue("description", value)
                    }}
                    required
                />


                <div className='flex justify-end'>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                        Thêm phòng
                    </button>
                </div>


            </form >

        </div >
    )
};




