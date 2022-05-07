import {AxiosRequestConfig} from "axios";

const eventsUrl = process.env.REACT_APP_API_URL + '/dashboard/events/';

export function createCalendarFetchConfig(startDate: Date, endDate: Date): AxiosRequestConfig {
    return {
        url: eventsUrl,
        method: 'get',
        params: {
            start_date: convertDate(startDate),
            end_date: convertDate(endDate)
        }
    };
}

function convertDate(date: Date): string {
    return date.toJSON().split('T')[0];
}