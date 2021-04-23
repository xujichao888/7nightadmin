
const QS = require('query-string');

export const queryString = (obj:object):string=>{
    return  QS.stringify(obj)
}