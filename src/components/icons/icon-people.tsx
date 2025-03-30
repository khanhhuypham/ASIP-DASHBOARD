import { FC } from 'react';

interface IconPeopleProps {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const IconPeople: FC<IconPeopleProps> = ({ className, fill = false, duotone = true }) => {
    return (

        <div>

            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
                <path d="M8.75262 17C8.74936 16.9999 8.74227 16.9996 8.73191 16.9988C8.71103 16.9973 8.67792 16.9941 8.63689 16.9873C8.55245 16.9732 8.4475 16.946 8.34861 16.8965C8.25167 16.8481 8.16995 16.7832 8.11134 16.6953C8.05482 16.6105 8 16.475 8 16.25C8 15.7446 8.26962 14.61 9.12963 13.6066C9.96917 12.6272 11.3913 11.75 13.75 11.75C16.1087 11.75 17.5308 12.6272 18.3704 13.6066C19.2304 14.61 19.5 15.7446 19.5 16.25C19.5 16.475 19.4452 16.6105 19.3887 16.6953C19.3301 16.7832 19.2483 16.8481 19.1514 16.8965C19.0525 16.946 18.9476 16.9732 18.8631 16.9873C18.8221 16.9941 18.789 16.9973 18.7681 16.9988C18.7577 16.9996 18.7506 16.9999 18.7474 17C18.747 17 18.7468 17 18.7465 17M8.75262 17L8.75174 17L8.75092 17L8.75349 17M8.75262 17L8.75306 17L8.75448 17C8.7548 17 8.75446 17 8.75349 17M8.75262 17C8.75295 17 8.75324 17 8.75349 17M8.75349 17H18.7465M18.7465 17C18.7455 17 18.7452 17 18.7455 17L18.7469 17L18.7483 17L18.7491 17L18.7465 17ZM8.70921 16.7453L8.74319 16.75H8.7775H18.7225H18.7516L18.7804 16.7466C18.7948 16.745 18.8091 16.7429 18.8234 16.7405L18.8425 16.7373L18.8612 16.7326L18.8712 16.7301L19.253 16.6347L19.25 16.2412C19.2466 15.7961 18.9988 14.7227 18.1792 13.7691C17.3899 12.8474 16.0371 12 13.75 12C11.4622 12 10.1088 12.8459 9.32028 13.7697C8.50179 14.7224 8.2517 15.7945 8.25 16.2431L8.24848 16.6441L8.63961 16.7327C8.66261 16.7379 8.68583 16.7421 8.70921 16.7453ZM11.6287 4.12868L11.9669 4.46686L11.6287 4.12868C11.0661 4.69129 10.75 5.45435 10.75 6.25C10.75 7.04565 11.0661 7.80871 11.6287 8.37132C12.1913 8.93393 12.9544 9.25 13.75 9.25C14.5456 9.25 15.3087 8.93393 15.8713 8.37132C16.4339 7.80871 16.75 7.04565 16.75 6.25C16.75 5.45435 16.4339 4.69129 15.8713 4.12868L15.5331 4.46686L15.8713 4.12868C15.3087 3.56607 14.5456 3.25 13.75 3.25C12.9544 3.25 12.1913 3.56607 11.6287 4.12868ZM1.62963 13.6066C2.44482 12.6556 3.80932 11.801 6.04708 11.7522L5.87658 12.0084C3.81216 12.0949 2.56614 12.8995 1.82068 13.7692C0.997823 14.7274 0.75 15.8055 0.75 16.25V16.75H1.25H5H5.49607L5.49998 16.254C5.50907 15.1034 5.82974 13.9786 6.42556 12.9981L6.65 12.9956V12.5013V12.5V11.7586C6.79527 11.7651 6.94037 11.7752 7.08517 11.789L7.08692 11.7892C7.26728 11.8057 7.4468 11.8293 7.62505 11.86C7.48485 12.0028 7.35212 12.1502 7.2271 12.3015C6.26794 13.4611 5.7511 14.8604 5.75 16.2456C5.74581 16.4999 5.77106 16.753 5.82471 17H1.25C0.910008 17 0.747244 16.9154 0.665897 16.8341C0.584551 16.7528 0.5 16.59 0.5 16.25C0.5 15.7446 0.769622 14.61 1.62963 13.6066ZM17 6.25C17 6.6768 16.9159 7.09941 16.7526 7.49372C16.5893 7.88803 16.3499 8.24631 16.0481 8.5481C15.7463 8.84989 15.388 9.08928 14.9937 9.25261C14.5994 9.41594 14.1768 9.5 13.75 9.5C13.3232 9.5 12.9006 9.41594 12.5063 9.25261C12.112 9.08928 11.7537 8.84989 11.4519 8.5481C11.1501 8.24631 10.9107 7.88803 10.7474 7.49372C10.5841 7.09941 10.5 6.6768 10.5 6.25C10.5 5.38805 10.8424 4.5614 11.4519 3.9519C12.0614 3.34241 12.888 3 13.75 3C14.612 3 15.4386 3.34241 16.0481 3.9519C16.6576 4.5614 17 5.38805 17 6.25ZM2.375 6.875C2.375 6.01305 2.71741 5.1864 3.3269 4.5769C3.9364 3.96741 4.76305 3.625 5.625 3.625C6.48695 3.625 7.3136 3.96741 7.9231 4.5769C8.53259 5.1864 8.875 6.01305 8.875 6.875C8.875 7.73695 8.53259 8.5636 7.9231 9.1731C7.3136 9.78259 6.48695 10.125 5.625 10.125C4.76305 10.125 3.9364 9.78259 3.3269 9.1731C2.71741 8.5636 2.375 7.73695 2.375 6.875ZM5.625 3.875C4.82935 3.875 4.06629 4.19107 3.50368 4.75368C2.94107 5.31629 2.625 6.07935 2.625 6.875C2.625 7.67065 2.94107 8.43371 3.50368 8.99632C4.06629 9.55893 4.82935 9.875 5.625 9.875C6.42065 9.875 7.18371 9.55893 7.74632 8.99632C8.30893 8.43371 8.625 7.67065 8.625 6.875C8.625 6.07935 8.30893 5.31629 7.74632 4.75368C7.18371 4.19107 6.42065 3.875 5.625 3.875Z" fill="#374151" stroke="#374151" />
            </svg>
        </div>



    );
};

export default IconPeople;
