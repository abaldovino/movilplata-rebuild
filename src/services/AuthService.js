
import axios from 'axios'
import Config from './../config/index'
import qs from 'query-string'

class AuthService {
  async login(data){
    let res = await axios.post(`${Config.api.production.baseHost}/api/user/login?username=${data.username}&password=${data.password}`)
    res.data.data.password = data.password //temporal fix TODO implement oauth token
    return res.data
  }

  async register(data){
    const headers = {
      'Content-Type': 'application/json'
    }
    let res = await axios.post(`${Config.api.production.baseHost}/api/user/register/seller`, getFormatData(data), {
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

  async getToken(data) {
    const {username, password} = data;
    console.log('body', data)
    console.log('URL:', `${Config.apiv2.url_secured}${Config.apiv2.login_url}`);

    const requestBody = {
      username,
      password,
      grant_type: 'password',
      scope: 'openid offline_access',
      client_id: Config.apiv2.client_id,
      client_secret: Config.apiv2.client_secret_production,
    }

    const headerConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    var status = 200;

    const loginResponse = await axios.post(`${Config.apiv2.login_url_production}${Config.apiv2.login_url}`, qs.stringify(requestBody), headerConfig)
    .then(function (response) {
      return response.data.access_token;
    })
    .catch(function (error) {
      console.log('error ', error);
      status = 401;
      return error;
    });

    return {data: status === 200 ? loginResponse : loginResponse.message, code: status }
  }

  async getUserData (data){
    const {username} = data;
    const header = `Bearer ${localStorage.getItem('token')}`;
    const userData = await axios.get(`${Config.apiv2.url_secured}${Config.apiv2.get_user}username=${username}`, { headers: { Authorization: header } })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log('error ', error);
      return {data: error, status: 500}
    });

    return userData
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