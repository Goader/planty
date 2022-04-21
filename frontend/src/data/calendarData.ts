import {CalendarEvent} from "../components/model/calendar";

export async function fetchCalendarData(startDate: Date, endDate: Date): Promise<Array<CalendarEvent>> {
    console.log('fetch')
    return Promise.resolve(Array.of({
        date: startDate,
        plant: 'test plant',
        action: 'water',
        priority: 1,
        message: 'test message'
    }))
}