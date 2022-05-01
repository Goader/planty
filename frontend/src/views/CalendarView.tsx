import React, {useEffect, useMemo, useState} from 'react';
import Calendar, {CalendarTileProperties} from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {createCalendarFetchConfig} from "../api/calendar";
import {PlantEvent, PlantEventDetails, PlantEventResponse} from "../model/calendar";
import {Alert, Container, Spinner, Stack} from "react-bootstrap";
import "./CalendarView.css";
import CalendarPlantInfo from "../components/CalendarPlantInfo";
import {useAuth} from "../components/AuthContext";
import {handleUnauthorized} from "../api/auth";
import {useNavigate} from "react-router-dom";
import {Plant, PlantResponse} from "../model/plants";
import {createPlantsGetRequestConfig, mapResponseToPlant} from "../api/plants";
import EventsDetailsModal from "../components/EventsDetailsModal";

function CalendarView() {
    const [events, setEvents] = useState<Map<string, PlantEvent[]>>(new Map());
    const [plants, setPlants] = useState<Map<string, Plant>>(new Map());
    const [error, setError] = useState<boolean>(false);
    const [fetching, setFetching] = useState<boolean>(true);
    const [detailsDate, setDetailsDate] = useState(new Date());
    const [detailsEvents, setDetailsEvents] = useState<Array<PlantEventDetails>>([]);
    const [showDetails, setShowDetails] = useState(false);
    const navigate = useNavigate();
    let {request} = useAuth();

    const date = useMemo(() => new Date(), []);
    useEffect(() => {
        let y = date.getFullYear(), m = date.getMonth();
        let firstDay = new Date(y, m, -7);
        let lastDay = new Date(y, m + 1, 7);
        let config = createCalendarFetchConfig(firstDay, lastDay);
        request<Array<PlantEventResponse>>(config)
            .then(fetchedEvents => {
                const eventMap = new Map<string, PlantEvent[]>();
                fetchedEvents.forEach(event => {
                    console.log(event);
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
                setError(false);
                setEvents(eventMap);
                console.log(`CalendarView: Fetched ${fetchedEvents.length} events`);
                return request<Array<PlantResponse>>(createPlantsGetRequestConfig()); // TODO: parallelize this
            })
            .then(plants => plants.map(plant => mapResponseToPlant(plant)))
            .then(plants => {
                console.log(`CalendarView: Fetched ${plants.length} plants`);
                const plantsMap = new Map<string, Plant>();
                plants.forEach(plant => plantsMap.set(plant.id, plant));
                setPlants(plantsMap);
            })
            .catch(err => handleUnauthorized(err, () => navigate('/login')))
            .catch(err => {
                setError(true);
                console.log(err);
            })
            .finally(() => setFetching(false));

    }, [date, navigate, request]);

    const getTileContent = (props: CalendarTileProperties): JSX.Element => {
        let eventList = events.get(props.date.toDateString());
        if (eventList === undefined) {
            eventList = [];
        }
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
        plantMap.forEach((plantEvents, plantId) => {
            const plant = plants.get(plantId);
            if (plant === undefined) {
                console.error('No plant found with id ' + plantId);
            } else {
                componentList.push(<div key={plantId}><CalendarPlantInfo name={plant.name} events={plantEvents}/>
                </div>);
            }
        });
        return <div className={'planty-calendar-events'}><Stack gap={1}>{componentList}</Stack></div>;
    };

    const onModalHide = () => {
        setShowDetails(false);
    };

    const handleDayClick = (date: Date) => {
        let eventList = events.get(date.toDateString());
        if (eventList === undefined) {
            eventList = [];
        }
        const eventDetails = eventList.reduce<PlantEventDetails[]>((result, event) => {
            const plant = plants.get(event.plant);
            if (plant === undefined) {
                console.error('No plant found with id ' + event.plant);
            } else {
                result.push({
                    ...event,
                    plantDetails: plant
                });
            }
            return result;
        }, []);
        setDetailsDate(date);
        setDetailsEvents(eventDetails);
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
                    <EventsDetailsModal events={detailsEvents}
                                        date={detailsDate}
                                        onHide={onModalHide}
                                        show={showDetails}/>
                </>}
        </Container>
    );
}

export default CalendarView;