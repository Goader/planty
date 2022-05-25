import React from 'react';
import './App.css';
import 'react-calendar/dist/Calendar.css';
import PlantyNavbar from "./components/navbar/PlantyNavbar";
import {Route, Routes} from 'react-router-dom';
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import MainView from "./views/MainView";
import AddPlantFormView from "./views/AddPlantFormView";

function App() {
    return (
        <div className="App">
            <PlantyNavbar/>
            <Routes>
                <Route path="/" element={<MainView/>}/>
                <Route path="/login" element={<LoginView/>}/>
                <Route path="/register" element={<RegisterView/>}/>
                <Route path="/plants/add" element={<AddPlantFormView/>}/>
            </Routes>
            {/*<Footer/>*/}
        </div>
    );
}

export default App;