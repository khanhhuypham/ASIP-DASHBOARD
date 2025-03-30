import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgLogin from "../../../assets/images/bg-login.png";
import logoLogin from "../../../assets/images/logo-login.png";
import IconLockDots from "../../../components/icons/icon-lock-dots";
import IconMail from "../../../components/icons/icon-mail";

import CookieUtils from "../../../utils/cookie-utils";
import { ButtonCustom } from "../../../components/custom/button-custom";
import { ROUTE_LINK } from "../../../routers/module-router";

export const LoginPage = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [companyName, setCompanyName] = useState("");
    const [errorCompanyName, setErrorCompanyName] = useState("");
    const [errorCompanyNameVisible, setErrorCompanyNameVisible] = useState(false);
    const [userName, setUserName] = useState("");
    const [errorUserName, setErrorUserName] = useState("");
    const [errorUserNameVisible, setErrorUserNameVisible] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [errorPasswordVisible, setErrorPasswordVisible] = useState(false);
    const [errorPassword, setErrorPassword] = useState("");

    const handleLogin = () => {
        CookieUtils.setCookie("user", JSON.stringify({ access_token: "1234567890" }));
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigate(ROUTE_LINK.DASHBOARD);
        }, 1500);
    }

    interface RenderComponentProps {
        labelText: string;
        type?: React.HTMLInputTypeAttribute;
        icon?: React.ReactNode;
        isPassword?: boolean;
        value: string;
        setValue: (value: string) => void;
        isShowError?: boolean;
        messageError?: string;
        id?: string;
        autoFocus?: boolean;
    }

    function renderComponent({
        labelText,
        type,
        icon,
        isPassword = false,
        value,
        setValue,
        isShowError,
        messageError,
        id,
        autoFocus,
    }: RenderComponentProps) {
        return (
            <div>
                <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900">
                    {labelText}
                </label>
                <div className="relative">
                    <span className="absolute -translate-y-1/2 start-4 top-1/2">{icon}</span>
                    <input
                        id={id}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleLogin();
                            }
                        }}
                        type={type}
                        placeholder="Nhập thông tin"
                        className="form-input ps-10 placeholder:text-white-dark"
                        autoComplete={isPassword ? "new-password" : "off"}
                        autoFocus={autoFocus}
                    />
                    {isPassword && (
                        <button
                            type="button"
                            className="absolute -translate-y-1/2 end-4 top-1/2"
                            data-testid="toggle-password-visibility"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <p className="text-[12px] font-semibold underline">{showPassword ? "Ẩn" : "Hiện"}</p>
                        </button>
                    )}
                </div>
                {isShowError && <span className="text-sm text-red-500">{messageError}</span>}
            </div>
        );
    }

    function renderLoginForm() {
        return (
            <>
                <img src={logoLogin} />
                <div className="mb-5">
                    <h1 className="text-[24px] font-semibold leading-tight tracking-tight text-[#374151]   ">
                        Chào mừng bạn trở lại làm việc!
                    </h1>
                </div>

                <form className="space-y-4" data-testid="login-form" onSubmit={(e) => e.preventDefault()}>

                    {renderComponent({
                        labelText: "Tên tài khoản",
                        id: "user-name-login",
                        type: "text",
                        icon: <IconMail fill={false} />,
                        value: userName,
                        setValue: (value) => setUserName(value),
                        isShowError: errorUserNameVisible,
                        messageError: errorUserName,
                    })}
                    {renderComponent({
                        labelText: "Mật khẩu",
                        id: "password-login",
                        type: showPassword ? "text" : "password",
                        icon: <IconLockDots fill={false} />,
                        value: password,
                        setValue: (value) => setPassword(value),
                        isPassword: true,
                        isShowError: errorPasswordVisible,
                        messageError: errorPassword,
                    })}
                    <div className="flex items-end justify-end">
                        <button type="button" className="text-sm font-medium text-primary-600 hover:underline text-primary" onClick={() => navigate(ROUTE_LINK.FORGOT_PASSWORD)}>
                            Quên mật khẩu?
                        </button>
                    </div>
                    <ButtonCustom
                        isLoading={isLoading}
                        text='đăng nhập'
                        className="bg-[#0866FF] text-white w-full rounded-xl py-4"
                        onClick={handleLogin}
                    />

                </form>
            </>
        );
    }

    return (
        <div
            className="flex flex-col items-center justify-center h-screen px-6 py-8 mx-auto bg-center bg-no-repeat bg-cover lg:py-0"
            style={{
                backgroundImage: `url(${bgLogin})`,
            }}
        >
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6">
                    {renderLoginForm()}
                </div>
            </div>
        </div>
    );
};
