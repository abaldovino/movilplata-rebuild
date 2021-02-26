import axios from 'axios'
import Config from './../config/index'

class GeneralService {
  getCities = async (data) => {
    const encodedString = new Buffer(`${data.username}:${data.password}`).toString('base64');
    const header = `Bearer ${localStorage.getItem('token')}`;
    let res = await axios.get(`${Config.api.production.baseHost}/api/cities/country/472`, {
      withCredentials: true, contentType: 'application/json',  headers: { 'Authorization': header }
    })
    return res.data
  }
  getUserById = async (data) => {
    const encodedString = new Buffer(`:`).toString('base64');
    const header = `Bearer ${localStorage.getItem('token')}`;
    let res = await axios.get(`${Config.api.production.baseHost}/api/secure/users?username=${data}`, { withCredentials: true, contentType: 'application/json',  headers: { 'Authorization': header }})
    return res.data
  }
  getbanks = async (data) => {
    const encodedString = new Buffer(`${data.username}:${data.password}`).toString('base64');
    const header = `Bearer ${localStorage.getItem('token')}`;
    let res = await axios.get(`${Config.api.production.baseHost}/api/secure/payment/banks`, { withCredentials: true, contentType: 'application/json',  headers: { 'Authorization': header }})    
    return res.data
  }
}

export default GeneralService;