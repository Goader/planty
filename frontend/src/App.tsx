import React, {useEffect, useState} from 'react';
import './App.css';
import 'react-calendar/dist/Calendar.css';
import PlantyNavbar from "./components/navbar/PlantyNavbar";
import {Route, Routes, useNavigate} from 'react-router-dom';
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import MainView from "./views/MainView";
import {useAuth} from "./api/auth/AuthContext";
import {NetworkError, UnauthorizedError} from "./api/auth/util";
import AccountSettingsView from "./views/AccountSettingsView";
import PlantDetailsView from "./views/PlantDetailsView";

function App() {
    let {user, refresh, pendingRefresh} = useAuth();
    let navigate = useNavigate();
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        if (pendingRefresh) {
            refresh()
                .catch(err => {
                    if (err instanceof UnauthorizedError) {
                        navigate('/login');
                    } else if (err instanceof NetworkError) {
                        alert('Network error. Check your internet connection.');
                    } else {
                        throw err;
                    }
                })
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
                        <Route path="/settings" element={<AccountSettingsView/>}/>
                        <Route path="/plants/:plantId" element={<PlantDetailsView/>}/>
                    </Routes>
                ) : (
                    <Routes>
                        <Route path="/*" element={<LoginView/>}/>
                        <Route path="/login" element={<LoginView/>}/>
                        <Route path="/register" element={<RegisterView/>}/>
                    </Routes>
                )}
            </>}
        </div>
    );
}

export default App;