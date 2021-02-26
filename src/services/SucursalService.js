
import axios from 'axios'
import Config from './../config/index'

class SucursalService {
  ListService = async (commerce, data) => {
    const header = `Bearer ${localStorage.getItem('token')}`;
    let res = await axios.get(`${Config.api.production.baseHost}/api/secure/admin/commerces/${commerce.id}/branches`,{ withCredentials: true, contentType: 'application/json',  headers: { 'Authorization': header }})
    .then(function (response) {
      // handle success      
      return response.data
    })
    .catch(function (error) {
      // handle error
      return { data: { error: error.response.data, code: error.response.status, description: error.response } }
    })
    return res
  }
  
  CreateSucursalService = async (data, commerce, userData) => {
    const header = `Bearer ${localStorage.getItem('token')}`;
    let res = await axios.post(`${Config.api.production.baseHost}/api/secure/admin/branches/commerce/${commerce}`, data, {
      withCredentials: true, contentType: 'application/json',  headers: { 'Authorization': header }
    })
    .then(function (response) {
      // handle success
      return response
    })
    .catch(function (error) {
      return { data: { error: error, code: error.response.data.statusCode, description: error.response.data.description } }
    })
    return res.data
  }
  
  EditSucursalService = async (data, userData) => {
    const header = `Bearer ${localStorage.getItem('token')}`;
    let res = await axios.put(`${Config.api.production.baseHost}/api/secure/admin/branches`, data, {
      withCredentials: true, contentType: 'application/json',  headers: { 'Authorization': header }
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
    const header = `Bearer ${localStorage.getItem('token')}`;
    let res = await axios.delete(`${Config.api.production.baseHost}/api/secure/admin/commerces/${commerce}/branches/${data}`, {
      withCredentials: true, contentType: 'application/json',  headers: { 'Authorization': header }
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
    const header = `Bearer ${localStorage.getItem('token')}`;
    let res = await axios.get(`${Config.api.production.baseHost}/api/secure/admin/commerces/${userData.commerce.id}/branches/${data}`,{
      withCredentials: true, contentType: 'application/json',  headers: { 'Authorization': header }
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
    const header = `Bearer ${localStorage.getItem('token')}`;
    let res = await axios.post(`${Config.api.production.baseHost}/api/secure/notification/token`, data ,{
      withCredentials: true, contentType: 'application/json',  headers: { 'Authorization': header }
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