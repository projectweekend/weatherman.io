var expect = require('chai').expect,
	weatherman = require('../lib/weatherman.io');


describe( 'weatherman', function () {
	
	var alRoker = weatherman( "forecast-io-api-key" );

	describe( "setting up", function () {

		it( "should have an API Key", function () {
			expect( alRoker ).to.have.a.property( 'config' ).with.property( 'apiKey', "forecast-io-api-key" );
		} );

	} );

	describe( "sending on location", function () {

		var alRoker = weatherman( "forecast-io-api-key" );
		alRoker.goOnLocation( 41.885471, -87.643026 );

		it( "should have latitude and longitude", function () {
			expect( alRoker ).to.have.a.property( 'config' ).with.property( 'latitude', 41.885471 );
			expect( alRoker ).to.have.a.property( 'config' ).with.property( 'longitude', -87.643026 );
		} );

		it( "should have a valid api path", function () {
			var apiPath = alRoker.buildPathString();
			expect( apiPath ).to.equal("/forecast/forecast-io-api-key/41.885471,-87.643026");
		} );

	} );

	describe( "setting options", function () {
		
		var alRoker = weatherman( "forecast-io-api-key" );
		alRoker.goOnLocation( 41.885471, -87.643026 );
		alRoker.options = {
			units: "us",
			exclude: ["hourly","minutely"],
			extend: "hourly"
		};

		it( "should have a valid api path", function () {
			var apiPath = alRoker.buildPathString();
			expect( apiPath ).to.equal("/forecast/forecast-io-api-key/41.885471,-87.643026?units=us&exclude=hourly,minutely&extend=hourly");
		} );

	} );
	
} );
