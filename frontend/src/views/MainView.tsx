import {Container, Nav, Tab} from "react-bootstrap";
import CalendarView from "./CalendarView";
import GardenView from "./GardenView";
import React, {useCallback, useState} from "react";
import {Link, Route, Routes, useLocation} from "react-router-dom";

const tabs = {
    "calendar": {
        title: "Calendar",
        path: '/',
        content: <CalendarView/>
    },
    "garden": {
        title: "Garden",
        path: '/plants',
        content: <GardenView/>
    }
};

function MainView() {
    const location = useLocation();
    let initialTab = 'calendar';
    for (let [key, tab] of Object.entries(tabs)) {
        if (location.pathname === tab.path) {
            initialTab = key;
            break;
        }
    }

    const [activeTab, setActiveTab] = useState(initialTab);
    const changeActiveTab = useCallback((key: string) => {
        if (activeTab !== key) setActiveTab(key);
    }, [activeTab]);

    return (<Container>
        <Nav variant="pills" className={'mb-3'}>
            {Object.entries(tabs).map(tab => {
                const [key, data] = tab;
                return (
                    <Nav.Item key={key}>
                        <Nav.Link
                            active={activeTab === key}
                            onClick={() => changeActiveTab(key)}
                            as={Link}
                            to={data.path}
                        >
                            {data.title}
                        </Nav.Link>
                    </Nav.Item>
                );
            })}
        </Nav>
        <Tab.Content>
            <Routes>
                {Object.entries(tabs).map(tab => {
                    const [key, data] = tab;
                    return (
                        <Route key={key} path={data.path} element={data.content}/>
                    );
                })}
            </Routes>
        </Tab.Content>
    </Container>);
}

export default MainView;