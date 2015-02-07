var request = require( "request" );
var is = require( "is_js" );


var WeatherMan = function ( apiKey, mainForecastOptions ) {

    this.apiKey = apiKey;
    this.url = "https://api.forecast.io/forecast";
    this.mainForecastOptions = mainForecastOptions ? mainForecastOptions : null;


    if ( !this.apiKey ) {
        throw new Error( "weatherman.io requires a Forecast.io API key" );
    }

};

WeatherMan.prototype._requestUrl = function( latitude, longitude, time ) {

    var requestUrl = this.url + "/" + this.apiKey + "/" latitude + "," + longitude;

    if ( is.not.undefined( time ) ) {
        output = output + "," + time;
    }

    return requestUrl;

};

WeatherMan.prototype._forecast = function( options, done ) {

    var requestOptions = {
        url: this._requestUrl( options.latitude, options.longitude, options.time ),
        json: true
    };

    if ( _this.mainForecastOptions !== null ) {
        requestOptions.qs = _this.mainForecastOptions;
    }

    request( options, function ( err, res, body ) {

        if ( err ) {
            return done( err );
        }

        return done( null, body );

    } );

};

WeatherMan.prototype.doForecast = function( options, done ) {

    var hasValidLatLon = is.number( options.latitude ) && is.number( options.longitude );
    var hasInvalidTime = is.not.undefined( options.time ) && is.not.number( options.time );

    if ( !hasValidLatLon ) {
        throw new Error( "'options' argument must include 'latitude' and 'longitude' as numbers" );
    }

    if ( hasInvalidTime ) {
        throw new Error( "'options.time' argument must be a Unix timestamp" );
    }

    return this._forecast( options, done );

};
