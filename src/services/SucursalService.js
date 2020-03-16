
import axios from 'axios'
import Config from './../config/index'

class SucursalService {
  ListService = async (commerce, data) => {
    const encodedString = new Buffer(`${data.username}:${data.password}`).toString('base64');
    const basicAuth = 'Basic ' + encodedString;
    let res = await axios.get(`${Config.api.staging.baseHost}/api/secure/admin/commerces/${commerce.id}/branches`,{ withCredentials: true, contentType: 'application/json',  headers: { 'Authorization': basicAuth }})
    .then(function (response) {
      // handle success
      
      return response.data
    })
    .catch(function (error) {
      // handle error
      
      return { data: { error: error, code: 500, description: 'Error. Contacta al administrador' } }
    })
    .finally(function () {
      // always executed
    });
    return res
  }
  
  CreateSucursalService = async (data, commerce, userData) => {
    const encodedString = new Buffer(`${userData.username}:${userData.password}`).toString('base64');
    const basicAuth = 'Basic ' + encodedString;
    let res = await axios.post(`${Config.api.staging.baseHost}/api/secure/admin/branches/commerce/${commerce}`, data, {
      withCredentials: true, contentType: 'application/json',  headers: { 'Authorization': basicAuth }
    })
    .then(function (response) {
      // handle success
      return response
    })
    .catch(function (error) {
      return { data: { error: error, code: 500, description: 'Error. Contacta al administrador' } }
    })
    return res.data
  }
  
  EditSucursalService = async (data, userData) => {
    const encodedString = new Buffer(`${userData.username}:${userData.password}`).toString('base64');
    const basicAuth = 'Basic ' + encodedString;
    let res = await axios.put(`${Config.api.staging.baseHost}/api/secure/admin/branches`, data, {
      withCredentials: true, contentType: 'application/json',  headers: { 'Authorization': basicAuth }
    })
    .then(function (response) {
      // handle success
      return response
    })
    .catch(function (error) {
      return { data: { error: error, code: 500, description: 'Error. Contacta al administrador' } }
    })
    return res.data
  }
  
  DeleteSucursalService = async (data, commerce, userData) => {
    const encodedString = new Buffer(`${userData.username}:${userData.password}`).toString('base64');
    const basicAuth = 'Basic ' + encodedString;
    let res = await axios.delete(`${Config.api.staging.baseHost}/api/secure/admin/commerces/${commerce}/branches/${data}`, {
      withCredentials: true, contentType: 'application/json',  headers: { 'Authorization': basicAuth }
    })
    
    .then(function (response) {
      // handle success
      return response
    })
    .catch(function (error) {
      return { data: { error: error, code: 500, description: 'Error. Contacta al administrador' } }
    })
    return res.data
  }
  
  getSucursalService = async (data, userData) => {
    const encodedString = new Buffer(`${userData.username}:${userData.password}`).toString('base64');
    const basicAuth = 'Basic ' + encodedString;
    let res = await axios.get(`${Config.api.staging.baseHost}/api/secure/admin/commerces/${userData.commerce.id}/branches/${data}`,{
      withCredentials: true, contentType: 'application/json',  headers: { 'Authorization': basicAuth }
    })
    .then(function (response) {
      // handle success
      return response
    })
    .catch(function (error) {
      return { data: { error: error, code: 500, description: 'Error. Contacta al administrador' } }
    })
    return res.data
  }
  
  addNotificationToken = async (data, userData) => {
    const encodedString = new Buffer(`${userData.username}:${userData.password}`).toString('base64');
    const basicAuth = 'Basic ' + encodedString;
    let res = await axios.post(`${Config.api.staging.baseHost}/api/secure/notification/token`, data ,{
      withCredentials: true, contentType: 'application/json',  headers: { 'Authorization': basicAuth }
    })
    .then(function (response) {
      // handle success
      return response
    })
    .catch(function (error) {
      return { data: { error: error, code: 500, description: 'Error. Contacta al administrador' } }
    })
    return res.data
  }
}

export default SucursalService;