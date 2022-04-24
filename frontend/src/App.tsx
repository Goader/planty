import React from 'react';
import './App.css';
import 'react-calendar/dist/Calendar.css';
import CalendarView from "./views/CalendarView";
import PlantyNavbar from "./components/navbar/PlantyNavbar";
import Footer from "./components/footer/Footer";
import {Container, Tab, Tabs} from "react-bootstrap";

function App() {
    return (
        <div className="App">
            <PlantyNavbar/>
            {/* uncomment and style as part of PVD-56 */}
            {/*<Container>
                <Tabs defaultActiveKey="calendar" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="calendar" title="Calendar">
                        <CalendarView/>
                    </Tab>
                    <Tab eventKey="garden" title="Garden">
                        <div>garden placeholder</div>
                    </Tab>
                </Tabs>
            </Container>*/}
            <CalendarView/>
            <Footer/>
        </div>
    );
}

export default App;