import React, { useEffect, useState } from 'react';
import { kelvinToFahrenheit } from '../helpers/HelpersDashboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Forecast = (props) => {
     const [error, setError] = useState(null);
     const [isLoaded, setIsLoaded] = useState(false);
     const [items, setItems] = useState({});

     console.log(items)
     useEffect(() => {
          fetch(`https://community-open-weather-map.p.rapidapi.com/weather?q=${props.city ? props.city : 'Miami'}`, {
               "method": "GET",
               "headers": {
                    "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
                    "x-rapidapi-key": "64d7cd33edmsh3810b44979bef23p1a463fjsn2d93cd655eea"
               }
          })
               .then(res => res.json())
               .then(result => {
                    // console.log(result);
                    setIsLoaded(true);
                    setItems(result);
               })
               .catch(error => {
                    setIsLoaded(true);
                    setError(error);
               })
     }, [])

     if (error) {
          return <div>Error: {error.message}</div>;
     } else if (!isLoaded) {
          return <div>Loading...</div>;
     } else {
          return (
               <div className="current-weather">
                    <div className="current-weather__city">
                         {props.city ? props.city : ''}
                    </div>
                    <div className="current-weather__temp">
                         {items.main && (
                              <div>
                                   {kelvinToFahrenheit(items.main.temp)}
                              </div>
                         )}
                    </div>
                    <div className="current-weather__description">
                         {items.main && ([
                              <div>
                                 
                                   {items.weather[0].description}
                                  
                              </div>,
                               <img src={`http://openweathermap.org/img/wn/${items.weather[0].icon}@2x.png`}></img>]
                         )}
                    </div>
               </div>
          )
     }
}

export default Forecast;