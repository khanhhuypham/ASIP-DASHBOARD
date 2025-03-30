import { ReactComponent as IconDashboard } from "../assets/icons/ic_404_dark.svg"


export const STRING_MENU = {
    DASHBOARD: "TỔNG QUAN",
    //====================

    BOOKING_LIST: "Lịch đặt phòng",
    ASSOCIATION: "Liên kết nền tảng",
    ROOM_DIAGRAM: "Sơ đồ phòng",
        ROOM_TYPE: "Hạng phòng",
        ROOM_AND_ASSOCIATION: "Phòng và kết nối lịch",
        AREA: "Khu vực/Tầng",
        PRICE_SETTING: "Thiết lập bảng giá",


    GUEST: "Khách hàng",
        GUEST_LIST: "Danh sách khách hàng",
        GUEST_GROUP: "Nhóm khách hàng",
        STAY_GUEST: "Khách lưu trú",
       

    FINANCE: "Tài chính",

    //====================
    AUTO_MARKETING: "AUTO MARKETING",
        REGISTER_MESSAGE_FORM: "Đăng ký mẫu tin nhắn",
        MESSAGES: "Danh sách tin nhắn",
        MESSAGE_FORM: "Mẫu tin nhắn",
    //====================
    SETTING: "CÀI ĐẶT CHUNG",
        CLNICS_INFOR: "Thông tin phòng khám",
        FAQ_CATEGORY: "Danh mục câu hỏi FAQ",
        FAQ_LIST: "Danh sách câu hỏi FAQ",
        MINIAPP_INTRODUCTION: "Trang giới thiệu miniapp",
    //=======================  
};



interface SideBarItem {
    label: string,
    key: React.Key,
    navLink?: string,
    icon?: React.ReactNode,
    children?: SideBarItem[]
}

const ASD: { [key: string]: SideBarItem } = {
    DASHBOARD: {
        label: "Dashboard",
        key: "dashboard",
        navLink: "/dashboard",
        icon: <IconDashboard />
    },

    ORDER: {
        label: "Đơn hàng",
        key: "order",
        navLink: "/order",
        // icon: <IconDashboard />
    },

    SETTINGS: {
        label: "Settings",
        key: "settings",
        navLink: "/settings",
        children: [
            {
                label: "",
                key: "",
                navLink:"",
            },
        ]
    },
    // Add more items as needed
};

