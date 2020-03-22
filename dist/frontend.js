(function ($) {
    
    var CoronaMap = {
        on_ready: function() {
            this.load_gmap();
        },
        
        /**
         * Load Google map API.
         */
        load_gmap: function() {
            google.charts.load('current', {
                'packages': ['geochart'],
                //'mapsApiKey': this.props.gMapAPI
            });
    
            google.charts.setOnLoadCallback( () => { 
                this.fetch_cases_data();
            } );
        },

        /**
         * Fetch the API data.
         */
        fetch_cases_data: function() {
            jQuery.get( 'https://corona.lmao.ninja/countries' ).then( data  => {
                window.coronda_data = data;
                CoronaMap.countries =  data;
                CoronaMap.drawMarkersMap();
            } );   
        },

        /**
         * Setup the map.
         */
        drawMarkersMap: function() {
            if( ! google || ! google.visualization) {
                return;
            }
    
            let header   = [ 'Country', 'Cases', 'Today Cases'];
            let body     = CoronaMap.countries.map( country => [ country.country, country.cases, country.todayCases ]);
            let combined = [ header, ...body ];
            var data = google.visualization.arrayToDataTable( combined );
    
            var options = {
                sizeAxis: { minValue: 0, maxValue: 100 },
                //displayMode: 'markers',
                colorAxis: {colors: [ jQuery( '.wp-block-promz-corona-map' ).data( 'from-color' ) , jQuery( '.wp-block-promz-corona-map' ).data( 'to-color' ) ]}
            };
            
            var chart = new google.visualization.GeoChart( jQuery( '.wp-block-promz-corona-map' ).get(0) );
            chart.draw(data, options);
        }
    };

    jQuery( document ).ready(  function() {
        CoronaMap.on_ready();
    });
})($);
