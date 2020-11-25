
import axios from 'axios';
import Config from './../config/index';
import qs from 'query-string';

class AuthService {
  async login(data){
    let res = await axios.post(`${Config.api.staging.baseHost}/api/user/login?username=${data.username}&password=${data.password}`)
    res.data.data.password = data.password //temporal fix TODO implement oauth token
    return res.data
  }

  async register(data){
    const headers = {
      'Content-Type': 'application/json'
    }
    let res = await axios.post(`${Config.api.staging.baseHost}/api/user/register/seller`, getFormatData(data), {
      headers: headers
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

  async getUserData(data, headers){
    debugger
    const {username} = data;
    const header = `Bearer ${headers.access_token}`;
    const userData = await axios.get(`${Config.url_secured_staging}${Config.get_user}username=${username}`, { headers: { Authorization: header } })
    .then(function (response) {
      debugger
      return response;
    })
    .catch(function (error) {
      console.log('error ', error);
      return error.response
    });

    return userData;
  }

  async getAccessToken(data){
    const {username, password} = data;
    const requestBody = {
      username,
      password,
      grant_type: 'password',
      scope: 'openid offline_access',
      client_id: Config.client_id,
      client_secret: Config.client_secret_staging,
    }
    const headerConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    var status = 200;

    const loginResponse = await axios.post(`${Config.url}${Config.login_url}`, qs.stringify(requestBody), headerConfig)
    .then(function (response) {
      debugger
      return response;
    })
    .catch(function (error) {
      debugger
      return error.response
    });
    return loginResponse;
  }
}

const getFormatData = data => {
  return {
    "email": data.email,
    "lastName": data.lastname,
    "username": data.username,
    "name": data.name,
    "password": data.password,
    "phone": data.phone
  }
}

export default AuthService;