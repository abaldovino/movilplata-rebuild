const config = {
  api: {
    dev:{
      baseHost: 'http://localhost:18083',
      authHost: 'http://localhost:7080/auth'
    },
    staging:{
      baseHost: 'https://staging-movilplata.homeip.net',
      authHost: 'https://staging-movilplata.homeip.net/auth'
    },
    production:{
      baseHost: 'http://216.55.185.219:18083',
      authHost: 'http://216.55.185.219:7080/auth'
    }
  },
  apiv2: {
    url: 'https://staging-movilplata.homeip.net/auth',
    client_id: 'movilplata_client',
    client_secret_production: 'd5c13573-ca4f-45fe-af94-a020d2ec1c79',
    client_secret_staging: '73876220-c6e7-4f6e-b1cd-a01f703f9bd4',
    login_url: '/realms/movilplata/protocol/openid-connect/token',
    get_user: '/api/secure/users?',
    url_secured: 'http://216.55.185.219:18083',
    url_secured_staging: 'https://staging-movilplata.homeip.net'

  }
};

export default config