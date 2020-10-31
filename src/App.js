import React, { Component } from 'react';
import api from './api';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rios: [],
      value: " ",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

 
  async componentDidMount() {
    const response = await api.get();
    this.setState({ rios: response.data });
  }

  handleChange = (evento) => {
    //console.log(evento.target.value);
    this.setState({ value: evento.target.value });
    
  };

  handleSubmit = async (evento) => {
    evento.preventDefault();
    if (this.value !== " ") {
      const response = await api.get(this.state.value);
      this.setState({ rios: response.data });
    }
  };

  render() {    
    return (
      <div>
        
         {console.log(this.state.rios)}
        <form onSubmit={this.handleSubmit}>
        Rios:
          <label>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          <input type="submit" value="Enviar" />
          </label>
          
          {this.state.rios.features && this.state.rios.features.map((rio, indice) => (
              <li key={indice}>
                {rio.attributes.NORIOCOMP}
              </li>
          ))}
          
        </form>        
      </div>
    );
  }
}


export default App;