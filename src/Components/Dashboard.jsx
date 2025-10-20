import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedIn");
        navigate("/");
    };

    return (
        <div className="dashboard-container">
            <h1>Welcome, {user?.username || "User"} 👋</h1>
            <p>You have successfully logged in!</p>

            <div className="dashboard-card">
                <h3>Your Account</h3>
                <p>Email: {user?.email || "N/A"}</p>
                <p>Username: {user?.username}</p>
            </div>

            <button className="logout-btn" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
