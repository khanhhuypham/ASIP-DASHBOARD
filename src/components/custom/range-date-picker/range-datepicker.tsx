import { Calendar, CalendarProps, DatePicker, DatePickerProps } from "antd";
import { ErrorMessage } from "formik";
import React, { useState, useRef, useEffect } from "react";
import type { Dayjs } from 'dayjs';
import IconCalendar from "../../icons/icon-calendar";




export const RangeDatePicker = () => {

    const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };
    const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];
    return (
        <div>
            <Calendar fullscreen={false} onPanelChange={onPanelChange} />
        </div>
    );
};