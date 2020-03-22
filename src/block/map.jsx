import React from 'react';

class Cmap extends React.Component {
    constructor(props) {
        super(props);
        this.state = { countries: [] };
    }

    fetch_cases_data() {
        jQuery.get( 'https://corona.lmao.ninja/countries' ).then( data  => {
            window.coronda_data = data;
            this.setState( { countries: data } );
            this.drawMarkersMap();
        } );
    }

    drawMarkersMap() {
        //let header   = [ 'Country', 'Cases', 'Today Cases', 'Deaths', 'Today Deaths', 'Recovered', 'Active', 'Critical' ];
        //let body     = this.state.countries.map( country => [ country.country, country.cases, country.todayCases, country.deaths, country.todayDeaths, country.recovered, country.active, country.critical ]);
        if( ! google || ! google.visualization) {
            return;
        }

        let header   = [ 'Country', 'Cases', 'Today Cases'];
        let body     = this.state.countries.map( country => [ country.country, country.cases, country.todayCases ]);
        let combined = [ header, ...body ];
        var data = google.visualization.arrayToDataTable( combined );

        var options = {
            sizeAxis: { minValue: 0, maxValue: 100 },
            //displayMode: 'markers',
            colorAxis: {colors: [ this.props.fromColor, this.props.toColor ]} // white to red
        };

        var chart = new google.visualization.GeoChart( document.getElementById('chart_div') );
        chart.draw(data, options);
    }

    componentDidUpdate() {
        this.drawMarkersMap();
    }

    componentDidMount() {
        google.charts.load('current', {
            'packages': ['geochart'],
            //'mapsApiKey': this.props.gMapAPI
        });

        google.charts.setOnLoadCallback( () => { 
            this.fetch_cases_data();
        } );
    }

    render() { 
        return ( 
            <div className="covid_map" id="chart_div">
            </div>
         );
    }
}
 
export default Cmap;