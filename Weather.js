import React from 'react';
import './main.css';

export default class Weather extends React.Component {
    constructor(){
        super();
        this.state = {
         name:"",
         city:"",
         errorMsg:"",
         temp:"",
         syncTime:"",
         precipitation:"",
         visibility:"",
         windDir:"",
         windSpd:"",
         humidity:""
        }
        this.findWeather = this.findWeather.bind(this);
        this.cityChange = this.cityChange.bind(this);
    }
    cityChange(e){
    this.setState({
        name:e.target.value
    })
        
     
    }
    findWeather(){
        console.log("weattherified....")
        var cityName = this.state.name
        console.log(cityName);
        fetch('http://api.apixu.com/v1/current.json?key=bad4a2fc80784d0d8aa102652182405&q='+cityName+'')
        .then(response => response.json())
        .then(json => {
            console.log("manupulating",json)
            
            if(json.error){
                console.log("city not found")
                alert("city not found!!")
                this.setState({
                    errorMsg:"city not found"
                })

            }else{
                this.setState({
                    city:json.location.name,
                    temp:json.current.temp_c,
                    syncTime:json.current.last_updated,
                   precipitation:json.current.precip_mm,
                   windDir:json.current.wind_dir,
                   visibility:json.current.vis_km,
                   windSpd:json.current.wind_kph,
                   humidity:json.current.humidity
                })
                console.log(this.state)
                
            }
      
        })
        
    }

    render(){
        return(
            <div>
            <h3>Weather</h3>
            <div>
            <input type="text" onChange={this.cityChange}/>
            <input type="button" value="find" onClick={this.findWeather}/>
            
            <h5>last synched:{this.state.syncTime}</h5>
            <div>City:{this.state.city}</div>
            
            <div>temp(celcius):{this.state.temp}</div>
            <div>precipitation(mm):{this.state.precipitation}</div>
            <div>wind direction:{this.state.windDir}</div>
            <div>wind speed(kph):{this.state.windSpd}</div>
           
            <div>humidity:{this.state.humidity}</div>
            <div>visibility:{this.state.visibility}</div>
            
           
            </div>
            </div>
        )
    }
};
