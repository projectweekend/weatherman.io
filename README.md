weatherman.io
===============

A simple Node.js module for integrating with the [Forecast.io API](https://developer.forecast.io/).

### Installation

`npm install weatherman.io`

### Create a weatherman

```
 var weatherman = require( 'weatherman' );

 var alRoker = weatherman( 'your-forecast-io-api-key' );
```

### Go on location and do the forecast

```
 var latitude = 41.8854710;
 var longitude = -87.6430260;

 alRoker.goOnLocation( latitude, longitude );
 alRoker.doForecast( function ( err, weatherReport ) {
     if ( err ) {
         // handle any errors
     }
     // do something with the weatherReport
 } );
```

### Do the forecast for a specific time

```
 var latitude = 41.8854710;
 var longitude = -87.6430260;
 var unixTimeStamp = 1395347280;

 alRoker.goOnLocation( latitude, longitude );
 alRoker.doForecastAtTime( unixTimeStamp, function ( err, weatherReport ) {
     if ( err ) {
         // handle any errors
     }
     // do something with the weatherReport
 } );
```
