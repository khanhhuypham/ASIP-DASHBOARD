
import logoCompany from "../../../assets/images/logo-login.png";
import bgLogin from "../../../assets/images/bg-login.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Button } from "antd";
import { SyncOutlined } from '@ant-design/icons';

import { useNavigate } from "react-router-dom";

import { InputCustom } from "../../../components/custom/field/input-custom";
import { ROUTE_LINK } from "../../../routers/module-router";
import Checkbox from "../../../components/custom/checkbox";
import { OPTContent } from "../component/OTP-content";


export const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            code: "",
            username: ""
        },

        validationSchema: Yup.object({

            code: Yup.string()
                .min(2, "Độ dài tối thiểu 2 ký tự")
                .max(50, "Độ dài tối đa 50 ký tự")
                .required("Mã khách sạn không được bỏ trống"),

            username: Yup.string()
                .min(2, "Độ dài tối thiểu 2 ký tự")
                .max(50, "Độ dài tối đa 50 ký tự")
                .required("Tên đăng nhập không được bỏ trống"),

            password: Yup.string()
                .required("Mật khẩu không được bỏ trống"),

        }),
        onSubmit: (values) => {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);

                navigate(ROUTE_LINK.DASHBOARD)
            }, 3000);
        },
    });

    useEffect(() => {
        formik.resetForm()
    }, [])

    return (


        <div
            className="flex flex-col items-center justify-center h-screen px-6 py-8 mx-auto bg-center bg-no-repeat bg-cover lg:py-0"
            style={{
                backgroundImage: `url(${bgLogin})`,
            }}
        >
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-6 md:space-y-8">
                    <img src={logoCompany} />
                    <div>
                        <h1 className="font-bold text-[24px]">Quên mật khẩu?</h1>
                        <p className="text-sm text-gray-500">Vui lòng điền thông tin của bạn, sau đó gửi yêu cầu cho chúng tôi để được đặt lại mật khẩu</p>
                    </div>

                    <div className="space-y-4">
                        <InputCustom
                            label="Mã khách sạn"
                            name="code"
                            value={formik.values.code}
                            error={formik.touched.code && formik.errors.code}
                            onChange={(value) => {
                                formik.setFieldValue("code", value)
                            }}
                            required
                        />

                        <InputCustom
                            label="Tên tài khoản"
                            name="username"
                            value={formik.values.username}
                            error={formik.touched.username && formik.errors.username}
                            onChange={(value) => {
                                formik.setFieldValue("username", value)
                            }}
                            required
                        />
                    </div>

                    <Button
                        type="primary"
                        className="w-full h-10 bg-gradient-to-r from-[#3985FF] to-[#0866FF]"
                        loading={loading ? { icon: <SyncOutlined spin /> } : false}
                        onClick={() => formik.handleSubmit()}
                        iconPosition="end"
                    >
                        <span className="font-bold text-base">Xác minh tài khoản</span>

                    </Button>

                </div>
            
            </div>
        </div>
    )
}

