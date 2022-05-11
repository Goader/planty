import {AxiosRequestConfig} from "axios";
import {useCallback} from "react";
import {PlantEvent, PlantEventDetails, PlantEventResponse} from "../model/calendar";
import {useAuth} from "./auth/AuthContext";
import {Plant} from "../model/plants";

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

export function createEventDetails(event: PlantEvent, plant: Plant): PlantEventDetails {
    return {
        date: event.date,
        action: event.action,
        priority: event.priority,
        message: event.message,
        plant: plant
    };
}

export function useEventService() {
    const {request} = useAuth();

    const getEvents = useCallback((startDate: Date, endDate: Date) => {
        return request<Array<PlantEventResponse>>(createCalendarFetchConfig(startDate, endDate))
            .then(response => {
                const events = response.map(event => {
                    let [year, month, day] = event.date.split('-');
                    let dateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
                    return {
                        date: dateObj,
                        plant: event.plant,
                        action: event.action,
                        priority: event.priority,
                        message: event.message
                    } as PlantEvent;
                });
                console.log(`Fetched ${response.length} events`);
                return events;
            })
    }, []);

    return {getEvents}
}