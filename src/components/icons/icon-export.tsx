import { FC } from "react";
import { IconProps } from "../../constants/popup-interface";

const IconExport: FC<IconProps> = ({ className, fill = false, duotone = true }) => {
    return (
        <div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
                <path d="M20.5 6.79311V11.5H19.5V9V8.5H19H13.5V3V2.5H13H5H4.5V3V21V21.5H5H10.5V22.5H3.5V1.5H15.2069L20.5 6.79311ZM15.3536 3.06045L14.5 2.20689V3.414V7V7.5H15H18.586H19.7931L18.9396 6.64645L15.3536 3.06045ZM23.2049 19.002L19.046 23.2089L18.3351 22.506L20.4635 20.3536L21.3056 19.502H20.108H13.498V18.502H20.108H21.3056L20.4635 17.6504L18.3351 15.498L19.046 14.7951L23.2049 19.002Z" stroke="#0866FF" />
            </svg>


        </div>
    );
};

export default IconExport;