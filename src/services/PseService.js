import axios from 'axios'
import Config from './../config/index'

const publicIp = require('public-ip');
class PseService {
    PayPSERequest = async (data, transactionData) => {
        debugger
        const encodedString = new Buffer(`${data.username}:${data.password}`).toString('base64');
        const basicAuth = 'Basic ' + encodedString;
        let res =
            await axios.post(`${Config.api.staging.baseHost}/api/secure/payment/transaction/user/${data.id}/bank/pay`, PSEData(data, transactionData), {
                withCredentials: true, contentType: 'application/json',  headers: { 'Authorization': basicAuth }
        })
        debugger
        return res.data
    }
}

const PSEData = async (data, transaction) => {
    const name = transaction.name;
    const type = transaction.dnitype === "CC" ? 'N' : 'J';
    const ip_address = await publicIp.v4();
    return {
        fee: data.amount,
        referenceId: 'tr-pse',
        detail: 'Transaccion a traves de PSE',
        pocketIds: [13],
        commerceId: data.commerce.id,
        commerceBranchId: 0,
        // commerceName: 'test',
        idTransactionReference: '',
        carrier: {
            id: 'PSE',
            extra_params: {
                name,
                response_url:
                    'http://216.55.185.219:18083/api/payment/test/transactions/tr-test-replace/bank/operation/check',
                user: {
                    name,
                    fiscal_number: '',
                    type_fis_number: '',
                    type, // N=natural J=juridic
                    ip_address: ip_address,
                },
            },
        }
  }
}

export default PseService;