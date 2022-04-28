import {AxiosRequestConfig} from "axios";

export function createCalendarFetchConfig(startDate: Date, endDate: Date): AxiosRequestConfig {
    return {
        url: 'http://localhost:3001/dashboard/events/',
        method: 'get',
        data: {
            start_date: startDate.toISOString(),
            end_date: endDate.toISOString()
        }
    };
}