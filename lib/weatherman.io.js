var https = require( 'https' );

module.exports = function (apiKey) {

    if (!apiKey) {
        throw new Error("The weatherman does not work without an API key");
    }

    return {
        config: {
            apiKey: apiKey,
            latitude: null,
            longitude: null
        },
        goOnLocation: function ( latitude, longitude ) {
            if ( !latitude || !longitude ) {
                throw new Error("Latitude and Longitude are required to go on location");
            }
            var config = this.config;
            config.latitude = latitude;
            config.longitude = longitude;
        },
        forecastIO: function ( time, callback ) {
            var config = this.config;
            if ( !config.latitude || !config.longitude ) {
                throw new Error("The weatherman must 'goOnLocation(latitude, longitude)' before doing a forecast");
            }
            var httpOptions = {
                hostname: "api.forecast.io",
                port: 443,
                path: "/forecast/" + config.apiKey + "/" + config.latitude + "," + config.longitude,
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            if ( time ) {
				httpOptions.path = httpOptions.path + "," + time;
            }
            var output = "";
            https.get( httpOptions, function ( httpRes ) {
                httpRes.on( 'data', function ( chunk ) {
                    output += chunk;
                } );
                httpRes.on( 'end', function () {
                    try {
                        jsonData = JSON.parse(output);
                    } catch( e ) {
                        return callback(e, output);
                    }
                    callback( null, jsonData );
                } );
                httpRes.on( 'error', function ( err ) {
                    callback( err );
                } );
            } );
        },
        doForecast: function ( callback ) {
			return this.forecastIO( null, callback );
        },
        doForecastAtTime: function ( time, callback ) {
			return this.forecastIO( time, callback );
        }
    };
};
