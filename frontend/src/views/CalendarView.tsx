import React, {useEffect, useState} from 'react';
import Calendar, {CalendarTileProperties} from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import SwitchComponent from "../components/switchComponent/SwitchComponent";
import './CalendarStyle.css'
import {fetchCalendarData} from "../data/calendarData";
import {CalendarEvent} from "../components/model/calendar";


function CalendarView() {
    const [events, setEvents] = useState<Array<CalendarEvent>>([])


    useEffect(() => {
        let date = new Date();
        let y = date.getFullYear(), m = date.getMonth();
        let firstDay = new Date(y, m, 1);
        let lastDay = new Date(y, m + 1, 0);
        fetchCalendarData(firstDay, lastDay)
            .then(events => {
                setEvents(events)
            }); // TODO: error handling
    },[])


    const getTileContent = (props: CalendarTileProperties): JSX.Element => {
        console.log(props.date)
        const eventList = events
            .filter(event => event.date === props.date) // filtering doesn't work (no events are rendered)
            .map((event) => (<div>{event.plant}</div>))
        console.log(eventList)
        return <div>{eventList}</div>
    }

    return (
        <div className={"calendarView"}>
            <SwitchComponent/>
            <Calendar
                value={new Date()}
                locale={"en"}
                className={"calendarStyle"}
                minDetail={'month'}
                maxDetail={'month'}
                tileContent={(props) => getTileContent(props)}
            />
        </div>
    )
}

export default CalendarView;