import { FC } from 'react';
import { IconProps } from '../../constants/popup-interface';


const IconPencil: FC<IconProps> = ({ className, fill = false, duotone = true }) => {
    return (

        <div>

            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
                <g clip-path="url(#clip0_2285_17448)">
                    <path d="M18.5725 0.573894L18.573 0.573445C18.5962 0.550166 18.6238 0.531694 18.6541 0.519091C18.6845 0.506487 18.7171 0.5 18.75 0.5C18.7828 0.5 18.8154 0.506487 18.8458 0.519091C18.8761 0.531694 18.9037 0.550166 18.927 0.57345L18.9274 0.573894L23.4274 5.07389L23.4278 5.07434C23.4511 5.09756 23.4696 5.12515 23.4822 5.15553C23.4948 5.18589 23.5013 5.21845 23.5013 5.25134C23.5013 5.28423 23.4948 5.31679 23.4822 5.34716C23.4696 5.37753 23.4511 5.40512 23.4278 5.42834L23.4274 5.42879L8.42864 20.4276C8.42847 20.4277 8.42831 20.4279 8.42815 20.428C8.40426 20.4516 8.37586 20.4702 8.34464 20.4825L8.34326 20.4831L0.843258 23.4831L0.843148 23.4831C0.797716 23.5013 0.747945 23.5058 0.700006 23.4959C0.652069 23.4861 0.60807 23.4624 0.573467 23.4278C0.538865 23.3932 0.515178 23.3492 0.505344 23.3013C0.49551 23.2533 0.499962 23.2036 0.518148 23.1581L0.518192 23.158L3.51819 15.658L3.51874 15.6567C3.53112 15.6254 3.54966 15.597 3.57325 15.5731C3.57342 15.573 3.57358 15.5728 3.57374 15.5727L18.5725 0.573894ZM16.4569 3.39779L16.1033 3.75134L16.4569 4.10489L19.8964 7.54439L20.25 7.89795L20.6035 7.54439L22.543 5.60489L22.8966 5.25134L22.543 4.89779L19.1035 1.45829L18.75 1.10473L18.3964 1.45829L16.4569 3.39779ZM19.543 8.60489L19.8966 8.25134L19.543 7.89779L16.1035 4.45829L15.75 4.10473L15.3964 4.45829L5.6464 14.2083L5.49995 14.3547V14.5618V15.0013V15.5013H5.99995H6.74995C6.81626 15.5013 6.87985 15.5277 6.92673 15.5746C6.97361 15.6214 6.99995 15.685 6.99995 15.7513V16.5013V17.0013H7.49995H8.24995C8.31626 17.0013 8.37985 17.0277 8.42673 17.0746C8.47361 17.1214 8.49995 17.185 8.49995 17.2513V18.0013V18.5013H8.99995H9.43945H9.64656L9.79301 18.3549L19.543 8.60489ZM5.01633 15.8388L4.7442 15.1105L4.1944 15.6603L4.0354 15.8193L3.96281 15.8919L3.9247 15.9872L1.6327 21.7187L1.19961 22.8017L2.28261 22.3686L8.01411 20.0766L8.10942 20.0385L8.18201 19.9659L8.34101 19.8069L8.8908 19.2571L8.16245 18.985C8.11476 18.9671 8.07365 18.9352 8.04461 18.8934C8.01557 18.8516 7.99999 18.8019 7.99995 18.751V18.0013V17.5013H7.49995H6.74995C6.68365 17.5013 6.62006 17.475 6.57318 17.4281C6.52629 17.3812 6.49995 17.3176 6.49995 17.2513V16.5013V16.0013H5.99995H5.25033C5.19942 16.0013 5.14973 15.9857 5.10792 15.9567L4.855 16.3209L5.10791 15.9567C5.0661 15.9276 5.03415 15.8865 5.01633 15.8388Z" fill="#001416" stroke="#001416" />
                </g>
                <defs>
                    <clipPath id="clip0_2285_17448">
                        <rect width="24" height="24" fill="white" />
                    </clipPath>
                </defs>
            </svg>

        </div>



    );
};

export default IconPencil;
