import {AxiosRequestConfig} from "axios";

export function createCalendarFetchConfig(startDate: Date, endDate: Date): AxiosRequestConfig {
    return {
        url: 'http://localhost:3001/dashboard/events/',
        method: 'get',
        params: {
            start_date: convertDate(startDate),
            end_date: convertDate(endDate)
        }
    };
}

function convertDate(date: Date): string {
    return date.getFullYear().toString().padStart(4, '0') + '-' +
        (date.getMonth() + 1).toString().padStart(2, '0') + '-' +
        date.getDate().toString().padStart(2, '0');
}