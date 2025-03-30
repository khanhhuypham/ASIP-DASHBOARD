import { Avatar } from "antd";
import { Guest } from "../../../../../models/guest/guest";
import { GUEST_TYPE } from "../../../../../constants/enum";


export const GuestInfor = ({ data }: { data: Guest }) => {

    return (
        <div className="rounded-lg border max-w-lg mx-auto my-5 p-5">

            <div className="flex items-center justify-between mb-5">

                <div className="flex items-center gap-2">
                    <div>
                        <Avatar size={40} src={process.env.REACT_APP_IMAGE_URL + data.avatar.url} />
                    </div>
                    <div>
                        <div className="font-bold text-base text-gray-800">{data.name}</div>
                        <div className="text-sm text-gray-500">{data.phone}</div>
                    </div>
                </div>

                <button
                    className="bg-green-100 text-green-800 border-none rounded-md px-3 py-2 ml-auto text-xs cursor-default"
                >
                    {/* {customerData.status} */} Đang sử dung
                </button>
            </div>

            {/* Details Section */}
            <div>
                <div className="flex justify-between border-b border-gray-200 py-2">
                    <div className="font-bold text-gray-600 w-40 text-sm">Mã khách hàng</div>
                    <div className="text-sm">{data.code}</div>
                </div>
                <div className="flex justify-between border-b border-gray-200 py-2">
                    <span className="font-bold text-gray-600 w-40 text-sm">Ngày sinh</span>
                    <span className="text-sm">{data.DOB}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 py-2">
                    <span className="font-bold text-gray-600 w-40 text-sm">Giới tính</span>
                    <span className="text-sm">{data.gender}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 py-2">
                    <span className="font-bold text-gray-600 w-40 text-sm">Email</span>
                    <span className="text-sm">{data.email}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 py-2">
                    <span className="font-bold text-gray-600 w-40 text-sm">Quốc tịch</span>
                    <span className="text-sm">{data.nationality}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 py-2">
                    <span className="font-bold text-gray-600 w-40 text-sm">Mã Số thuế</span>
                    <span className="text-sm">{data.taxCode === "" ? "-" : data.taxCode}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 py-2">
                    <div className="font-bold text-gray-600 w-40 text-sm">Loại khách hàng</div>
                    <div className="text-sm">{data.guest_type == GUEST_TYPE.INDIVIDUAL ? "Cá nhân" : "Doanh nghiệp"}</div>
                </div>
                <div className="flex justify-between border-b border-gray-200 py-2">
                    <span className="font-bold text-gray-600 w-40 text-sm">Thành phố(Tỉnh)/Quận(Huyện)/Phường(Xã)</span>
                    {/* <div className="text-sm">{customerData.cityProvinceDistrict}</div> */}
                </div>
                <div className="flex justify-between border-b border-gray-200 py-2">
                    <div className="font-bold text-gray-600 w-40 text-sm">Địa chỉ cụ thể</div>
                    {/* <div className="text-sm">{data.specificAddress}</div> */}
                </div>
                <div className="flex justify-between border-b border-gray-200 py-2">
                    <div className="font-bold text-gray-600 w-40 text-sm">Nhóm khách hàng</div>
                    <div className="text-sm">{data.guest_group.name}</div>
                </div>
                <div className="flex justify-between py-2">
                    <div className="font-bold text-gray-600 w-40 text-sm">Ghi chú</div>
                    <div className="text-sm">{data.description === "" ? "-" : data.description}</div>
                </div>
            </div>
        </div>
    )
}