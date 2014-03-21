weatherman.io
===============

A simple Node.js module for integrating with the [Forecast.io API](https://developer.forecast.io/).

### Install it

```
 npm install weatherman.io
```

### Require it
```
 var weatherman = require( 'weatherman.io' );
```

### Create a weatherman

```
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

### Set custom options

Set the options object with the desired properties before calling `doForecast`. You only need to define the option properties you need. The example below demonstrates changing all three at once.

```
alRoker.options = {
    units: "uk",
    exclude: ["minutely", "alerts"],
    extend: "hourly"
};
```

A detailed explanation of each of these items is available in the Forecast.io developer docs: [https://developer.forecast.io/docs/v2](https://developer.forecast.io/docs/v2)
