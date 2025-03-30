

import logoCompany from "../../../assets/images/logo-login.png";
import bgLogin from "../../../assets/images/bg-login.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useRef, useState } from "react";
import { Button } from "antd";
import { SyncOutlined } from '@ant-design/icons';

import { useNavigate } from "react-router-dom";

import { InputCustom } from "../../../components/custom/field/input-custom";
import { ROUTE_LINK } from "../../../routers/module-router";
import Checkbox from "../../../components/custom/checkbox";


export const OPTContent = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState<string[]>(["1","2","3","4","5","6"]);
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (!/^[0-9]?$/.test(value)) return; // Allow only numbers

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to next input if a digit is entered
        if (value && index < length - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }

        if (event.key === "ArrowLeft" && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }

        if (event.key === "ArrowRight" && index < length - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };


    return (

        <div className="p-6 space-y-6 md:space-y-8">
            <img src={logoCompany} />
            <div>
                <h1 className="font-bold text-[24px]">Xác minh tài khoản</h1>
                <p className="text-sm text-gray-500">Nhập mã xác minh gồm 6 chữ số đã được gửi tới Google Authenticator của bạn.</p>
            </div>

            <div className="flex justify-center gap-3">
                {otp.map((value, index) => (
                    <input
                        key={index}
                        ref={(el) => (inputsRef.current[index] = el)}
                        type="text"
                        value={value}
                        maxLength={1}
                        onChange={(event) => handleChange(index, event)}
                        onKeyDown={(event) => handleKeyDown(index, event)}
                        style={{
                            width: "40px",
                            height: "40px",
                            textAlign: "center",
                            fontSize: "20px",
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                        }}
                    />
                ))}
            </div>

            <Button
                type="primary"
                className="w-full h-10 bg-gradient-to-r from-[#3985FF] to-[#0866FF]"
                loading={loading ? { icon: <SyncOutlined spin /> } : false}
                iconPosition="end"
            >
                <span className="font-bold text-base">Xác minh</span>

            </Button>

        </div>
    )
}

