import React, { useEffect, useState } from 'react';
import {
    Form,
    Select
} from 'antd';
import * as Yup from "yup";
import { InputCustom } from '../../../../../components/custom/field/input-custom';
import {  useFormik } from 'formik';

import { CalendarFieldCustom } from '../../../../../components/custom/field/calendar-custom';


import { SelectFieldCustom } from '../../../../../components/custom/field/select-field-custom';
import { RadioBtnGroup, RadioOptionProps } from '../../../../../components/custom/field/radio-btn-group';
import { emailRegex, phoneRegExp } from '../../../../../constants/regex';
import { Guest } from '../../../../../models/booking/guest';
import { GENDER, GUEST_GROUP_TYPE, GUEST_TYPE } from '../../../../../constants/enum';
import IconIdScan from '../../../../../components/icons/icon-id-scan';

import SingleImageUpload from '../../../../../components/custom/single-image-upload';


const { Option } = Select;


export const AddGuest = () => {



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
                .required("Tên công ty không được bỏ trống"),

            phone: Yup.string()
                .matches(phoneRegExp, "số điện thoại không hợp lệ")
                .required("Số điện thoại không được để trống"),

            email: Yup.string()
                .matches(emailRegex, "Email không hợp lệ"),

        }),
        onSubmit: (values) => {
            console.log(values)
        },
    });

    const generateRandomCode = (): string => {
        // Generate a random 3-digit number between 100 and 999
        const randomNumber = Math.floor(Math.random() * 900) + 100;
        // Combine the prefix with the random number
        return `KH00${randomNumber}`;
    };



    useEffect(() => {
        formik.setFieldValue("code", generateRandomCode())
    }, [])


    return (
        <div className="space-y-6 ">
            <h3 className='text-2xl font-semibold'>Thêm khách hàng</h3>

            <form className='flex gap-5' onSubmit={formik.handleSubmit}>
                <div className='w-[170px] h-[170px]'>
                    <SingleImageUpload onChange={() =>{}} />
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
                            required
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
                            value={formik.values.guestType.toString()}// Pass default value
                            error={formik.errors.guestType}
                            onChange={(option: RadioOptionProps) => {

                                formik.setFieldValue("guestType", parseInt(option.value))
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
                            value={formik.values.address}
                            error={formik.errors.address}
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
                            name="guestGroupType"
                            required
                            selectedOptions={formik.values.guestGroupType.toString().length === 0 ? undefined : [formik.values.guestGroupType.toString()]}
                            options={guestGroupOptions}
                            onChange={(value) => {
                                formik.setFieldValue("guestGroupType", parseInt(String(value)))
                            }}
                        />


                    </div>

                    <div className='grid grid-cols-2 gap-6'>

                        <SelectFieldCustom
                            label="Quốc tịch"
                            name="nationality"
                            allowClear
                            required
                            selectedOptions={formik.values.nationality.length === 0 ? undefined : [formik.values.nationality]}
                            options={nationalityOptions}
                            error={formik.errors.nationality}
                            onChange={(value) => {
                                formik.setFieldValue("nationality", String(value))
                            }}
                        />


                        <InputCustom
                            label="Ghi chú"
                            name="note"
                            value={formik.values.note}
                            error={formik.errors.note}
                            onChange={(value) => {
                                formik.setFieldValue("note", value)
                            }}
                            required
                        />


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

const guestGroupOptions = [
    { label: 'VIP', value: GUEST_GROUP_TYPE.VIP.toString(), },
    { label: 'Family Travelers', value: GUEST_GROUP_TYPE.FAMILY_TRAVELERS.toString() },
    { label: 'Affluent Travelers', value: GUEST_GROUP_TYPE.AFFLUENT_TRAVELERS.toString() },
    { label: 'Voluntourism', value: GUEST_GROUP_TYPE.VOLUNTOURISM.toString() },
];

const nationalityOptions = [
    { label: 'China', value: 'china', },
    { label: 'USA', value: 'usa' },
    { label: 'Japan', value: 'japan' },
    { label: 'Korea', value: 'korea' },
];