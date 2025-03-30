import { useFormik } from "formik";
import { Guest } from "../../../../models/guest/guest";
import * as Yup from "yup";
import { emailRegex, phoneRegExp } from "../../../../constants/regex";
import { useEffect, useState } from "react";
import { InputCustom } from "../../../../components/custom/field/input-custom";
import IconIdScan from "../../../../components/icons/icon-id-scan";
import { RadioBtnGroup, RadioOptionProps } from "../../../../components/custom/field/radio-btn-group";
import SelectFieldCustom from "../../../../components/custom/field/select-field-custom";
import { GENDER, GUEST_TYPE } from "../../../../constants/enum";
import { CalendarFieldCustom } from "../../../../components/custom/field/calendar-custom";
import { GuestGroup } from "../../../../models/guest/guest-group";
import { guestGroupService } from "../../../../services/guest/guest-group-service";
import { message } from "antd";
import { TextAreaCustom } from "../../../../components/custom/field/text-area-custom";
import { ImageType } from "react-images-uploading";
import SingleImageUpload from "../../../../components/custom/single-image-upload";
import { uploadService } from "../../../../services/upload-service/upload-service";
import { guestService } from "../../../../services/guest/guest-service";



export const CreateGuest = ({ data, onComplete }: { data: Guest, onComplete?: (() => void) }) => {
    const [files, setFiles] = useState<FileList | undefined>()
    const [guestGroup, setguestGroup] = useState<GuestGroup[]>([])

    const formik = useFormik({
        initialValues: new Guest(),
        validationSchema: Yup.object({
            name: Yup.string()
                .min(2, "Độ dài tối thiểu 2 ký tự")
                .max(50, "Độ dài tối đa 50 ký tự")
                .required("Tên khách hàng không được bỏ trống"),

            DOB: Yup.string()
                .required("Ngày sinh không được bỏ trống"),

            companyName: Yup.string()
                .when('guest_type', {
                    is: GUEST_TYPE.ENTERPRISE,
                    then: (schema) => schema.required("Tên công ty không được bỏ trống"),
                    otherwise: (schema) => schema.notRequired()
                }),


            phone: Yup.string()
                .matches(phoneRegExp, "số điện thoại không hợp lệ")
                .required("Số điện thoại không được để trống"),

            email: Yup.string()
                .matches(emailRegex, "Email không hợp lệ")
                .nullable(),

        }),
        onSubmit: (values) => {

            data.id > 0
                ? update(values, files)
                : create(values)

        },
    });

    const generateRandomCode = (): string => {
        // Generate a random 3-digit number between 100 and 999
        const randomNumber = Math.floor(Math.random() * 900) + 100;
        // Combine the prefix with the random number
        return `KH00${randomNumber}`;
    };

    const getGuestGroup = () => {
        guestGroupService.List().then((res) => {
            if (res.status == 200) {
                setguestGroup(res.data)
            } else {
                message.error(res.message)
            }
        })
    }

    const uploadImage = (data: Guest, files: FileList) => {
        uploadService.Upload(files, `${data.id}-guest`).then((res) => {
            if (res.status == 201) {

                if (res.data.length > 0) {
                    update({ ...data, avatar: res.data[0] }, undefined)
                }

            } else {
                message.error(res.message)
            }
        })
    }

    const update = (data: Guest, image?: FileList) => {
        guestService.Update(data).then((res) => {
            if (res.status == 200) {

                if (image) {
                    uploadImage(data, image)
                } else {
                    onComplete && onComplete()
                }


            } else {
                message.error(res.message)
            }
        })
    }


    const create = (data: Guest) => {
        guestService.Create(data).then((res) => {
            if (res.status == 201) {

                if (files) {
                    uploadImage(res.data, files)
                } else {
                    onComplete && onComplete()
                }


            } else {
                message.error(res.message)
            }
        })
    }

    useEffect(() => {
        getGuestGroup()


        if (data.id == 0) {
            formik.resetForm()
            setFiles(undefined)
            formik.setFieldValue("code", generateRandomCode())
        } else {
            formik.setValues(data)

        }

    }, [data])




    return (
        <div className="space-y-6 ">
            <h3 className='text-2xl font-semibold'>Thêm khách hàng</h3>

            <form className='flex gap-5' onSubmit={formik.handleSubmit}>
                <div className='w-[170px] h-[170px]'>
                    <SingleImageUpload
                        image={formik.values.avatar}
                        onChange={(image: ImageType) => {


                            const dataTransfer = new DataTransfer();

                            if (image.file) {
                                dataTransfer.items.add(image.file)
                            }


                            setFiles(dataTransfer.files)


                        }}
                    />
                </div>


                <div className='space-y-6 flex-1'>
                    <div className='grid grid-cols-2 gap-6'>
                        <InputCustom
                            label="Mã khách hàng"
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
                            label="Mã Số thuế"
                            name="taxCode"
                            value={formik.values.taxCode}
                            error={formik.errors.taxCode}
                            onChange={(value) => {
                                formik.setFieldValue("taxCode", value)
                            }}
                        />
                    </div>

                    <div className='grid grid-cols-2 gap-6'>
                        <div className='flex justify-between gap-4'>
                            <div className='w-full'>
                                <InputCustom
                                    label="Tên khách hàng"
                                    name="name"
                                    onChange={(value) => {
                                        formik.setFieldValue("name", value)
                                    }}
                                    value={formik.values.name}
                                    error={formik.errors.name}
                                    required
                                />
                            </div>


                            <div className='rounded-md shadow py-1 px-2 flex items-center'>
                                <IconIdScan />
                            </div>

                        </div>

                        <RadioBtnGroup
                            label="Loại khách hàng"
                            name="guestType"
                            options={[
                                { label: 'Cá nhân', value: GUEST_TYPE.INDIVIDUAL.toString() },
                                { label: 'Doanh nghiệp', value: GUEST_TYPE.ENTERPRISE.toString() },
                            ]}
                            value={formik.values.guest_type.toString()}// Pass default value
                            error={formik.errors.guest_type}
                            onChange={(option: RadioOptionProps) => {

                                formik.setFieldValue("guest_type", parseInt(option.value))
                            }}
                            required
                        />
                    </div>

                    <div className='grid grid-cols-2 gap-6'>
                        <CalendarFieldCustom
                            label="Ngày sinh"
                            name="DOB"
                            value={formik.values.DOB}
                            error={formik.errors.DOB}
                            required
                            onChange={(value) => {

                                formik.setFieldValue("DOB", value)


                            }}
                        />

                        <InputCustom
                            label="Tên công ty"
                            name="companyName"
                            value={formik.values.companyName}
                            error={formik.errors.companyName}
                            onChange={(value) => {
                                formik.setFieldValue("companyName", value)
                            }}
                            required
                        />
                    </div>

                    <div className='grid grid-cols-2 gap-6'>

                        <RadioBtnGroup
                            label="Giới tính"
                            name="gender"
                            options={[
                                { label: "Male", value: GENDER.MALE.toString() },
                                { label: "Female", value: GENDER.FEMALE.toString() },
                                { label: "Other", value: GENDER.OTHER.toString() },
                            ]}

                            value={formik.values.gender.toString()}
                            error={formik.errors.gender}
                            onChange={(option: RadioOptionProps) => {
                                formik.setFieldValue("gender", parseInt(option.value))
                            }}
                            required
                        />

                        <SelectFieldCustom
                            label="Thành phố(Tỉnh)/Quận(Huyện)/Phường(Xã)"
                            name="address"
                            options={addressOptions}
                            required
                            onChange={(value) => {
                                // setFormValues({ ...formValues, address: "303 Phạm Văn Đồng" });
                            }}
                        />

                    </div>
                    <div className='grid grid-cols-2 gap-6'>
                        <InputCustom
                            label="Email"
                            name="email"
                            value={formik.values.email}
                            error={formik.errors.email}
                            onChange={(value) => {
                                formik.setFieldValue("email", value)
                            }}
                            required
                        />

                        <InputCustom
                            label="Địa chỉ cụ thể"
                            name="address"
                            // value={formik.values.address}
                            // error={formik.errors.address}
                            onChange={(value) => {
                                formik.setFieldValue("address", value)
                            }}
                            required
                            disabled={true}
                        />

                    </div>

                    <div className='grid grid-cols-2 gap-6'>
                        <InputCustom
                            label="Số điện thoại"
                            name="phone"
                            value={formik.values.phone}
                            error={formik.errors.phone}
                            onChange={(value) => {
                                formik.setFieldValue("phone", value)
                            }}
                            required
                        />



                        <SelectFieldCustom
                            label="Nhóm khách hàng"
                            name="guest_group"
                            allowClear
                            required
                            selectedOptions={formik.values.guest_group.id == 0 ? undefined : [formik.values.guest_group.id.toString()]}
                            options={guestGroup.map((g) => ({ label: g.name, value: g.id.toString() }))}
                            onChange={(value) => {

                                const selectedGroup = guestGroup.find((a) => a.id == Number(value))

                                if (selectedGroup) {
                                    formik.setFieldValue("guest_group", selectedGroup)
                                }

                            }}
                        />


                    </div>

                    <div className='grid grid-cols-2 gap-6'>

                        <SelectFieldCustom
                            label="Quốc tịch"
                            name="nationality"
                            allowClear
                            required
                            // selectedOptions={formik.values.nationality.length == 0 ? undefined : [formik.values.nationality]}
                            options={nationalityOptions}
                            error={formik.errors.nationality}
                            onChange={(value) => {
                                formik.setFieldValue("nationality", String(value))
                            }}
                        />

                    </div>

                    <div>
                        <TextAreaCustom
                            label="Ghi chú"
                            name="description"
                            value={formik.values.description}
                            error={formik.errors.description}
                            onChange={(value) => {
                                formik.setFieldValue("description", value)
                            }}

                        />
                        <p className="text-gray-400">{`${formik.values.description?.length ?? 0}/180`}</p>
                    </div>


                    <div className='flex justify-end'>
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                            Lưu
                        </button>
                    </div>
                </div>

            </form>

        </div>
    )
};


const addressOptions = [
    { label: 'TPHCM', value: 'TPHCM', },
    { label: 'Hà Nội', value: 'Hà Nội' },
    { label: 'Đà Nẵng', value: 'Đà Nẵng' },
    { label: 'Cần Thơ', value: 'Cần Thơ' },
];


const nationalityOptions = [
    { label: 'China', value: 'china', },
    { label: 'USA', value: 'usa' },
    { label: 'Japan', value: 'japan' },
    { label: 'Korea', value: 'korea' },
];