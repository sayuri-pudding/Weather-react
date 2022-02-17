import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import axios from "axios"
import WeatherDetail from "../components/weatherDetail";
import ToHomeButton from "../components/ToHomeButton";

const Weather = () => {
    const params = useParams();

    const id = params.id;
    const [weather, setWeather] = useState();

    useEffect(() => {
        const getWeather = async () => {
            await axios.get(`https://weather.tsukumijima.net/api/forecast/city/${id}`)
                .then((res) => {
                    setWeather(res.data)
                })
                .catch((e) => {//エラーが発生した時の処理
                    console.log(e);
                });
        };
        getWeather();
    }, []);

    return (
        <>
            {weather && weather.error ?
                <h1>{weather.error}</h1> :
                <>
                    <h1 align="center">{weather ? weather.title : null}</h1>
                    <Box sx={{ display: { md: 'flex' }, justifyContent: { md: 'spave-between' } }}>
                        {weather ? weather.forecasts.map((forecasts, i) => {
                            return (
                                <WeatherDetail
                                    date={forecasts.date}
                                    forecasts={forecasts.telop}
                                    image={forecasts.image.url}
                                    minTemp={forecasts.temperature.min.celsius ? forecasts.temperature.min.celsius : "--"}
                                    maxTemp={forecasts.temperature.max.celsius ? forecasts.temperature.max.celsius : "--"}
                                    key={i}
                                />
                            )
                        }) : null
                        }</Box>
                        {weather? <ToHomeButton />:null

                        }
                </>
            }
        </>
    );
}

export default Weather;