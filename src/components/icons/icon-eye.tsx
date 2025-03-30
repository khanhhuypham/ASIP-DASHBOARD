import { FC } from 'react';

interface IconEyeProps {
    isIconOff?: boolean;
    color?: string;
}

const IconEye: FC<IconEyeProps> = ({ isIconOff = false, color = "#6B7280" }) => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            {isIconOff ? (
                <path
                    d="M1.04855 9.72517L0.867729 10L1.04855 10.2748C1.6712 11.2211 2.38623 12.1028 3.1855 12.9064L3.18645 12.9073C4.84097 14.5618 7.15991 16.125 10 16.125C12.8388 16.125 15.159 14.5619 16.8136 12.9073C17.6332 12.0877 18.2704 11.2635 18.7013 10.6462L18.7018 10.6454C18.7959 10.51 18.8782 10.3865 18.9504 10.2783L18.951 10.2773L19.1347 10.0018L18.9527 9.72517C18.3299 8.7786 17.6136 7.897 16.8145 7.09364L16.8136 7.0927C15.159 5.43817 12.8401 3.875 10 3.875C7.15998 3.875 4.83975 5.43808 3.18742 7.09297L3.18675 7.09364C2.38768 7.897 1.67135 8.7786 1.04855 9.72517ZM19.3999 9.96509C19.4072 9.97708 19.4143 9.98872 19.4211 10C19.4143 10.0113 19.4072 10.0229 19.3999 10.0349C19.2898 10.2153 19.1244 10.4753 18.9062 10.7883C18.4692 11.4153 17.8237 12.2504 16.9902 13.0839C15.3145 14.7597 12.9347 16.375 10 16.375C7.06531 16.375 4.68552 14.7597 3.0098 13.0839C2.17628 12.2504 1.53077 11.4153 1.09379 10.7883C0.875608 10.4753 0.710216 10.2153 0.600118 10.0349C0.592798 10.0229 0.585723 10.0113 0.578895 10C0.585723 9.98872 0.592798 9.97708 0.600118 9.96509C0.710216 9.78472 0.875608 9.52472 1.09379 9.21168C1.53077 8.58471 2.17628 7.74958 3.0098 6.91605C4.68552 5.24034 7.06531 3.625 10 3.625C12.9347 3.625 15.3145 5.24034 16.9902 6.91605C17.8237 7.74958 18.4692 8.58471 18.9062 9.21168C19.1244 9.52472 19.2898 9.78472 19.3999 9.96509ZM10 6.375C9.03859 6.375 8.11656 6.75692 7.43674 7.43674C6.75692 8.11656 6.375 9.03859 6.375 10C6.375 10.9614 6.75692 11.8834 7.43674 12.5633C8.11656 13.2431 9.03859 13.625 10 13.625C10.9614 13.625 11.8834 13.2431 12.5633 12.5633C13.2431 11.8834 13.625 10.9614 13.625 10C13.625 9.03859 13.2431 8.11656 12.5633 7.43674C11.8834 6.75692 10.9614 6.375 10 6.375ZM6.125 10C6.125 8.97229 6.53326 7.98666 7.25996 7.25996C7.98666 6.53326 8.97229 6.125 10 6.125C11.0277 6.125 12.0133 6.53326 12.74 7.25996C13.4667 7.98666 13.875 8.97229 13.875 10C13.875 11.0277 13.4667 12.0133 12.74 12.74C12.0133 13.4667 11.0277 13.875 10 13.875C8.97229 13.875 7.98666 13.4667 7.25996 12.74C6.53326 12.0133 6.125 11.0277 6.125 10Z"
                    stroke={color}
                />
            ) : (
                <path
                    d="M16.7131 13.3534L16.5366 13.1767C16.6308 13.0871 16.7231 12.9969 16.8136 12.9064C17.6332 12.0868 18.2704 11.2626 18.7013 10.6453L18.7018 10.6446C18.7959 10.5091 18.8783 10.3856 18.9504 10.2774L18.951 10.2765L19.1347 10.001L18.9527 9.72431C18.3299 8.77775 17.6136 7.89614 16.8145 7.09279L16.8136 7.09184C15.159 5.43731 12.8401 3.87414 10 3.87414L9.99878 3.87414C9.18692 3.87612 8.38083 4.00275 7.60856 4.24905L7.40933 4.04957C8.24356 3.77138 9.11831 3.62727 10.0009 3.62414C12.9352 3.62445 15.3146 5.23964 16.9902 6.91519C17.8237 7.74872 18.4692 8.58386 18.9062 9.21082C19.1244 9.52387 19.2898 9.78386 19.3999 9.96423C19.4072 9.97615 19.4142 9.98773 19.421 9.99895C19.402 10.0303 19.3811 10.0644 19.3583 10.1012C19.2202 10.3238 19.0134 10.6419 18.7414 11.0186C18.2593 11.6861 17.5764 12.5317 16.7131 13.3534ZM3.46377 6.822C3.36971 6.91114 3.27723 7.00105 3.18645 7.09184L3.1855 7.09279C2.38644 7.89614 1.67011 8.77775 1.0473 9.72431L0.863862 10.0031L1.05098 10.2795L1.29473 10.6395L1.29468 10.6395L1.29873 10.6453C1.72959 11.2626 2.36684 12.0868 3.18645 12.9064C4.84101 14.561 7.16119 16.1241 10 16.1241C10.8432 16.1241 11.6412 15.9862 12.3908 15.7476L12.5912 15.9485C11.7569 16.2268 10.882 16.371 9.99935 16.3741C7.06496 16.3739 4.68539 14.7587 3.0098 13.0831C2.17628 12.2496 1.53077 11.4144 1.09379 10.7875C0.875608 10.4744 0.710216 10.2144 0.600118 10.0341C0.592803 10.0221 0.585734 10.0104 0.57891 9.99917C0.597935 9.96775 0.61887 9.93353 0.641699 9.89668C0.779608 9.67404 0.986288 9.35582 1.25821 8.97915C1.74017 8.31155 2.42305 7.46597 3.2867 6.64468L3.46377 6.822ZM13.7824 9.14678C13.8816 9.58831 13.9022 10.0416 13.8455 10.4863L13.6161 10.2569C13.6499 9.78269 13.5902 9.3056 13.4394 8.853C13.2615 8.31894 12.9616 7.83365 12.5635 7.4356C12.1655 7.03755 11.6802 6.73767 11.1461 6.55973C10.6935 6.40893 10.2165 6.34922 9.74227 6.38306L9.51158 6.15237C9.95628 6.09568 10.4096 6.11631 10.8511 6.21552C11.5671 6.3764 12.2227 6.73729 12.7417 7.25622C13.2606 7.77514 13.6215 8.43076 13.7824 9.14678ZM8.85386 13.4386C9.30646 13.5893 9.78355 13.6491 10.2577 13.6152L10.4872 13.8447C10.0425 13.9014 9.58916 13.8807 9.14764 13.7815C8.43162 13.6206 7.776 13.2597 7.25708 12.7408C6.73815 12.2219 6.37725 11.5663 6.21637 10.8503C6.11717 10.4087 6.09654 9.95542 6.15323 9.51073L6.38392 9.74141C6.35008 10.2156 6.40979 10.6927 6.56059 11.1453C6.73853 11.6793 7.03841 12.1646 7.43646 12.5627C7.83451 12.9607 8.3198 13.2606 8.85386 13.4386ZM17.0575 17.2345L2.76461 2.94164L2.9425 2.76375L17.2354 17.0566L17.0575 17.2345Z"
                    stroke={color}
                />
            )}
        </svg>
    );
};

export default IconEye;
