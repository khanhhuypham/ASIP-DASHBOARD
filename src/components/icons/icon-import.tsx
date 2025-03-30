import { FC } from "react";
import { IconProps } from "../../constants/popup-interface";

const IconImport: FC<IconProps> = ({ className, fill = false, duotone = true }) => {
    return (
        <div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
                <path d="M17 21C16.393 20.41 14 18.84 14 18C14 17.16 16.393 15.59 17 15M15 18H22M12 21C7.286 21 4.929 21 3.464 19.535C2 18.072 2 15.715 2 11V7.944C2 6.128 2 5.22 2.38 4.538C2.65114 4.05208 3.05208 3.65114 3.538 3.38C4.22 3 5.128 3 6.944 3C8.108 3 8.69 3 9.2 3.191C10.363 3.627 10.843 4.684 11.368 5.733L12 7M8 7H16.75C18.857 7 19.91 7 20.667 7.506C20.9943 7.72474 21.2753 8.00575 21.494 8.333C21.98 9.06 22 10.06 22 12V14" stroke="#001416" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

        </div>
    );
};

export default IconImport;