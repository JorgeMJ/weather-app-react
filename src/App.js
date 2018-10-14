import React, { Component } from 'react'
import './App.css'
import axios from 'axios'

class App extends Component {

  constructor (props) {
    super(props);

    this.state = {
      value: '',
      name: '',
      country: '',
      icon: null,
      temperature: '',
      description: '',
      humidity: '',
      wind: ''
    };

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderHTML = this.renderHTML.bind(this)  
  }

  handleChange (event) {
    this.setState({value: event.target.value});
  }

  handleSubmit (event) {
    axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + this.state.value + '&units=metric&APPID=044f2b0146dc4727c03499a503f50dc4')
    .then((response) => { 
      this.setState({
        name: response.data.name,
        country: response.data.sys.country,
        icon: response.data.weather[0].icon,
        temperature: response.data.main.temp,
        description: response.data.weather[0].description,
        humidity: response.data.main.humidity,
        wind: response.data.wind.speed      
      });
    });
    event.preventDefault();
  }

  renderHTML(input) {
    if(this.state.name ===''){
      return "";
    }
    else{
      var str = input.toString();

      if(str === 'name'){
        return "Current weather in " + this.state.name + ", " + this.state.country + "."; 
      }
      else if(str === 'icon'){
        var iconSrc = 'http://openweathermap.org/img/w/' + this.state.icon + '.png';
        return<img className = 'icon' src = {iconSrc} alt =""/>;
      }
      else if(str === 'temperature'){
        return this.state.temperature + "°c" ;
      }
      else if(str === 'description'){
        return "Description: " + this.state.description;
      }
      else if(str === 'humidity'){
        return "Humidity: " + this.state.humidity + "%";
      }
      else if(str === 'wind'){
        return "Wind: " + this.state.wind + " meter/sec";
      }
    }
  };   
  
  render () {
    return(
      <div>
        <form className = 'submit' onSubmit= {this.handleSubmit}>
          <input className= "input-city" type="text" value={this.state.value} onChange={this.handleChange}/>
          <input className= "btn" type="submit" value="Get Report" />
        </form>

        <div className = "report">
          <div className = "city-state" >{this.renderHTML('name')}</div>         
          <div className = "top-wrapper">
                {this.renderHTML('icon')}
                <div className = "temperature">{this.renderHTML('temperature')}</div>
          </div>
          <div className = "bottom-wrapper">
              <div className = "description">{this.renderHTML('description')}</div>
              <div className = "humidity">{this.renderHTML('humidity')}</div>
              <div className = "wind">{this.renderHTML('wind')}</div>
          </div>
        </div>
      </div>
      
    )
  }
}

export default App