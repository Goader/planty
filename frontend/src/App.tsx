import React, {useEffect, useState} from 'react';
import './App.css';
import 'react-calendar/dist/Calendar.css';
import PlantyNavbar from "./components/navbar/PlantyNavbar";
import {Route, Routes, useNavigate} from 'react-router-dom';
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import MainView from "./views/MainView";
import AddPlantFormView from "./views/AddPlantFormView";
import {useAuth} from "./api/auth/AuthContext";
import {handleUnauthorized} from "./api/auth/util";

function App() {
    let {user, refresh, pendingRefresh} = useAuth();
    let navigate = useNavigate();
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        if (pendingRefresh) {
            console.log('refresh');
            refresh()
                .then(() => {
                })
                .catch(err => handleUnauthorized(err, () => navigate('/login')))
                .finally(() => setInitialized(true));
        }
    }, [navigate, refresh, pendingRefresh]);

    return (
        <div className="App">
            {initialized && <>
                <PlantyNavbar/>
                {user !== null ? (
                    <Routes>
                        <Route path="/*" element={<MainView/>}/>
                        <Route path="/plants/add" element={<AddPlantFormView/>}/>
                    </Routes>
                ) : (
                    <Routes>
                        <Route path="/login" element={<LoginView/>}/>
                        <Route path="/register" element={<RegisterView/>}/>
                    </Routes>
                )}
            </>}
        </div>
    );
}

export default App;