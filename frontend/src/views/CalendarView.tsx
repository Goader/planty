import React, {useEffect, useMemo, useState} from 'react';
import Calendar, {CalendarTileProperties} from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {createEventDetails, useEventService} from "../api/calendar";
import {PlantEventDetails} from "../model/calendar";
import {Alert, Container, Spinner, Stack} from "react-bootstrap";
import "./CalendarView.scss";
import CalendarPlantInfo from "../components/CalendarPlantInfo";
import {Plant} from "../model/plants";
import {usePlantService} from "../api/plants";
import EventDetailsModal from "../components/EventDetailsModal";
import {UnauthorizedError} from "../api/auth/util";

function CalendarView() {
    const [eventMap, setEventMap] = useState<Map<string, PlantEventDetails[]>>(new Map());
    const [error, setError] = useState<boolean>(false);
    const [fetching, setFetching] = useState<boolean>(true);
    const [detailsDate, setDetailsDate] = useState(new Date());
    const [detailsEvents, setDetailsEvents] = useState<Array<PlantEventDetails>>([]);
    const [showDetails, setShowDetails] = useState(false);
    const {getEvents} = useEventService();
    const {getPlants} = usePlantService();

    const date = useMemo(() => new Date(), []);
    useEffect(() => {
        let y = date.getFullYear(), m = date.getMonth();
        let firstDay = new Date(Date.UTC(y, m, -7));
        let lastDay = new Date(Date.UTC(y, m + 1, 7));
        Promise.all([getEvents(firstDay, lastDay), getPlants()])
            .then(result => {
                const [events, plants] = result;
                const plantsMap = new Map<string, Plant>();
                plants.forEach(plant => plantsMap.set(plant.id, plant));
                const fetchedEventMap = new Map<string, PlantEventDetails[]>();
                events.forEach(event => {
                    let eventArray: Array<PlantEventDetails> | undefined = fetchedEventMap.get(event.date.toDateString());
                    if (eventArray === undefined) {
                        eventArray = [];
                        fetchedEventMap.set(event.date.toDateString(), eventArray);
                    }
                    const plant = plantsMap.get(event.plant);
                    if (plant === undefined) {
                        console.error('No plant found for event', event);
                    } else {
                        eventArray.push(createEventDetails(event, plant));
                    }
                });
                setError(false);
                setEventMap(fetchedEventMap);
            })
            .catch(err => {
                if (err instanceof UnauthorizedError) {
                    console.log('CalendarView: Unauthorized');
                } else {
                    alert('Unexpected error');
                    console.error('Unexpected error', err);
                }
            })
            .finally(() => setFetching(false));

    }, [date, getEvents, getPlants]);

    const getTileContent = (props: CalendarTileProperties): JSX.Element => {
        let eventList = eventMap.get(props.date.toDateString());
        if (eventList === undefined) {
            eventList = [];
        }
        const eventsByPlant = new Map<string, PlantEventDetails[]>();
        for (let event of eventList) {
            let plantEvents: Array<PlantEventDetails> | undefined = eventsByPlant.get(event.plant.id);
            if (plantEvents === undefined || plantEvents === null) {
                plantEvents = new Array<PlantEventDetails>();
                eventsByPlant.set(event.plant.id, plantEvents);
            }
            plantEvents.push(event);
        }
        const entryList = new Array<{ plant: Plant, plantEvents: PlantEventDetails[] }>();
        eventsByPlant.forEach((plantEvents) => {
            const plant = plantEvents[0].plant;
            entryList.push({
                plant: plant,
                plantEvents: plantEvents
            });
        });
        const componentList = entryList.slice(0, 3).map((entry, index) => <div key={index}>
            <CalendarPlantInfo name={entry.plant.name} events={entry.plantEvents}/>
        </div>);
        if (entryList.length > 3) {
            const remaining = entryList.length - 2;
            const remainingEvents = entryList.slice(2).flatMap(entry => entry.plantEvents);
            componentList[2] = <div key={2}>
                <CalendarPlantInfo name={`${remaining} more...`} events={remainingEvents}/>
            </div>;
        }
        return <>
            <div className={'planty-calendar-events full-view'}>
                <Stack gap={1} className={'calendar-stack'}>
                    {componentList}
                </Stack>
            </div>
            {eventList.length > 0 && <div className={'planty-calendar-events mobile-view ms-auto'}>
                <Stack gap={1} className={'calendar-stack'}>
                    <div><CalendarPlantInfo name={eventList.length.toString()} events={eventList}/></div>
                </Stack>
            </div>}
        </>;
    };

    const onModalHide = () => {
        setShowDetails(false);
    };

    const handleDayClick = (date: Date) => {
        let eventList = eventMap.get(date.toDateString());
        if (eventList === undefined) {
            eventList = [];
        }
        setDetailsDate(date);
        setDetailsEvents(eventList);
        setShowDetails(true);
    };

    return (
        <Container>
            {fetching ? <Spinner animation={"grow"} variant={'success'}/> :
                <>
                    {error &&
                        <Alert variant={'danger'}>Failed to download data. Check your internet connection.</Alert>
                    }
                    <Calendar
                        value={date}
                        activeStartDate={date}
                        locale={"en"}
                        className={"planty-calendar"}
                        minDetail={'month'}
                        maxDetail={'month'}
                        showNavigation={false}
                        tileContent={getTileContent}
                        tileClassName={'planty-calendar-tile'}
                        onClickDay={handleDayClick}
                    />
                    <EventDetailsModal events={detailsEvents}
                                       date={detailsDate}
                                       onHide={onModalHide}
                                       show={showDetails}/>
                </>}
        </Container>
    );
}

export default CalendarView;