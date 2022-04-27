import React from 'react';
import './App.css';
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";

function App() {
  return (
    <div className="App">
        <RegisterView/>
      <LoginView/>
    </div>
  );
}

export default App;
