
import { FC } from 'react';

interface IconCaretDownFillProps {
    className?: string;
    duotone?: boolean;
    color?: string;
}

const IconCaretDownFill: FC<IconCaretDownFillProps> = ({ className, duotone = false, color = '#ffffff' }) => {
    return (
        <div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
                <path d="M6.74701 9.80698V9.80912L2.82733 5.32878L2.82683 5.32821C2.54548 5.00759 2.77328 4.5 3.20401 4.5L12.796 4.5L12.7964 4.5C12.8926 4.49992 12.9867 4.52754 13.0675 4.57957C13.1483 4.6316 13.2124 4.70582 13.2522 4.79335C13.2919 4.88087 13.3055 4.978 13.2915 5.07309C13.2774 5.16818 13.2363 5.2572 13.1729 5.3295L13.1728 5.32971L8.37676 10.8097L8.37651 10.81C8.32958 10.8637 8.2717 10.9067 8.20677 10.9362C8.14183 10.9657 8.07133 10.981 8.00001 10.981C7.92869 10.981 7.8582 10.9657 7.79326 10.9362C7.72832 10.9067 7.67044 10.8637 7.62351 10.81L6.74701 9.80698Z" fill="#6B7280" stroke="#6B7280" />
            </svg>

        </div>
    );
};

export default IconCaretDownFill;
