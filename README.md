### Install it

```
 npm install weatherman.io
```


### Require it
```javascript
var weatherman = require( "weatherman.io" );
```


### Create a weatherman

```javascript
var alRoker = weatherman( "your-forecast-io-api-key" );
```


### Create a weatherman with options

```javascript
var options = {
    units: "uk",
    exclude: ["minutely", "alerts"],
    extend: "hourly"
};

var alRoker = weatherman( "your-forecast-io-api-key", options );
```

Detailed information about each of these options is available in the Forecast.io developer docs: [https://developer.forecast.io/docs/v2](https://developer.forecast.io/docs/v2)


### Do the forecast from a location

```javascript
var forecastOptions = {
    latitude: 41.8854710,
    longitude: -87.6430260
};

alRoker.doForecast( options, function ( err, weatherReport ) {

    if ( err ) {
        // handle any errors
    }
    // do something with the weatherReport

} );
```


### Do the forecast for a specific time (Unix timestamp)

```javascript
var forecastOptions = {
    latitude: 41.8854710,
    longitude: -87.6430260,
    time: 1395347280
};

alRoker.doForecast( options, function ( err, weatherReport ) {

    if ( err ) {
        // handle any errors
    }
    // do something with the weatherReport

} );
```
