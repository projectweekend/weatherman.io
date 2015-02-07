var expect = require( "chai" ).expect,
	weatherman = require( "../lib/weatherman" );


describe( "weatherman", function () {

	var alRoker = new weatherman( "forecast-io-api-key" );

	describe( "creating an instance with an API key", function () {

		it( "should have an API Key", function ( done ) {

			expect( alRoker ).to.have.a.property( "_apiKey", "forecast-io-api-key" );
			done();

		} );

	} );

	describe( "creating an instance without an API key", function () {

	    it( "should throw an error", function ( done ) {

	        expect( weatherman ).to.throw( "weatherman.io requires a Forecast.io API key" );
	        done();

	    } );

	} );

	describe( "the API URL", function () {

		var alRoker = new weatherman( "forecast-io-api-key" );
		var apiUrl = alRoker._requestUrl( 41.885471, -87.643026 );

		it( "should be formatted correctly", function ( done ) {

			expect( apiUrl ).to.equal( "https://api.forecast.io/forecast/forecast-io-api-key/41.885471,-87.643026" );
			done();

		} );

	} );

	describe( "creating an instance with options", function () {

		var options = {
			units: "us",
			exclude: [ "hourly", "minutely" ],
			extend: "hourly"
		};

		var alRoker = new weatherman( "forecast-io-api-key", options );

		it( "should have populated the _forecastIoOptions property", function ( done ) {

			expect( alRoker._forecastIoOptions ).to.equal( options );
			done();

		} );

	} );

} );
