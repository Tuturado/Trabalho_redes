import axios from 'axios';

const api = axios.create({
    
    baseURL: 'https://portal1.snirh.gov.br/ana/rest/services/dados_abertos/Trechos_de_Curso_de_Agua_Inundaveis/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json'

});

export default api;