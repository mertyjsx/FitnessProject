import React from 'react';

export function kelvinToFahrenheit(kelvin) {
     const celsius = kelvin - 273;
     // Calculating Fahrenheit temperature to the nearest integer
     let fahrenheit = Math.floor(celsius * (9 / 5) + 32);
     return (
          <span>{fahrenheit}&deg;F</span>
     )
}