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
        options: {
            units: "",
            exclude: [],
            extend: ""
        },
        buildPathString: function ( time ) {
            var config = this.config;
            var options = this.options;
            if ( !config.latitude || !config.longitude ) {
                throw new Error("The weatherman must 'goOnLocation(latitude, longitude)' before doing a forecast");
            }
            var path = "/forecast/" + config.apiKey + "/" + config.latitude + "," + config.longitude;
            if ( time ) {
                path = path + "," + time;
            }
            if ( options.units || options.exclude.length || options.extend ) {
                path = path + "?";
                for ( var k in options ) {
                    var item = options[k];
                    if ( k == 'exclude' ) {
                        path = path + item.join() + "&";
                    } else {
                        path = path + item + "&";
                    }
                }
                path.slice(0, -1);
            }
            return path;
        },
        forecastIO: function ( time, callback ) {
            var buildPathString = this.buildPathString;
            var httpOptions = {
                hostname: "api.forecast.io",
                port: 443,
                path: buildPathString(),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
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
        goOnLocation: function ( latitude, longitude ) {
            if ( !latitude || !longitude ) {
                throw new Error("Latitude and Longitude are required to go on location");
            }
            var config = this.config;
            config.latitude = latitude;
            config.longitude = longitude;
        },
        doForecast: function ( callback ) {
			return this.forecastIO( null, callback );
        },
        doForecastAtTime: function ( time, callback ) {
			return this.forecastIO( time, callback );
        }
    };
};
