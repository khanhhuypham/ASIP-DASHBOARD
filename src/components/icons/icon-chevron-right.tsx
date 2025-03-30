import { FC } from 'react';

interface IconChevronRightProps {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const IconChevronRight: FC<IconChevronRightProps> = ({ className, fill = false, duotone = true }) => {
    return (

        <div>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
                <path d="M7.5 4.1665L13.3333 9.99984L7.5 15.8332" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

        </div>
    );
};

export default IconChevronRight;
