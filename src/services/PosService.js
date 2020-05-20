import axios from 'axios'
import Config from './../config/index'

class PosService {
  SendPayRequest = async (data, commerce, userData) => {
    const encodedString = new Buffer(`:`).toString('base64');
    const basicAuth = 'Basic ' + encodedString;
    let res = await axios.post(`${Config.api.dev.baseHost}/api/secure/payment/transaction/user/${userData}/push?type=1`, cobroData(data, commerce),{ withCredentials: true, contentType: 'application/json',  headers: { 'Authorization': basicAuth }})
    .then(function (response) {
      // handle success
      console.log('CobroService.data', response)
      return response
    })
    .catch(function (error) {
      // handle error
      return { data: { error: error, code: 500, description: 'Error. Contacta al administrador' } }
    })

    return res.data
  }

  RechargeService = async (data, commerce, userData) => {
    const encodedString = new Buffer(`:`).toString('base64');
    const basicAuth = 'Basic ' + encodedString;
    let res = await axios.post(`${Config.api.dev.baseHost}/api/secure/payment/transaction/user/${userData}/topup`, 
    recargaData(data, commerce),{ withCredentials: true, contentType: 'application/json',  headers: { 'Authorization': basicAuth }})
    .then(function (response) {
      // handle success
      return response
    })
    .catch(function (error) {
      // handle error
      return { data: { error: error, code: 500, description: 'Error. Contacta al administrador' } }
    })
  
    return res.data
  }

  SendPaymentRequest = async (data, commerce, userData) => {
    const encodedString = new Buffer(`:`).toString('base64');
    const basicAuth = 'Basic ' + encodedString;
    const url = `${Config.api.dev.baseHost}/api/secure/payment/transaction/user/${userData}/push?type=2`
    let res = await axios.post(url, retiroData(data, commerce),
                              { withCredentials: true, contentType: 'application/json',  
                              headers: { 'Authorization': basicAuth }}
                              )
    .then(function (response) {
      // handle success
      console.log('RetiroService.data', response)
      return response
    })
    .catch(function (error) {
      // handle error
      return { data: { error: error, code: 500, description: 'Error. Contacta al administrador' } }
    })

    return res.data
  }

  SendConfirmationPaymentRequest = async (data, commerce, refId, userData) => {
    const encodedString = new Buffer(`:`).toString('base64');
    const basicAuth = 'Basic ' + encodedString;
    let res = await axios.post(`${Config.api.dev.baseHost}/api/secure/payment/transaction/user/${userData}/withdraw`,
                                retiroConfirmado(data, commerce, refId), 
                                { withCredentials: true, contentType: 'application/json',  headers: { 'Authorization': basicAuth }})
    .then(function (response) {
      // handle success
      return response
    })
    .catch(function (error) {
      // handle error
      return { data: { error: error, code: 500, description: 'Error. Contacta al administrador' } }
    })

    return res.data
  }
}

const retiroData = (data, commerce) => {
  return {  "fee":parseInt(data.amount), 
            "commerceId":commerce,
            "commerceBranchId":parseInt(data.sucursal)
          }
}

const cobroData = (data, commerce) => {
  return {  "fee":parseInt(data.amount), 
            "referenceId":"Retiro", 
            "detail": data.detail,
            "commerceId":commerce,
            "commerceBranchId":parseInt(data.sucursal)
        }
}

const retiroConfirmado = (data, commerce, id_ref) => {
  return {
          "amount":parseInt(data.amount),
          "referenceId":"retiro-pos",
          "detail": data.detail,
          "commerceId":commerce,
          "commerceBranchId":parseInt(data.sucursal),
          "idTransactionReference": id_ref
        }
}

const recargaData = (data, commerce) => {
  return {  "amount":parseInt(data.amount), 
            "referenceId":"recarga-dashboard", 
            "detail":"Recarga bolsillo movilpesos dashboard", 
            "pocketId": parseInt(data.pocket), 
            "commerceId":commerce
        }
}

export default PosService;