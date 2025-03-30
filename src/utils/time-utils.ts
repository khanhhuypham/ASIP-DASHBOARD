import { differenceInDays, format, isYesterday, parse } from "date-fns";
import { vi } from "date-fns/locale";
import { PickerMode } from "../features/booking/booking-page";

export const getTodayDate = (): string => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
};

export const getTodayYearMonthDay = (): string => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
    const year = today.getFullYear();
    return `${year}-${month}-${day}`; // Trả về định dạng YYYY-MM-DD
};

export const getCurrentTime = (): string => {
    const today = new Date();
    const hour = today.getHours();
    const minutes = today.getMinutes();
    return `${hour}:${minutes}`;
};

/**
 * Converts a date string from one format to another.
 * @param {string} dateString - The date string to be converted.
 * @param {string} currentFormat - The current format of the date string (e.g., 'dd/MM/yyyy').
 * @param {string} desiredFormat - The desired format to convert to (e.g., 'yyyy/MM/dd').
 * @returns {string} - The converted date string in the desired format.
 */
// export const convertDateFormat = (
//     dateString: string,
//     currentFormat: string,
//     desiredFormat: string
// ) => {
//     try {
//         // Parse the date using the current format
//         const parsedDate = parse(dateString, currentFormat, new Date());
//         // Format it to the desired format
//         return format(parsedDate, desiredFormat);
//     } catch (error) {
//         console.error("Error converting date:", error);
//         return getTodayDate(); // Return null or an error message if conversion fails
//     }
// };

export const convertDateStringToDate = (dateStr: string,formatStr: string): Date | null => {
    try {
        const date = parse(dateStr, formatStr, new Date());
        return isNaN(date.getTime()) ? null : date;
    } catch (error) {
        console.error("Error parsing date:", error);
        return null;
    }
};

export const convertDateToDateString = (date: Date, formatStr: string): string => {
    return format(date, formatStr);
};


export function getWeekdays(date: Date): Date[] {
    const weekdays: Date[] = [];
    const startOfWeek = new Date(date); // Clone the given date
    const dayOfWeek = startOfWeek.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6

    // Adjust start of week to Monday (ISO 8601 standard)
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Sunday wraps to previous Monday
    startOfWeek.setDate(startOfWeek.getDate() + diffToMonday);

    // Iterate through the week (Monday to Sunday)
    for (let i = 0; i < 7; i++) {
        const currentDay = new Date(startOfWeek); // Clone the startOfWeek
        currentDay.setDate(startOfWeek.getDate() + i); // Move to the next day
        weekdays.push(currentDay);
    }

    return weekdays;
}
export function getAllDaysOfMonth(date: Date): Date[] {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days: Date[] = [];

    // Get the number of days in the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Create an array of all days in the month
    for (let day = 1; day <= daysInMonth; day++) {
        days.push(new Date(year, month, day));
    }

    return days;
}

export function getTodayHours(date: Date): Date[] {
    const startOfDay = new Date(date); // Create a copy to avoid mutation
    startOfDay.setHours(0, 0, 0, 0); // Reset to the beginning of the day

    return Array.from({ length: 24 }, (_, hour) => {
        const newDate = new Date(startOfDay); // Create a new Date object for each hour
        newDate.setHours(hour);
        return newDate;
    });
}

export function getDayName(dayIndex: number, dateType: PickerMode): string {
    const nameForWeek = [
        "Chủ nhật",
        "Thứ 2",
        "Thứ 3",
        "Thứ 4",
        "Thứ 5",
        "Thứ 6",
        "Thứ 7",
    ];
    const nameForMonth = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    switch (dateType) {
        case "date":
            return "";

        case "week":
            return nameForWeek[dayIndex];

        case "month":
            return nameForMonth[dayIndex];
    }
}
