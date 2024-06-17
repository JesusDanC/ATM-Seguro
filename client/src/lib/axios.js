import axios from 'axios';
import convert from 'xml-js';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', 
  headers: { 'Content-Type': 'application/xml' }
});

api.interceptors.request.use((config) => {
  if (config.data && config.headers['Content-Type'] === 'application/xml') {
    config.data = jsonToXml(config.data);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use((response) => {
    try {
        if (response.headers['content-type'].includes('application/xml')) {
            
            const options = { compact: true, ignoreComment: true, spaces: 4 };
            const json = convert.xml2js(response.data, options);
        
            response.data = json;
            return response;
        }
    } catch (error) {
        console.log(error)
    }
  });
  

function jsonToXml(data) {
  const options = { compact: true, ignoreComment: true, spaces: 4 };
  return convert.js2xml(data, options);
}

export default api;