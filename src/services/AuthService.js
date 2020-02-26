
import axios from 'axios'
import Config from './../config/index'

class AuthService {
  async login(data){
    let res = await axios.post(`${Config.api.dev.baseHost}/api/user/login?username=${data.username}&password=${data.password}`)
    res.data.data.password = data.password //temporal fix TODO implement oauth token
    return res.data
  }

  async register(data){
    const headers = {
      'Content-Type': 'application/json'
    }
    let res = await axios.post(`${Config.api.dev.baseHost}/api/user/register/seller`, getFormatData(data), {
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