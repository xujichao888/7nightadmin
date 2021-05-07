
const QS = require('query-string');

export const queryString = (obj:object):string=>{
    return  QS.stringify(obj)
}
export  const exchangeTime = (time:Date)=>{
    let year = time.getFullYear()
    let Month = time.getMonth()+1
    let day = time.getDate()
    return `${year}-${Month<10?'0'+Month:Month}-${day<10?'0'+day:day}`
  }