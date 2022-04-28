import React from 'react';
import './App.css';
import 'react-calendar/dist/Calendar.css';
import CalendarView from "./views/CalendarView";
import PlantyNavbar from "./components/navbar/PlantyNavbar";
import {Route, Routes} from 'react-router-dom';
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";

function App() {
    return (
        <div className="App">
            <PlantyNavbar/>
            <Routes>
                <Route path="/" element={<CalendarView/>}/>
                <Route path="login" element={<LoginView/>}/>
                <Route path="register" element={<RegisterView/>}/>
            </Routes>
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
            </Container>
            <CalendarView/>*/}
            {/*<Footer/>*/}
        </div>
    );
}

export default App;