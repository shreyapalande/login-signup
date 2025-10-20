import React, { useState } from "react";
import "./LoginRegister.css";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";

const LoginRegister = () => {
    const [action, setAction] = useState(""); // toggles between login/register
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });

    // Switch between forms
    const registerLink = (e) => {
        e.preventDefault();
        setAction(" active");
        setMessage({ text: "", type: "" });
    };

    const loginLink = (e) => {
        e.preventDefault();
        setAction("");
        setMessage({ text: "", type: "" });
    };

    // --- Handle Signup ---
    const handleSignup = (e) => {
        e.preventDefault();

        if (!username || !email || !password) {
            setMessage({ text: "Please fill in all fields.", type: "error" });
            return;
        }

        // store user in localStorage
        localStorage.setItem(
            "user",
            JSON.stringify({ username, email, password })
        );

        setMessage({
            text: "Signup successful! You can now log in.",
            type: "success",
        });
        setUsername("");
        setEmail("");
        setPassword("");
        setAction(""); // go back to login
    };

    // --- Handle Login ---
    const handleLogin = (e) => {
        e.preventDefault();

        if (!username || !password) {
            setMessage({
                text: "Please enter username and password.",
                type: "error",
            });
            return;
        }

        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (
            storedUser &&
            storedUser.username === username &&
            storedUser.password === password
        ) {
            setMessage({ text: "Login successful!", type: "success" });
            setUsername("");
            setPassword("");
            setTimeout(() => navigate("/dashboard"), 800);
        } else {
            setMessage({
                text: "Invalid username or password.",
                type: "error",
            });
        }
    };

    const navigate = useNavigate();

    return (
        <div className={`wrapper${action}`}>
            {message.text && (
                <div className={`message ${message.type}`}>{message.text}</div>
            )}

            {/* LOGIN FORM */}
            <div className="form-box login">
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>

                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <FaUser className="icon" />
                    </div>

                    <div className="input-box">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div
                            className="icon eye"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    </div>

                    <div className="remember-forgot">
                        <label>
                            <input type="checkbox" /> Remember me
                        </label>
                        <a href="#">Forgot password?</a>
                    </div>

                    <button type="submit">Login</button>

                    <div className="register-link">
                        <p>
                            Don’t have an account?{" "}
                            <a href="#" onClick={registerLink}>
                                Register
                            </a>
                        </p>
                    </div>
                </form>
            </div>

            {/* REGISTER FORM */}
            <div className="form-box register">
                <form onSubmit={handleSignup}>
                    <h1>Registration</h1>

                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <FaUser className="icon" />
                    </div>

                    <div className="input-box">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <FaEnvelope className="icon" />
                    </div>

                    <div className="input-box">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div
                            className="icon eye"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    </div>

                    <div className="remember-forgot">
                        <label>
                            <input type="checkbox" required /> I agree to the
                            terms & conditions
                        </label>
                    </div>

                    <button type="submit">Sign Up</button>

                    <div className="register-link">
                        <p>
                            Already have an account?{" "}
                            <a href="#" onClick={loginLink}>
                                Login
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginRegister;
