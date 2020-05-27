import CryptoJS from 'crypto-js';

export const generateToken = () => {
    const paymentez = { app_code: 'CPS-CO-SERVER', app_key: 'jmGokVpIoDY5EuVklYqgw8b2cqz6it'}
    const timestamp = Math.floor(Date.now() / 1000)
    const uniq = paymentez.app_key + String(timestamp)
    const uniqHash = CryptoJS.SHA256(uniq)
    const raw = `${paymentez.app_code};${timestamp};${uniqHash}`
    const words = CryptoJS.enc.Utf8.parse(raw)
    const base64 = CryptoJS.enc.Base64.stringify(words)
    const auth_token = base64.toString();
    return auth_token;
}

