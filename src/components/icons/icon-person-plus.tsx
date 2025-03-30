import { FC } from 'react';
import { IconProps } from '../../constants/popup-interface';



const IconPersonPlus: FC<IconProps> = ({ className, fill = false, duotone = true }) => {
    return (
        <div>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
                <path d="M7.5 10C8.49456 10 9.44839 9.60491 10.1517 8.90165C10.8549 8.19839 11.25 7.24456 11.25 6.25C11.25 5.25544 10.8549 4.30161 10.1517 3.59835C9.44839 2.89509 8.49456 2.5 7.5 2.5C6.50544 2.5 5.55161 2.89509 4.84835 3.59835C4.14509 4.30161 3.75 5.25544 3.75 6.25C3.75 7.24456 4.14509 8.19839 4.84835 8.90165C5.55161 9.60491 6.50544 10 7.5 10ZM10 6.25C10 6.91304 9.73661 7.54893 9.26777 8.01777C8.79893 8.48661 8.16304 8.75 7.5 8.75C6.83696 8.75 6.20107 8.48661 5.73223 8.01777C5.26339 7.54893 5 6.91304 5 6.25C5 5.58696 5.26339 4.95107 5.73223 4.48223C6.20107 4.01339 6.83696 3.75 7.5 3.75C8.16304 3.75 8.79893 4.01339 9.26777 4.48223C9.73661 4.95107 10 5.58696 10 6.25ZM15 16.25C15 17.5 13.75 17.5 13.75 17.5H1.25C1.25 17.5 0 17.5 0 16.25C0 15 1.25 11.25 7.5 11.25C13.75 11.25 15 15 15 16.25ZM13.75 16.245C13.7487 15.9375 13.5575 15.0125 12.71 14.165C11.895 13.35 10.3612 12.5 7.5 12.5C4.6375 12.5 3.105 13.35 2.29 14.165C1.4425 15.0125 1.2525 15.9375 1.25 16.245H13.75Z" fill="#374151" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.875 6.25C17.0408 6.25 17.1997 6.31585 17.3169 6.43306C17.4342 6.55027 17.5 6.70924 17.5 6.875V8.75H19.375C19.5408 8.75 19.6997 8.81585 19.8169 8.93306C19.9342 9.05027 20 9.20924 20 9.375C20 9.54076 19.9342 9.69973 19.8169 9.81694C19.6997 9.93415 19.5408 10 19.375 10H17.5V11.875C17.5 12.0408 17.4342 12.1997 17.3169 12.3169C17.1997 12.4342 17.0408 12.5 16.875 12.5C16.7092 12.5 16.5503 12.4342 16.4331 12.3169C16.3158 12.1997 16.25 12.0408 16.25 11.875V10H14.375C14.2092 10 14.0503 9.93415 13.9331 9.81694C13.8158 9.69973 13.75 9.54076 13.75 9.375C13.75 9.20924 13.8158 9.05027 13.9331 8.93306C14.0503 8.81585 14.2092 8.75 14.375 8.75H16.25V6.875C16.25 6.70924 16.3158 6.55027 16.4331 6.43306C16.5503 6.31585 16.7092 6.25 16.875 6.25Z" fill="#374151" />
            </svg>
        </div>
    );
};

export default IconPersonPlus;
