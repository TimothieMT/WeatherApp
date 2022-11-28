import './App.scss'
import React, {useRef, useState} from "react";
import {colors, Container, Grid} from "@mui/material";
import {Item} from "semantic-ui-react";
import {BsSunrise, BsSunset, BsWind, SlLocationPin} from "react-icons/all";

interface IWeather {
    description: string,
    icon: string,
    main: any
    coord: any,
    lat: number,
    lon: number,
    sys: any,
    weather: any,
    temp: number,
    temp_max: number,
    temp_min: number,
    name: string,
    country: string,
    sunrise: number,
    sunset: number,
    rain: number,
    feels_like: number,
    wind: any,
    speed: number
}


function App() {

    const [weatherData, setWeatherData] = useState<IWeather[]>([])
    const inputRef: any = useRef();

    const handleClick: any = () => {
        (async () => {
            const key = '2dae96869e42530d647baab47cdac0ff'
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputRef.current.value}&appid=${key}&units=metric`
            const response = await fetch(url);
            console.log(url)
            const _weather = await response.json();
            setWeatherData([_weather]);
            console.log(_weather)
        })();
    }


    function locationLink() {
        const coordinate = weatherData.map((item:any) => `https://www.google.de/maps/@${item.coord.lat},${item.coord.lon},14z`).toString()
        console.log(coordinate)
        return (
                <a className='locLabel' href={coordinate} target={'_blank'}>
                  <SlLocationPin className='pin'/>
                    {weatherData.map((item: any) => (
                        <p>{`${item.name}, ${item.sys.country}`}</p>
                    ))}
                </a>
        )}


    return (
        <div className="App">

            <div className='inputLabel'>
            <h1>Weather App</h1>

            <input
                ref={inputRef}
                type="text"
                id="message"
                name="message"
                placeholder='Enter your city name'
            />
            <button onClick={handleClick}>Weather check</button>
            </div>




            {weatherData.map((item: any) => (
                <Container maxWidth='md' className='wrapper' key={item}>

                    <p className='title'>Today´s Report</p>

                    <div className='currentTemp'>
                        <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt={''}/>
                        <p>{`${item.weather[0].description}`} </p>
                        <p>{Math.round(item.main.temp)}<span className='symbol'>°</span></p>
                    </div>

                    {locationLink()}
                    <Grid container spacing={1}>
                        <Grid item xs sx={{
                            display: 'inline-flex',
                            flexDirection: 'column',
                            textAlign: 'center',
                            marginTop: 5
                        }}>
                            <Item>
                                <BsSunrise className='sunUp'/>
                                <p>
                                    {weatherData.map((item: IWeather) => (
                                        new Intl.DateTimeFormat('de-DE', {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        }).format(item.sys.sunrise)
                                    ))}
                                </p>
                            </Item>
                        </Grid>
                        <Grid item xs sx={{
                            display: 'inline-flex',
                            flexDirection: 'column',
                            textAlign: 'center',
                            marginTop: 5
                        }}>
                            <Item>
                                <BsSunset className='sunDown'/>
                                <p>
                                    {weatherData.map((item: IWeather) => (
                                        new Intl.DateTimeFormat('de-DE', {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        }).format(item.sys.sunset)
                                    ))}
                                </p>
                            </Item>
                        </Grid>
                        <Grid item xs sx={{
                            display: 'inline-flex',
                            flexDirection: 'column',
                            textAlign: 'center',
                            marginTop: 5
                        }}>
                            <Item>
                                <BsWind className='wind'/>
                                {weatherData.map((item:any) => (
                                    <p key={item}>{`${item.wind.speed} Km/h`}</p>
                                ))}
                            </Item>
                        </Grid>
                    </Grid>

                </Container>
            ))}
        </div>
    )
}

export default App
