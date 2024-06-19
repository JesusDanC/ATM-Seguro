import axios from 'axios';
import convert from 'xml-js';
import CryptoJS from 'crypto-js';

const secretKey = 'ProyectoSeguridad1215'; 

const api = axios.create({
  baseURL: 'http://localhost:3000/api', 
  headers: { 'Content-Type': 'application/xml' }
});

function encriptar(data) {
  const encryptedData = CryptoJS.TripleDES.encrypt(JSON.stringify(data), secretKey).toString();
  const md5Hash = CryptoJS.MD5(encryptedData).toString();

  return {
    data: encryptedData,
    md5Hash
  };
}

function desencriptar(encryptedData) {
  try {
    const bytes = CryptoJS.TripleDES.decrypt(encryptedData, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
} catch (error) {
    console.error('Error al desencriptar:', error);
    return null;
}

}

api.interceptors.request.use((config) => {
  if (config.data && config.headers['Content-Type'] === 'application/xml') {
    const { data: encryptedData, md5Hash } = encriptar(config.data);
    config.headers['X-MD5-Hash'] = md5Hash;
    config.data = jsonToXml({ encryptedData });
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use((response) => {
  try {
    if (response.headers['content-type'].includes('application/xml')) {
      const Datos = convert.xml2js(response.data, { compact: true });
      const receivedMd5Hash = Datos.response.md5Hash._text;
      const encryptedData = Datos.response.encryptedData._text;

      const calculatedMd5Hash = CryptoJS.MD5(encryptedData).toString();

      if (receivedMd5Hash !== calculatedMd5Hash) {
        throw new Error('MD5 hash mismatch. Data might have been tampered.');
      }

      const decryptedData = desencriptar(encryptedData);
      const decryptedObject = JSON.parse(decryptedData);
      const data = JSON.parse(decryptedObject);

      response.data = data;
    }
  } catch (error) {
    console.log('Error al manejar respuesta XML:', error);
  }
  return response;
});
  
function jsonToXml(data) {
  const options = { compact: true, ignoreComment: true, spaces: 4 };
  return convert.js2xml(data, options);
}

export default api;