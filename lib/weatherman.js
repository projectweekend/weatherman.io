var request = require( "request" );
var is = require( "is_js" );


var WeatherMan = function ( apiKey, forecastIoOptions ) {

    if ( !apiKey ) {
        throw new Error( "weatherman.io requires a Forecast.io API key" );
    }
    this._apiKey = apiKey;
    this._url = "https://api.forecast.io/forecast/" + this._apiKey;
    this._forecastIoOptions = forecastIoOptions ? forecastIoOptions : null;

};

WeatherMan.prototype._requestUrl = function( latitude, longitude, time ) {

    var requestUrl = this._url + "/" + latitude + "," + longitude;

    if ( is.not.undefined( time ) ) {
        requestUrl = requestUrl + "," + time;
    }

    return requestUrl;

};

WeatherMan.prototype._forecast = function( options, done ) {

    var requestOptions = {
        url: this._requestUrl( options.latitude, options.longitude, options.time ),
        json: true
    };

    if ( this._forecastIoOptions !== null ) {
        requestOptions.qs = this._forecastIoOptions;
    }

    request( requestOptions, function ( err, res, body ) {

        if ( err ) {
            return done( err );
        }

        return done( null, body );

    } );

};

WeatherMan.prototype.doForecast = function( options, done ) {

    var hasLatLon = is.number( options.latitude ) && is.number( options.longitude );
    var hasInvalidTime = is.not.undefined( options.time ) && is.not.number( options.time );

    if ( !hasLatLon ) {
        throw new Error( "'options' argument must include 'latitude' and 'longitude' as numbers" );
    }

    if ( hasInvalidTime ) {
        throw new Error( "'options.time' argument must be a Unix timestamp" );
    }

    return this._forecast( options, done );

};


module.exports = WeatherMan;
