import { FC } from 'react';

interface IconUploadProps {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const IconUploadFile: FC<IconUploadProps> = ({ className, fill = false, duotone = true }) => {
    return (
        <div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.73237 1.72079L4.73252 1.72066C5.63054 0.946292 6.77286 0.514386 7.95762 0.500327C6.77276 0.514566 5.63045 0.946713 4.73256 1.72126C4.53064 1.89519 4.34815 2.08118 4.18767 2.27475C4.34856 2.08041 4.53114 1.89418 4.73237 1.72079ZM12.687 5.045C12.6872 4.45595 12.5719 3.89308 12.3617 3.37654C12.5218 3.76926 12.627 4.18868 12.6682 4.6259L12.7052 5.01885L13.0442 5.06675C12.9272 5.0524 12.808 5.045 12.687 5.045ZM3.406 4.155V4.15503C1.85339 4.32534 0.631169 5.54824 0.509894 7.06891C0.621664 5.66692 1.66894 4.51808 3.04979 4.21324L3.37999 4.14035L3.43527 3.80674C3.45794 3.66995 3.49354 3.53155 3.54117 3.39293C3.45273 3.65082 3.406 3.90774 3.406 4.155ZM4.99955 7.49955L4.646 7.146L4.99955 7.49955L7.99955 4.49955L8 4.49911L8.00045 4.49955L11.0004 7.49955L11.354 7.146L11.0004 7.49956L11.0006 7.5L11.0004 7.50044L11 7.50063L10.9996 7.50044L8.85364 5.35353L8 4.4995L7.14636 5.35353L5.00045 7.50045L5 7.50063L4.99955 7.50045L4.99937 7.5L4.99955 7.49955Z" fill="#374151" stroke="#0866FF" />
            </svg>


        </div>


    );
};

export default IconUploadFile;
