import { FC } from 'react';

interface IconCaretRightProps {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const IconCaretRight: FC<IconCaretRightProps> = ({ className, fill = false, duotone = true }) => {
    return (
        <div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
                <path d="M12.14 8.75298L6.658 13.549C6.012 14.115 5 13.655 5 12.796V3.20398C4.99984 3.01174 5.05509 2.82352 5.15914 2.66187C5.26319 2.50022 5.41164 2.37199 5.58669 2.29253C5.76175 2.21308 5.956 2.18577 6.14618 2.21387C6.33636 2.24197 6.51441 2.32429 6.659 2.45098L12.139 7.24698C12.2464 7.34084 12.3325 7.4566 12.3915 7.58647C12.4505 7.71635 12.481 7.85734 12.481 7.99998C12.481 8.14262 12.4505 8.28362 12.3915 8.41349C12.3325 8.54337 12.2464 8.65912 12.139 8.75298H12.14Z" fill="#001416" />
            </svg>

        </div>
    );
};
export default IconCaretRight;
