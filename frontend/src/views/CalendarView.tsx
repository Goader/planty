import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import PlantyNavbar from "../navbar/PlantyNavbar";
import Footer from "../footer/Footer";
import SwitchComponent from "../switchComponent/SwitchComponent";
import './CalendarStyle.css'

function CalendarView() {

    var state = {
        date: new Date(),
        locale: "en",
        style: "calendarStyle"
    }

    return (
        <div className={"calendarView"}>
            <PlantyNavbar/>
            <SwitchComponent/>
            <Calendar
                value={state.date}
                locale={state.locale}
                className={state.style}
            />
            <Footer/>
        </div>
    )
}

export default CalendarView;