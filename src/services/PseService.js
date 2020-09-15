import axios from 'axios'
import Config from './../config/index'

const publicIp = require('public-ip');
class PseService {
    PayPSERequest = async (data, transactionData) => {
        const header = `Bearer ${localStorage.getItem('token')}`;
        const payload = await PSEData(data, transactionData);
        let res = await axios.post(`${Config.api.staging.baseHost}/api/secure/payment/transaction/user/${data.id}/bank/topup`, 
            payload,
            {contentType: 'application/json',  headers: { 'Authorization': header }
        })
        return res.data
    }

    CheckPSEPayRequest = async (transactionData, data) => {
      const header = `Bearer ${localStorage.getItem('token')}`;
      let res = await axios.put(`${Config.api.staging.baseHost}/api/secure/payment/transactions/${transactionData}/bank/operation/check`,{},
        {contentType: 'application/json',  headers: { 'Authorization': header }
      })
      console.log(res);
      return res.data
    }
}

const PSEData = async (data, transaction) => {
    const type = transaction.dnitype === "CC" ? 'N' : 'J';
    const ip_address = await publicIp.v4();
    return {
      fee: transaction.ammount,
      referenceId: `$PSE-${new Date().getTime()}`,
      detail: 'Transaccion a traves de PSE',
      pocketIds: [1],
      commerceId:1,
      commerceBranchId:1,
      commerceName: data.commerce.client.name,
      idTransactionReference: `$PSE-${new Date().getTime()}`,
      carrier: {
        id: 'PSE',
        extra_params: {
          bank_code: transaction.bank,
          response_url:
            'https://staging-movilplata.homeip.net/admin/callback/pse/result/web/0',
          user: {
            name: transaction.name,
            fiscal_number: parseInt(transaction.dni),
            type: type,
            type_fis_number: transaction.dnitype,
            ip_address: ip_address
        }
        },
      }
  }
}

export default PseService;