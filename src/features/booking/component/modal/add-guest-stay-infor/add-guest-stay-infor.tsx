import React, { useEffect, useState } from 'react';
import {
    Modal,
    Form,
    Input,
    DatePicker,
    Radio,
    Button,
    Select,
    Space
} from 'antd';
import { ScanOutlined, CalendarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { InputCustom } from '../../../../../components/custom/field/input-custom';
import { Formik } from 'formik';
import { IconActive } from '../../../../../components/icons/icon-group';
import IconChevronRight from '../../../../../components/icons/icon-chevron-right';
import { CalendarFieldCustom } from '../../../../../components/custom/field/calendar-custom';
import IconQRCode from '../../../../../components/icons/icon-qr-code';
import { RadioBtnGroup, RadioOptionProps } from '../../../../../components/custom/field/radio-btn-group';
import { SelectFieldCustom } from '../../../../../components/custom/field/select-field-custom';
import IconIdScan from '../../../../../components/icons/icon-id-scan';
import { GENDER } from '../../../../../constants/enum';

const { Option } = Select;


export const AddGuestStayInfor = () => {


    const [form] = Form.useForm();

    const [dateString, setDateString] = useState("")

    const onFinish = (values: any) => {

    };

    return (
        <div className="space-y-6">
            <h3 className='text-2xl font-semibold'>Thêm thông tin khách hàng lưu trú</h3>
            <Formik
                initialValues={{ username: '', email: '' }}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                <Form className='space-y-6'>
                    <div className='grid grid-cols-2 gap-6'>

                        <SelectFieldCustom
                            label="Chọn Phỏng"
                            name=""
                            options={roomOptions}
                            required
                            onChange={(value) => {

                            }}
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
                        <div className='flex justify-between gap-4'>
                            <div className='w-full'>
                                <InputCustom
                                    label="Tên khách hàng"
                                    name="name"
                                    required
                                />
                            </div>

                            <div className='rounded-md shadow py-1 px-2 h-full flex items-center'>
                                <IconIdScan className='h-8' />
                            </div>

                        </div>


                        <InputCustom
                            label="Địa chỉ cụ thể"
                            name=""
                            required
                        />
                    </div>

                    <div className='grid grid-cols-2 gap-6'>


                        <CalendarFieldCustom
                            label="Ngày sinh"
                            name="Ngày sinh"
                            value={dateString}
                            required
                            onChange={(value) => {
                                setDateString(value)
                                console.log(value)
                            }}
                        />



                        <SelectFieldCustom
                            label="Loại giấy tờ"
                            name=""
                            options={documentTypeOptions}
                            required
                            onChange={(value) => {
                                console.log(value)
                            }}
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

                            onChange={(option: RadioOptionProps) => {

                            }}
                            required
                        />

                        <InputCustom
                            label="Số giấy tờ"
                            name=""
                            required
                        />
                    </div>

                    <div className='grid grid-cols-2 gap-6'>
                        <InputCustom
                            label="Số điện thoại"
                            name=""
                            required
                        />
                        <InputCustom
                            label="Lý do lưu trú"
                            name="email"
                            required
                        />
                    </div>

                    <div className='grid grid-cols-2 gap-6'>
                        <SelectFieldCustom
                            label="Quốc tịch"
                            name="nationality"
                            required
                            // selectedOptions={[formik.values.nationality]}
                            options={nationalityOptions}
                            // error={formik.errors.nationality}
                            onChange={(value) => {
                                // formik.setFieldValue("nationality", String(value))
                            }}
                        />

                        <InputCustom
                            label="Ghi chú"
                            name="email"
                            required
                        />
                    </div>

                    <div className='flex justify-end'>
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                            Lưu
                        </button>
                    </div>


                </Form>
            </Formik>
        </div>
    )
};



const roomOptions = [
    { label: 'P.101', value: 'P.101', },
    { label: 'P.102', value: 'P.102' },
    { label: 'P.103', value: 'P.103' },
    { label: 'P.104', value: 'P.104' },
];


const addressOptions = [
    { label: 'TPHCM', value: 'TPHCM', },
    { label: 'Hà Nội', value: 'Hà Nội' },
    { label: 'Đà Nẵng', value: 'Đà Nẵng' },
    { label: 'Cần Thơ', value: 'Cần Thơ' },
];

const documentTypeOptions = [
    { label: 'CCCD', value: 'CCCD', },
    { label: 'Bằng lái xe', value: 'Bằng lái xe' },
    { label: 'Cà vet xe', value: 'Cà vet xe' },
];
const nationalityOptions = [
    { label: 'China', value: 'china', },
    { label: 'USA', value: 'usa' },
    { label: 'Japan', value: 'japan' },
    { label: 'Korea', value: 'korea' },
];