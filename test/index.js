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

		alRoker.goOnLocation( 41.8854710, -87.6430260 );

		it( "should have latitude and longitude", function () {
			expect( alRoker ).to.have.a.property( 'config' ).with.property( 'latitude', 41.8854710 );
			expect( alRoker ).to.have.a.property( 'config' ).with.property( 'longitude', -87.6430260 );
		} );

	} );
	
} );
