import React, { Component } from 'react';
import api from './api';

/*{this.results.infos && this.results.infos.map((rio, indice) => ( 
  <li key={indice}>
    {rio}
  </li>
))}*/

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rios: [],
      value: "",
    };

    this.results = {
      infos: [],
      state: false,
      nome: "",
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
    if (this.state.value !== "") {
      this.results.infos = [];
      this.results.state = false;

      const arrayRios = this.state.rios.features;  
      
      arrayRios.forEach(rio => {
       if(rio.attributes.NORIOCOMP === this.state.value){
         this.results.state = true;
         const stringResult = 'Frequencia: ' + rio.attributes.FREQUENCIA + ', Impacto: '+rio.attributes.IMPACTO+', Vulnerabilidade: ' + rio.attributes.VULNERABILIDADE;
         this.results.infos.push(stringResult); 
         this.results.nome = this.state.value;      
       }
      });
      console.log(this.results.state);
    }    
    this.setState({});
  };

  render() {    
    return (
      <div>
      <div>
        
         {console.log(this.state.rios)}
        <form onSubmit={this.handleSubmit}>
        Rios:
          <label>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          <input type="submit" value="Enviar" />
          </label>
          </form>   
      </div>
      <div>        
            {this.results.state && <ul>
            <li>{this.results.nome}</li> 
            <li>{this.results.infos[0]}</li>
            </ul> }
          
      </div>      
      </div>
    );
  }
}


export default App;