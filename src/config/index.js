const config = {
  api: {
    dev:{
      baseHost: 'http://localhost:18083',
      authHost: 'http://localhost:7080/auth'
    },
    staging:{
      baseHost: 'http://216.55.185.219:18083',
      authHost: 'http://216.55.185.219:7080/auth'
    },
    production:{
      baseHost: 'http://216.55.185.219:18083',
      authHost: 'http://216.55.185.219:7080/auth'
    }
  }
};

export default config