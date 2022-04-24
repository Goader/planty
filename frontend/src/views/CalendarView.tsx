import React, {useEffect, useState} from 'react';
import Calendar, {CalendarTileProperties} from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {fetchCalendarData} from "../data/calendar-data";
import {PlantEvent} from "../model/calendar";
import {Alert, Container, Stack} from "react-bootstrap";
import "./CalendarView.css";
import CalendarPlantInfo from "../components/CalendarPlantInfo";


function CalendarView() {
    const [events, setEvents] = useState<Array<PlantEvent>>([]);
    const [error, setError] = useState<boolean>(false);


    useEffect(() => {
        let date = new Date();
        let y = date.getFullYear(), m = date.getMonth();
        let firstDay = new Date(y, m, 1);
        let lastDay = new Date(y, m + 1, 0);
        fetchCalendarData(firstDay, lastDay)
            .then(events => {
                setError(false);
                setEvents(events);
            })
            .catch(err => setError(true));
    },[]);


    const getTileContent = (props: CalendarTileProperties): JSX.Element => {
        const eventList = events
            .filter(event => event.date.getTime() === props.date.getTime());
        const plantMap = new Map<string, Array<PlantEvent>>();
        for (let event of eventList) {
            let plantEvents: Array<PlantEvent> | undefined = plantMap.get(event.plant);
            if (plantEvents === undefined || plantEvents === null) {
                plantEvents = new Array<PlantEvent>();
                plantMap.set(event.plant, plantEvents);
            }
            plantEvents.push(event);
        }
        const componentList = new Array<JSX.Element>();
        plantMap.forEach((plantEvents, plant) => {
            componentList.push(<div><CalendarPlantInfo name={plant} events={plantEvents}/></div>);
        });
        return <div className={'planty-calendar-events'}><Stack gap={1}>{componentList}</Stack></div>;
    };

    return (
        <Container>
            {error &&
                <Alert variant={'danger'}>Failed to download data. Check your internet connection.</Alert>
            }
            <Calendar
                value={new Date()}
                activeStartDate={new Date()}
                locale={"en"}
                className={"planty-calendar"}
                minDetail={'month'}
                maxDetail={'month'}
                showNavigation={false}
                tileContent={(props) => getTileContent(props)}
                tileClassName={'planty-calendar-tile'}
            />
        </Container>
    );
}

export default CalendarView;