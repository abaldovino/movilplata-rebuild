import axios from 'axios'
import Config from './../config/index'

class GeneralService {
  getCities = async (data) => {
    const encodedString = new Buffer(`${data.username}:${data.password}`).toString('base64');
    const basicAuth = 'Basic ' + encodedString;
    let res = await axios.get(`${Config.api.staging.baseHost}/api/cities/country/472`, {
      withCredentials: true, contentType: 'application/json',  headers: { 'Authorization': basicAuth }
    })
    return res.data
  }
  getUserById = async (data) => {
    const encodedString = new Buffer(`:`).toString('base64');
    const basicAuth = 'Basic ' + encodedString;
    let res = await axios.get(`${Config.api.staging.baseHost}/api/secure/users?username=${data}`, { withCredentials: true, contentType: 'application/json',  headers: { 'Authorization': basicAuth }})
    return res.data
  }
}

export default GeneralService;