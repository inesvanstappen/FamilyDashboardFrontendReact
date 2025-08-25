import {useEffect, useState} from "react";
import {URL_BACKEND} from "../constants";

function Weather({onRefreshRef}) {
    const [weather, setWeather] = useState(null);

    async function fetchWeather() {
        const response = await fetch(`${URL_BACKEND}/weather`);
        const data = await response.json();
        setWeather(data);
    }

    useEffect(() => {
        fetchWeather();

        if (onRefreshRef) {
            onRefreshRef.current = fetchWeather;
        }
    });

    if (!weather?.forecast?.length) {
        return <p>Loading weather data...</p>;
    }

    const today = weather.forecast[0];
    const tomorrow = weather.forecast[1];

    return (<>
        <div className="flex items-end justify-center gap-4 mb-4">
            <div>
                <h3>
                    Current temperature
                </h3>
                <p>{weather.tempNow}<span>°</span>
                </p>
            </div>
        </div>

        <div className="flex flex-col items-center mb-4">
            <h3>Today</h3>

            <div className="flex items-start gap-4">
                <img
                    className="w-12 h-12 mr-4"
                    src={`https://${today.code}`}
                    alt={today.condition}
                />

                <div className="flex flex-col">
                    <p>{today.minTemp}<span>°</span> – {today.maxTemp}<span>°</span></p>
                    <p>{today.condition}</p>
                </div>
            </div>
        </div>

        <div className="flex flex-col items-center mb-4">
            <h3>Tomorrow</h3>

            <div className="flex items-start gap-4">
                <img
                    className="w-12 h-12 mr-4"
                    src={`https://${tomorrow.code}`}
                    alt={tomorrow.condition}
                />

                <div className="flex flex-col">
                    <p>{tomorrow.minTemp}<span>°</span> – {tomorrow.maxTemp}<span>°</span></p>
                    <p>{tomorrow.condition}</p>
                </div>
            </div>
        </div>
    </>);
}

export default Weather;
