import {Container, Tab, Tabs} from "react-bootstrap";
import CalendarView from "./CalendarView";
import GardenView from "./GardenView";

function MainView() {
    return (<Container>
        <Tabs defaultActiveKey="calendar" id="uncontrolled-tab-example" className="mb-3" variant={'pills'}>
            <Tab eventKey="calendar" title="Calendar">
                <CalendarView/>
            </Tab>
            <Tab eventKey="garden" title="Garden">
                <GardenView/>
            </Tab>
        </Tabs>
    </Container>);
}

export default MainView;