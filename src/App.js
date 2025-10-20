import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import LoginRegister from "./Components/LoginRegister/LoginRegister";
import Dashboard from "./Components/Dashboard";

function App() {
    const user = JSON.parse(localStorage.getItem("user")); // check if logged in

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginRegister />} />
                <Route
                    path="/dashboard"
                    element={user ? <Dashboard /> : <Navigate to="/" />}
                />
            </Routes>
        </Router>
    );
}

export default App;
