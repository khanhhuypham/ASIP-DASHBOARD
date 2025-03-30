import { useFormik } from "formik";
import { Area } from "../../../../models/area/area";
import * as Yup from "yup";
import { useEffect } from "react";
import { InputCustom } from "../../../../components/custom/field/input-custom";
import { areaService } from "../../../../services/area/area-service";
import { message } from "antd";


export const CreateArea = ({data,onComplete}:{data:Area,onComplete?:((agr0:Area) => void)}) => {

    const formik = useFormik({
        initialValues: new Area(),
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


    const update = (data:Area) => {
        areaService.Update(data).then((res) => {
            if (res.status == 200) {
                onComplete && onComplete(data)
            } else {
                message.error(res.message)
            }
        })
    }

    const create = (data:Area) => {
        areaService.Create(data).then((res) => {
            if (res.status == 201) {
                onComplete && onComplete(data)
            } else {
                message.error(res.message)
            }
        })
    }



    return (
        <div className="space-y-6 ">
            <h3 className='text-2xl font-semibold'>Đổi tên khu vực/tầng</h3>

            <form className='flex gap-5' onSubmit={formik.handleSubmit}>

                <div className='space-y-6 flex-1'>
                    <InputCustom
                        label="Tầng"
                        name="code"
                        value={formik.values.name}
                        error={formik.errors.name}
                        onChange={(value) => {
                            formik.setFieldValue("name", value)
                        }}
                        required
                    />

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

