import React from 'react';
import './App.css';
import 'react-calendar/dist/Calendar.css';
import CalendarView from "./views/CalendarView";
import PlantyNavbar from "./components/navbar/PlantyNavbar";
import Footer from "./components/footer/Footer";

function App() {
    console.log('render app')
    return (
        <div className="App">
            <PlantyNavbar/>
            <CalendarView/>
            <Footer/>
        </div>
    );
}

export default App;
