import { useFormik } from "formik";
import { Guest } from "../../../../../models/booking/guest";
import * as Yup from "yup";
import { useEffect } from "react";

import { InputCustom } from "../../../../../components/custom/field/input-custom";
import { CalendarFieldCustom } from "../../../../../components/custom/field/calendar-custom";
import { RadioBtnGroup, RadioOptionProps } from "../../../../../components/custom/field/radio-btn-group";
import { Price } from "../../../../../models/price/price";
import { priceService } from "../../../../../services/price/price-service";
import { message } from "antd";

export const AddPrice = ({ data, onComplete }: { data: Price, onComplete?: (() => void) }) => {
    
    const formik = useFormik({
        initialValues: new Price(),
        validationSchema: Yup.object({
            name: Yup.string()
                .min(2, "Độ dài tối thiểu 2 ký tự")
                .max(50, "Độ dài tối đa 50 ký tự")
                .required("Tên khách hàng không được bỏ trống"),

        }),
        onSubmit: (values) => {
            values.id > 0 ? update(values) : create(values)
        },
    });

    const generateRandomCode = (): string => {
        // Generate a random 3-digit number between 100 and 999
        const randomNumber = Math.floor(Math.random() * 900) + 100;
        // Combine the prefix with the random number
        return `KH00${randomNumber}`;
    };


    const update = (data: Price) => {
        priceService.Update(data).then((res) => {
            if (res.status == 200) {
                onComplete && onComplete()
            } else {
                message.error(res.message)
            }
        })
    }

    const create = (data: Price) => {
        priceService.Create(data).then((res) => {
            if (res.status == 201) {
                onComplete && onComplete()
            } else {
                message.error(res.message)
            }
        })
    }




    useEffect(() => {
        if (data.id > 0) {
            formik.setValues(data)
        } else {
            formik.resetForm()
            formik.setFieldValue("code", generateRandomCode())
        }

    }, [data])


    return (
        <div className="space-y-6 ">
            <h3 className='text-2xl font-semibold'>Thêm bảng giá</h3>

            <form className='space-y-4' onSubmit={formik.handleSubmit}>


                <InputCustom
                    label="Mã Bảng giá"
                    name="code"
                    value={formik.values.code}
                    error={formik.errors.code}
                    required
                    disabled={true}
                />


                <InputCustom
                    label="Tên bảng giá"
                    name="name"
                    value={formik.values.name}
                    error={formik.errors.name}
                    onChange={(value) => {
                        formik.setFieldValue("name", value)
                    }}
                    required
                />

                <div className="space-y-2">

                    <p className="text-base">Hiệu lực <span className="text-red-600">*</span></p>
                    <div className="flex items-center flex-col md:flex-row  gap-4">

                        <CalendarFieldCustom
                            label="Bắt đầu"
                            name="valid_from"
                            value={formik.values.valid_from}
                            error={formik.errors.valid_from}
                            onChange={(value) => {
                                formik.setFieldValue("valid_from", value)
                            }}
                            showTime
                         
                        />

                        <CalendarFieldCustom
                            label="Kết thúc"
                            name="valid_to"
                            value={formik.values.valid_to}
                            error={formik.errors.valid_to}
                            onChange={(value) => {
                                formik.setFieldValue("valid_to", value)
                            }}
                            showTime

                        />
                    </div>




                </div>






                <RadioBtnGroup
                    label="Khách hàng áp dụng"
                    name="guestType"
                    options={[
                        { label: 'Toàn bộ khách hàng', value: "1" },
                        { label: 'Nhóm khách hàng', value: "2" },
                    ]}
                    // value={formik.values.guestType.toString()}// Pass default value
                    // error={formik.errors.guestType}
                    onChange={(option: RadioOptionProps) => {

                        formik.setFieldValue("guestType", parseInt(option.value))
                    }}
                    required
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


                <div className='flex justify-end'>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                        {data.id > 0 ? "Cập nhật" : "Thêm mới"}
                    </button>
                </div>


            </form >

        </div >
    )
};




