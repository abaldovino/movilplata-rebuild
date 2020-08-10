import axios from 'axios'
import Config from './../config/index'

const publicIp = require('public-ip');
class PseService {
    PayPSERequest = async (data, transactionData) => {
        const encodedString = new Buffer(`${data.username}:${data.password}`).toString('base64');
        const basicAuth = 'Basic ' + encodedString;
        const payload = await PSEData(data, transactionData);
        let res = await axios.post(`${Config.api.staging.baseHost}/api/secure/payment/transaction/user/${data.id}/bank/topup`, 
            payload,
            { withCredentials: true, contentType: 'application/json',  headers: { 'Authorization': basicAuth }
        })
        return res.data
    }

    CheckPSEPayRequest = async (data) => {
      const encodedString = new Buffer(`${data.username}:${data.password}`).toString('base64');
        const basicAuth = 'Basic ' + encodedString;
        let res = await axios.put(`${Config.api.staging.baseHost}/api/secure/payment/transactions/${data}/bank/operation/check`,
            { withCredentials: true, contentType: 'application/json',  headers: { 'Authorization': basicAuth }
        })
        return res.data
    }
}

const PSEData = async (data, transaction) => {
    const name = transaction.name;
    const type = transaction.dnitype === "CC" ? 'N' : 'J';
    const ip_address = await publicIp.v4();
    return {
      fee: transaction.ammount,
      referenceId: 'tr-pse',
      detail: 'Transaccion a traves de PSE',
      pocketIds: [1],
      commerceId:1,
      commerceBranchId:1,
      commerceName: 'test',
      idTransactionReference: 'PSE-11269',
      carrier: {
        id: 'PSE',
        extra_params: {
          bank_code: transaction.bank,
          response_url:
            'https://staging-movilplata.homeip.net/admin/callback/pse/result',
          user: {
            name: "Juan Otero",
            fiscal_number: 79795046,
            type: "N",
            type_fis_number: "CC",
            ip_address: ip_address
        }
        },
      }
  }
}

export default PseService;