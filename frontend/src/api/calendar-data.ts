import {PlantEvent} from "../model/calendar";

// implement this function in PVD-88
export async function fetchCalendarData(startDate: Date, endDate: Date): Promise<Array<PlantEvent>> {
    return Promise.resolve(Array.of({
            date: startDate,
            plant: 'test plant',
            action: 'water',
            priority: 1,
            message: 'test message'
        },
        {
            date: startDate,
            plant: 'test plant2',
            action: 'fertilize',
            priority: 3,
            message: 'test message'
        }));
}