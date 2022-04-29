import React from 'react';
import './App.css';
import 'react-calendar/dist/Calendar.css';
import PlantyNavbar from "./components/navbar/PlantyNavbar";
import {Route, Routes} from 'react-router-dom';
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import MainView from "./views/MainView";

function App() {
    return (
        <div className="App">
            <PlantyNavbar/>
            <Routes>
                <Route path="/" element={<MainView/>}/>
                <Route path="login" element={<LoginView/>}/>
                <Route path="register" element={<RegisterView/>}/>
            </Routes>
            {/*<Footer/>*/}
        </div>
    );
}

export default App;