import React, { Component } from 'react';
import api from './api';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      infos: [],
      state: false,     
    };  

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }  

  handleChange = (evento) => {    
    this.setState({ value: evento.target.value });
    
  };

  handleSubmit = async (evento) => {    
    evento.preventDefault();

    let river = '';
    let base_url = 'https://portal1.snirh.gov.br/ana/rest/services/dados_abertos/Trechos_de_Curso_de_Agua_Inundaveis/FeatureServer/query?layerDefs=%5B%7B%22layerId%22%3A+0%2C+%22where%22%3A+%22NORIOCOMP';
    let url_normal = '%3D%27';
    let url_specialletter = '%3E%3D%27';
    let base_url2 = '%27%22%2C+%22outfields%22%3A+%22*%22+%7D%5D&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&time=&outSR=&havingClause=&gdbVersion=&historicMoment=&returnDistinctValues=false&returnGeometry=false&maxAllowableOffset=&returnIdsOnly=false&returnCountOnly=false&returnZ=false&returnM=false&geometryPrecision=&multipatchOption=xyFootprint&returnTrueCurves=false&resultOffset=&resultRecordCount=&sqlFormat=standard&f=pjson';
    let URL_Request = '';

    this.setState({
      state : false,
      infos : []
  })

    if (this.state.value !== "") {

      this.setState({state: true})
      river = this.state.value;
      river = river.replaceAll(" " , "+");

      river  = river.replace(/á|é|í|ó|ú|õ|ã|ü|ï|ñ|ç|ê|ô|à/gi, function (x) {
        return "999";
      })    
       
      if(river.search("999")>=0){
        const posicao = river.search("999");
        river = river.slice(0, posicao);
        
        URL_Request = base_url + url_specialletter + river + base_url2;
      }
      else{
        URL_Request = base_url + url_normal+ river + base_url2;
      }          
      
      
      
      const response = await api.get(URL_Request);
      
      let found = false;

      response.data.layers[0].features.forEach(rio=>{       
        if(rio.attributes.NORIOCOMP === this.state.value && !found){
        
        let info = 'Nome: ' + rio.attributes.NORIOCOMP
        let info1 = 'Frequência: '+rio.attributes.FREQUENCIA
        let info2 = 'Impacto: '+rio.attributes.IMPACTO 
        let info3 = 'Vulnerabilidade: '+rio.attributes.VULNERABILIDADE ;

        this.setState({
          infos: [info, info1, info2, info3]
        })

        found = true;

        }
      });    
    }    
  };

  render() {    
    return (
      <div>
      <div>
        
         
        <form id="formulario" onSubmit={this.handleSubmit}>
          <p>Digite um rio aqui: <input type="text" value={this.state.value} onChange={this.handleChange} id="barraPesquisa" /><input id="botaoPesquisa"type="submit" value="Pesquisar" /></p>
                  
        </form>   
      </div>
      <div>        
            {this.state.state && <ul id="listagem" >
            
            <li>{this.state.infos[0]}</li>
            <li>{this.state.infos[1]}</li>
            <li>{this.state.infos[2]}</li>
            <li>{this.state.infos[3]}</li>
            </ul> }
          
      </div>      
      </div>
    );
  }
}


export default App;