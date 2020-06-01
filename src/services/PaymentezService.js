import axios from 'axios';

export const add_card = async (user, paymentData, year, month, headers) => {
    const userEmail = user.email
    const userId = user.id
    const result = await axios.post(`https://ccapi-stg.paymentez.com/v2/card/add`, 
        {
            "user": {
                "id": userId.toString(),
                "email": userEmail
            },
            "card": {
                "number": paymentData.tdcNumber.replace(/ /g,''),
                "holder_name": paymentData.tdcName,
                "expiry_month": month,
                "expiry_year": year,
                "cvc": paymentData.tdcCvc,
            }
        }, {headers})
        .then(response => {
            if (response.status === 200) {
                return {cards: response.data.card, status: 200}
            }else{
                return {cards: response.token, status: 500}
            }
        })
        .catch(err => {
            return {cards: [], status: err.response.status, err: err.response.data.error.description}
        })
        
        return result
}

export const card_list = async (user, headers) => {
    const card_list = await axios.get(`https://ccapi-stg.paymentez.com/v2/card/list?uid=${user}`, {headers})
        .then(response => {
            if (response.status === 200) {
                return {cards: response.data.cards, status: 200}
            }else{
                return {cards: response.data, status: 500}
            }
        })
        .catch(err => {
            return {cards: [], status: 500, err}
        })

    return card_list
}