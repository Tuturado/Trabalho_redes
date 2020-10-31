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
   // const response = await api.get();
    //this.setState({ rios: response.data });
  }

  handleChange = (evento) => {
    //console.log(evento.target.value);
    this.setState({ value: evento.target.value });
    
  };

  handleSubmit = async (evento) => {    
    evento.preventDefault();

    let river = '';
    let base_url = 'https://portal1.snirh.gov.br/ana/rest/services/dados_abertos/Trechos_de_Curso_de_Agua_Inundaveis/FeatureServer/query?layerDefs=%5B%7B%22layerId%22%3A+0%2C+%22where%22%3A+%22NORIOCOMP%3D%27';
    let base_url2 = '%27%22%2C+%22outfields%22%3A+%22*%22+%7D%5D&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&time=&outSR=&havingClause=&gdbVersion=&historicMoment=&returnDistinctValues=false&returnGeometry=false&maxAllowableOffset=&returnIdsOnly=false&returnCountOnly=false&returnZ=false&returnM=false&geometryPrecision=&multipatchOption=xyFootprint&returnTrueCurves=false&resultOffset=&resultRecordCount=&sqlFormat=standard&f=pjson';
    let URL_Request = '';
    this.results.state = false;
    this.results.infos = [];
    if (this.state.value !== "") {
      this.results.state = true;
      river = this.state.value;
      river = river.replace(" " , "+");
      console.log(river);
      URL_Request = base_url + river + base_url2;
      console.log(URL_Request);
      const response = await api.get(URL_Request);
      console.log(response);

      response.data.layers[0].features.forEach(rio=>{

        
        let info = 'Nome: ' + rio.attributes.NORIOCOMP +', Frequência: '+rio.attributes.FREQUENCIA+', Impacto: '+
                    rio.attributes.IMPACTO + ', Vulnerabilidade: '+rio.attributes.VULNERABILIDADE ;
                   
        console.log(info);
        this.results.infos.push(info);            

      });    
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