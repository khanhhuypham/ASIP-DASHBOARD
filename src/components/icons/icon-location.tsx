import { FC } from 'react';
import { IconProps } from '../../constants/popup-interface';


const IconLocation: FC<IconProps> = ({ className, fill = false, duotone = true }) => {
    return (

        <div>

            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
                <g clip-path="url(#clip0_2078_36154)">
                    <path d="M18.249 13.41C17.463 15.003 16.398 16.59 15.309 18.015C14.2759 19.3584 13.1714 20.6453 12 21.87C10.8286 20.6453 9.72403 19.3584 8.691 18.015C7.602 16.59 6.537 15.003 5.751 13.41C4.956 11.8005 4.5 10.293 4.5 9C4.5 7.01088 5.29018 5.10322 6.6967 3.6967C8.10322 2.29018 10.0109 1.5 12 1.5C13.9891 1.5 15.8968 2.29018 17.3033 3.6967C18.7098 5.10322 19.5 7.01088 19.5 9C19.5 10.293 19.0425 11.8005 18.249 13.41ZM12 24C12 24 21 15.471 21 9C21 6.61305 20.0518 4.32387 18.364 2.63604C16.6761 0.948211 14.3869 0 12 0C9.61305 0 7.32387 0.948211 5.63604 2.63604C3.94821 4.32387 3 6.61305 3 9C3 15.471 12 24 12 24Z" fill="#6B7280" />
                    <path d="M12 12C11.2044 12 10.4413 11.6839 9.87868 11.1213C9.31607 10.5587 9 9.79565 9 9C9 8.20435 9.31607 7.44129 9.87868 6.87868C10.4413 6.31607 11.2044 6 12 6C12.7956 6 13.5587 6.31607 14.1213 6.87868C14.6839 7.44129 15 8.20435 15 9C15 9.79565 14.6839 10.5587 14.1213 11.1213C13.5587 11.6839 12.7956 12 12 12ZM12 13.5C13.1935 13.5 14.3381 13.0259 15.182 12.182C16.0259 11.3381 16.5 10.1935 16.5 9C16.5 7.80653 16.0259 6.66193 15.182 5.81802C14.3381 4.97411 13.1935 4.5 12 4.5C10.8065 4.5 9.66193 4.97411 8.81802 5.81802C7.97411 6.66193 7.5 7.80653 7.5 9C7.5 10.1935 7.97411 11.3381 8.81802 12.182C9.66193 13.0259 10.8065 13.5 12 13.5Z" fill="#6B7280" />
                </g>
                <defs>
                    <clipPath id="clip0_2078_36154">
                        <rect width="24" height="24" fill="white" />
                    </clipPath>
                </defs>
            </svg>


        </div>



    );
};

export default IconLocation;
