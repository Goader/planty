import React, {useState} from 'react';
import Calendar, {CalendarTileProperties} from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import SwitchComponent from "../components/switchComponent/SwitchComponent";
import './CalendarStyle.css'
import {fetchCalendarData} from "../data/calendarData";
import {CalendarEvent} from "../components/model/calendar";


function CalendarView() {
    console.log('render calendar')

    const [events, setEvents] = useState<Array<CalendarEvent>>([])

    let date = new Date(), y = date.getFullYear(), m = date.getMonth();
    let firstDay = new Date(y, m, 1);
    let lastDay = new Date(y, m + 1, 0);

    fetchCalendarData(firstDay, lastDay).then(setEvents)

    const getTileContent = (props: CalendarTileProperties): JSX.Element => {
        const eventList = events.filter(event => event.date === props.date).map((event) => (
            <div>{event.plant}</div>
        ))
        return <div>{eventList}</div>
    }

    return (
        <div className={"calendarView"}>
            <SwitchComponent/>
            <Calendar
                value={date}
                locale={"en"}
                className={"calendarStyle"}
                minDetail={'month'}
                maxDetail={'month'}
                tileContent={getTileContent}
            />
        </div>
    )
}

export default CalendarView;