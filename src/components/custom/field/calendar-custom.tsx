import { DatePicker } from "antd";

import React, { useState, useRef, useEffect } from "react";
import dayjs from 'dayjs';
import IconCalendar from "../../icons/icon-calendar";



interface CalendarFieldCustomProps {
    label: string;
    name: string;
    value?: string;
    calendar?: React.ReactElement;
    required?: boolean;
    onChange?: ((arg0: string) => void);
    error?: string;
    picker?: 'time' | 'date' | 'week' | 'month' | 'quarter' | 'year'; // Add picker prop
    showTime?: boolean;
    format?: "DD/MM/YYYY HH:mm" |  "DD/MM/YYYY"
}


// Fixed styles that will be merged into the field’s own styles.
const fixedStyles = {
    width: "100%",
    height: "100%", // Example fixed height (adjust as needed)
    outline: "none",
};

export const CalendarFieldCustom: React.FC<CalendarFieldCustomProps> = ({
    label,
    name,
    value,
    calendar,
    required = false,
    onChange,
    error,
    picker = 'date', // Default to 'date' picker
    showTime = false,
    format = "DD/MM/YYYY HH:mm"
    
}) => {
    const [element, setElement] = useState<React.ReactElement>(<input />);
    const [open, setOpen] = useState(false);
    // This state tracks if the user has interacted with the field.
    // It is initialized as true if the passed-in field already has a value.
    const [active, setActive] = useState(!!element.props.value);


    // Clone the field element so we can add our own style, ref and handlers.
    const datePicker = React.cloneElement(element, {
        id: name,
        style: { ...element.props.style, ...fixedStyles },
        className: element.props.className,
        open: open,
        onOpenChange: (status: boolean) => setOpen(status),

    });




    useEffect(() => {

        setActive(value ? true : false)


        if (calendar) {
            setElement(calendar)
        } else {

            
            let defaultvalue = dayjs(new Date(), format)

  
            if(value && value.length > 0){
                console.log("value: ", value)
                defaultvalue = dayjs(value, format)
            }

            setElement(
                <DatePicker
                    showTime={showTime && { format: "HH:mm" }}
                    needConfirm
                    picker={picker}
                    format={format}
                    // value={defaultvalue}
                    onOk={(date: dayjs.Dayjs) => {
                        const formattedDate = date.format(format); // Convert dayjs to string
                        setTimeout(() => setOpen(false), 80);
                        console.log(showTime)
              
                        onChange && onChange(showTime ? formattedDate : formattedDate.split(" ")[0]); // Pass the formatted string
                    }}
                    style={{
                        transform: `translate(${window.innerWidth <= 640 ? 30 : 0}px, 0px)`,
                        visibility: "hidden"
                    }}
                    placement={"bottomLeft"}
                />
            )
        }
    }, [value])



    const handleClick = () => {
        setOpen(true);
    };

    




    return (
        <div
            className="relative h-[48px] w-full border rounded-md shadow px-2 py-1 focus:ring focus:ring-blue-200"
            onClick={handleClick} // Add onClick handler to the outer div
        >
            <div className="h-full flex items-center">

                <div className="w-full">
                    <label
                        htmlFor={name}
                        className={`block mb-0 transition-all duration-300 ${active
                            ? "text-xs font-normal text-gray-400 "
                            : "cursor-pointer text-base h-full flex items-center"
                            }`}
                    >
                        {label}
                        {required && <span className="text-red-500"> *</span>}
                    </label>
                    {value && <p>{value}</p>}
                </div>
                <IconCalendar />
            </div>

            <div className="absolute inset-0 z-[-1]">
                {datePicker}
            </div>
            {error ? <div className="mt-2 text-xs text-red-500">{error}</div> : null}
        </div>
    );
};