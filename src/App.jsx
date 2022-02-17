import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Home, Weather, NotFound} from './pages/index.js';
import Header from "./components/Header";

const App = () => {
    return (
        <div className="App">
            <BrowserRouter basename={process.env.NODE_ENV=="production" ? "/weather-react": "/"}>
            <Header title="天気予報App" />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/weather/:id" element={<Weather />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

render(
    // コードの赤ペン先生
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("app")
);