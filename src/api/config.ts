const wsUrl ={
  dev:{
    BASE_URL:  "http://localhost:55556",
    ws:'ws://localhost:55555' ,
    TIMEOUT:1000 ,
  },
  env:{
    BASE_URL:"http://49.234.58.117:55556",
    ws:'ws://49.234.58.117:55555' ,
    TIMEOUT: 1000 ,
  }
}

export default  wsUrl.env