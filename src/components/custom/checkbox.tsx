import { useEffect, useRef, useState } from 'react';

import IconCheckBox from '../icons/icon-checkbox';
import IconTickCheckBox from '../icons/icon-tick-checkbox';


function Checkbox({
    label,
    checked,
    onChange,
}: {
    label: string | React.ReactNode;
    checked: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    const [isChecked, setIsChecked] = useState(checked);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(event);
    };


    useEffect(() => {
        console.log(checked)
        setIsChecked(checked);
    }, [checked]);

    return (
        <div
            className="relative h-full cursor-pointer flex items-center"

        >

            <input
                className="absolute opacity-0 w-full h-full inset-0 cursor-pointer"
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
            />
            <div className='flex items-center gap-2'>

                {isChecked ? (
                    <IconTickCheckBox className="h-full left-0 bottom-0 pointer-events-none" />
                ) : (
                    <IconCheckBox className="h-full pointer-events-none" />
                )}



                <p className="text-base  select-none">{label}</p>
            </div>

        </div>
    );
}

export default Checkbox;

