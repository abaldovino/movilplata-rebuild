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
  }
};

export default config