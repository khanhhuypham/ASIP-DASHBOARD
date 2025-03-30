import { useFormik } from "formik";
import { GuestGroup } from "../../../../models/guest/guest-group";
import * as Yup from "yup";
import { useEffect } from "react";
import { message } from "antd";
import { guestGroupService } from "../../../../services/guest/guest-group-service";
import { InputCustom } from "../../../../components/custom/field/input-custom";
import { TextAreaCustom } from "../../../../components/custom/field/text-area-custom";
import { RadioBtnGroup, RadioOptionProps } from "../../../../components/custom/field/radio-btn-group";


export const CreateGuestGroup = ({ data, onComplete }: { data: GuestGroup, onComplete?: ((agr0: GuestGroup) => void) }) => {

    const formik = useFormik({
        initialValues: new GuestGroup(),
        validationSchema: Yup.object({
            name: Yup.string()
                .min(2, "Độ dài tối thiểu 2 ký tự")
                .max(50, "Độ dài tối đa 50 ký tự")
                .required("Tên tầng/khu vực không được bỏ trống"),

        }),
        onSubmit: (values) => {
            values.id > 0 ? update(values) : create(values)

        },
    });


    useEffect(() => {
        formik.setValues(data)
    }, [data])


    const update = (data: GuestGroup) => {
        guestGroupService.Update(data).then((res) => {
            if (res.status == 200) {
                onComplete && onComplete(data)
            } else {
                message.error(res.message)
            }
        })
    }

    const create = (data: GuestGroup) => {
        guestGroupService.Create(data).then((res) => {
            if (res.status == 201) {
                onComplete && onComplete(data)
            } else {
                message.error(res.message)
            }
        })
    }



    return (
        <div className="space-y-6 ">
            <h3 className='text-2xl font-semibold'>Thêm nhóm khách hàng</h3>

            <form className='flex gap-5' onSubmit={formik.handleSubmit}>

                <div className='space-y-4 flex-1'>
                    <InputCustom
                        label="Tên nhóm"
                        name="code"
                        value={formik.values.name}
                        error={formik.errors.name}
                        onChange={(value) => {
                            formik.setFieldValue("name", value)
                        }}
                        required
                    />

                    <RadioBtnGroup
                        label="Giảm giá"
                        name=""
                        options={[
                            { label: 'VNĐ', value: "1" },
                            { label: '%', value: "2" },
                        ]}
                        value={"1"}// Pass default value
                        // error={formik.errors.guestType}
                        onChange={(option: RadioOptionProps) => {
                            formik.setFieldValue("", parseInt(option.value))
                        }}

                    />

                    <InputCustom
                        label="Nhập số tiền"
                        name="price"
                        // value={formik.values.email}
                        // error={formik.errors.email}
                        onChange={(value) => {
                            formik.setFieldValue("", value)
                        }}

                    />

                    <div>
                        <TextAreaCustom
                            label="Ghi chú"
                            name="description"
                            value={formik.values.description}
                            error={formik.errors.description}
                            rows={3}
                            onChange={(value) => {
                                formik.setFieldValue("description", value)
                            }}

                        />
                        <p className="text-gray-400">{`${formik.values.description.length}/180`}</p>
                    </div>



                    <div className='flex justify-end'>
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                            {data.id > 0 ? "Cập nhật" : "Thêm mới"}
                        </button>
                    </div>
                </div>

            </form>

        </div>
    )
};

