import { FC } from "react";
import { IconProps } from "../../constants/popup-interface";


const IconCheckBox: FC<IconProps> = ({ className, fill = false, duotone = true }) => {

    return (
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_4036_17070)">
                <rect y="0.830566" width="24" height="24" rx="4" fill="white" />
                <path d="M21 2.33057C21.3978 2.33057 21.7794 2.4886 22.0607 2.76991C22.342 3.05121 22.5 3.43274 22.5 3.83057V21.8306C22.5 22.2284 22.342 22.6099 22.0607 22.8912C21.7794 23.1725 21.3978 23.3306 21 23.3306H3C2.60218 23.3306 2.22064 23.1725 1.93934 22.8912C1.65804 22.6099 1.5 22.2284 1.5 21.8306V3.83057C1.5 3.43274 1.65804 3.05121 1.93934 2.76991C2.22064 2.4886 2.60218 2.33057 3 2.33057H21ZM3 0.830566C2.20435 0.830566 1.44129 1.14664 0.87868 1.70925C0.316071 2.27186 0 3.03492 0 3.83057L0 21.8306C0 22.6262 0.316071 23.3893 0.87868 23.9519C1.44129 24.5145 2.20435 24.8306 3 24.8306H21C21.7956 24.8306 22.5587 24.5145 23.1213 23.9519C23.6839 23.3893 24 22.6262 24 21.8306V3.83057C24 3.03492 23.6839 2.27186 23.1213 1.70925C22.5587 1.14664 21.7956 0.830566 21 0.830566L3 0.830566Z" fill="#E5E7EB" />
            </g>
            <defs>
                <clipPath id="clip0_4036_17070">
                    <rect y="0.830566" width="24" height="24" rx="4" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default IconCheckBox;

