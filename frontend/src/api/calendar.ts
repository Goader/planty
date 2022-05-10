import {AxiosRequestConfig} from "axios";
import {useCallback} from "react";
import {PlantEvent, PlantEventResponse} from "../model/calendar";
import {useAuth} from "./auth/AuthContext";

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

export function useEventService() {
    const {request} = useAuth();

    const getEvents = useCallback((startDate: Date, endDate: Date) => {
        return request<Array<PlantEventResponse>>(createCalendarFetchConfig(startDate, endDate))
            .then(response => {
                const eventMap = new Map<string, PlantEvent[]>();
                response.forEach(event => {
                    let [year, month, day] = event.date.split('-');
                    let dateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
                    const convertedEvent: PlantEvent = {
                        date: dateObj,
                        plant: event.plant,
                        action: event.action,
                        priority: event.priority,
                        message: event.message
                    };
                    let eventArray: Array<PlantEvent> | undefined = eventMap.get(convertedEvent.date.toDateString());
                    if (eventArray === undefined) {
                        eventArray = [];
                        eventMap.set(convertedEvent.date.toDateString(), eventArray);
                    }
                    eventArray.push(convertedEvent);
                });
                console.log(`Fetched ${response.length} events`);
                return eventMap;
            })
    }, []);

    return {getEvents}
}